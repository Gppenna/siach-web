import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppStateService } from 'src/app/app.state';
import { AtividadesModalComponent } from './atividades-modal/atividades-modal.component';

@Component({
  selector: 'app-atividades',
  templateUrl: './atividades.component.html',
  styleUrls: ['./atividades.component.scss']
})
export class AtividadesComponent implements OnInit {

  constructor(
    public appStateService: AppStateService,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
  }

  execute(type: string, data?: any) {
    return this.appStateService.execute({ type: type, data: data });
  }

  openDetails(data:any) {
    const dialogRef = this.dialog.open(AtividadesModalComponent, {
      width: '879px',
      backdropClass: 'blurBackground',
      data: {
        id: null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  novaDivulgacaoAtividade() {
    this.execute('open-bottom-sheet', {
      type: 'divulgacaoAtividade'
    });
  }
}
