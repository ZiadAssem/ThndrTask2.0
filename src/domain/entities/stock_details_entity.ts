export class StockDetailsEntity {
    ticker: string;
    name: string;
    market: string;
    locale: string;
    primary_exchange: string;
    type: string;
    active: boolean;
    currency_name: string;
    cik: string;
    composite_figi: string;
    share_class_figi: string;
    market_cap: number;
    phone_number: string;
    address: Address;
    description: string;
    sic_code: string;
    sic_description: string;
    ticker_root: string;
    homepage_url: string;
    total_employees: number;
    list_date: string;
    branding: Branding;
    share_class_shares_outstanding: number;
    weighted_shares_outstanding: number;
    round_lot: number;

    constructor(data: any) {
        this.ticker = data.ticker;
        this.name = data.name;
        this.market = data.market;
        this.locale = data.locale;
        this.primary_exchange = data.primary_exchange;
        this.type = data.type;
        this.active = data.active;
        this.currency_name = data.currency_name;
        this.cik = data.cik;
        this.composite_figi = data.composite_figi;
        this.share_class_figi = data.share_class_figi;
        this.market_cap = data.market_cap;
        this.phone_number = data.phone_number;
        this.address = new Address(data.address);
        this.description = data.description;
        this.sic_code = data.sic_code;
        this.sic_description = data.sic_description;
        this.ticker_root = data.ticker_root;
        this.homepage_url = data.homepage_url;
        this.total_employees = data.total_employees;
        this.list_date = data.list_date;
        this.branding = new Branding(data.branding);
        this.share_class_shares_outstanding = data.share_class_shares_outstanding;
        this.weighted_shares_outstanding = data.weighted_shares_outstanding;
        this.round_lot = data.round_lot;
    }
}

export class Address {
    address1: string;
    address2?: string;
    city: string;
    state: string;
    postal_code: string;

    constructor(data: any) {
        this.address1 = data.address1;
        this.address2 = data.address2;
        this.city = data.city;
        this.state = data.state;
        this.postal_code = data.postal_code;
    }
}

export class Branding {
    logo_url: string;
    icon_url: string;

    constructor(data: any) {
        this.logo_url = data.logo_url;
        this.icon_url = data.icon_url;
    }
}
