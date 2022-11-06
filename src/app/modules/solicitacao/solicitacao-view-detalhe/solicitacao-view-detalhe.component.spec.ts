import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitacaoViewDetalheComponent } from './solicitacao-view-detalhe.component';


describe('SolicitacaoViewDetalheComponent', () => {
  let component: SolicitacaoViewDetalheComponent;
  let fixture: ComponentFixture<SolicitacaoViewDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitacaoViewDetalheComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitacaoViewDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
