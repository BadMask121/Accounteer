import {ErrorHandler} from 'helpers/error/errorHandler';
import FirebaseAuthentication from 'providers/Auth/Authentication';
import {auth} from 'helpers/constants';
import InvalidException from 'helpers/error/exceptions/InvalidException';
import * as _ from 'lodash';
import {CreateItemProps, CreateInvoiceProps} from 'helpers/Interfaces';

export default class extends FirebaseAuthentication {
  /// get all items by business id
  private getAllItemsByBusinessId = async (id: any) => {
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
        index++;
      });
    });

    return allItems;
  };
  // creating business items using business id
  private createBusinessItem = async ({
    id,
    name,
    price,
    tax,
  }: CreateItemProps) => {
    const checkIfItemExistsForBusiness = await this.connector
      .collection(auth.COLLECTIONS.ITEMS)
      .where('businessId', '==', id)
      .where('name', '==', name)
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
      name,
      price,
      tax,
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

  // creating invoice by business id
  private createInvoice = async (values: CreateInvoiceProps) => {
    switch (values.type) {
      case 'save':
        values.approved = false;
        break;
      case 'saveandapprove':
        values.approved = true;
        break;

      default:
        break;
    }
    delete values.type;
    const InvoiceData = {
      ...values,
      businessId: values.id,
    };
    const item = await this.connector
      .collection(auth.COLLECTIONS.INVOICE)
      .add(InvoiceData)
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
