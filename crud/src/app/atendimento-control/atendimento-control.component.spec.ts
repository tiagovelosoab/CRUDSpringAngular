import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtendimentoControlComponent } from './atendimento-control.component';

describe('AtendimentoControlComponent', () => {
  let component: AtendimentoControlComponent;
  let fixture: ComponentFixture<AtendimentoControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtendimentoControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtendimentoControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
