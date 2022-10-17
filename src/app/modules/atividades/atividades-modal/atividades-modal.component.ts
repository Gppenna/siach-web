import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppStateService } from 'src/app/app.state';

@Component({
  selector: 'app-atividades-modal',
  templateUrl: './atividades-modal.component.html',
  styleUrls: ['./atividades-modal.component.scss']
})
export class AtividadesModalComponent implements OnInit {

  constructor(
    public appStateService: AppStateService
    ) { }

  ngOnInit(): void {
  }

  execute(type: string, data?: any) {
    return this.appStateService.execute({ type: type, data: data });
  }


}
