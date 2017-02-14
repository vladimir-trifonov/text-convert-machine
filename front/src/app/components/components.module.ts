import { NgModule } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { Conversions } from './conversion/conversions.component';
import { CreateConversion } from './conversion/create-conversion.component';
import { routing } from './components.routing';
import { ConversionsActions } from '../actions/conversions.actions';
import { ConversionsService } from './conversion/conversions.service';

import { NgReduxModule } from '@angular-redux/store';
import { QuillModule } from 'ngx-quill';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    NgReduxModule,
    QuillModule
  ],
	declarations: [
    Conversions,
		CreateConversion
  ],
  providers: [ConversionsActions, ConversionsService]
})
export class ComponentsModule {}
