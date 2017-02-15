import { Component } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { ConversionsActions } from '../../actions/conversions.actions';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'conversions',
  templateUrl: './conversions.component.html',
  styleUrls: ['./conversions.component.css']
})
export class Conversions {
  @select('conversions') conversions$: any
	private env = environment
  constructor(private actions: ConversionsActions) { }

  ngOnInit() {
    this.actions.getConversions();
  }
}
