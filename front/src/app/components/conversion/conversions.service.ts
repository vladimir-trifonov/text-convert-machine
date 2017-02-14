import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { environment } from '../../../environments/environment';

@Injectable()
export class ConversionsService {
	constructor(private http: Http) { }

	getConversions(): Observable<any[]> {
		return this.http.get(`${environment.api}/api/tasks?type=document.convert`)
			.map(this.extractData)
			.catch(this.handleError);
	}

	createConversion(conversion) {
		return this.http.post(`${environment.api}/api/documents/convert`, conversion)
			.catch(this.handleError);
	}

	private extractData(res: Response) {
		let body = res.json();
		return body || [];
	}

	private handleError(error: Response | any) {
		let errMsg: string;
		if (error instanceof Response) {
			const body = error.json() || '';
			const err = body.error || JSON.stringify(body);
			errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
		} else {
			errMsg = error.message ? error.message : error.toString();
		}
		// TODO: Toastr error message
		console.log(errMsg);
		return Observable.throw(errMsg);
	}
}
