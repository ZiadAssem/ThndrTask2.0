
import axios from 'axios';
import { StockModel } from '../models/stock_model';
import { StockDetailsModel } from '../models/stock_details_model';


interface PolygonDataSourceInterface {
    fetchStocks(limit: number): Promise<{ stocks: StockModel[], nextUrl: string | null }>;
    fetchStockLogoByTicker(ticker: string): Promise<string>;
    fetchStockDetailsByTicker(ticker: string): Promise<StockDetailsModel>;



}
export class PolygonDataSource implements PolygonDataSourceInterface {

    private apiKey = process.env.REACT_APP_API_KEY;
    private apiBase = process.env.REACT_APP_API_BASE_URL;
    private apiSuffix = process.env.REACT_APP_API_SUFFIX_URL;


    async fetchStocks(limit: number): Promise<{ stocks: StockModel[], nextUrl: string | null }> {
        const apiUrl = `${this.apiBase}${this.apiSuffix}${limit}&apiKey=${this.apiKey}`;

        try {

            const response = await axios.get(apiUrl, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                },
            });
             console.log(`logging response ${response.data.next_url}`);
            return {
                stocks:              response.data.results.map((item: any) => new StockModel(item)),
                nextUrl: response.data.next_url
            }
        } catch (error) {

            console.error(`Error fetching stocks: ${apiUrl}`, error); // Log the complete error
            throw new Error('Error fetching stocks: ' + (error as Error).message);
        }
    }

    async fetchStockLogoByTicker(ticker: string): Promise<string> {
        try {
            const model = await this.fetchStockDetailsByTicker(ticker);
            return model.branding.logo_url;
        }
        catch (error) {
            console.error(`Error fetching stock logo: ${ticker}`, error); // Log the complete error
            throw new Error('Error fetching stock logo: ' + (error as Error).message);
        }
    }

    async fetchStockDetailsByTicker(ticker: string): Promise<StockDetailsModel> {
        try {
            const response = await axios.get(`${this.apiBase}/${ticker}${this.apiSuffix}&apiKey=${this.apiKey}`, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                },
            });
            console.log(`${this.apiBase}/${ticker}${this.apiSuffix}&apiKey=${this.apiKey}`);
            console.log(`logging response ${response.data.results}`);
            return new StockDetailsModel(response.data.results);
        } catch (error) {
            console.error(`Error fetching stock: ${ticker}`, error); // Log the complete error
            throw new Error('Error fetching stock: ' + (error as Error).message);
        }
    }

}
