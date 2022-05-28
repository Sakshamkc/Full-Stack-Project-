import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {  ToastrService } from 'ngx-toastr';
import { CustomerDetail } from 'src/app/shared/customer-detail.model';
import { CustomerDetailService } from 'src/app/shared/customer-detail.service';

@Component({
  selector: 'app-customer-detail-form',
  templateUrl: './customer-detail-form.component.html',
  styles: [
  ]
})
export class CustomerDetailFormComponent implements OnInit {

  constructor(public service: CustomerDetailService,private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  onsubmit(form:NgForm)
  {
    if(this.service.formData.customerId==0)
    
      this.insertRecord(form);
    
    else
      this.updateRecord(form);
    
  }
  insertRecord(form: NgForm)
  {
    this.service.postCustomers().subscribe(
      res=> {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.success("Submitted Successfully",'Customer Detail Register');
      },
      err => {console.log(err);}
    );
  }
  updateRecord(form: NgForm)
  {
    this.service.putCustomer().subscribe(
      res=> {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.info("Updated Successfully",'Customer Detail Register');
      },
      err => {console.log(err);}
    );
  }
  resetForm(form:NgForm)
  {
    form.form.reset();
    this.service.formData = new CustomerDetail();
  }
}
