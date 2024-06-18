export interface Customer{
    
    id?: number;
    taxIdNumber: number;
    firstname: string;
    lastname: string;
    email: string;
    phoneNumber: number;
    city: string;
    address: string;
    orderDate: string;
    deliveryDate: string;
    paymentInAdvance: number;
    totalAmount: number;
    balance: number;
    orderNumber?: string;
    userId?: string;
    
}

export interface customerModel{
    list: Customer[]
    errormessage: string
    editdata: Customer
    
}