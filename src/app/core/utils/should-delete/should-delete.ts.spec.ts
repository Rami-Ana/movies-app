import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShouldDeleteTs } from './should-delete.ts.js';

describe('ShouldDeleteTs', () => {
  let component: ShouldDeleteTs;
  let fixture: ComponentFixture<ShouldDeleteTs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShouldDeleteTs],
    }).compileComponents();

    fixture = TestBed.createComponent(ShouldDeleteTs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
