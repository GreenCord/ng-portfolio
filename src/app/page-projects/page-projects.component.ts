import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
  // tslint:disable-next-line:component-selector
  selector: 'page-projects',
  templateUrl: './page-projects.component.html',
  styleUrls: ['./page-projects.component.css']
})

export class PageProjectsComponent implements OnInit, OnDestroy {
  videoTag;

  protected ngUnsubscribe: Subject<void> = new Subject<void>();

  private readonly type = 'projects';

  public readonly title = 'My Projects';

  public error?: string;

  public allProjects?: Project[];
  public workProjects?: Project[];
  public personalProjects?: Project[];
  public selectedProject: Project;

  onSelect(project: Project): void {
    // console.log("incoming project:",project);
    this.selectedProject = project;
  }

  constructor(private deliveryClient: DeliveryClient, private sanitizer: DomSanitizer) {
    this.videoTag = this.getVideoTag();
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  loadData(): void {
    this.deliveryClient
      .items<Project>()
      .type(this.type)
      .containsFilter('elements.project_type', ['work_project'])
      .orderParameter('elements.sort_order', SortOrder.asc)
      .getObservable()
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(
        response => {
          this.workProjects = response.items;
        },
        error => this.handleCloudError(error)
      );
    this.deliveryClient
      .items<Project>()
      .type(this.type)
      .containsFilter('elements.project_type', ['personal_project'])
      .orderParameter('elements.sort_order', SortOrder.asc)
      .getObservable()
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(
        response => {
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

  private getVideoTag() {
    return this.sanitizer.bypassSecurityTrustHtml(`
    <video muted autoplay loop playsinline>
      <source src="assets/vid/opt/lightning_animation.mp4" type="video/mp4">
      <source src="assets/vid/opt/lightning_animation.ogv" type="video/ogg">
      <source src="assets/vid/opt/lightning_animation.webm" type="video/webm">
    </video>
    `);
  }
}
