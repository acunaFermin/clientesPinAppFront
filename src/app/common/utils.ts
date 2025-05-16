import { AbstractControl, ValidationErrors } from "@angular/forms";
import moment from "moment";

export const regex = {
    nombreApellido   : '^[a-zA-ZñÑ ]+$',
    isNumber         : '^[0-9]+$',
}


export function fechaNoFuturaValidator(control: AbstractControl): ValidationErrors | null {
    const fecha = control.value;
    if (fecha && moment(fecha).isAfter(moment())) {
      return { fechaFutura: true };
    }
    return null;
}