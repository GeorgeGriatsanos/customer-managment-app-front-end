import { customerModel } from '../../../_model/customer';

export const customerState: customerModel = {
  list: [],
  errormessage: '',
  editdata: {
    taxIdNumber: 0,
    firstname: '',
    lastname: '',
    email: '',
    phoneNumber: 0,
    city: '',
    address: '',
    orderDate: '',
    deliveryDate: '',
    paymentInAdvance: 0,
    totalAmount: 0,
    balance: 0,
  },
};
