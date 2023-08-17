import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Weather } from '../../models/weather.model';

@Component({
  selector: 'app-detailed-weather',
  templateUrl: './detailed-weather.component.html',
  styleUrls: ['./detailed-weather.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailedWeatherComponent {
  @Input()
  weather: Weather = {
    id: 0,
    description: '',
    icon: '',
    temp: 0,
    minTemp: 0,
    maxTemp: 0,
    feelsLike: 0,
    humidity: 0,
    wind: {
      speed: 0,
      deg: 0,
    },
    sunrise: 0,
    sunset: 0,
  };

  get weatherIcon(): string {
    return `http://openweathermap.org/img/wn/${this.weather.icon}@2x.png`;
  }
}
