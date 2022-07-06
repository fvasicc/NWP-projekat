import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyItemInfoComponent } from './currency-item-info.component';

describe('CurrencyItemInfoComponent', () => {
  let component: CurrencyItemInfoComponent;
  let fixture: ComponentFixture<CurrencyItemInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyItemInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrencyItemInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
