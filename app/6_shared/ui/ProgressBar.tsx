"use client";

import React, { JSX } from 'react';
import { AppProgressBar } from 'next-nprogress-bar';

interface ProgressBarProps {

}

export function ProgressBar( {}: ProgressBarProps ): JSX.Element {
    return (
        <AppProgressBar color="#BCA47C" height="3px" shallowRouting options={{ showSpinner: false }}/>
    );
}