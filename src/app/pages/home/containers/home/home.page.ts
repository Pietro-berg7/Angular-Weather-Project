import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Store, select } from '@ngrx/store';

import * as fromHomeActions from '../../state/home.actions';
import * as fromHomeSelectors from '../../state/home.selectors';
import { Observable, Subject, of, takeUntil } from 'rxjs';
import { CityWeather } from 'src/app/shared/models/weather.model';
import { Bookmark } from 'src/app/shared/models/bookmark.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css'],
})
export class HomePage implements OnInit, OnDestroy {
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
  loading$: Observable<boolean> = of(false);
  error$: Observable<boolean> = of(false);

  searchControl: FormControl;

  private componentDestroyed$ = new Subject<void>();

  constructor(private store: Store) {
    this.searchControl = new FormControl('', Validators.required);
  }

  ngOnInit(): void {
    this.store
      .pipe(
        select(fromHomeSelectors.selectCurrentWeather),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe((value) => (this.cityWeather = value));
    this.loading$ = this.store.pipe(
      select(fromHomeSelectors.selectCurrentWeatherLoading)
    );
    this.error$ = this.store.pipe(
      select(fromHomeSelectors.selectCurrentWeatherError)
    );
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.unsubscribe();
  }

  doSearch() {
    const query = this.searchControl.value;
    this.store.dispatch(fromHomeActions.loadCurrentWeather({ query }));
  }

  onToggleBookmark() {
    const bookmark = new Bookmark();
    bookmark.id = this.cityWeather.city.id;
    bookmark.name = this.cityWeather.city.name;
    bookmark.country = this.cityWeather.city.country;
    bookmark.coord = this.cityWeather.city.coord;
  }
}
