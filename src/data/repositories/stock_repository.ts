// src/data/repositories/StockRepository.ts

import { PolygonDataSource } from '../sources/polygon_data_source';
import { StockEntity } from '../../domain/entities/stock_entity';
import { StockRepositoryInterface } from '../../domain/repositories/stock_repository_interface';
import { StockModel } from '../models/stock_model';
import { StockDetailsEntity } from '../../domain/entities/stock_details_entity';

export class StockRepository implements StockRepositoryInterface {
    private remoteDataSource: PolygonDataSource;

    constructor() {
        this.remoteDataSource = new PolygonDataSource();
    }
    getStockLogoByTicker(ticker: string): Promise<string> {
        const logoUrl = this.remoteDataSource.fetchStockLogoByTicker(ticker);
        return logoUrl;
    }
   async getStockDetailsByTicker(ticker: string): Promise<StockDetailsEntity> {
       const StockDetailsModel = await this.remoteDataSource.fetchStockDetailsByTicker(ticker);
         return StockDetailsModel.toEntity();
    }

    async getStocks(limit:number): Promise<{ stocks:any [], nextUrl: string | null }> {
        const stockModels = await this.remoteDataSource.fetchStocks(limit);

        return {
            stocks:stockModels['stocks'].map((model: StockModel) => StockEntity.toPlainObject( model.toEntity())),
            nextUrl: stockModels['nextUrl']
        };

    }
}
