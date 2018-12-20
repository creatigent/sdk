import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Book } from './book';
import { Author } from './author';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class BookService {

    private authorsUrl = 'api/authors';
    private booksUrl = 'api/books';
    private searchUrl = 'api/search';
    private tagsUrl = 'api/tags';

    constructor(
        private http: HttpClient) { }

    getBook(id: string): Observable<Book> {
        const url = `${this.booksUrl}/${id}`;
        return this.http.get<Book>(url).pipe(
            tap(_ => this.log(`fetched hero id=${id}`)),
            catchError(this.handleError<Book>(`getHero id=${id}`))
        );
    }

    getAuthors (): Observable<Author[]> {
        return this.http.get<Author[]>(this.authorsUrl)
            .pipe(
                tap(_ => this.log('fetched heroes')),
                catchError(this.handleError('getHeroes', []))
            );
    }

    getBooks (): Observable<Book[]> {
        return this.http.get<Book[]>(this.booksUrl)
            .pipe(
                tap(_ => this.log('fetched heroes')),
                catchError(this.handleError('getHeroes', []))
            );
    }

    getTags (): Observable<Book[]> {
        return this.http.get<Book[]>(this.tagsUrl)
            .pipe(
                tap(_ => this.log('fetched heroes')),
                catchError(this.handleError('getHeroes', []))
            );
    }

    getSearchResults(text: string): Observable<Book[]> {
        return this.http.get<Book[]>(this.searchUrl, {params: {
            text: text
        }}).pipe(
                tap(_ => this.log('fetched heroes')),
                catchError(this.handleError('getHeroes', []))
            );
    }


    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    private log(message: string) {
        console.log("message",message);
    }

}
