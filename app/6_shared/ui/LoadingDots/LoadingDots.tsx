import React, { JSX } from 'react';
import style from './LoadingDots.module.css';

export function LoadingDots(): JSX.Element {
    return (
        <div className={style.lds_ellipsis}><div></div><div></div><div></div><div></div></div>
    );
}