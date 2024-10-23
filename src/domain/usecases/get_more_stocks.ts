
import { StockRepositoryInterface } from '../repositories/stock_repository_interface';
import { StockEntity } from '../entities/stock_entity';

export class GetMoreStocksUseCase {
    private stockRepository: StockRepositoryInterface;

    constructor(stockRepository: StockRepositoryInterface) {
        this.stockRepository = stockRepository;
    }

    async execute(newUrl:string): Promise<{ stocks: any[], nextUrl: string | null }> {
       const stocks  =await this.stockRepository.getMoreStocks(newUrl) ;
   
        return stocks;
    }
}
