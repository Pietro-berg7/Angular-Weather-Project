import { Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { BookmarksState } from './state/bookmarks.reducer';
import { Bookmark } from 'src/app/shared/models/bookmark.model';
import * as fromBookmarksSelectors from './state/bookmarks.selectors';
import * as fromBookmarksActions from './state/bookmarks.actions';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.page.html',
  styleUrls: ['./bookmarks.page.css'],
})
export class BookmarksPage implements OnInit {
  bookmarks$: Observable<Bookmark[]> = of([]);

  constructor(private store: Store<BookmarksState>) {}

  ngOnInit() {
    this.bookmarks$ = this.store.pipe(
      select(fromBookmarksSelectors.selectBookmarksList)
    );
  }

  removeBookmark(id: number) {
    this.store.dispatch(fromBookmarksActions.removeBookmark({ id }));
  }
}
