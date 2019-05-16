import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

// @Injectable() decorator marks the class
// as one that participates in the dependency injection system.
// @Injectable() decorator accepts a metadata object for the service

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    // TODO: send the message _after_ fectching the heroes
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
    // of(HEROES) returns an Observable<Hero[]>
    // that emits a single value, the array of mock heroes
  }

  getHero(id: number): Observable<Hero> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
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
