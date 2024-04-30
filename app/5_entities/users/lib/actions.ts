'use client';

import { fetchSessionToken } from "@/app/6_shared/api/getSessionToken";
import { fetchApi } from "@/app/6_shared/api/graphqlApi";

export async function fetchSessionTokenAction() {
    return fetchSessionToken();
}