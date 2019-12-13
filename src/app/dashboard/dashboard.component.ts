import { AlertComponent } from './../alert/alert.component';
import { PackagesComponent } from './../packages/packages.component';
import { HttpService } from './../services/http.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { authInfo } from 'src/models/auth.model';
import { QrService } from '../services/qr.service';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AdminModel } from 'src/models/admin.model';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export interface staticModel {
  Name: string,
  Location: string,
  Phone: string,
  ZipCode: string,
  description: string
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class DashboardComponent implements OnInit {
  loginData: authInfo;
  AdminModel: any;
  data: any
  public unsub: Subject<any> = new Subject
  columnHeader = ['name', 'location', 'phone', 'zipcode', 'approved'];
  expanded: staticModel | null;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: any;
  constructor(public auth: QrService,
    private dialog: MatDialog,
    public FireFunctions: AngularFireFunctions,
    private router: Router, private api: HttpService) {

  }

  async ngOnInit() {
    this.getData()

  }
  makeAdmin(form: NgForm) {
    let adminEmail = form.value.email
    const addAdminRole = this.FireFunctions.httpsCallable('addAdminRole');
    addAdminRole({ email: adminEmail }).subscribe(res => {
      console.log(res)
    })
  }
  goToLink() {
    this.router.navigateByUrl('linkgenerator')
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getData() {
    this.api.getTableData().toPromise().then((result: AdminModel) => {
      this.AdminModel = result as AdminModel;
      this.dataSource = new MatTableDataSource(this.AdminModel);
      this.dataSource.sort = this.sort;
    })

  }

  async acceptLocation(locationId: any, locationName: any) {
    const dialogRef = this.dialog.open(AlertComponent, {
      width: '42vw',
      height: '40vh',
      data: { locationId: locationId, locationName: locationName, type: 'Accept' }
    })
    dialogRef.afterClosed().pipe(takeUntil(this.unsub)).subscribe(result => {
      if (result === 'success') {
        this.getData()
      }
    })  }

  async denyLocation(locationId: any, locationName: any) {
    const dialogRef = this.dialog.open(AlertComponent, {
      width: '42vw',
      height: '40vh',
      data: { locationId: locationId, locationName: locationName, type: 'Deny' }
    })
    dialogRef.afterClosed().pipe(takeUntil(this.unsub)).subscribe(result => {
      if (result === 'success') {
        this.getData()
      }
    })

  }

  async postponeLocation(locationId: any, locationName: any) {
    const dialogRef = this.dialog.open(AlertComponent, {
      width: '42vw',
      height: '40vh',
      data: { locationId: locationId, locationName: locationName, type: 'Postpone' }
    })
    dialogRef.afterClosed().pipe(takeUntil(this.unsub)).subscribe(result => {
      if (result === 'success') {
        this.getData()
      }
    })
  }

  openPackages(name, locationId): void {
    const dialogRef = this.dialog.open(PackagesComponent, {
      width: '95vw',
      data: { name: name, id: locationId },
      panelClass: 'dialog-packages'

    })
  }
}
