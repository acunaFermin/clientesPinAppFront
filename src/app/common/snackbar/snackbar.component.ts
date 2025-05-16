import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  imports: [NgSwitchCase, NgSwitch, NgSwitchDefault],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss'
})
export class SnackbarComponent {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: SnackData) {

  }
}

export interface SnackData {
  message: string,
  type: 'error' | 'success'
}
