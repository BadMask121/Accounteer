import {ErrorHandler} from 'helpers/error/errorHandler';
import FirebaseAuthentication from 'providers/Auth/Authentication';
import {auth} from 'helpers/constants';
import InvalidException from 'helpers/error/exceptions/InvalidException';
import AsyncStorage from '@react-native-community/async-storage';
import {createItemProps} from 'helpers/Interfaces';

export default class extends FirebaseAuthentication {
  //get user token
  getCurrentUserToken = () => AsyncStorage.getItem(auth.AUTH_TOKEN);
  getCurrentUserDetails = () => {
    return AsyncStorage.getItem(auth.USER_DETAILS_TOKEN);
  };

  // query for user details data using the user id
  private getUserDetailsById = async (id: string | any) => {
    const userDetails = [];

    const userDetailsSnapshot = await this.connector
      .collection(auth.COLLECTIONS.USER)
      .doc(id)
      .get();

    if (!userDetailsSnapshot.exists)
      return new InvalidException({
        info: 'No User Found',
        code: 404,
      });

    return userDetails.push(userDetailsSnapshot.data());
  };

  // query for user organisation data using the user id
  private getOrganisationsByUserId = async (id: string) => {
    const organisations = await this.connector
      .collection(auth.COLLECTIONS.ORGANISATION)
      .where('ownerID', '==', id)
      .get();

    if (organisations.size <= 0)
      return new InvalidException({
        info: 'No Organisation Found',
        code: 404,
      });

    let index = 0;
    const allOrg: any = [];

    await new Promise((resolve, reject) => {
      organisations.forEach(doc => {
        allOrg.push(doc.data());
        if (index === organisations.size - 1) return resolve(allOrg);
        index++;
      });
    });
    return allOrg;
  };
}
