import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BarraProgressoModalComponent } from '../perfil/barra-progresso-modal/barra-progresso-modal.component';

@Component({
  selector: 'app-barra-progresso',
  templateUrl: './barra-progresso.component.html',
  styleUrls: ['./barra-progresso.component.scss']
})
export class BarraProgressoComponent implements OnInit {

  @Input()
  dataSource:any = undefined;

  @Input()
  dataSourceSecondary:any = undefined;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openGrupo(data:any) {
    const dialogRef = this.dialog.open(BarraProgressoModalComponent, {
      width: '879px',
      backdropClass: 'blurBackground',
      data: {
        dataSource: data,
        header: this.dataSource
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
