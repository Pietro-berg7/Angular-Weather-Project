import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import { BookmarksState } from './bookmarks.reducer';
import { Bookmark } from 'src/app/shared/models/bookmark.model';

export const selectBookmarksState: MemoizedSelector<object, BookmarksState> =
  createFeatureSelector<BookmarksState>('bookmarks');

export const selectBookmarksList: MemoizedSelector<object, Bookmark[]> =
  createSelector(
    selectBookmarksState,
    (bookmarksState: BookmarksState) => bookmarksState.list
  );
