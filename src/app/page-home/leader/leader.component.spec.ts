import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderComponent } from './leader.component';

describe('LeaderComponent', () => {
  let component: LeaderComponent;
  let fixture: ComponentFixture<LeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
