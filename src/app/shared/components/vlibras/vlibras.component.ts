import { Component, OnInit, Input } from '@angular/core';
import { AppStateService } from 'src/app/app.state';

@Component({
	selector: 'app-vlibras',
	templateUrl: './vlibras.component.html',
	styleUrls: ['./vlibras.component.scss'],
})
export class VLibrasComponent implements OnInit {
	widgetSrc: string;
	scriptSrc: string;
	script: any;
	constructor(public appStateService: AppStateService) {
		this.widgetSrc = 'https://vlibras.gov.br/app';
		this.scriptSrc = 'https://vlibras.gov.br/app/vlibras-plugin.js';
	}

	ngOnInit(): void {
		console.log('vlibras');
		this.script = document.createElement('script');
		this.script.src = this.scriptSrc;
		document.head.appendChild(this.script);
		this.script.onload = (load: any) => {
			// @ts-ignore
			let test = new window.VLibras.Widget(this.widgetSrc);
			// @ts-ignore
			window.onload();
			console.log(test, 'vlibra22222s');
		};
	}
}
