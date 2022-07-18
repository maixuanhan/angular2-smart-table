import { Component, Input, Output, EventEmitter, OnChanges, HostListener } from '@angular/core';

import { Grid } from '../../lib/grid';
import { DataSource } from '../../lib/data-source/data-source';
import { TableService } from '../../services/table.service';

@Component({
  selector: '[angular2-st-thead]',
  styleUrls: ['./thead.component.scss'],
  templateUrl: './thead.component.html',
})
export class NgxSmartTableTheadComponent implements OnChanges {

  @Input() grid!: Grid;
  @Input() source!: DataSource;
  @Input() isAllSelected!: boolean;
  @Input() createConfirm!: EventEmitter<any>;
  @Input() createCancel!: EventEmitter<any>;

  @Output() sort = new EventEmitter<any>();
  @Output() hide = new EventEmitter<any>();
  @Output() selectAllRows = new EventEmitter<any>();
  @Output() create = new EventEmitter<any>();
  @Output() filter = new EventEmitter<any>();

  isHideHeader!: boolean;
  isHideSubHeader!: boolean;

  constructor(private tableService: TableService) {
  }

  ngOnChanges() {
    this.isHideHeader = this.grid.getSetting('hideHeader');
    this.isHideSubHeader = this.grid.getSetting('hideSubHeader');
  }

  @HostListener('mousemove', ['$event'])
  mouseMove(event: MouseEvent) {
    this.tableService.mouseMoveEvent$.next(event);
  }
}
