import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ComponentsModule } from './components';
import { routing } from './app.routing';

import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { rootReducer } from './reducers';
import { RootState, IAppState } from './store'
import { environment } from '../environments/environment';

import * as io from 'socket.io-client';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    ComponentsModule,
    NgReduxModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>, private devTools: DevToolsExtension) {
    let enhancers = [];
    if (!environment.production) {
      enhancers = [devTools.enhancer()];
    }

    ngRedux.configureStore(
      rootReducer,
      RootState,
      [],
      enhancers);
    
    // TODO: config
    var socket = io('https://localhost:3000');
    socket.on('event', function (data: any) {
      console.log(data);
    }.bind(this));
  }
}
