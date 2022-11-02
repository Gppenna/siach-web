import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitacaoViewComponent } from './solicitacao-view.component';

describe('SolicitacaoViewComponent', () => {
  let component: SolicitacaoViewComponent;
  let fixture: ComponentFixture<SolicitacaoViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitacaoViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitacaoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
