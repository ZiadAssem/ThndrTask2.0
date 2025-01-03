
import { StockDetailsEntity } from "../entities/stock_details_entity";

export interface StockRepositoryInterface {
    getStocks(limit:number): Promise<{ stocks: any[], nextUrl: string | null }>;
    getStockDetailsByTicker(ticker: string): Promise<StockDetailsEntity>;
    getStockLogoByTicker(ticker: string): Promise<string>;
    getMoreStocks(newUrl: string): Promise<{ stocks: any[], nextUrl: string | null }>;
}
