import { Component, OnInit,OnDestroy } from '@angular/core';
import {WeatherService} from '../../services/weather/weather.service';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(public weatherService:WeatherService) { }
  
  currentWeather = new Weather(); 
  city = '';
  valid = false;
  searching = false;
  errorMsg = '';

  ngOnInit(): void {
  }

  searchCity() {
    this.searching = true;
    this.weatherService.getCityWeatherByName(this.city).subscribe((weather:any) => {
        this.currentWeather.city = weather.name;
        this.currentWeather.state= weather.weather[0].main;
        this.currentWeather.tempFeeling = Math.ceil(Number(weather.main.feels_like))
        this.currentWeather.temp = Math.ceil(Number(weather.main.temp));
        this.currentWeather.lon = weather.coord.lon;
        this.currentWeather.lat = weather.coord.lat;
        this.valid = true;
        this.errorMsg = '';
    },(err)=>{
      this.errorMsg = err;
      this.valid = false;
   }).add(() => {
     this.searching = false;
   });
  }

  ngOnDestroy(): void{
  }
}

export class Weather {
  city: string;
  temp: number;
  tempFeeling: number;
  lon:number;
  lat:number;
  state : string;

  constructor(){
  }
}
