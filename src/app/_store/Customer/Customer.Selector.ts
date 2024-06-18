import { createFeatureSelector, createSelector } from '@ngrx/store';
import { customerModel } from '../../../_model/customer';

const getcustomerstate = createFeatureSelector<customerModel>('customer');

export const getCutomerList = createSelector(getcustomerstate, (state) => {
  return state.list;
});

export const getEditdata = createSelector(getcustomerstate, (state) => {
  return state.editdata;
});
