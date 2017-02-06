import { Component } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { ConversionsActions } from '../../actions/conversions.actions';

@Component({
  selector: 'conversions',
  templateUrl: './conversions.component.html',
  styleUrls: ['./conversions.component.css']
})
export class Conversions {
  @select('conversions') conversions$: any;
  constructor(private actions: ConversionsActions) { }

  ngOnInit() {
    this.actions.getConversions();
  }
}
