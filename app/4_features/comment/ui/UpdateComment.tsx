import clsx from 'clsx';
import { updateCommentAction } from '../lib/actions';
import { SubmitButton } from './SubmitButton';

interface UpdateCommentProps {
    commentId: string;
    text: string;
}

export function UpdateComment({ commentId, text }: UpdateCommentProps) {

    return (
        <form action={updateCommentAction.bind(null, commentId, text)} className='flex items-center'>
            <SubmitButton>Обновить</SubmitButton>
        </form>
    );
}

