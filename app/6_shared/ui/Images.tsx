'use client';

import clsx from 'clsx';
import Image from 'next/image';
import noImage from '@/public/images/no_image.png';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { PropsWithChildren } from 'react';

type Src = string | StaticImport | null | undefined

interface IImageRemoteProps {
    src: Src;
    className?: string;
    width?: number;
    height?: number;
}

export function ImageRemote({ src, className = '', width, height }: IImageRemoteProps) {

    return (
        <Image
            src={src || noImage}
            className={clsx('transition-opacity opacity-0', className)}
            onLoad={(img) => img.currentTarget.style.opacity = '1'}
            width={width ? width : 500}
            height={height ? height : 500}
            alt=''
            style={{ width: 'auto' }}
        />
    );
}

interface ImageFadeInProps {
    src: string | StaticImport;
    className?: string;
    width?: number;
    height?: number;
}

export function ImageFadeIn({ src, className = '', width, height }: ImageFadeInProps) {

    return (
        <Image
            alt=''
            src={src}
            className={clsx('transition-opacity opacity-0', className)}
            onLoad={(img) => img.currentTarget.style.opacity = '1'}
            width={width}
            height={height}
        />
    );
}

interface PictureProps {
    className?: string;
    src: string | StaticImport;
    srcSet: string | StaticImport;
}

export function Picture({ src, srcSet, className = '' }: PropsWithChildren<PictureProps>) {
    return (
        <>
            <ImageFadeIn
                src={srcSet}
                className={clsx(
                    "hidden md:block",
                    className
                )}
            />
            <ImageFadeIn
                src={src}
                className={clsx(
                    "md:hidden",
                    className
                )}
            />
        </>
    )
}