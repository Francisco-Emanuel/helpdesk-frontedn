import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChaForm } from './cha-form';

describe('ChaForm', () => {
  let component: ChaForm;
  let fixture: ComponentFixture<ChaForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChaForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChaForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
