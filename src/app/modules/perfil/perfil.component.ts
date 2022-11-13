import { Component, OnInit } from '@angular/core';
import { AppStateService } from 'src/app/app.state';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  dataSource:any[] = [];
  userData:any;

  constructor( public appStateService: AppStateService) { }

  ngOnInit(): void {
    this.loadDependencies();
  }

  loadDependencies() {
    const request = {
      type: 'GET',
      api: environment.apiUrl,
      path: 'solicitacao/table/finalizado'};
    this.execute('http-request', request).subscribe((response:any) => {
      this.dataSource = response;
      this.userData = this.appStateService.state.userData;
      console.log(this.dataSource, this.userData, 'AAAAA');
    })
  }

  execute(type: string, data?: any) {
    return this.appStateService.execute({ type: type, data: data });
  }

}
