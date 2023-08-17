import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Store, select } from '@ngrx/store';

import * as fromHomeActions from './state/home.actions';
import * as fromHomeSelectors from './state/home.selectors';
import { Observable, of } from 'rxjs';
import { CityWeather } from 'src/app/shared/models/weather.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css'],
})
export class HomePage implements OnInit {
  cityWeather$: Observable<CityWeather> | undefined;
  loading$: Observable<boolean> = of(false);
  error$: Observable<boolean> = of(false);

  searchControl: FormControl;

  constructor(private store: Store) {
    this.searchControl = new FormControl('', Validators.required);
  }

  ngOnInit(): void {
    this.cityWeather$ = this.store.pipe(
      select(fromHomeSelectors.selectCurrentWeather)
    );
    this.loading$ = this.store.pipe(
      select(fromHomeSelectors.selectCurrentWeatherLoading)
    );
    this.error$ = this.store.pipe(
      select(fromHomeSelectors.selectCurrentWeatherError)
    );
  }

  doSearch() {
    const query = this.searchControl.value;
    this.store.dispatch(fromHomeActions.loadCurrentWeather({ query }));
  }
}
