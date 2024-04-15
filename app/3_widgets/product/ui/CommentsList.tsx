'use client'

import { CommentType } from '@/app/5_entities/products/comments';
import clsx from 'clsx';
import { Comment } from '@/app/5_entities/products/comments';
import { DeleteComment, LikeDislikeComment, UpdateComment } from '@/app/4_features/comment';
import { ReviewType } from '@/app/5_entities/products/comments/lib/types';

interface CommentsListProps {
    comments: {
        rating: number;
        node: ReviewType;
    }[];
}

export function CommentsList({ comments }: CommentsListProps) {
    return (
        <ul>
            {
                comments.map(comment => {
                    return (
                        <li
                            className='[&:not(:first-child)]:pt-4 pb-4 border-b border-slate-200'
                            key={comment.node.databaseId}
                        >
                            <Comment
                                comment={comment}
                                // updateCommentSlot={(text: string) => <UpdateComment commentId={comment.id} text={text} />}
                                // deleteCommentSlot={<DeleteComment commentId={comment.id}/>}
                                // likeDislikeCommentSlot={<LikeDislikeComment commentId={comment.id} likes={comment.likes} dislikes={comment.dislikes} />}
                                // meId={meId}
                            />
                        </li>
                    );
                })
            }
        </ul>
    );
}