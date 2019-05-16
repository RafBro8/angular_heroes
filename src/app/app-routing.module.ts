import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes', component: HeroesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// In Angular, the best practice is to load and configure the router in a separate,
// top-level module that is dedicated to routing and imported by the root AppModule.

// Exporting RouterModule makes router directives available
// for use in the AppModule components that will need them.


// Routes tell the router which view to display
// when a user clicks a link or pastes a URL into the browser address bar.
// A typical Angular Route has two properties:
// 1. path: a string that matches the URL in the browser address bar.
// 2. component: the component that the router should create
// when navigating to this route.
// You intend to navigate to the HeroesComponent
// when the URL is something like localhost:4200/heroes.
// Import the HeroesComponent so you can reference it in a Route.
// Then define an array of routes with a single route to that component.


// You first must initialize the router
// and start it listening for browser location changes.
// Add RouterModule to the @NgModule.imports array
// and configure it with the routes in one step
// by calling RouterModule.forRoot() within the imports array
// The forRoot() method supplies the service providers and directives
// needed for routing, and performs the initial navigation
// based on the current browser URL

// { path: 'detail/:id', component: HeroDetailComponent },
// The colon (:) in the path indicates that :id
// is a placeholder for a specific hero id.
