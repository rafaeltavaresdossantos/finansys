import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field-error',
  templateUrl: './form-field-error.component.html',
  styleUrls: ['./form-field-error.component.scss']
})
export class FormFieldErrorComponent implements OnInit {

  @Input('form-control') formControl!: FormControl

  constructor() { }

  ngOnInit(): void {
  }

  get errorMessage(): string | null {
    if(this.mustShowErrorMessage()){
     return this.getErrorMessage();
    }
    return null
  }

  private mustShowErrorMessage(): boolean {
    return this.formControl.invalid && this.formControl.touched
  }
  private getErrorMessage(): string | null {
    if(this.formControl.errors!['required']){
      return 'Dado obrigatório.'
    }else if (this.formControl.errors!['minlength']){
      const requiredLength = this.formControl.errors!['minlength'].requiredLength;
      return `Deve conter no mínimo ${requiredLength} caracteres.`
    }
    return null
  }

}
