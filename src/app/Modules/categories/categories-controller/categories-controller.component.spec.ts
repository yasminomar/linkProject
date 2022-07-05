import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesControllerComponent } from './categories-controller.component';

describe('CategoriesControllerComponent', () => {
  let component: CategoriesControllerComponent;
  let fixture: ComponentFixture<CategoriesControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesControllerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
