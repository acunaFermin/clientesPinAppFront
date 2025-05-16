import { inject, Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { SnackbarComponent, SnackData } from './snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  private readonly _snackBar = inject(MatSnackBar);

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  durationInSeconds = 5;

  openSnackBar() {
    this._snackBar.open('Cannonball!!', 'Splash', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  openSnackBarCustom(data: SnackData) {  
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: this.durationInSeconds * 1000,
      data
    });
  }
}
