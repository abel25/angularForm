import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { PaisService } from 'src/app/services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  arrayPaises = [];

  usuario = {
    nombre: '',
    apellido: '',
    email: '',
    pais: ''
  };

  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
    this.paisService.getPaises().subscribe( paises => {
      this.arrayPaises = paises;
      // console.log(this.arrayPaises);
      this.arrayPaises.unshift({ nombre: 'Seleccione pais...', code: ''});
    });
  }

  guardar(formulario: NgForm){
    if (formulario.invalid) {
      Object.values(formulario.controls).forEach( control => {
        control.markAsTouched();
      });
      return;
    }
    console.log('submit lanzado', formulario.value);
  }
}
