import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCardDataComponent } from './input-card-data.component';

describe('InputCardDataComponent', () => {
  let component: InputCardDataComponent;
  let fixture: ComponentFixture<InputCardDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputCardDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputCardDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
