import axios from 'axios';
import { StockModel } from '../models/stock_model';
import { StockDetailsModel } from '../models/stock_details_model';

interface PolygonDataSourceInterface {
    fetchStocks(limit: number): Promise<{ stocks: StockModel[]; nextUrl: string | null }>;
    fetchStockLogoByTicker(ticker: string): Promise<string>;
    fetchStockDetailsByTicker(ticker: string): Promise<StockDetailsModel>;
    fetchMoreStocks(newUrl: string): Promise<{ stocks: StockModel[]; nextUrl: string | null }>;
}

export class PolygonDataSource implements PolygonDataSourceInterface {
    private apiKey = process.env.REACT_APP_API_KEY;
    private apiBase = `https://api.polygon.io/v3/reference/tickers`;
    private apiSuffix = `?active=true&limit=`;
    private headers = {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
    };

    // Retry configuration
    private readonly maxRetries = 3; // Maximum number of retries
    private readonly retryDelay = 10000; // Delay in milliseconds before retrying (10 seconds)

    // Fetches stocks with a limit
    async fetchStocks(limit: number): Promise<{ stocks: StockModel[]; nextUrl: string | null }> {
        return this.makeRequest(
            async () => {
                const apiUrl = `${this.apiBase}${this.apiSuffix}${limit}&apiKey=${this.apiKey}`;
                const response = await axios.get(apiUrl, { headers: this.headers });
                return {
                    stocks: response.data.results.map((item: any) => new StockModel(item)),
                    nextUrl: response.data.next_url,
                };
            },
            this.maxRetries,
            this.retryDelay
        );
    }

    async fetchStockLogoByTicker(ticker: string): Promise<string> {
        return this.makeRequest(
            async () => {
                const model = await this.fetchStockDetailsByTicker(ticker);
                return model.branding.logo_url;
            },
            this.maxRetries,
            this.retryDelay
        );
    }

    // Fetches a single stock details using ticker
    async fetchStockDetailsByTicker(ticker: string): Promise<StockDetailsModel> {
        return this.makeRequest(
            async () => {
                const response = await axios.get(`${this.apiBase}/${ticker}${this.apiSuffix}&apiKey=${this.apiKey}`, {
                    headers: this.headers,
                });
                return new StockDetailsModel(response.data.results);
            },
            this.maxRetries,
            this.retryDelay
        );
    }

    // Fetches stocks when user scrolls down using next_url
    async fetchMoreStocks(newUrl: string): Promise<{ stocks: StockModel[]; nextUrl: string | null }> {
        return this.makeRequest(
            async () => {
                const response = await axios.get(newUrl, { headers: this.headers });
                return {
                    stocks: response.data.results.map((item: any) => new StockModel(item)),
                    nextUrl: response.data.next_url,
                };
            },
            this.maxRetries,
            this.retryDelay
        );
    }

    // Generic function for retrying requests with exponential backoff
    private async makeRequest<T>(request: () => Promise<T>, retries: number, delay: number): Promise<T> {
        try {
            return await request();
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 429) {
                if (retries > 0) {
                    console.warn('API rate limit reached, retrying in', delay / 1000, 'seconds');
                    await new Promise((resolve) => setTimeout(resolve, delay));
                    delay *= 2; // Exponential backoff for subsequent retries
                    return await this.makeRequest(request, retries - 1, delay);
                } else {
                    throw new Error('Error fetching data: Too Many Requests (429)');
                }
            } else {
                throw error; // Re-throw other errors
            }
        }
    }
}