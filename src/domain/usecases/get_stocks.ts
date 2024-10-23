
import { StockRepositoryInterface } from '../repositories/stock_repository_interface';
import { StockEntity } from '../entities/stock_entity';

export class GetStocksUseCase {
    private stockRepository: StockRepositoryInterface;

    constructor(stockRepository: StockRepositoryInterface) {
        this.stockRepository = stockRepository;
    }

    async execute(limit:number): Promise<{ stocks: any[], nextUrl: string | null }> {
       const stocks  =await this.stockRepository.getStocks(limit) ;
    //    console.log('stocksss');
    //      console.log(stocks);
        return stocks;
    }
}
