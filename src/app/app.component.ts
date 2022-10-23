import { GrupoSheet } from './modules/forms/grupo/grupo';
import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AppStateService } from './app.state';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'siach-web';

  private components: { [key: string]: any } = {
    grupo: GrupoSheet,
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

  get state() {
    return this.appStateService.state;
  }
}
