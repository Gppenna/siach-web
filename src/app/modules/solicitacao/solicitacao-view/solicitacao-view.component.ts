import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppStateService } from 'src/app/app.state';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-solicitacao-view',
  templateUrl: './solicitacao-view.component.html',
  styleUrls: ['./solicitacao-view.component.scss']
})
export class SolicitacaoViewComponent implements OnInit {

  image:any = undefined;
  dataSource:any[] = [];
  dataSourcePendente:any[] = [];
  constructor(
    public appStateService: AppStateService,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.loadDependencies();
    this.loadSolicitacoes()
  }

  loadSolicitacoes() {
    const requestSol = {
      type: 'GET',
      api: environment.apiUrl,
      path: 'solicitacao/table/rascunho'};
    this.execute('http-request', requestSol).subscribe((response:any) => {
      this.dataSourcePendente = response;
    });
  }

  loadDependencies() {
    const request = {
      type: 'GET',
      api: environment.apiUrl,
      path: 'solicitacao/table'};
    this.execute('http-request', request).subscribe((response:any) => {
      this.dataSource = response;
    })
  }

  execute(type: string, data?: any) {
    return this.appStateService.execute({ type: type, data: data });
  }

  openDetails(solicitacao:any) {
    
  }

  statusColor(solicitacao:any) {
    switch(solicitacao.solicitacaoProgressoList[solicitacao.solicitacaoProgressoList.length-1].status.id) {
      case 1:
        return 'enviado';
      case 2:
        return 'analise';
      case 3:
        return 'finalizado';
      default:
        return 'enviado';
    }
  }


}
