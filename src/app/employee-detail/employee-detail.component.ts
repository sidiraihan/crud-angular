import { Component, NgModule } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.scss'
})

export class EmployeeDetailComponent {
  employee: Employee = { 
    'id': 0,
    'username':'', 
    'firstName':'', 
    'lastName':'', 
    'email':'',
    'birthDate':'', 
    'basicSalary':0,
    'status':'',
    'group':'',
    'description':'',
   };

  constructor(private route: ActivatedRoute, private router: Router, private employeeService: EmployeeService, private authService: AuthService) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      const existingItem = this.employeeService.getItem(id) as any;
      if (existingItem) {
        this.employee = existingItem;
      }
    }

  }
}
