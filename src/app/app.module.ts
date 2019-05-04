import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PageHomeComponent } from './page-home/page-home.component';
import { PageSkillsComponent } from './page-skills/page-skills.component';
import { PageProjectsComponent } from './page-projects/page-projects.component';
import { PageProjectsDetailComponent } from './page-projects-detail/page-projects-detail.component';
import { SiteNavigationComponent } from './site-navigation/site-navigation.component';
import { SitePartialNaviconsComponent } from './site-partial-navicons/site-partial-navicons.component';
import { PageNotFoundComponent } from './page-notfound/page-notfound.component';

import { DeliveryClientProvider } from './kc/delivery-client.provider';

import { Projects } from './models/projects';

const appRoutes: Routes = [
  { path: '', component: PageHomeComponent },
  { path: 'skills', component: PageSkillsComponent },
  { path: 'skill', redirectTo: '/skills', pathMatch: 'full'},
  { path: 'projects', component: PageProjectsComponent },
  { path: 'project', redirectTo: '/projects', pathMatch: 'full'},
  { path: 'projects/:name', component: PageProjectsDetailComponent },
  { path: '404', component: PageNotFoundComponent },
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  },
  { path: '**', redirectTo: '/404' }

];

@NgModule({
  declarations: [
    AppComponent,
    PageHomeComponent,
    PageSkillsComponent,
    PageProjectsComponent,
    PageProjectsDetailComponent,
    SiteNavigationComponent,
    SitePartialNaviconsComponent,
    PageNotFoundComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes, { scrollPositionRestoration: 'enabled', enableTracing: false }),
    BrowserModule,
    HttpModule
  ],
  providers: [DeliveryClientProvider],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }
