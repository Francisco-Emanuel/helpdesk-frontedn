import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepList } from './dep-list';

describe('DepList', () => {
  let component: DepList;
  let fixture: ComponentFixture<DepList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DepList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
