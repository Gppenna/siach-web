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
    private appStateService: AppStateService,
  ) {}

  ngOnInit(): void {
    this.initState();
  }

  private initState() {
    this.appStateService.getState().subscribe((state) => {
      console.log('state', state);
    });
  }

  execute(type: string, data?: any) {
    return this.appStateService.execute({ type: type, data: data });
  }

  get state() {
    return this.appStateService.state;
  }
}
