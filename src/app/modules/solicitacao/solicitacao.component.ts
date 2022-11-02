import { DateUtils } from 'src/app/utils/date-utils';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppStateService } from 'src/app/app.state';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-solicitacao',
  templateUrl: './solicitacao.component.html',
  styleUrls: ['./solicitacao.component.scss']
})
export class SolicitacaoComponent implements OnInit {

  userData:any = undefined;
  dataSource:any = undefined;
  constructor(
    public appStateService: AppStateService,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.loadDependencies();
  }

  loadDependencies() {
    const request = {
      type: 'GET',
      api: environment.apiUrl,
      path: 'logged-user'};
    this.execute('http-request', request).subscribe((response:any) => {
      this.userData = response;
    });

    this.loadSolicitacoes();
  }

  loadSolicitacoes() {
    const requestSol = {
      type: 'GET',
      api: environment.apiUrl,
      path: 'solicitacao/table/rascunho'};
    this.execute('http-request', requestSol).subscribe((response:any) => {
      this.dataSource = response;
    });
  }

  execute(type: string, data?: any) {
    return this.appStateService.execute({ type: type, data: data });
  }

  novaDivulgacaoAtividade() {
    this.execute('open-bottom-sheet', {
      type: 'solicitacaoSheet',
      backSearch: {
        func: () => this.loadSolicitacoes(),
        parameter: {},
      },
    });
  }

  editSolicitacao(solicitacao:any) {
    this.execute('open-bottom-sheet', {
      type: 'solicitacaoSheet',
      data: solicitacao,
      backSearch: {
        func: () => this.loadSolicitacoes(),
        parameter: {},
      },
    });
  }
}
