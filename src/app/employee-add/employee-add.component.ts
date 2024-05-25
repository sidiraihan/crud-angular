import { Component ,OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import { CommonModule, AsyncPipe } from '@angular/common';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import {MatAutocompleteModule} from '@angular/material/autocomplete';


@Component({
  selector: 'app-employee-add',
  standalone: true,
  imports: [AsyncPipe, CommonModule, MatAutocompleteModule, ReactiveFormsModule],
  templateUrl: './employee-add.component.html',
  styleUrl: './employee-add.component.scss'
})
export class EmployeeAddComponent implements OnInit{
  control = new FormControl('');
  maxDate: Date;
  errorMessage: string = '';
  private employees: Employee[] = [];
  streets: string[] = ['jakarta', 'bogor', 'depok', 'tangerang', 'bekasi', 'tokyo', 'manila', 'bangkok', 'colombo', 'milan'];
  filteredStreets: Observable<string[]> | undefined;
  selectedGroup: string = '';

  employeeForm: FormGroup;

  constructor(
    private employeeService: EmployeeService,
    private fb: FormBuilder
  ) {
    this.employeeForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      birthDate: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      basicSalary: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      group: ['', [Validators.required]],
    });
    this.maxDate = new Date();
    this.filteredStreets;

  }


  ngOnInit() {
    this.filteredStreets = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value as any || '')),
    );
  }
  
  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    this.employeeForm.patchValue({
      group:filterValue,
    });
    return this.streets.filter(street => this._normalizeValue(street).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  add(): void {

    console.info(this.employeeForm.value)

    if (this.employeeForm.valid) {
      console.info(this.employeeForm.value);
      this.employeeService.addItem(this.employeeForm.value);
      this.employeeForm.reset();
    }

  }
}
