'use server';

import { fetchSessionToken } from "@/app/6_shared/api/getSessionToken";

export async function fetchSessionTokenAction() {
    return fetchSessionToken();
}