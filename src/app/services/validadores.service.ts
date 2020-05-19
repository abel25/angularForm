import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }

  noOrtiz(control: FormControl): {[s: string]: boolean} {
    if (control.value.toLowerCase() === 'ortiz'){
      return {
        noOrtiz: true
      };
    }
    return null;
  }

  passwordsIguales(pass1Name: string, pass2Name: string){
    return (formGroup: FormGroup) => {
      const pass1 = formGroup.controls[pass1Name];
      const pass2 = formGroup.controls[pass2Name];

      if (pass1.value === pass2.value) {
        pass2.setErrors(null);
      } else {
        pass2.setErrors({noEsIgual: true});
      }
    };
  }
}
