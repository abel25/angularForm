import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ValidadoresService } from 'src/app/services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  formulario: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private validador: ValidadoresService) {
    this.crearFormulario();
    this.crearListeners();
  }

  ngOnInit(): void {
  }

  getValidationNombre(): boolean{
    return this.formulario.get('nombre').invalid && this.formulario.get('nombre').touched;
  }

  getValidationApellido(): boolean{
    return this.formulario.get('apellido').invalid && this.formulario.get('apellido').touched;
  }

  getValidationEmail(): boolean{
    return this.formulario.get('email').invalid && this.formulario.get('email').touched;
  }

  getValidationDistrito(): boolean{
    return this.formulario.get('direccion.distrito').invalid && this.formulario.get('direccion.distrito').touched;
  }

  getValidationCiudad(): boolean{
    return this.formulario.get('direccion.ciudad').invalid && this.formulario.get('direccion.ciudad').touched;
  }

  getPasatiempos(){
    return this.formulario.get('pasatiempos') as FormArray;
  }

  getPass1(){
    return this.formulario.get('pass1').invalid && this.formulario.get('pass1').touched;
  }

  getPass2(){
    const pass1 = this.formulario.get('pass1').value;
    const pass2 = this.formulario.get('pass2').value;
    return (pass1 === pass2) ? false : true;
  }

  agregarPasatiempos(){
    const arrayPasatiempos = this.formulario.get('pasatiempos') as FormArray;
    arrayPasatiempos.push(this.formBuilder.control('', [Validators.required, Validators.minLength(2)]));
  }

  borrarPasatiempos(index: number){
    const arrayPasatiempos = this.formulario.get('pasatiempos') as FormArray;
    arrayPasatiempos.removeAt(index);
  }

  crearFormulario(){
    this.formulario = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(4)]],
      apellido: ['', [Validators.required, Validators.minLength(4), this.validador.noOrtiz]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      pass1: ['', [Validators.required]],
      pass2: ['', [Validators.required]],
      direccion: this.formBuilder.group({
        distrito: ['', [Validators.required, Validators.minLength(4)]],
        ciudad: ['', [Validators.required, Validators.minLength(4)]],
      }),
      pasatiempos: this.formBuilder.array([
      ])
    }, {
      validators: this.validador.passwordsIguales('pass1', 'pass2')
    });
  }

  crearListeners(){
    this.formulario.valueChanges.subscribe( valor => {
      console.log(valor);
    });
  }

    guardar(){
      if (this.formulario.invalid) {
        Object.values(this.formulario.controls).forEach( control => {
          if (control instanceof FormGroup) {
            Object.values(control.controls).forEach( control2 => {
              control2.markAsTouched();
          });
        }else{
          control.markAsTouched();
        }
        });
        return;
      }
      console.log('submit lanzado', this.formulario.value);
    }
}
