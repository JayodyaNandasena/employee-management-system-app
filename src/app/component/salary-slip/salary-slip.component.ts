import {Component, OnInit} from '@angular/core';
import {SessionStorageService} from '../../services/session-storage.service';
import {ToastrService} from 'ngx-toastr';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Salary} from '../../models/models';
import {Router} from '@angular/router';
import {SidebarComponent} from "../sidebar/sidebar.component";
import html2canvas from "html2canvas";
import jsPDF from 'jspdf';

@Component({
  selector: 'app-salary-slip',
  standalone: true,
  imports: [FormsModule, CommonModule, SidebarComponent],
  templateUrl: './salary-slip.component.html',
  styleUrl: './salary-slip.component.css'
})
export class SalarySlipComponent implements OnInit {
  public isManager: boolean = false;
  public salary: Salary = {
    basicSalary: 0,
    epfPercentage: 0,
    epfAmount: 0,
    etfPercentage: 0,
    etfAmount: 0,
    otHours: 0,
    otPerHour: 0,
    grossOTIncome: 0,
    grossEarnings: 0,
    grossDeductions: 0,
    grossSalary: 0
  };

  constructor(
    private sessionService: SessionStorageService,
    private router: Router,
    private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.isManager = this.sessionService.getIsManager();
    this.loadSalarySlip();
  }

  loadSalarySlip() {
    fetch("http://localhost:8081/salary?employeeId=" + this.sessionService.getEmployeeId(), {
      method: 'POST',
      headers: {"Content-type": "application/json"}
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          console.log(data);

          this.salary = {
            basicSalary: data.basicSalary,
            epfPercentage: data.epfPercentage,
            epfAmount: data.epfAmount,
            etfPercentage: data.etfPercentage,
            etfAmount: data.etfAmount,
            otHours: data.otHours,
            otPerHour: data.otPerHour,
            grossOTIncome: data.grossOTIncome,
            grossEarnings: data.grossEarnings,
            grossDeductions: data.grossDeductions,
            grossSalary: data.grossSalary
          };
        } else {
          this.toastr.error(data.message, 'Data Loading Failed', {
            timeOut: 3000,
          });
        }
      })
  }

  downloadPDF() {
    const element = document.getElementById('salary-slip');
    if (!element) {
      console.error('Element not found:', 'salary-slip');
      return;
    }

    let excludedElement: HTMLElement | null = document.getElementById('download-icon');

    if (excludedElement) {
      excludedElement.style.display = 'none'; // Hide the element
    }

    html2canvas(element, {scale: 2}).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let yPosition = 25;
      pdf.text(`Employee ID: E001`, 15, yPosition);
      yPosition += 5;
      pdf.text(`Month: February`, 15, yPosition);
      yPosition += 5;

      pdf.addImage(imgData, 'PNG', 10, yPosition + 5, imgWidth, imgHeight);
      pdf.save(`salary.pdf`);

      if (excludedElement) {
        excludedElement.style.display = ''; // Restore the element
      }
    });
  }
}
