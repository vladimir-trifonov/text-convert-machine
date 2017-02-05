import { Routes, RouterModule } from '@angular/router';

import { Conversions } from './conversion/conversions.component';
import { CreateConversion } from './conversion/create-conversion.component';

const routes: Routes = [
	{
		path: 'conversions',
		component: Conversions
	},
	{
		path: 'conversions/create',
		component: CreateConversion
	}
];

export const routing = RouterModule.forChild(routes);

