import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PageHomeComponent } from './page-home/page-home.component';
import { PageSkillsComponent } from './page-skills/page-skills.component';
import { PageProjectsComponent } from './page-projects/page-projects.component';
import { SiteNavigationComponent } from './site-navigation/site-navigation.component';

const appRoutes: Routes = [
  { path: 'home', component: PageHomeComponent},
  { path: 'skills', component: PageSkillsComponent},
  { path: 'projects', component: PageProjectsComponent},
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
  //{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
   declarations: [
      AppComponent,
      PageHomeComponent,
      PageSkillsComponent,
      PageProjectsComponent,
      SiteNavigationComponent
   ],
   imports: [
    RouterModule.forRoot(appRoutes,{ enableTracing: true }),
    BrowserModule,
    HttpModule
  ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }