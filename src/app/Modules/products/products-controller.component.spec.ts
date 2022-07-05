import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsControllerComponent } from './products-controller.component';

describe('ProductsControllerComponent', () => {
  let component: ProductsControllerComponent;
  let fixture: ComponentFixture<ProductsControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsControllerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
