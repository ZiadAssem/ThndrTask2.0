// src/data/sources/RemoteDataSource.test.ts

import { PolygonDataSource } from './polygon_data_source';
import axios from 'axios';

jest.mock('axios');

describe('RemoteDataSource', () => {
    let remoteDataSource: PolygonDataSource;

    beforeEach(() => {
        remoteDataSource = new PolygonDataSource();
    });

    it('should fetch stocks successfully', async () => {
        const mockData = {
            results: [
                {
                    ticker: 'A',
                    name: 'Agilent Technologies Inc.',
                    market: 'stocks',
                    locale: 'us',
                    primary_exchange: 'XNYS',
                    type: 'CS',
                    active: true,
                    currency_name: 'usd',
                    cik: '0001090872',
                    composite_figi: 'BBG000C2V3D6',
                    share_class_figi: 'BBG001SCTQY4',
                    last_updated_utc: '2024-08-21T00:00:00Z',
                },
            ],
        };

        (axios.get as jest.Mock).mockResolvedValue({ data: mockData });

        const stocks = await remoteDataSource.fetchStocks();

        expect(stocks).toHaveLength(1);
        expect(stocks[0].ticker).toBe('A');
        expect(stocks[0].name).toBe('Agilent Technologies Inc.');
        expect(stocks[0].active).toBe(true);

    });

    it('should throw an error when fetching stocks fails', async () => {
        (axios.get as jest.Mock).mockRejectedValue(new Error('Network Error'));

        await expect(remoteDataSource.fetchStocks()).rejects.toThrow('Error fetching stocks: Network Error');
    });
});
