import { 
    NovaPostDefaultResponseType, 
    RegionType, 
    SearchSettlementStreetsPropertiesType, 
    SearchSettlementsPropertiesType, 
    SearchWarehousesPropertiesType, 
    SettlementStreetType, 
    SettlementType, 
    WarehouseType 
} from "./types";

export abstract class NovaPostApi {
    static baseUrl = 'https://api.novaposhta.ua/v2.0/json/';

    static baseOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
    }

    static baseBody = {
        apiKey: process.env.NEXT_PUBLIC_NOVA_POST_KEY,
        modelName: 'Address',
    }

    static getSettlementAreas = async () => {
        const res = await fetch(this.baseUrl, {
            ...this.baseOptions,
            body: JSON.stringify({
                ...this.baseBody,
                calledMethod: "getSettlementAreas"
            }),
        });

        return await res.json() as NovaPostDefaultResponseType<RegionType[]>;
    }

    static searchSettlements = async (properties: SearchSettlementsPropertiesType) => {
        const res = await fetch(this.baseUrl, {
            ...this.baseOptions,
            body: JSON.stringify({
                ...this.baseBody,
                calledMethod: "searchSettlements",
                methodProperties: {
                    ...properties
                }
            }),
        });

        return await res.json() as NovaPostDefaultResponseType<{ TotalCount: number; Addresses: SettlementType[] }[]>;
    }

    static searchSettlementStreets = async (properties: SearchSettlementStreetsPropertiesType) => {
        const res = await fetch(this.baseUrl, {
            ...this.baseOptions,
            body: JSON.stringify({
                ...this.baseBody,
                calledMethod: "searchSettlementStreets",
                methodProperties: {
                    ...properties
                }
            }),
        });

        return await res.json() as NovaPostDefaultResponseType<{ TotalCount: number; Addresses: SettlementStreetType[] }[]>;
    }

    static searchWarehouses = async (properties: SearchWarehousesPropertiesType) => {
        const res = await fetch(this.baseUrl, {
            ...this.baseOptions,
            body: JSON.stringify({
                ...this.baseBody,
                calledMethod: "getWarehouses",
                methodProperties: {
                    ...properties
                }
            }),
        });

        return await res.json() as NovaPostDefaultResponseType<WarehouseType[]>;
    }
}