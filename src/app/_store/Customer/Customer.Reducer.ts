import { createReducer, on } from '@ngrx/store';
import { customerState } from './Customer.State';
import {
  deleteCustomerSuccess,
  getCustomerSuccess,
  loadCustomerFail,
  loadCustomerSuccess,
} from './Customer.Actions';
import { state } from '@angular/animations';

const _CustomerReducer = createReducer(
  customerState,
  on(loadCustomerSuccess, (state, action) => {
    return {
      ...state,
      list: action.list,
      errormessage: '',
      editdata: {
        id: 0,
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
        orderNumber: '',
        balance: 0,
      },
    };
  }),

  on(getCustomerSuccess, (state, action) => {
    return {
      ...state,
      errormessage: '',
      editdata: action.obj,
    };
  }),

  on(loadCustomerFail, (state, action) => {
    return {
      ...state,
      list: [],
      errormessage: action.errormessage,
    };
  }),

  on(deleteCustomerSuccess, (state, action) => {
    const _newdata = state.list.filter((customer) => customer.id !== action.id);
    return {
      ...state,
      list: _newdata,
      errorMessage: '',
    };
  })
);

export function CustomerReducer(state: any, action: any) {
  return _CustomerReducer(state, action);
}
