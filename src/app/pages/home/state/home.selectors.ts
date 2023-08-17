import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import { HomeState } from './home.reducer';

export const selectHomeState: MemoizedSelector<object, HomeState> =
  createFeatureSelector<HomeState>('home');

export const selectCurrentWeather = createSelector(
  selectHomeState,
  (homeState: HomeState) => homeState.entity
);

export const selectCurrentWeatherLoading = createSelector(
  selectHomeState,
  (homeState: HomeState) => homeState.loading
);

export const selectCurrentWeatherError = createSelector(
  selectHomeState,
  (homeState: HomeState) => homeState.error
);
