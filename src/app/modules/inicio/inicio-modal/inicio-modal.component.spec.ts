import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioModalComponent } from './inicio-modal.component';

describe('InicioModalComponent', () => {
	let component: InicioModalComponent;
	let fixture: ComponentFixture<InicioModalComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [InicioModalComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(InicioModalComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
