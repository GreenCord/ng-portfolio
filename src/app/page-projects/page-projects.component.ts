import { Component, OnDestroy, OnInit } from '@angular/core';
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
  selector: 'page-projects',
  templateUrl: './page-projects.component.html',
  styleUrls: ['./page-projects.component.css']
})
export class PageProjectsComponent implements OnInit, OnDestroy {

  protected ngUnsubscribe: Subject<void> = new Subject<void>();

  private readonly projectType = 'projects';

  public readonly title = 'My Projects';

  public error?: string;

  public allProjects?: Project[];
  public workProjects?: Project[];
  public personalProjects?: Project[];

  constructor(private deliveryClient: DeliveryClient) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  loadData(): void {
    // this.deliveryClient
    //   .items<Project>()
    //   .orderParameter('elements.sort_order', SortOrder.asc)
    //   .getObservable()
    //   .pipe(
    //     takeUntil(this.ngUnsubscribe)
    //   )
    //   .subscribe(
    //     response => {
    //       console.log(response);
    //       this.allProjects = response.items;
    //     },
    //     error => this.handleCloudError(error)
    //   );
    this.deliveryClient
      .items<Project>()
      .containsFilter('elements.project_type',['work_project'])
      .orderParameter('elements.sort_order', SortOrder.asc)
      .getObservable()
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(
        response => {
          console.log('Work projects:',response);
          this.workProjects = response.items;
        },
        error => this.handleCloudError(error)
      );
    this.deliveryClient
      .items<Project>()
      .containsFilter('elements.project_type',['personal_project'])
      .orderParameter('elements.sort_order', SortOrder.asc)
      .getObservable()
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(
        response => {
          console.log('Personal projects:',response);
          this.personalProjects = response.items;
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
