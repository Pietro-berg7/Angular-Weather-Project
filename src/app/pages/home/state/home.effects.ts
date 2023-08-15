import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as fromHomeActions from './home.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { WeatherService } from 'src/app/shared/services/weather.service';

@Injectable()
export class HomeEffects {
  loadCurrentWeather$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromHomeActions.loadCurrentWeather),
        mergeMap(({ query }) =>
          this.weatherService.getCityWeatherByQuery(query)
        ),
        catchError((err, caugth$) => {
          this.store.dispatch(fromHomeActions.loadCurrentWeatherFailed());
          return caugth$;
        }),
        map((entity: any) =>
          fromHomeActions.loadCurrentWeatherSuccess({ entity })
        )
      ),
    { useEffectsErrorHandler: true }
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private weatherService: WeatherService
  ) {}
}
