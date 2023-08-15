import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import { HomeState } from './home.reducer';

export const selectHomeState: MemoizedSelector<object, HomeState> =
  createFeatureSelector<HomeState>('home');
