export interface NovaPostDefaultResponseType<T> {
    success: boolean;
    data: T;
    info: {
        totalCount?: number;
    }
}

export type RegionType = {
    Ref: string;
    Description: string;
    RegionType: string;
    AreasCenter: string;
}

export type SettlementType = {
    Present: string;
    Warehouses: number;
    MainDescription: string;
    Area: string;
    Region: string;
    SettlementTypeCode: string;
    Ref: string;
    DeliveryCity: string;
    AddressDeliveryAllowed: boolean
    StreetsAvailability: boolean;
    ParentRegionTypes: string;
    ParentRegionCode: string;
    RegionTypes: string;
    RegionTypesCode: string;
}

export type SettlementStreetType = {
    SettlementRef: string;
    SettlementStreetRef: string;
    SettlementStreetDescription: string;
    Present: string;
    StreetsType: string;
    StreetsTypeDescription: string;
    Location: {
        lat: number;
        lon: number;
    },
    SettlementStreetDescriptionRu: string;
}

export type WarehouseType = {
    SiteKey: string;
    Description: string;
    DescriptionRu: string;
    ShortAddress: string;
    ShortAddressRu: string;
    Phone: string;
    TypeOfWarehouse: string;
    Ref: string;
    Number: string;
    CityRef: string;
    CityDescription: string;
    CityDescriptionRu: string;
    SettlementRef: string;
    SettlementDescription: string;
    SettlementAreaDescription: string;
    SettlementRegionsDescription: string;
    SettlementTypeDescription: string;
    SettlementTypeDescriptionRu: string;
    Longitude: string;
    Latitude: string;
    PostFinance: string;
    BicycleParking: string;
    PaymentAccess: string;
    POSTerminal: string;
    InternationalShipping: string;
    SelfServiceWorkplacesCount: string;
    TotalMaxWeightAllowed: string;
    PlaceMaxWeightAllowed: string;
}

export type SearchSettlementsPropertiesType = {
    CityName: string; 
    Limit: string; 
    Page: string;
}

export type SearchSettlementStreetsPropertiesType = {
    SettlementRef: string; 
    StreetName: string;
    Limit: string; 
    Page: string;
}

export type SearchWarehousesPropertiesType = {
    SettlementRef: string; 
    FindByString: string;
    Limit: string; 
    Page: string;
}
