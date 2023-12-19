import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent  implements OnInit{

  myWeather: any;
  temperature: number = 0;
  feelsLikeTemp: number = 0;
  humidity: number = 0;
  pressure: number = 0;
  summary: string = '';
  iconURL: string = '';
  city: string = 'HaNoi';
  units: string = 'imperial'

  convertToFahrenheit(temperature: number): number {
    return (temperature - 32) * 5 / 9;
  }

  constructor(private weatherService: WeatherService){

  }
  ngOnInit(): void {
    this.weatherService.getweather(this.city, this.units).subscribe({
      next: (res) => {
        console.log(res);
        this.myWeather = res;
        console.log(this.myWeather)
        this.temperature = this.convertToFahrenheit(this.myWeather.main.temp);
        this.feelsLikeTemp = this.myWeather.main.feels_like;
        this.humidity = this.myWeather.main.humidity;
        this.pressure = this.myWeather.main.pressure;
        this.summary = this.myWeather.weather[0].main;
        this.iconURL = 'https://openweathermap.org/img/wn/' + this.myWeather.weather[0].icon + '@2x.png';
        
        
      },
      
      error: (error) => console.log(error.message),
      complete: () => console.info('API call completed')
    })
  }
}
