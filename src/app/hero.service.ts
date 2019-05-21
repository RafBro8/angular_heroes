import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

// @Injectable() decorator marks the class
// as one that participates in the dependency injection system.
// @Injectable() decorator accepts a metadata object for the service

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes';  // URL to web api

  constructor(
    private httpClient: HttpClient,
    private messageService: MessageService) { }


  // getHeroes(): Observable<Hero[]> {
  //   // TODO: send the message _after_ fectching the heroes
  //   this.messageService.add('HeroService: fetched heroes');
  //   return of(HEROES);
    // of(HEROES) returns an Observable<Hero[]>
    // that emits a single value, the array of mock heroes
  // }


  // GET heroes from the server
  getHeroes(): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  // getHero(id: number): Observable<Hero> {
  //   // TODO: send the message _after_ fetching the hero
  //   this.messageService.add(`HeroService: fetched hero id=${id}`);
  //   return of(HEROES.find(hero => hero.id === id));
  // }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.httpClient.get<Hero>(url)
      .pipe(
        tap(_ => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.httpClient.put(this.heroesUrl, hero, httpOptions)
      .pipe(
        tap(_ => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero'))
      );
  }

  /** POST: add a new hero to the server */
  addHero(hero: Hero): Observable<Hero> {
    return this.httpClient.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.httpClient.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.httpClient.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  // Log a HeroService message with the MessageService
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}


// make the HeroService available to the dependency injection system
// before Angular can inject it into the HeroesComponent
// do this by registering a provider
// A provider is something that can create or deliver a service; in this case,
// it instantiates the HeroService class to provide the service
// need to make sure that the HeroService is registered as the provider of this service.
// You are registering it with an injector,
// which is the object that is responsible
// for choosing and injecting the provider where it is required.
// When you provide the service at the root level,
// Angular creates a single, shared instance of HeroService
// and injects into any class that asks for it.

// The HeroService must wait for the server to respond,
// getHeroes() cannot return immediately with hero data,
// and the browser will not block while the service waits.
// HeroService.getHeroes()
// must have an asynchronous signature of some kind
// It can take a callback. It could return a Promise.
// It could return an Observable.
// HeroService.getHeroes() will return an Observable in part because
// it will eventually use the Angular HttpClient.get method
// to fetch the heroes and HttpClient.get() returns an Observable

// inject MessageService into HeroService via constructor
// which is injected into the HeroComponent

// To catch errors, you "pipe" the observable result
// from http.get() through an RxJS catchError() operator.
// Import the catchError symbol from rxjs/operators,
// along with some other operators you'll need later.

// The catchError() operator intercepts an Observable that failed.
// It passes the error an error handler that can do what it wants with the error.
// The handleError() method reports the error and then returns
// an innocuous result so that the application keeps working.
