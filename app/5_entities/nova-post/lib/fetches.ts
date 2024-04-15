'use server';

import { NovaPostApi } from "./NovaPostApi";

export async function fetchSettlementAreas() {
    NovaPostApi.getSettlementAreas();
}