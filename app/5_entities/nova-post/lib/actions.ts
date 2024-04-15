'use server';

import { NovaPostApi } from "./NovaPostApi";
import { 
    SearchSettlementStreetsPropertiesType, 
    SearchSettlementsPropertiesType, 
    SearchWarehousesPropertiesType
} from "./types";

export async function searchSettlementsAction(properties: SearchSettlementsPropertiesType) {
    return NovaPostApi.searchSettlements(properties);
}

export async function searchSettlementStreetsAction(properties: SearchSettlementStreetsPropertiesType) {
    return NovaPostApi.searchSettlementStreets(properties);
}

export async function searchWarehousesAction(properties: SearchWarehousesPropertiesType) {
    return NovaPostApi.searchWarehouses(properties);
}