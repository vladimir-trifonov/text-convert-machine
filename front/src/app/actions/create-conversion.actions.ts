import { Injectable } from '@angular/core';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import * as Redux from 'redux';
import { ConversionsService } from '../components/conversion/conversions.service';
import { IAppState } from '../store';
import { Router } from '@angular/router';

@Injectable()
export class CreateConversionActions {
  static CREATE_CONVERSION: string = 'CREATE_CONVERSION';

  constructor(private conversionsService: ConversionsService, private ngRedux: NgRedux<IAppState>, private router: Router) { }

  createConversion(conversion): void {
    this.conversionsService.createConversion(conversion)
      .subscribe(
      conversion => {
        this.ngRedux.dispatch({ type: CreateConversionActions.CREATE_CONVERSION, conversion });
        this.router.navigate(['/conversions']);
      },
      error => console.log(error)
    );
  }
}