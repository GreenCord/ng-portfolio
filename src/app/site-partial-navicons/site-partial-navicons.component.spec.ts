/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SitePartialNaviconsComponent } from './site-partial-navicons.component';

describe('SitePartialNaviconsComponent', () => {
  let component: SitePartialNaviconsComponent;
  let fixture: ComponentFixture<SitePartialNaviconsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitePartialNaviconsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitePartialNaviconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
