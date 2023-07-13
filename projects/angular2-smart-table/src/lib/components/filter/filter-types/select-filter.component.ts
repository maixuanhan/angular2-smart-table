import {Component, OnInit, ViewChild} from '@angular/core';
import {NgControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged, skip} from 'rxjs/operators';

import {DefaultFilter} from './default-filter';
import {FilterSettings, ListFilterSettings} from "../../../lib/settings";

@Component({
  selector: 'select-filter',
  template: `
    <select [ngClass]="inputClass"
            class="form-control"
            #inputControl
            [(ngModel)]="query">

        <option value="">{{ config.selectText ?? 'Select...' }}</option>
        <option *ngFor="let option of config.list" [value]="option.value">
          {{ option.title }}
        </option>
    </select>
  `,
})
export class SelectFilterComponent extends DefaultFilter implements OnInit {

  @ViewChild('inputControl', { read: NgControl, static: true }) inputControl!: NgControl;

  config!: ListFilterSettings;

  ngOnInit() {
    this.config = (this.column.filter as FilterSettings).config as ListFilterSettings;
    if (this.config.strict === undefined || this.config.strict) {
      this.column.filterFunction = (v, f) => v === f;
    }

    const exist = this.inputControl.valueChanges;
    if (!exist) {
      return;
    }
    exist
      .pipe(
        skip(1),
        distinctUntilChanged(),
        debounceTime(this.delay)
      )
      .subscribe((value: string) => this.setFilter());
  }
}
