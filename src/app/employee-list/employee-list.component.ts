import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent implements OnInit {
  
  items: Employee[] = [];


  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.items = this.employeeService.getItems();

  }

  deleteItem(id: number): void {
    if (confirm("Are You Sure?") == true) {
      this.employeeService.deleteItem(id);
      this.items = this.employeeService.getItems();
    }
  }
}