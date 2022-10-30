import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppStateService } from 'src/app/app.state';

@Component({
  selector: 'app-atividades-modal',
  templateUrl: './atividades-modal.component.html',
  styleUrls: ['./atividades-modal.component.scss']
})
export class AtividadesModalComponent implements OnInit {

  constructor(
    public appStateService: AppStateService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  dataSource:any;

  ngOnInit(): void {
    console.log(this.data, 'this datas');
    this.dataSource = this.data.dataSource;
  }

  execute(type: string, data?: any) {
    return this.appStateService.execute({ type: type, data: data });
  }


}
