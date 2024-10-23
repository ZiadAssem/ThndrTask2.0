
import { StockRepositoryInterface } from '../repositories/stock_repository_interface';
import { StockEntity } from '../entities/stock_entity';
import { StockDetailsEntity } from '../entities/stock_details_entity';

export class GetStockDetailsByTickerUseCase {
    private stockRepository: StockRepositoryInterface;

    constructor(stockRepository: StockRepositoryInterface) {
        this.stockRepository = stockRepository;
    }

    async execute(ticker : string): Promise<StockDetailsEntity> {
        return await this.stockRepository.getStockDetailsByTicker(ticker);
    }
}
