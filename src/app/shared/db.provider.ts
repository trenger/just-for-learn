import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { catchError} from 'rxjs/operators';

export interface Resp {
  name: string
}

@Injectable({providedIn: 'root'})
export class DbProvider{

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };

  constructor(private http: HttpClient) {
  }

  read<T>(url: string): Observable<T[]> {
    return this.http
      .get<T[]>(`${url}.json`)
      .pipe(map(<T>(t) => {
        if (!t) {
          return []
        }
        return Object.keys(t).map(key => ({...t[key], id: key}))
      }), catchError(this.handleError))
  }
  create<T extends object>(data:T, url: string): Observable<T> {
    return this.http.post(`${url}.json`, data)
      .pipe(map((resp: Resp) =>{
        return {id: resp.name, ...(data as Object)} as T
      }), catchError(this.handleError))
  }

  delete(id: string, url: string): Observable<{}> {
    return this.http.delete(`${url}/${id}.json`)
      .pipe(catchError(this.handleError))
  }

  update<T>(id: string, data: T, url: string): Observable<T> {
    return this.http.put<T>(`${url}/${id}.json`, this.getJSONstring(data)).pipe(catchError(this.handleError))
  }

  getJSONstring<T>(t: T) {
    return JSON.stringify(t, (key, value) => (key == 'id' ? undefined : value))
  }
}
