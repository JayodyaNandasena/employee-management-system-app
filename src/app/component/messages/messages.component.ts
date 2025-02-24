import {Component, OnInit} from '@angular/core';
import {SessionStorageService} from '../../services/session-storage.service';
import {CommonModule} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {SidebarComponent} from "../sidebar/sidebar.component";

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent implements OnInit {
  public isManager: boolean = false;
  public messages = null;

  constructor(
    private sessionService: SessionStorageService,
    private toastr: ToastrService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.isManager = this.sessionService.getIsManager();
    this.getMessageList();
  }

  getMessageList() {
    fetch("http://localhost:8081/messages?employeeId=" + this.sessionService.getEmployeeId(), {
      method: 'GET',
      headers: {"Content-type": "application/json"}
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          this.messages = data;
        } else {
          this.toastr.error(data.message, 'Data Loading Failed', {
            timeOut: 3000,
          });
        }
      })
  }

}
