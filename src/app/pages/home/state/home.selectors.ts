import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import { HomeState } from './home.reducer';

export const selectHomeState: MemoizedSelector<object, HomeState> =
  createFeatureSelector<HomeState>('home');

export const selectHomeText = createSelector(
  selectHomeState,
  (homeState: HomeState) => homeState.text
);
