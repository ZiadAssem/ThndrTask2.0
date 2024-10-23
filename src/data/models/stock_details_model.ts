import { StockDetailsEntity , Branding, Address} from "../../domain/entities/stock_details_entity";

export class StockDetailsModel extends StockDetailsEntity {
    constructor(data: any) {
        // Call the parent constructor to initialize inherited properties
        super({
            ticker: data.ticker,
            name: data.name,
            market: data.market,
            locale: data.locale,
            primary_exchange: data.primary_exchange,
            type: data.type,
            active: data.active,
            currency_name: data.currency_name,
            cik: data.cik,
            composite_figi: data.composite_figi,
            share_class_figi: data.share_class_figi,
            market_cap: data.market_cap,
            phone_number: data.phone_number,
            address: new AddressModel(data.address).toEntity(),
            description: data.description,
            sic_code: data.sic_code,
            sic_description: data.sic_description,
            ticker_root: data.ticker_root,
            homepage_url: data.homepage_url,
            total_employees: data.total_employees,
            list_date: data.list_date,
            branding: new BrandingModel(data.branding).toEntity(),
            share_class_shares_outstanding: data.share_class_shares_outstanding,
            weighted_shares_outstanding: data.weighted_shares_outstanding,
            round_lot: data.round_lot,
        });
    }

    // Function to convert the model back to the entity (already extends StockDetailsEntity)
    toEntity(): StockDetailsEntity {
        return new StockDetailsEntity({
            ticker: this.ticker,
            name: this.name,
            market: this.market,
            locale: this.locale,
            primary_exchange: this.primary_exchange,
            type: this.type,
            active: this.active,
            currency_name: this.currency_name,
            cik: this.cik,
            composite_figi: this.composite_figi,
            share_class_figi: this.share_class_figi,
            market_cap: this.market_cap,
            phone_number: this.phone_number,
            address: this.address,
            description: this.description,
            sic_code: this.sic_code,
            sic_description: this.sic_description,
            ticker_root: this.ticker_root,
            homepage_url: this.homepage_url,
            total_employees: this.total_employees,
            list_date: this.list_date,
            branding: this.branding,
            share_class_shares_outstanding: this.share_class_shares_outstanding,
            weighted_shares_outstanding: this.weighted_shares_outstanding,
            round_lot: this.round_lot,
        });
    }
}

class AddressModel extends Address {
    constructor(data: any) {
        // Initialize the parent class (Address)
        super({
            address1: data.address1,
            address2: data.address2,
            city: data.city,
            state: data.state,
            postal_code: data.postal_code,
        });
    }

    toEntity(): Address {
        return new Address({
            address1: this.address1,
            address2: this.address2,
            city: this.city,
            state: this.state,
            postal_code: this.postal_code,
        });
    }
}

class BrandingModel extends Branding {
    constructor(data: any) {
        super({
            logo_url: data.logo_url,
            icon_url: data.icon_url,
        });
    }

    toEntity(): Branding {
        return new Branding({
            logo_url: this.logo_url,
            icon_url: this.icon_url,
        });
    }
}
