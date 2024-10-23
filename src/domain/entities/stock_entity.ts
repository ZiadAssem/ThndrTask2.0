// src/domain/entities/StockEntity.ts

import { StockDetailsEntity } from "./stock_details_entity";

export class StockEntity {
    ticker: string;
    name: string;
    market: string;
    locale: string;
    primaryExchange: string;
    type: string;
    active: boolean;
    currencyName: string;
    cik: string;
    compositeFigi: string;
    shareClassFigi: string;
    lastUpdatedUtc: string;
    // stockDetails: StockDetailsEntity

    constructor(
        ticker: string,
        name: string,
        market: string,
        locale: string,
        primaryExchange: string,
        type: string,
        active: boolean,
        currencyName: string,
        cik: string,
        compositeFigi: string,
        shareClassFigi: string,
        lastUpdatedUtc: string,
    //    stockDetails: StockDetailsEntity
    ) {
        this.ticker = ticker;
        this.name = name;
        this.market = market;
        this.locale = locale;
        this.primaryExchange = primaryExchange;
        this.type = type;
        this.active = active;
        this.currencyName = currencyName;
        this.cik = cik;
        this.compositeFigi = compositeFigi;
        this.shareClassFigi = shareClassFigi;
        this.lastUpdatedUtc = lastUpdatedUtc;
        // this.stockDetails = stockDetails;
    }
    static toPlainObject(stock: StockEntity) {
        return {
          ticker: stock.ticker,
          name: stock.name,
          market: stock.market,
        locale: stock.locale,
        primaryExchange: stock.primaryExchange,
        type: stock.type,
        active: stock.active,
        currencyName: stock.currencyName,
        cik: stock.cik,
        compositeFigi: stock.compositeFigi,
        shareClassFigi: stock.shareClassFigi,
        lastUpdatedUtc: stock.lastUpdatedUtc,
        };
      }
}
