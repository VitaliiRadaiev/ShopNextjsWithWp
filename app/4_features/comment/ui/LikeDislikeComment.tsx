import { DislikesType, LikesType } from '@/app/5_entities/products/comments';
import clsx from 'clsx';
import { SubmitButton } from './SubmitButton';
import { HandThumbDownIcon, HandThumbUpIcon } from '@heroicons/react/24/outline';
import { dislikeAction, likeAction } from '../lib/actions';

interface LikeDislikeCommentProps {
    commentId: string;
    likes: LikesType;
    dislikes: DislikesType;
}

export function LikeDislikeComment( { commentId, likes, dislikes}: LikeDislikeCommentProps ) {
    return (
        <div className='flex gap-4'>
            <form action={likeAction.bind(null, commentId)}>
                <SubmitButton className='flex items-center gap-1 no-underline'>
                    {likes.items.length}
                    <HandThumbUpIcon className='h-[1em] w-auto'/>
                </SubmitButton>
            </form>
            <form action={dislikeAction.bind(null, commentId)}>
                <SubmitButton className='flex items-center gap-1 no-underline'>
                    {dislikes.items.length}
                    <HandThumbDownIcon className='h-[1em] w-auto'/>
                </SubmitButton>
            </form>
        </div>
    );
}