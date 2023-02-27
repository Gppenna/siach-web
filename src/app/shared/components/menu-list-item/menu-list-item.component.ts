import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppStateService } from 'src/app/app.state';

@Component({
	selector: 'app-menu-list-item',
	templateUrl: './menu-list-item.component.html',
	styleUrls: ['./menu-list-item.component.scss'],
	animations: [
		trigger('indicatorRotate', [
			state('collapsed', style({ transform: 'rotate(0deg)' })),
			state('expanded', style({ transform: 'rotate(180deg) translate(-25%, 0%)' })),
			transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4,0.0,0.2,1)')),
		]),
	],
})
export class MenuListItemComponent implements OnInit {
	@Input() item: any = { expanded: false };
	@HostBinding('attr.aria-expanded') ariaExpanded = this.item.expanded;

	@Output()
	masterMindCloseEvent = new EventEmitter<any>();

	@Input() depth: number;
	@Input() parent: any;

	constructor(private router: Router, public appStateService: AppStateService) {
		if (this.depth === undefined) {
			this.depth = 0;
		}
	}

	ngOnInit() {}

	execute(type: string, data?: any) {
		return this.appStateService.execute({ type: type, data: data });
	}

	onItemSelected(item: any) {
		if (!item.hasOwnProperty('action')) {
			if (!item.children || !item.children.length) {
				this.router.navigate([item.route]);
				item.expanded = !item.expanded;
				if (this.parent) {
					this.parent.expanded = !this.parent.expanded;
				} else {
					this.masterMindCloseEvent.emit(item);
				}
			} else if (item.children && item.children.length) {
				this.masterMindCloseEvent.emit(item);
				item.expanded = !item.expanded;
			}
		}
	}

	handleKeyDown(event: KeyboardEvent, item: any) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			if (item.children && item.children.length) {
				item.expanded = !item.expanded;
			} else {
				this.onItemSelected(item);
			}
		} else {
			if ((!item.children || !item.children.length) && this.parent) {
				console.log(this.parent, 'parent', item);
				if (this.parent.children[this.parent.children.length - 1] === item) {
					this.parent.expanded = !this.parent.expanded;
				}
			}
		}
	}
}
