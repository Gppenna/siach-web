import { GrupoSheet } from './modules/forms/grupo/grupo';
import { ChangeDetectorRef, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AppStateService } from './app.state';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AtividadeSheet } from './modules/forms/atividade/atividade';
import { DivulgacaoAtividadeSheet } from './modules/forms/divulgacao-atividade/divulgacao-atividade';
import { SolicitacaoSheet } from './modules/forms/solicitacao/solicitacao';
import { ChSheet } from './modules/forms/ch/ch';
import { NavigationEnd, Router } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	USER_EMAIL_SESSION_ATTRIBUTE = 'authenticatedUserEmail';
	title = 'siach-web';

	private components: { [key: string]: any } = {
		grupoSheet: GrupoSheet,
		atividadeSheet: AtividadeSheet,
		divulgacaoAtividadeSheet: DivulgacaoAtividadeSheet,
		solicitacaoSheet: SolicitacaoSheet,
		chSheet: ChSheet,
	};

	@ViewChild('drawer') drawer: MatSidenav;
	@ViewChild('firstFocus', { static: true }) firstFocus: ElementRef;

	constructor(
		public appStateService: AppStateService,
		private _bottomSheet: MatBottomSheet,
		private router: Router,
		private cdr: ChangeDetectorRef,
	) {}

	ngOnInit(): void {
		this.initState();
	}

	ngAfterViewInit() {
		this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				console.log(event, 'navigate');
				this.firstFocus.nativeElement.focus();
				this.cdr.detectChanges();
			}
		});
	}

	private initState() {
		this.appStateService.getState().subscribe((state) => {
			console.log('state', state);
			this.update(state);
		});
	}

	@ViewChild('mainContent', { static: true }) mainContent: ElementRef;
	@ViewChild('navigation', { static: true }) navigation: ElementRef;

	skipToContent(): void {
		console.log('skipping content');
		this.mainContent.nativeElement.focus();
		this.cdr.detectChanges();
	}

	skipToNavigation(): void {
		this.navigation.nativeElement.focus();
		this.cdr.detectChanges();
	}

	execute(type: string, data?: any) {
		return this.appStateService.execute({ type: type, data: data });
	}

	private update(state: any) {
		if (this.drawer && state.showDrawer !== this.drawer.opened) {
			state.showDrawer ? this.drawer.open() : this.drawer.close();
		}

		if (state.openSheet) {
			console.log(' >>> open shet', state.openSheet);
			this.openLink('register-sheet', state.openSheet.type, state.openSheet);
		}
	}

	openLink(command: string, componentType: string, value: any): void {
		const component = this.components[componentType];
		const sheet = this._bottomSheet.open(component, { disableClose: true });
		this.execute(command, {
			componentInstance: sheet.instance,
			sheet: sheet,
			value: value,
		});
	}

	isLogged() {
		return sessionStorage.getItem(this.USER_EMAIL_SESSION_ATTRIBUTE) != null ? true : false;
	}

	get state() {
		return this.appStateService.state;
	}
}
