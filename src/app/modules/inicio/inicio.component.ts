import { Component, OnInit } from '@angular/core';
import { AppStateService } from 'src/app/app.state';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  USER_NAME_SESSION_ATTRIBUTE = 'authenticatedUserName';

  constructor(public appStateService: AppStateService) { }

  ngOnInit(): void {
  }

  execute(type: string, data?: any) {
    return this.appStateService.execute({ type: type, data: data });
  }

  getUserName() {
    return sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE);
  }

}
