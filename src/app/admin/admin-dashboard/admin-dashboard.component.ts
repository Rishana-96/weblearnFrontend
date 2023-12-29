import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Course, Dashboard, Users } from 'src/app/interfaces/interfaces';
import { AdminService } from 'src/app/service/admin.service';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {

  data: any;

  options: any;
  private _subscription: Subscription = new Subscription()
  dashboardData!: Dashboard

  constructor(private _adminService: AdminService) { }

  graphdata(data: any) {
    debugger
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    const colors = [
      documentStyle.getPropertyValue('--blue-500'),
      documentStyle.getPropertyValue('--yellow-500'),
      documentStyle.getPropertyValue('--green-500'),
      documentStyle.getPropertyValue('--red-500'),
      documentStyle.getPropertyValue('--purple-500')
    ];

    this.data = {
      labels: data.map((item: { _id: any }) => item._id),
      datasets: [
        {
          data: data.map((item: { totalCourses: number }) => item.totalCourses),
          backgroundColor: colors,
          hoverBackgroundColor: colors.map(color => `${color}80`)
        }
      ]
    };

    this.options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor
          }
        }
      }
    };
  }

  ngOnInit(): void {
    this.dashboard()
  }

  dashboard() {
    this._subscription.add(
      this._adminService.getDashboard().subscribe({
        next: (response) => {
          console.log(response);
          this.dashboardData = response as Dashboard
          this.graphdata(this.dashboardData.aggregatedData)
        },
        error: (error) => { },
        complete: () => { }
      })
    )
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe()
  }
}
