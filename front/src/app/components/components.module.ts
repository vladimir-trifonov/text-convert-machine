import { NgModule } from '@angular/core';

import { Conversions } from './conversion/conversions.component';
import { CreateConversion } from './conversion/create-conversion.component';
import { routing } from './components.routing';

@NgModule({
  imports: [
    routing
  ],
	declarations: [
    Conversions,
		CreateConversion
  ],
  providers: []
})
export class ComponentsModule {
}
