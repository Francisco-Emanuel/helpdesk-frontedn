import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepForm } from './dep-form';

describe('DepForm', () => {
  let component: DepForm;
  let fixture: ComponentFixture<DepForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DepForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
