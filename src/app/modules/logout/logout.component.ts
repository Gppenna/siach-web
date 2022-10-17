import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppStateService } from 'src/app/app.state';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(public appStateService: AppStateService, private readonly router: Router) { 
    this.execute('logout');
    this.router.navigate(['login']);
  }

  ngOnInit(): void {
  }

  execute(type: string, data?: any) {
    return this.appStateService.execute({ type: type, data: data });
  }

}
