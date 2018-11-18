import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
  CloudError,
  ContentItem,
  ContentType,
  DeliveryClient,
  SortOrder,
  TaxonomyGroup
} from 'kentico-cloud-delivery';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Project } from '../models/project.class';


@Component({
  selector: 'page-projects-detail',
  templateUrl: './page-projects-detail.component.html',
  styleUrls: ['./page-projects-detail.component.css']
})

export class PageProjectsDetailComponent implements OnInit {
  protected ngUnsubscribe: Subject<void> = new Subject<void>();

  private readonly projectType = 'projects';

  public readonly title = 'My Projects';

  public error?: string;

  public selectedProject?: Project[];
  public noProject: boolean;

  constructor(private router: Router, private deliveryClient: DeliveryClient) { }

  ngOnInit() {
    const projectName = this.router.url.split('/').slice(2).toString();
    this.loadData(projectName);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  loadData(projectName: string): void {

    this.deliveryClient
      .items<Project>()
      .equalsFilter('elements.urlslug',projectName)
      .getObservable()
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(
        response => {
          // console.log('Found project:',response);
          if (!response.isEmpty) {
            this.selectedProject = response.items;
          } else {
            this.noProject = true;
          }
        },
        error => this.handleCloudError(error)
      );
  }

  private handleCloudError(error: CloudError | any): void {
    if (error instanceof CloudError) {
      this.error = `Kentico Cloud Error occurred with message: '${
        error.message
      }' for request with id = '${error.requestId}'`;
    } else {
      this.error = 'Unknown error occurred';
    }
  }

}
