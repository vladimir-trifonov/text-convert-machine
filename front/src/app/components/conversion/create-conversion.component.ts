import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreateConversionActions } from '../../actions/create-conversion.actions';

@Component({
  selector: 'create-conversion',
  templateUrl: './create-conversion.component.html',
  styleUrls: ['./create-conversion.component.css']
})
export class CreateConversion {
  createConversionForm: FormGroup;
  editor: String;

  constructor(public fb: FormBuilder, private actions: CreateConversionActions) {
    this.createConversionForm = this.fb.group({
      name: ["", Validators.required],
      convertTo: ["", Validators.required]
    });
  }
  
  createConversion() {
    this.actions.createConversion(Object.assign({}, {
			name: this.createConversionForm.value.name,
      text: this.editor,
			convertTo: this.createConversionForm.value.convertTo || 'html'
    }));
  }
}
