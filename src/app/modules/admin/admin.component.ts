import { environment } from './../../../environments/environment';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AppStateService } from 'src/app/app.state';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AdminComponent implements OnInit {

  dataSource:any = [
    {numero: '1', descricao: 'Extensão', minimoHoras: 30},
    {numero: '2', descricao: 'Extensão', minimoHoras: 30},
    {numero: '3', descricao: 'Extensão', minimoHoras: 30},
    {numero: '4', descricao: 'Extensão', minimoHoras: 30},
    {numero: '5', descricao: 'Extensão', minimoHoras: 30},
    {numero: '6', descricao: 'Extensão', minimoHoras: 30},
  ];
  columns =
    [
      { columnDef: 'numero', header: 'Número' },
      { columnDef: 'descricao',  header: 'Grupo' },
      { columnDef: 'minimoHoras',  header: 'Mínimo de Horas' },

    ];
  columnsToDisplay:any = undefined;
  columnsToDisplayWithExpand:any = undefined;
  expandedElement: any | null;

  constructor(public appStateService: AppStateService) { }

  ngOnInit(): void {
    this.columnsToDisplay = this.columns? this.columns.map(c => c.columnDef) : null;
    this.columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
    this.loadDependencies();
  }

  loadDependencies() {
    const request = {
      type: 'GET',
      api: environment.apiUrl,
      path: 'barema/table'};
    this.execute('http-request', request).subscribe((response:any) => {
      console.log(response, 'response');
    })
  }

  execute(type: string, data?: any) {
    return this.appStateService.execute({ type: type, data: data });
  }

  novoGrupo() {

  }

}
