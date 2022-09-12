import { Component } from '@angular/core';
import { AppStateService } from './app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'siach-web';

  constructor(
    private appState: AppStateService,
  ) {}

  ngOnInit(): void {
    this.initState();
  }

  private initState() {
    this.appState.getState().subscribe((state) => {
      console.log('state', state);
    });
  }

  get state() {
    return this.appState.state;
  }
}
