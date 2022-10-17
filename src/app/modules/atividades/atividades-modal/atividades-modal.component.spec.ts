import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtividadesModalComponent } from './atividades-modal.component';

describe('AtividadesModalComponent', () => {
  let component: AtividadesModalComponent;
  let fixture: ComponentFixture<AtividadesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtividadesModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtividadesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
