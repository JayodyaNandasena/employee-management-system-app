import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {SidebarComponent} from "../sidebar/sidebar.component";
import html2canvas from "html2canvas";
import jsPDF from 'jspdf';
import {Salary} from "../../models";
import {AuthService, SalaryService} from "../../services";

@Component({
  selector: 'app-salary-slip',
  standalone: true,
  imports: [FormsModule, CommonModule, SidebarComponent],
  templateUrl: './salary-slip.component.html',
  styleUrl: './salary-slip.component.css'
})
export class SalarySlipComponent implements OnInit {
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
    private readonly authService: AuthService,
    private readonly salaryService: SalaryService,
    private readonly router: Router,
    private readonly toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.loadSalarySlip();
  }

  loadSalarySlip() {
    const userId: string | null = this.authService.getEmployeeId();

    if (!userId) {
      this.toastr.error('Error', 'Error retrieving user ID', {
        timeOut: 3000,
      });
      return;
    }

    this.salaryService.getSalary(userId).subscribe({
      next: (data) => {
        this.salary = data;
      },
      error: () => {
        this.toastr.error('Error', 'Error fetching salary', {
          timeOut: 3000,
        });
      }
    });
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
