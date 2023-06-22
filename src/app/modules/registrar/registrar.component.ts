import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppStateService } from 'src/app/app.state';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-registrar',
	templateUrl: './registrar.component.html',
	styleUrls: ['./registrar.component.scss'],
})
export class RegistrarComponent implements OnInit {
	registerForm: FormGroup;

	confirmarSenha = '';

	cursoList: any = [];

	constructor(private readonly router: Router, public appStateService: AppStateService, private readonly formBuilder: FormBuilder) {}

	ngOnInit(): void {
		this.loadDependencies();
		this.buildRegisterForm();
	}

	numberOnly(event: any): boolean {
		const charCode = event.which ? event.which : event.keyCode;
		if (charCode > 31 && (charCode < 48 || charCode > 57)) {
			return false;
		}
		return true;
	}

	loadDependencies() {
		const request = {
			type: 'GET',
			api: environment.apiUrl,
			path: 'curso/list',
		};
		this.execute('http-request', request).subscribe((response: any) => {
			this.cursoList = response;
		});
	}

	private buildRegisterForm(): void {
		this.registerForm = this.formBuilder.group({
			email: '',
			matricula: '',
			nome: '',
			idCurso: '',
			senha: '',
			confirmarSenha: '',
		});
	}

	execute(type: string, data?: any) {
		return this.appStateService.execute({ type: type, data: data });
	}

	registrar() {
		this.execute('registrar', this.registerForm.value);
	}

	cancel() {
		this.router.navigate(['/login']);
	}
}
