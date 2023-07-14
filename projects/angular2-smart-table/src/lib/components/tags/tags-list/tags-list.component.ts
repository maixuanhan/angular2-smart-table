import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'angular2-smart-table-tags-list',
    templateUrl: './tags-list.component.html',
})
export class TagsListComponent {

    @Input() tags!: string[];

    @Output() close = new EventEmitter<string>();

    closedTag(tag: string) {
        this.close.emit(tag);
    }
}
