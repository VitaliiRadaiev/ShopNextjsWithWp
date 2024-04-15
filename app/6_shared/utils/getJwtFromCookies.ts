'use server';

import { cookies } from "next/headers";

export async function getJwtFromCookies() {
    const jwtCooky = cookies().get('user-jwt');
    if(!jwtCooky || !jwtCooky.value.trim().length) return;
    return jwtCooky.value;
}