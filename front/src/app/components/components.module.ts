import { NgModule } from '@angular/core';
import { CommonModule }  from '@angular/common';

import { Conversions } from './conversion/conversions.component';
import { CreateConversion } from './conversion/create-conversion.component';
import { routing } from './components.routing';
import { ConversionsActions } from '../actions/conversions.actions';
import { ConversionsService } from './conversion/conversions.service';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
	declarations: [
    Conversions,
		CreateConversion
  ],
  providers: [ConversionsActions, ConversionsService]
})
export class ComponentsModule {
}
