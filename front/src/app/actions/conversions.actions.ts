import { Injectable } from '@angular/core';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import * as Redux from 'redux';
import { ConversionsService } from '../components/conversion/conversions.service';
import { IAppState } from '../store';

@Injectable()
export class ConversionsActions {
  static GET_CONVERSIONS: string = 'GET_CONVERSIONS';
  static UPDATE_CONVERSION: string = 'UPDATE_CONVERSION';

  constructor(private conversionsService: ConversionsService, private ngRedux: NgRedux<IAppState>) { }

  getConversions(): void {
    this.conversionsService.getConversions()
      .subscribe(
      conversions => this.ngRedux.dispatch({ type: ConversionsActions.GET_CONVERSIONS, conversions }),
      error => console.log(error)
    );
  }
}