import {Component} from '@angular/core';
import {MicexService, McxSecurities, McxSecuritiesItem} from '../services/micex-api/micex-api';

@Component({
    selector: 'app-root',
    providers: [MicexService],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'JBonds';
    mcxItem: McxSecurities;
    data:Array<McxSecuritiesItem>;
    columns:Array<any>;

    constructor(private micexService: MicexService) {
    }

    ngOnInit() {
        // this.micexService.loadSecurities()
        //     .then(item=> {
        //         this.mcxItem = item;
        //         this.data = item.data;
        //         this.columns = item.columns;
        //         console.log(this.mcxItem)
        //     })
        this.micexService.loadShares()
            .then(item=> {
                this.mcxItem = item;
                this.data = item.data;
                this.columns = item.columns;
                console.log(item)
            })
    }
}
