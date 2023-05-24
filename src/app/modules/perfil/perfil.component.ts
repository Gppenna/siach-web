import { Component, OnInit } from '@angular/core';
import { AppStateService } from 'src/app/app.state';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-perfil',
	templateUrl: './perfil.component.html',
	styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
	dataSource: any[] = [];

	totalHoras = 0;
	totalHorasRascunho = 0;
	addHorasFlag = false;
	constructor(public appStateService: AppStateService) {}

	ngOnInit(): void {
		this.loadDependencies();
	}

	loadDependencies() {
		const request = {
			type: 'GET',
			api: environment.apiUrl,
			path: 'perfil/user/' + this.appStateService.userId(),
		};
		this.execute('http-request', request).subscribe((response: any) => {
			this.dataSource = response;
			this.totalHorasCalc(response);
		});
	}

	colorsCalc(numerador: any, denominador: any, normalize?: any) {
		let arit = (100 * numerador) / denominador;
		if (normalize) {
			arit += normalize;
		}
		return 'calc(' + arit + '%)';
	}

	conicGradientFactory(initialColor: any, finalColor: any, numerador: any, denominador: any) {
		let gradientString = 'conic-gradient(';
		let firstColorString = initialColor + ' ' + this.colorsCalc(numerador, denominador) + ',';
		let finalColorString = finalColor + ' ' + this.colorsCalc(numerador, denominador, 0.3) + ')';
		gradientString += firstColorString + finalColorString;

		return gradientString;
	}

	totalHorasCalc(response: any) {
		response.forEach((element: any) => {
			Object.keys(element.perfilGrupo).forEach((key, index) => {
				this.totalHoras += element.perfilGrupo[key].horasContabilizadas;

				this.totalHorasRascunho += element.perfilGrupo[key].horasContabilizadasRascunho;
			});
		});
	}

	execute(type: string, data?: any) {
		return this.appStateService.execute({ type: type, data: data });
	}

	get userData() {
		return this.appStateService.state.userData;
	}
}
