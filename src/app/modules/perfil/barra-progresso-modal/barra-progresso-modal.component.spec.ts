import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraProgressoModalComponent } from './barra-progresso-modal.component';

describe('BarraProgressoModalComponent', () => {
  let component: BarraProgressoModalComponent;
  let fixture: ComponentFixture<BarraProgressoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarraProgressoModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarraProgressoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
