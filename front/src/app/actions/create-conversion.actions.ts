import { Injectable } from '@angular/core';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import * as Redux from 'redux';
import { ConversionsService } from '../components/conversion/conversions.service';
import { IAppState } from '../store';

@Injectable()
export class CreateConversionActions {
  static CREATE_CONVERSION: string = 'CREATE_CONVERSION';

  constructor(private conversionsService: ConversionsService, private ngRedux: NgRedux<IAppState>) { }

  createConversion(conversion): void {
    this.conversionsService.createConversion(conversion)
      .subscribe(
      conversion => this.ngRedux.dispatch({ type: CreateConversionActions.CREATE_CONVERSION, conversion }),
      error => console.log(error)
    );
  }
}