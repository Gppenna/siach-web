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
  totalHorasRascunho = 0;
  addHorasFlag = false;
  constructor( public appStateService: AppStateService) { }

  ngOnInit(): void {
    
    this.loadDependencies();
  }

  loadDependencies() {
    const request = {
      type: 'GET',
      api: environment.apiUrl,
      path: 'perfil'};
    this.execute('http-request', request).subscribe((response:any) => {
      this.dataSource = response;
      this.totalHorasCalc(response);
    });


  }

  totalHorasCalc(response:any) {
    response.forEach((element:any) => {
      Object.keys(element.perfilGrupo).forEach((key, index) => {
        this.totalHoras += element.perfilGrupo[key].horasContabilizadas;

        this.totalHorasRascunho += element.perfilGrupo[key].horasContabilizadasRascunho;
      })
      
    });
    console.log(this.totalHoras, 'hrs', this.totalHorasRascunho)
  }

  execute(type: string, data?: any) {
    return this.appStateService.execute({ type: type, data: data });
  }
  
  get userData() {
    return this.appStateService.state.userData;
  }

}
