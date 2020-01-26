import {ErrorHandler} from 'helpers/error/errorHandler';
import FirebaseAuthentication from 'providers/Auth/Authentication';
import {auth} from 'helpers/constants';
import InvalidException from 'helpers/error/exceptions/InvalidException';
import * as _ from 'lodash';
import {CreateItemProps, CreateInvoiceProps} from 'helpers/Interfaces';
import {deepTrim} from 'helpers';

export default class extends FirebaseAuthentication {
  //TODO fix pagination issues
  public getInvoiceByBusinessId = async (id: any, offset, limit) => {
    const allInvoice: Array<any> = [];
    let index = 0;

    try {
      const checkIfItemExistsForBusiness = this.connector
        .collection(auth.COLLECTIONS.INVOICE)
        .where('businessId', '==', id);

      if ((await checkIfItemExistsForBusiness.get()).size <= 0)
        return new InvalidException({
          info: 'Item does not exists for this business id',
          code: 408,
        });

      const limitQuery = checkIfItemExistsForBusiness.limit(limit);
      const paginate = limitQuery.get().then(async snap => {
        let last = snap.docs[snap.docs.length - 1];

        let next = await this.connector
          .collection(auth.COLLECTIONS.INVOICE)
          .orderBy('client')
          .startAt(last.data().client)
          .limit(limit + 1)
          .get();

        await new Promise((resolve, reject) => {
          next.docs.forEach(doc => {
            allInvoice.push(doc.data());
            if (index === next.docs.length - 1) return resolve(allInvoice);
            index++;
          });
        });
        return Promise.resolve(allInvoice);
      });
      return Promise.resolve(paginate);
    } catch (error) {
      throw error;
    }
  };
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
      createdAt: new Date(),
      updatedAt: new Date(),
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
    deepTrim(values);
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

    values.invoiceStatus = 'Pending';

    if (values.totalExTax - values.amountPaid <= 0)
      values.invoiceStatus = 'Paid';

    const InvoiceData = {
      ...values,
      businessId: values.id,
      createdAt: new Date(),
      updatedAt: new Date(),
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

    await item.update({id: item.id});

    return Promise.resolve({
      token: item.id,
    });
  };
}
