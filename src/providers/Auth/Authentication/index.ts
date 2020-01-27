import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import firebaseAuth from '@react-native-firebase/auth';
import firebaseStorage, {
  FirebaseStorageTypes,
} from '@react-native-firebase/storage';
import ErrorHandler from 'helpers/error/errorHandler';
import {SignupPayload, Login} from 'helpers/Interfaces';
import {auth} from 'helpers/constants';
const {InvalidException} = ErrorHandler;
export class FirebaseAuthentication {
  connector = firestore();
  auth = firebaseAuth();
  storage = firebaseStorage();
  storageRef = this.storage.ref();

  async getUserDefaultImage() {
    const defaultUrl = await this.storageRef
      .child('/Default/logo.png')
      .getDownloadURL();

    return Promise.resolve(defaultUrl);
  }

  // signout
  private logout = async () => {
    return this.auth.signOut();
  };
  // login to user account using email
  private login = async (values: Login) => {
    values.email = values.email.toLowerCase();
    // check if yourself exists
    const userExist = await this.connector
      .collection(auth.COLLECTIONS.USER)
      .where('email', '==', values.email)
      .get()
      .catch(err =>
        Promise.reject(
          new InvalidException({
            info: 'Request Error:' + err,
            code: 403,
          }),
        ),
      );

    if (userExist.size <= 0)
      return Promise.reject(
        new InvalidException({
          info: 'Invalid email or password',
          code: 404,
        }),
      );

    let index = 0;
    const userDetails: any = {};

    await new Promise((resolve, reject) => {
      userExist.forEach(async ({data, id}) => {
        const userDetailsSnapshot = await this.connector
          .collection(auth.COLLECTIONS.USER)
          .doc(id)
          .get();

        Object.assign(userDetails, userDetailsSnapshot.data());
        userDetails.id = userDetailsSnapshot.id;
        if (index === userExist.size - 1) return resolve(userDetails);
      });
    });

    const userAuth = await this.auth
      .signInWithEmailAndPassword(values.email, values.password)
      .catch(err =>
        Promise.reject(
          new InvalidException({
            info: 'Invalid email or password',
            code: 404,
          }),
        ),
      );

    const {emailVerified} = userAuth.user;
    if (!emailVerified)
      return Promise.reject(
        new InvalidException({
          info: 'Email not verified',
          code: 408,
        }),
      );

    return Promise.resolve({token: userDetails.id, userDetails});
  };

  // create user account
  private signup = async (values: SignupPayload) => {
    values.email = values.email.toLowerCase();
    // check if user or org exists
    const userExist = await this.connector
      .collection(auth.COLLECTIONS.USER)
      .where('email', '==', values.email)
      .get()
      .catch(err =>
        Promise.reject(
          new InvalidException({
            info: 'Request Error:' + err,
            code: 403,
          }),
        ),
      );

    const organisationExist = await this.connector
      .collection(auth.COLLECTIONS.ORGANISATION)
      .where('organisationname', '==', values.organisation.organisationname)
      .get()
      .catch(err =>
        Promise.reject(
          new InvalidException({
            info: 'Request Error:' + err,
            code: 403,
          }),
        ),
      );

    if (userExist.size >= 1)
      return Promise.reject(
        new InvalidException({
          info: 'Email already belongs to an account',
          code: 400,
        }),
      );

    if (organisationExist.size >= 1)
      return Promise.reject(
        new InvalidException({
          info: 'Organisation already belongs to an account',
          code: 400,
        }),
      );

    const defaultImage = await this.getUserDefaultImage().catch(err =>
      Promise.reject(
        new InvalidException({
          info: 'Request Error:' + err,
        }),
      ),
    );
    const organisationDetails = {
      ...values.organisation,
      avatar: defaultImage,
    };
    Reflect.deleteProperty(values, 'organisation');
    Reflect.deleteProperty(values, 'organisationname');
    Reflect.deleteProperty(values, 'organisationlocation');
    const userDetails = {...values, avatar: await this.getUserDefaultImage()};
    delete userDetails.password;

    console.log('checking');
    // add user details to firebase databse
    const user = await this.connector
      .collection(auth.COLLECTIONS.USER)
      .add(userDetails)
      .catch(err =>
        Promise.reject(
          new InvalidException({
            info: 'Request Error',
            code: 403,
          }),
        ),
      );

    if (!user.id)
      return Promise.reject(
        new InvalidException({
          info: 'Request Error',
          code: 403,
        }),
      );

    console.log('Doonig');
    // create organisation
    const organisation = await this.connector
      .collection(auth.COLLECTIONS.ORGANISATION)
      .add({
        ownerID: user.id,
        ...organisationDetails,
      })
      .catch(err =>
        Promise.reject(
          new InvalidException({
            info: 'Request Error',
            code: 403,
          }),
        ),
      );

    if (!organisation.id)
      return Promise.reject(
        new InvalidException({
          info: 'Request Error',
          code: 403,
        }),
      );

    console.log('Not Done');
    // update user and add organisation id as owned
    await this.connector
      .collection(auth.COLLECTIONS.USER)
      .doc(user.id)
      .update({organisation: [organisation.id]});
    // create user on firebase authentication
    await this.auth
      .createUserWithEmailAndPassword(values.email, values.password)
      .catch(err =>
        Promise.reject(
          new InvalidException({
            info: 'Request Error ',
            code: 403,
          }),
        ),
      );
    const {currentUser} = this.auth;

    await currentUser.sendEmailVerification();

    console.log('doen');
    const userInfo = (await user.get()).data();
    return Promise.resolve({token: user.id, userDetails: userInfo});
  };
}

export default FirebaseAuthentication;
