import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppStateService } from 'src/app/app.state';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent implements OnInit {

  confirmarSenha = '';

  form:any = {
    matricula: '',
    nome: '',
    email: '',
    senha: '',
    idCurso: ''
  }

  constructor(private readonly router: Router, public appStateService: AppStateService) { }

  ngOnInit(): void {
  }

  execute(type: string, data?: any) {
    return this.appStateService.execute({ type: type, data: data });
  }

  registrar() {
    if(this.form.senha !== this.confirmarSenha) {
      return;
    }
    this.execute('registrar', this.form);
  }

  cancel() {
    this.router.navigate(['/login']);
  }

}
