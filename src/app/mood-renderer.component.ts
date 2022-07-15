import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { ICellRendererParams } from '@ag-grid-community/core';
import { Component } from '@angular/core';


@Component({
  selector: 'mood-cell',
  template: `<button mat-button *ngIf="visible" (click)="visible = false">Simple Menu</button>

<mat-menu #menu="matMenu">
  <button mat-menu-item>Menu Item 1</button>
  <button mat-menu-item>Menu Item 2</button>
</mat-menu>`
})
export class MoodRenderer implements ICellRendererAngularComp {
  private params!: ICellRendererParams;
  private mood!: string;
  public imgForMood!: string;
 public visible=true;
  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.setMood(params);
  }

  refresh(params: ICellRendererParams): boolean {
    this.params = params;
    this.setMood(params);
    return true;
  }

  private setMood(params: ICellRendererParams) {
    this.mood = params.value;
    this.imgForMood =
      'https://www.ag-grid.com/example-assets/smileys/' +
      (this.mood === 'Happy' ? 'happy.png' : 'sad.png');
  }
}