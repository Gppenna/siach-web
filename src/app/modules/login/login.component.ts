import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppStateService } from 'src/app/app.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  credentials = {email: '', senha: ''};

  constructor(public appStateService: AppStateService, private readonly router: Router,) { }

  ngOnInit(): void {
  }

  execute(type: string, data?: any) {
    return this.appStateService.execute({ type: type, data: data });
  }

  login() {
    this.execute('login', this.credentials);
  }

  registrar() {
    this.router.navigate(['/registrar']);
  }

}
