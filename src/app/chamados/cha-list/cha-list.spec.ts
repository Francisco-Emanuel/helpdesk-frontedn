import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChaList } from './cha-list';

describe('ChaList', () => {
  let component: ChaList;
  let fixture: ComponentFixture<ChaList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChaList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChaList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
