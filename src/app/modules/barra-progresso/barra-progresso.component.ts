import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-barra-progresso',
  templateUrl: './barra-progresso.component.html',
  styleUrls: ['./barra-progresso.component.scss']
})
export class BarraProgressoComponent implements OnInit {

  @Input()
  dataSource:any = undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
