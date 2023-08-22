import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CityWeather } from 'src/app/shared/models/weather.model';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentWeatherComponent {
  @Input()
  cityWeather: CityWeather = {
    city: {
      id: 0,
      name: '',
      country: '',
      coord: { lat: 0, lon: 0 },
      timeZone: '',
    },
    weather: {
      id: 0,
      description: '',
      icon: '',
      temp: 0,
      minTemp: 0,
      maxTemp: 0,
      feelsLike: 0,
      humidity: 0,
      wind: { speed: 0, deg: 0 },
      sunrise: 0,
      sunset: 0,
    },
  };
  @Input()
  isFavorite: boolean | null = false;
  @Output()
  toogleBookmark = new EventEmitter();

  get cityName(): string {
    return `${this.cityWeather.city.name} ${this.cityWeather.city.country}`;
  }

  onToggleBookmark() {
    this.toogleBookmark.emit();
  }
}
