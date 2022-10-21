import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppStateService } from 'src/app/app.state';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent implements OnInit {

  registerForm: FormGroup;

  confirmarSenha = '';

  constructor(
    private readonly router: Router,
    public appStateService: AppStateService,
    private readonly formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.buildRegisterForm();
  }

  private buildRegisterForm(): void {
    this.registerForm = this.formBuilder.group({
      email: '',
      matricula: '',
      nome: '',
      idCurso: '',
      senha: '',
      confirmarSenha: ''
    });
  }

  execute(type: string, data?: any) {
    return this.appStateService.execute({ type: type, data: data });
  }

  registrar() {
    this.execute('registrar', this.registerForm.value);
  }

  cancel() {
    this.router.navigate(['/login']);
  }

}
