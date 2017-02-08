import { NgModule } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Conversions } from './conversion/conversions.component';
import { CreateConversion } from './conversion/create-conversion.component';
import { routing } from './components.routing';
import { ConversionsActions } from '../actions/conversions.actions';
import { ConversionsService } from './conversion/conversions.service';

import { NgReduxModule } from '@angular-redux/store';
import { NgReduxFormModule } from '@angular-redux/form';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
    NgReduxFormModule,
    NgReduxModule
  ],
	declarations: [
    Conversions,
		CreateConversion
  ],
  providers: [ConversionsActions, ConversionsService]
})
export class ComponentsModule {
}
