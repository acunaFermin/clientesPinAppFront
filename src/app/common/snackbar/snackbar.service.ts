import { inject, Injectable } from '@angular/core';
import {
  MatSnackBar,
} from '@angular/material/snack-bar';
import { SnackbarComponent, SnackData } from './snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  private readonly _snackBar = inject(MatSnackBar);

  durationInSeconds = 5;


  openSnackBarCustom(data: SnackData) {  
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: this.durationInSeconds * 1000,
      data
    });
  }
}
