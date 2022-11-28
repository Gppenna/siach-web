import { DateUtils } from 'src/app/utils/date-utils';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppStateService } from 'src/app/app.state';
import { environment } from 'src/environments/environment';
import { AtividadesModalComponent } from './atividades-modal/atividades-modal.component';

@Component({
  selector: 'app-atividades',
  templateUrl: './atividades.component.html',
  styleUrls: ['./atividades.component.scss']
})
export class AtividadesComponent implements OnInit {

  image:any = undefined;
  dataSource:any[] = [];
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
      path: 'atividade-complementar/table'};
    this.execute('http-request', request).subscribe((response:any) => {
      response.forEach((element:any) => {
        element.imagem = 'data:image/jpg;base64,' + element.imagem;
      });
      this.dataSource = response;
    });
  }

  execute(type: string, data?: any) {
    return this.appStateService.execute({ type: type, data: data });
  }

  openDetails(data:any) {
    const dialogRef = this.dialog.open(AtividadesModalComponent, {
      width: '879px',
      backdropClass: 'blurBackground',
      data: {
        dataSource: data
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  novaDivulgacaoAtividade() {
    this.execute('open-bottom-sheet', {
      type: 'divulgacaoAtividadeSheet'
    });
  }
}
