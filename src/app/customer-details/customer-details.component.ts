import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomerDetail } from '../shared/customer-detail.model';
import { CustomerDetailService } from '../shared/customer-detail.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styles: [
  ]
})
export class CustomerDetailsComponent implements OnInit {

  constructor(public service: CustomerDetailService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }
  populateForm(selectedRecord: CustomerDetail)
  {
    this.service.formData = Object.assign({}, selectedRecord);
  }
  onDelete(id:number)
  {
    if(confirm('Are you sure want to delete the records?'))
    {
      this.service.deleteCustomer(id)
      .subscribe(
        res=> {
          this.service.refreshList();
          this.toastr.error("Deleted Successfully",'Customer Detail Register');
      },
      err=> {console.log(err);}
      )
    }
  }
}
