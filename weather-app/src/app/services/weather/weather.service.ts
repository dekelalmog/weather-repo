import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable } from 'rxjs';
import {first} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private readonly baseURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
  private readonly apiKey= '0c30c6741db2ab5039838c11631d961d';
  constructor(public http:HttpClient) { 
  }


  getCityWeatherByName(city: string, metric: 'metric' | 'imperial' = 'metric'): Observable<string> {
    const dataSub = new Observable<string>();
    this.http.get(
      `${this.baseURL}${city}&units=${metric}&APPID=${this.apiKey}
      `)
      .pipe((first()));
      console.log("service");
      console.log(dataSub);
    return dataSub;
  }


}
