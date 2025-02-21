import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit {
  employeeName: string | null | undefined;
  date: string = '';
  time: string = '';
  currentDateTime: string = '';

  ngOnInit() {
    this.employeeName = sessionStorage.getItem('employeeName');
    this.updateDateTime();
    setInterval(() => this.updateDateTime(), 1000);
  }

  updateDateTime() {
    const now = new Date();
    this.date = now.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    this.time = now.toLocaleTimeString('en-CA', { hour12: false });
    this.currentDateTime = `Date: ${this.date} Time: ${this.time}`;
  }
}
