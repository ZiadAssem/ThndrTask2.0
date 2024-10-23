
import { StockRepositoryInterface } from '../repositories/stock_repository_interface';

export class GetStockDetailsByTickerUseCase {
    private stockRepository: StockRepositoryInterface;

    constructor(stockRepository: StockRepositoryInterface) {
        this.stockRepository = stockRepository;
    }

    async execute(ticker : string): Promise<any> {
        return await this.stockRepository.getStockDetailsByTicker(ticker);
    }
}
