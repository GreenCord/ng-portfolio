import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {
  CloudError,
  ContentItem,
  ContentType,
  DeliveryClient,
  TaxonomyGroup
} from 'kentico-cloud-delivery';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Homepage } from '../models/homepage.class';
// import { Project } from '../models/project.class';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css']
})
export class PageHomeComponent implements OnInit, OnDestroy {
  videoTag;

  protected ngUnsubscribe: Subject<void> = new Subject<void>();

  private readonly type = 'homepage';

  public readonly title = 'Home';

  public error?: string;

  public homeTexts?: Homepage[];

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
      .items<Homepage>()
      .type(this.type)
      .getObservable()
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(
        response => {
          // console.log('incoming homepage items: ', response);
          this.homeTexts = response.items;
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
        <source src="./assets/vid/opt/scifitunnel04.mp4" type="video/mp4">
        <source src="./assets/vid/opt/scifitunnel04.ogv" type="video/ogg">
        <source src="./assets/vid/opt/scifitunnel04.webm" type="video/webm">
      </video>
    `);
  }

}
