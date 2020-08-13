import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError } from 'rxjs';
import {first, catchError} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private readonly baseURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
  private readonly apiKey= '0c30c6741db2ab5039838c11631d961d';
  constructor(public http:HttpClient) { 
  }


  getCityWeatherByName(city: string, metric: 'metric' | 'imperial' = 'metric'): Observable<any> {
    return this.http.get(
      `${this.baseURL}${city}&units=${metric}&APPID=${this.apiKey}`)
      .pipe(first(), catchError(this.handleError));
  }

  handleError(error : any) {
    let errorMsg = '';
  switch (error.error.cod) {
    case "400":
      errorMsg = '*enter city';
      break;
    case "404":
      errorMsg = '*city was not found, check the city name';
      break;
    case "429":
      errorMsg = '*too many request were made recently, wait a minute and try again';
    default:
      errorMsg = error.error.message;
      break;
  }
  console.log(error);
   return throwError(errorMsg);
  }
}
