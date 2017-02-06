import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		redirectTo: '/conversions',
		pathMatch: 'full'
	},
	{ path: '**', redirectTo: '/conversions' }
];

export const routing = RouterModule.forRoot(routes, { useHash: false });
