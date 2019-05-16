import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import {FormsModule} from '@angular/forms';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


// AppModule
// Angular needs to know how the pieces of your application fit together and what other files and libraries the app requires.
// This information is called metadata
//
// Some of the metadata is in the @Component decorators that you added to your component classes.
// Other critical metadata is in @NgModule decorators.
//
// The most important @NgModule decorator annotates the top-level AppModule class.
//
// The Angular CLI generated an AppModule class in src/app/app.module.ts when it created the project.
// This is where you opt-in to the FormsModule.
// [(ngModel)] comes from FormsModule
