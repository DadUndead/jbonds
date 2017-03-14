/**
 * Created by User on 14.03.2017.
 */
import {Http, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

const BASE_URL = "http://iss.moex.com/iss/";
const HEADER = {headers: new Headers({'Content-Type': 'application/json'})};

export interface McxSecuritiesItem {
    secid:string,
    boardid:string,
    shortname:string,
    prevprice:number,
    lotsize:number,
    facevalue:number,
    status:string,
    boardname:string,
    decimals:number,
    secname:string,
    remarks:string,
    marketcode:string,
    instrid:string,
    sectorid:string,
    minstep:number,
    prevwaprice:number,
    faceunit:string,
    prevdate:string,
    issuesize:number,
    isin:string,
    latname:string,
    regnumber:string,
    prevlegalcloseprice:number,
    prevadmittedquote:number,
    currencyid:string,
    sectype:string,
    listlevel:number,
}

export interface McxSecurities {
    metadata: Object;
    columns: Array<string>;
    data: Array<McxSecuritiesItem>;
}

@Injectable()
export class MicexService {
    constructor(private http: Http) {
    }

    loadSecurities() {
        return this.http.get(`${BASE_URL}/securities.json`)
            .map(res=>({
                metadata: res.json().securities.metadata,
                columns: res.json().securities.columns,
                data: res.json().securities.data.map(item=>({
                    id: item[0],
                    secid: item[1],
                    shortname: item[2],
                    regnumber: item[3],
                    name: item[4],
                    isin: item[5],
                    is_traded: item[6],
                    emitent_id: item[7],
                    emitent_title: item[8],
                    emitent_inn: item[9],
                    emitent_okpo: item[10],
                    gosreg: item[11],
                    type: item[12],
                    group: item[13],
                    primary_boardid: item[14],
                    marketprice_boardid: item[15],
                }))
            }))
            .toPromise()
    }

    loadShares() {
        return this.http.get(`${BASE_URL}/engines/stock/markets/shares/securities.json`)
            .map(res=>{
                let securities = res.json().securities;

                return {
                    metadata: securities.metadata,
                    columns: securities.columns,
                    data: securities.data.map(item=>{
                        let share={};
                        securities.columns.forEach((col, i)=>share[col.toLowerCase()]=item[i]);
                        return share
                    })
                }
            }

                )
            .toPromise()
    }
}