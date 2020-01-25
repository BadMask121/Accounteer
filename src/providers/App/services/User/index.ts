import {ErrorHandler} from 'helpers/error/errorHandler';
import FirebaseAuthentication from 'providers/Auth/Authentication';
import {auth} from 'helpers/constants';
import InvalidException from 'helpers/error/exceptions/InvalidException';
import AsyncStorage from '@react-native-community/async-storage';
import {createItemProps} from 'helpers/Interfaces';

export default class extends FirebaseAuthentication {
  /// get all items by business id
  getAllItemsByBusinessId = async (id: any) => {
    const allItems: Array<any> = [];
    let index = 0;

    const checkIfItemExistsForBusiness = await this.connector
      .collection(auth.COLLECTIONS.ITEMS)
      .where('businessId', '==', id)
      .get();

    if (checkIfItemExistsForBusiness.size <= 0)
      return new InvalidException({
        info: 'Item does not exists for this business id',
        code: 408,
      });
    await new Promise((resolve, reject) => {
      checkIfItemExistsForBusiness.forEach(doc => {
        allItems.push(doc.data());
        if (index === checkIfItemExistsForBusiness.size - 1)
          return resolve(allItems);
      });
    });

    return allItems;
  };
  //get user token
  getCurrentUserToken = () => AsyncStorage.getItem(auth.AUTH_TOKEN);
  getCurrentUserDetails = () => {
    return AsyncStorage.getItem(auth.USER_DETAILS_TOKEN);
  };

  // query for user details data using the user id
  getUserDetailsById = async (id: string | any) => {
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
  getOrganisationsByUserId = async (id: string) => {
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
      });
    });
    return allOrg;
  };

  // creating business items using business id
  createBusinessItem = async ({id, itemname, itemprice}: createItemProps) => {
    const checkIfItemExistsForBusiness = await this.connector
      .collection(auth.COLLECTIONS.ITEMS)
      .where('businessId', '==', id)
      .where('name', '==', itemname)
      .get();

    if (checkIfItemExistsForBusiness.size >= 1)
      return Promise.reject(
        new InvalidException({
          info: 'Item already exists for this business id',
          code: 408,
        }),
      );

    const ItemData = {
      businessId: id,
      name: itemname,
      price: itemprice,
    };
    const item = await this.connector
      .collection(auth.COLLECTIONS.ITEMS)
      .add(ItemData)
      .catch(err =>
        Promise.reject(
          new ErrorHandler({
            info: 'Request Error',
            code: 409,
          }),
        ),
      );

    return Promise.resolve({
      token: item.id,
    });
  };
}
