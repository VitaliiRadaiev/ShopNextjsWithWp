"use client";

import React, { JSX, useEffect } from 'react';

export function ScrollTop(): JSX.Element {
    useEffect(() => {
        window.scrollTo({ top: 0});
    },[])
    return (<></>);
}