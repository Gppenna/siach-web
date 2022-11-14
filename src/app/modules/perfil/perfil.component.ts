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

  totalHoras = 0;

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
      this.totalHorasCalc(response);
      console.log(this.dataSource, this.userData, 'AAAAA');
    })
  }

  totalHorasCalc(response:any) {
    let totalHoras = 0;
    response.forEach((element:any) => {
      Object.keys(element.perfilGrupo).forEach((key, index) => {
        totalHoras += element.perfilGrupo[key].horasContabilizadas;
      })
      
    });
    this.totalHoras = totalHoras;

    console.log(this.totalHoras, 'hrs', this.appStateService.state)
  }

  execute(type: string, data?: any) {
    return this.appStateService.execute({ type: type, data: data });
  }
  
  get userData() {
    return this.appStateService.state.userData;
  }

}
