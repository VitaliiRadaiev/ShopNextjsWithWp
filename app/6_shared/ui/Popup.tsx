'use client';

import React, { PropsWithChildren, MouseEvent, useRef, useState, useEffect } from 'react';
import clsx from 'clsx';
import { CSSTransition } from 'react-transition-group';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { createPortal } from 'react-dom';


interface PopupProps {
    onClose: (e: MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
    toggleShow: boolean;
    componentDidMount?: () => void;
}

export function Popup({ children, toggleShow, onClose, componentDidMount }: PropsWithChildren<PopupProps>): JSX.Element {
    const divRef = useRef(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, [])

    return (
        <>
            {mounted && createPortal(
                <CSSTransition
                    in={toggleShow}
                    timeout={300}
                    mountOnEnter
                    unmountOnExit
                    classNames={{
                        enter: 'opacity-0',
                        enterActive: 'transition-opacity opacity-100 duration-400',
                        exit: '',
                        exitActive: 'transition-opacity opacity-0 duration-400'
                    }}
                    onEnter={() => componentDidMount && componentDidMount()}
                    nodeRef={divRef}
                >
                    <div ref={divRef} className='fixed inset-0 z-50 bg-slate-600/45 overflow-auto'>
                        <div className='flex p-4 items-center justify-center min-h-full' onClick={(e) => {
                            onClose(e);
                        }}>
                            <div className='w-full max-w-[500px] relative bg-white rounded' onClick={(e) => e.stopPropagation()}>
                                <button
                                    className='w-8 absolute top-2 right-2 z-2 p-1 flex items-center justify-center hover:bg-slate-100 transition'
                                    onClick={onClose}
                                >
                                    <XMarkIcon className='h-full w-auto' />
                                </button>
                                <div className='p-3'>
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                </CSSTransition>,
                document.body
            )}
        </>
    );
}
