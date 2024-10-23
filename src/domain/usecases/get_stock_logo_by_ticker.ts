
import { StockRepositoryInterface } from '../repositories/stock_repository_interface';

export class GetStockLogoByTickerUseCase {
    private stockRepository: StockRepositoryInterface;

    constructor(stockRepository: StockRepositoryInterface) {
        this.stockRepository = stockRepository;
    }

    async execute(ticker : string): Promise<string> {
        return await this.stockRepository.getStockLogoByTicker(ticker);
    }
}
