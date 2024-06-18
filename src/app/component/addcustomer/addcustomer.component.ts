import { Component, NgModule, OnInit } from '@angular/core';
import { MaterialModule } from '../../../_module/Material.Module';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Customer } from '../../../_model/customer';
import { Store } from '@ngrx/store';
import {
  addCustomer,
  getCustomer,
  updateCustomer,
} from '../../_store/Customer/Customer.Actions';
import { getEditdata } from '../../_store/Customer/Customer.Selector';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-addcustomer',
  standalone: true,
  imports: [MaterialModule, RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './addcustomer.component.html',
  styleUrl: './addcustomer.component.css',
})
export class AddcustomerComponent implements OnInit {
  editId = 0;
  pageTitle = 'Προσθήκη Πέλατη';
  isCreation = false;
  constructor(
    private builder: FormBuilder,
    private store: Store,
    private actroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idParam: string | null = this.actroute.snapshot.paramMap.get('id');
    if (idParam !== null) {
      this.editId = parseInt(idParam);
    }
    if (this.editId && !this.isCreation) {
      this.pageTitle = 'Επεξεργασία Στοιχείων Πελάτη';
      this.store.dispatch(getCustomer({ id: this.editId }));
      this.store.select(getEditdata).subscribe((item) => {
        this.myForm.setValue({
          taxIdNumber:
            item.taxIdNumber != null ? item.taxIdNumber.toString() : null,
          firstname: item.firstname != null ? item.firstname : null,
          lastname: item.lastname != null ? item.lastname : null,
          email: item.email != null ? item.email : null,
          phoneNumber:
            item.phoneNumber != null ? item.phoneNumber.toString() : null,
          city: item.city != null ? item.city : null,
          address: item.address != null ? item.address : null,
          orderDate: item.orderDate != null ? item.orderDate : null,
          deliveryDate: item.deliveryDate != null ? item.deliveryDate : null,
          paymentInAdvance:
            item.paymentInAdvance != null
              ? item.paymentInAdvance.toString()
              : null,
          totalAmount:
            item.totalAmount != null ? item.totalAmount.toString() : null,
          balance: item.balance != null ? item.balance.toString() : null,
        });
      });
    }
  }

  myForm = this.builder.group({
    taxIdNumber: ['', [Validators.maxLength(10), this.numberOnlyValidator()]],
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', [Validators.email]],
    phoneNumber: ['', [this.numberOnlyValidator()]],
    city: [''],
    address: [''],
    orderDate: ['', [this.formatDateValidator()]],
    deliveryDate: ['', [this.formatDateValidator()]],
    paymentInAdvance: [''],
    totalAmount: [''],
    balance: [''],
  });

  saveCustomer() {
    if (this.myForm.valid) {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error('User ID not found in local storage');
        return;
      }

      const _obj: Omit<Customer, 'id' | 'orderNumber'> = {
        taxIdNumber: Number(this.myForm.value.taxIdNumber),
        firstname: this.myForm.value.firstname as string,
        lastname: this.myForm.value.lastname as string,
        email: this.myForm.value.email as string,
        phoneNumber: Number(this.myForm.value.phoneNumber),
        city: this.myForm.value.city as string,
        address: this.myForm.value.address as string,
        orderDate: this.myForm.value.orderDate as string,
        deliveryDate: this.myForm.value.deliveryDate as string,
        paymentInAdvance: Number(this.myForm.value.paymentInAdvance),
        totalAmount: Number(this.myForm.value.totalAmount),
        balance: Number(this.myForm.value.balance),
        userId: userId,
      };

      if (this.editId) {
        const customerPayload: Customer = {
          ..._obj,
          id: this.editId,
          userId: userId,
          orderNumber: '',
        };

        this.store.dispatch(updateCustomer({ inputdata: customerPayload }));
      } else {
        this.store.dispatch(addCustomer({ inputdata: _obj }));
      }
    }
  }

  numberOnlyValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden = isNaN(Number(control.value));
      return forbidden ? { numberOnly: { value: control.value } } : null;
    };
  }

  formatDateValidator(): ValidatorFn {
    const dateRegex = /^\d{2}-\d{2}-\d{4}$/;

    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null; // If the value is empty, don't validate it
      }
      const forbidden = !dateRegex.test(control.value);
      return forbidden ? { invalidFormat: { value: control.value } } : null;
    };
  }
  
}
