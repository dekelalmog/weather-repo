import { Component, OnInit,OnDestroy } from '@angular/core';
import {WeatherService} from '../../services/weather/weather.service';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(public weather:WeatherService) { }

  temp: number;
  city = 'Rome';
  state: string;

  ngOnInit(): void {
    console.log("on");
    this.weather.getCityWeatherByName(this.city).subscribe((payload:any) => {
      console.log("check");
      this.state = payload.weather[0].main;
      this.temp = Math.ceil(Number(payload.main.temp));
    });
  }

  updateCity() {
    alert(this.city);
  }

  ngOnDestroy(): void{

  }

}
