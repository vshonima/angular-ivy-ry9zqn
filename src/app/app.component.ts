import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  ColDef,
  FirstDataRenderedEvent,
  GridReadyEvent,
  IDetailCellRendererParams,
} from 'ag-grid-community';
import 'ag-grid-enterprise';
import { IAccount, ICallRecord } from './interfaces';
import { MoodRenderer } from './mood-renderer.component';
import {MatMenuModule} from '@angular/material/menu';

@Component({
 selector: 'app-root',
 templateUrl: './app.component.html',
 styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    // group cell renderer needed for expand / collapse icons
    { field: 'id', filter:true, cellRendererSelector: params => {

          return {
              component: MoodRenderer,
          };
        }
 },
    { field: 'name', cellRenderer: 'agGroupCellRenderer',checkboxSelection:true, filter:true, sortable:true,  },
    { field: 'account', filter:true, },
    { field: 'calls',  filter:true },
    { field: 'minutes', valueFormatter: "x.toLocaleString() + 'm'" },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
  };
  public detailCellRendererParams: any = {
    detailGridOptions: {
      columnDefs: [
        { field: 'callId' },
        { field: 'direction' },
        { field: 'number', minWidth: 150 },
        { field: 'duration', valueFormatter: "x.toLocaleString() + 's'" },
        { field: 'switchCode', minWidth: 150 },
      ],
      defaultColDef: {
        flex: 1,
      },
    },
    getDetailRowData: (params:any) => {
      params.successCallback(params.data.callRecords);
    },
  } as IDetailCellRendererParams<IAccount, ICallRecord>;
  public rowData!: IAccount[];

  constructor(private http: HttpClient) {}

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    // arbitrarily expand a row for presentational purposes
    setTimeout(function () {
      params.api.getDisplayedRowAtIndex(1)!.setExpanded(true);
    }, 0);
  }

  onGridReady(params: GridReadyEvent<IAccount>) {
    this.http
      .get<IAccount[]>(
        'https://www.ag-grid.com/example-assets/master-detail-data.json'
      )
      .subscribe((data) => {
        this.rowData = data;
      });
  }
}
