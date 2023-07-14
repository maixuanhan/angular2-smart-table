import {Component, EventEmitter, Input, Output} from '@angular/core';


@Component({
    selector: 'angular2-smart-table-tag',
    templateUrl: './tag.component.html',
})
export class TagComponent {

    @Input() item!: string;

    @Output() close = new EventEmitter<string>();

    closeClicked(evt: Event) {
        evt.stopPropagation();
        this.close.emit(this.item);
    }
}
