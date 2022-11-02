import { GrupoSheet } from './modules/forms/grupo/grupo';
import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AppStateService } from './app.state';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AtividadeSheet } from './modules/forms/atividade/atividade';
import { DivulgacaoAtividadeSheet } from './modules/forms/divulgacao-atividade/divulgacao-atividade';
import { SolicitacaoSheet } from './modules/forms/solicitacao/solicitacao';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  USER_EMAIL_SESSION_ATTRIBUTE = 'authenticatedUserEmail';
  title = 'siach-web';

  private components: { [key: string]: any } = {
    grupoSheet: GrupoSheet,
    atividadeSheet: AtividadeSheet,
    divulgacaoAtividadeSheet: DivulgacaoAtividadeSheet,
    solicitacaoSheet: SolicitacaoSheet
  };

  @ViewChild('drawer') drawer: MatSidenav;

  constructor(
    public appStateService: AppStateService,
    private _bottomSheet: MatBottomSheet
  ) {}

  ngOnInit(): void {
    this.initState();
  }

  private initState() {
    this.appStateService.getState().subscribe((state) => {
      console.log('state', state);
      this.update(state);
    });
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
