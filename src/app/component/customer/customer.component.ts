import { Component, OnInit, ViewChild } from '@angular/core';
import { MasterService } from '../../_service/master.service';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from '../../../_model/customer';
import { Store } from '@ngrx/store';
import { deleteCustomer, loadCustomer } from '../../_store/Customer/Customer.Actions';
import { getCutomerList } from '../../_store/Customer/Customer.Selector';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MaterialModule } from '../../../_module/Material.Module';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-customer',
  standalone: true,
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  imports: [MaterialModule, NgIf, CommonModule]
})
export class CustomerComponent implements OnInit {
  constructor(private store:Store, private router:Router) { }

  customerData!: Customer[];
  datasource!: MatTableDataSource<Customer>;
  displayColumns = ['id', 'taxIdNumber', 'firstname', 'lastname', 'email', 'phoneNumber', 'city', 'address', 'orderDate', 'deliveryDate', 'paymentInAdvance', 'totalAmount', 'balance', 'orderNumber', 'action'];
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

  columnNames: { [key: string]: string } = {
    id: 'Αριθμός',
    taxIdNumber: 'ΑΦΜ',
    firstname: 'Όνομα',
    lastname: 'Επώνυμο',
    email: 'Ηλεκτρονική Διεύθυνση',
    phoneNumber: 'Τηλέφωνο',
    city: 'Πόλη',
    address: 'Διεύθυνση',
    orderDate: 'Ημερομηνία Παραγγελίας',
    deliveryDate: 'Ημερομηνία Παράδοσης',
    paymentInAdvance: 'Προκαταβολή',
    totalAmount: 'Συνολικό Ποσό',
    balance: 'Υπόλοιπο',
    orderNumber: 'Αριθμός Παραγγελίας'
  };

  ngOnInit(): void {
    this.loadInitialData();
  }

  loadInitialData() {
    this.store.dispatch(loadCustomer())
    this.store.select(getCutomerList).subscribe(item => {
      
      this.customerData = item;
      this.datasource = new MatTableDataSource(this.customerData);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    });
  }

  deleteCustomer(id: number) {
    if (confirm("Θέλετε να γίνει διαγραφή;")) {
      this.store.dispatch(deleteCustomer({ id: id }));
    }
  }

  editCustomer(id: number) {
    this.router.navigateByUrl('/customer/edit/'+id);
  }
}
