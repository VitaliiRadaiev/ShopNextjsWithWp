"use client";

import React, { JSX, ReactNode, useEffect, useState } from 'react';
import clsx from 'clsx';
import { CommentType } from '..';
import { Stars } from '@/app/6_shared/ui/Stars';
import { ReviewType } from '../lib/types';

interface CommentProps {
    comment: {
        rating: number;
        node: ReviewType;
    }
    // updateCommentSlot: (text: string) => JSX.Element;
    // deleteCommentSlot: ReactNode;
    // likeDislikeCommentSlot: ReactNode;
    // meId: string;
}

export function Comment({ comment }: CommentProps): JSX.Element {
    return (
        <div className=''>
            <div className='flex justify-between'>
                <div>
                    <div className='text-[20px]'>{comment.node.author.node.name}</div>
                    <div className='mt-1'>
                        <Stars
                            startValue={comment.rating}
                            clickable={false}
                        />
                    </div>
                </div>
                <div className='text-[12px] text-primary-light'>{new Date(comment.node.date).toLocaleString()}</div>
            </div>
            <div className='mt-3 break-words max-w-[600px]' dangerouslySetInnerHTML={{ __html: comment.node.content }} />
            {!!comment.node.replies.nodes.length &&
                
                comment.node.replies.nodes.map(subcomment => {
                    return (
                        <div
                            key={subcomment.databaseId}
                            className='p-4 rounded bg-slate-100 mt-4'
                        >
                            <div className='font-bold'>
                                {subcomment.author.node.name === 'Developer' ? 'Администрация магазина' : subcomment.author.node.name}
                            </div>
                            <div className='mt-4'>
                                <div dangerouslySetInnerHTML={{__html: subcomment.content}}/>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
}