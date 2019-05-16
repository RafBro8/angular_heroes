import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];
  selectedHero: Hero;


// injecting HeroService into HeroesComponent via constructor
  constructor(private heroService: HeroService) { }


  ngOnInit() {
    this.getHeroes();
  }

  // replaced with routing in html
  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;
  // }


// create a function to retrieve the heroes from the service
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }
}

// onSelect() method assigns the clicked hero from the template to the component's selectedHero.


// The HeroesComponent is still a master/detail view.
// It used to display the hero details on its own, before you cut that portion of the template.
// Now it will delegate to the HeroDetailComponent.
// The two components will have a parent/child relationship.
// The parent HeroesComponent will control the child HeroDetailComponent
// by sending it a new hero to display whenever the user selects a hero from the list.

// while you could call getHeroes() in the constructor, that's not the best practice.
// reserve the constructor for simple initialization
// such as wiring constructor parameters to properties
// constructor shouldn't do anything,
// it shouldn't call a function that makes HTTP requests
// to a remote server as a real data service would
// instead, call getHeroes() inside the ngOnInit lifecycle hook
// and let Angular call ngOnInit at an appropriate time
// after constructing a HeroesComponent instance

// The HeroService.getHeroes() method has a synchronous signature,
// which implies that the HeroService can fetch heroes synchronously
// The HeroesComponent consumes the getHeroes() result as
// if heroes could be fetched synchronously

// wait for the Observable of in service to emit the array of heroes
// which could happen now or several minutes from now.
// Then subscribe passes the emitted array to the callback,
// which sets the component's heroes property
