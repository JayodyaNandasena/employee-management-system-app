import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {SidebarComponent} from "../sidebar/sidebar.component";
import {Message} from "../../models";
import {AuthService, MessageService} from "../../services";

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent implements OnInit {
  protected messages: Message[] = [];

  constructor(
    private readonly authService: AuthService,
    private readonly messageService: MessageService,
    private readonly toastr: ToastrService,
    private readonly router: Router) {
  }

  ngOnInit(): void {
    this.getMessageList();
  }

  getMessageList() {
    const userId = this.authService.getEmployeeId();

    if (!userId) {
      this.toastr.error('Error retrieving user ID', 'Error', {
        timeOut: 3000,
      });
      return;
    }

    this.messageService.getMessageList(userId).subscribe({
      next: (data) => {
        if (data.length === 0) {
          this.toastr.success('No messages', 'Success', {
            timeOut: 3000,
          });
          return;
        }
        this.messages = data;
      },
      error: (error) => {
        this.toastr.error('System error', 'Error', {
          timeOut: 3000,
        });
      }
    });
  }
}
