import { Injectable } from '@angular/core';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employeesKey = 'employees';
  private idCounterKey = 'idCounter';
  private employees: Employee[] = [];
  private idCounter = 1;

  constructor() {
    this.loadEmployees();
  }


  private loadEmployees(): void {
    const storedEmployees = localStorage.getItem(this.employeesKey);
    if (storedEmployees) {
      this.employees = JSON.parse(storedEmployees);
    }
    const storedIdCounter = localStorage.getItem(this.idCounterKey);
    if (storedIdCounter) {
      this.idCounter = JSON.parse(storedIdCounter);
    }
  }

  private saveEmployees(): void {
    localStorage.setItem(this.employeesKey, JSON.stringify(this.employees));
    localStorage.setItem(this.idCounterKey, JSON.stringify(this.idCounter));
  }

  getItems(): Employee[] {
    return this.employees;
  }

  getItem(id: number): Employee | undefined {
    return this.employees.find(item => item.id === id);
  }

  addItem(employee: Employee): void {
    employee.id = this.idCounter++;
    this.employees.push(employee);
    this.saveEmployees();
  }

  updateItem(updatedEmployee: Employee): void {
    const index = this.employees.findIndex(item => item.id === updatedEmployee.id);
    if (index !== -1) {
      this.employees[index] = updatedEmployee;
    }
  }

  deleteItem(id: number): void {
    this.employees = this.employees.filter(employee => employee.id !== id);
    this.saveEmployees();
  }
}
