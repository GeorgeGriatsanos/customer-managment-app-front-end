import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MasterService } from '../../_service/master.service';
import {
  addCustomer,
  addCustomerSuccess,
  deleteCustomer,
  deleteCustomerSuccess,
  emptyAction,
  getCustomer,
  getCustomerSuccess,
  loadCustomer,
  loadCustomerFail,
  loadCustomerSuccess,
  showAlert,
  updateCustomer,
  updateCustomerSuccess,
} from './Customer.Actions';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class CustomerEffects {
  constructor(
    private action$: Actions,
    private service: MasterService,
    private _snackbar: MatSnackBar
  ) {}

  _loadCustomer = createEffect(() =>
    this.action$.pipe(
      ofType(loadCustomer),
      exhaustMap((action) => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          return of(
            loadCustomerFail({
              errormessage: 'User ID not found in local storage',
            })
          );
        }
        return this.service.getAllCustomer(userId).pipe(
          map((data) => loadCustomerSuccess({ list: data })),
          catchError((error) =>
            of(loadCustomerFail({ errormessage: error.message }))
          )
        );
      })
    )
  );
  _getCustomer = createEffect(() =>
    this.action$.pipe(
      ofType(getCustomer),
      exhaustMap((action) => {
        return this.service.getCustomerById(action.id).pipe(
          map((data) => {
            return getCustomerSuccess({ obj: data });
          }),
          catchError((_err) => of(emptyAction))
        );
      })
    )
  );

  _addCustomer = createEffect(() =>
    this.action$.pipe(
      ofType(addCustomer),
      switchMap((action) => {
        return this.service.createCustomer(action.inputdata).pipe(
          switchMap(() => {
            return of(
              addCustomerSuccess(),
              showAlert({ message: 'προστέθηκε επιτυχώς', resptype: 'pass' })
            );
          }),
          catchError((err) => {
            console.error('Error occurred during customer creation:', err);
            return of(
              showAlert({ message: 'Ανεπιτυχής προσθήκη', resptype: 'fail' })
            );
          })
        );
      })
    )
  );

  _updateCustomer = createEffect(() =>
    this.action$.pipe(
      ofType(updateCustomer),
      switchMap((action) => {
        return this.service.updateCustomer(action.inputdata).pipe(
          switchMap(() => {
            return of(
              updateCustomerSuccess(),
              showAlert({ message: 'Ενημερώθηκε επιτυχώς', resptype: 'pass' })
            );
          }),
          catchError((_err) =>
            of(showAlert({ message: 'Ανεπιτυχής ενημέρωση', resptype: 'fail' }))
          )
        );
      })
    )
  );

  _deleteCustomer = createEffect(() =>
    this.action$.pipe(
      ofType(deleteCustomer),
      switchMap((action) =>
        this.service.deleteCustomer(action.id).pipe(
          switchMap(() =>
            of(
              deleteCustomerSuccess({ id: action.id }),
              showAlert({ message: 'Διαγράφηκε επιτυχώς', resptype: 'pass' })
            )
          ),
          catchError((_err) =>
            of(showAlert({ message: 'Ανεπιτυχής διαγραφή', resptype: 'fail' }))
          )
        )
      )
    )
  );

  _showalert = createEffect(() =>
    this.action$.pipe(
      ofType(showAlert),
      exhaustMap((action) => {
        return this.showSnackBarAlert(action.message, action.resptype)
          .afterDismissed()
          .pipe(
            map(() => {
              return emptyAction();
            })
          );
      })
    )
  );

  showSnackBarAlert(message: string, resptype: string = 'fail') {
    let _class = resptype === 'pass' ? 'text-green' : 'text-red';
    return this._snackbar.open(message, 'OK', {
      verticalPosition: 'top',
      horizontalPosition: 'end',
      duration: 5000,
      panelClass: [_class],
    });
  }
}
