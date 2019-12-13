import { Component, OnInit, Inject } from '@angular/core';
import { HttpService } from '../services/http.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { QrService } from '../services/qr.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  constructor(private api: HttpService,   
    private auth: QrService,
    public dialogRef: MatDialogRef<DashboardComponent>,private alert: QrService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit() {
  }

  decider(locationId: any, locationName: any, type: string){
    if(type === 'Accept'){
      this.acceptLocation(locationId, locationName)
    }else if(type ==='Deny'){
      this.denyLocation(locationId, locationName)
    }else if(type ==='Postpone'){
      this.postponeLocation(locationId, locationName)
    }else{
      this.alert.FailedToast('Failed', 'Something Went Wrong!')
    }
  }

  async acceptLocation(locationId: any, locationName: any){
  await this.api.updateStatus(locationId, 'Approved').then(result => {
    this.auth.SuccessToast('Success!',`${locationName} is Now Approved!`)
    this.closeDialog('success')
  }).catch(err => {
    this.auth.FailedToast('Failed', 'Something Went Wrong!')
  })
  }
  async denyLocation(locationId: any, locationName: any){
    await this.api.updateStatus(locationId, 'Denied').then(result => {
      this.auth.SuccessToast('Success!',`${locationName} is Now Denied!`)
      this.closeDialog('success')

    }).catch(err => {
      this.auth.FailedToast('Failed', 'Something Went Wrong!')
    })
  }
  async postponeLocation(locationId: any, locationName: any){
    await this.api.updateStatus(locationId, 'Postpone').then(result => {
      this.auth.SuccessToast('Success!',`${locationName} is Now Postponed!`)
      this.closeDialog('success')
    }).catch(err => {
      this.auth.FailedToast('Failed', 'Something Went Wrong!')
    })
  }
  closeDialog(type: any){
    if(type === 'success'){
      this.dialogRef.close('success');
    }else{
      this.dialogRef.close('failed');
    }
  }
}
