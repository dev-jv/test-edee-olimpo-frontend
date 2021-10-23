import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RatingsService {

  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });

  constructor(public http: HttpClient) {
  }

  getRatings(rating?): Observable<any> {
    if ( rating === undefined ) {
      return this.http.get(`${env.backend.host}/api/rating/`, {headers: this.headers});
    } else {
      return this.http.get(`${env.backend.host}/api/rating/?rating=${rating}`, {headers: this.headers});
    }
  }

  saveRating(record: any): Observable<any> {
    return this.http.post(`${env.backend.host}/api/rating/new`, record, {headers: this.headers});
  }

  updateRating(record: any): Observable<any> {
    console.log(':::', record);
    return this.http.put(`${env.backend.host}/api/rating/${record._id}`, record, {headers: this.headers});
  }

  getMovies(): Observable<any> {
    return this.http.get(`${env.backend.host}/api/rating/movies`, {headers: this.headers});
  }

}
