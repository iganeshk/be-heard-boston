import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from './../../environments/environment';

import { MainModel } from '../models';

@Injectable()
export class MainService {

    private backendApiUrl = environment.backendAPIUrl;
    // moved to backend
    // private thirdPartyApiUrl = '';
    constructor(private http: Http) { }

    public loadFile(): Observable<MainModel[]> {
        return this.http.get(`${this.backendApiUrl}/loadFile`).pipe(map(response => {
            return <MainModel[]>response.json();
        }), catchError(this.handleError));
    }


    public updateFile(data: MainModel[]): Observable<any> {
        return this.http.post(`${this.backendApiUrl}/updateFile`, data).pipe(map(response => {
            return <any>response.json();
        }), catchError(this.handleError));
    }

    // public sendDataTo3rdParytApi(data: MainModel): Observable<any> {
    //     return this.http.post(`${this.thirdPartyApiUrl}/users`, data).pipe(map(response => {
    //         return <any>response.json();
    //     }), catchError(this.handleError));
    // }

    public checkCode(code) {
        return this.http.post(`${this.backendApiUrl}/checkCode`, code).pipe(map(response => {
            return <any>response.json();
        }), catchError(this.handleError));
    }

    public claimPrize(code) {
        return this.http.post(`${this.backendApiUrl}/claimPrize`, code).pipe(map(response => {
            return <any>response.json();
        }), catchError(this.handleError));
    }

    private handleError(error: Response) {
        return throwError(error.json() || { error: 'Server error' });
    }
}