import clsx from 'clsx';
import { InputHTMLAttributes, PropsWithChildren, Ref, forwardRef } from 'react';

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> { }

export const Radio = forwardRef(function Radio(
    { children, type, className, ...props }: PropsWithChildren<RadioProps>,
    ref: Ref<HTMLInputElement>
) {
    return (
        <label className={clsx(
            "flex items-center gap-3 relative",
            className
        )}>
            <input ref={ref} className='peer/draft  absolute -z-1 opacity-0' type="radio" {...props} />
            <div className={clsx(
                'shrink-0 grow-0 w-6 h-6 border border-third',
                'bg-white text-white rounded-full border-1 border-third',
                'peer-checked/draft:bg-white peer-checked/draft:border-[6px]'
            )}>

            </div>
            <div className='text-[19px]'>
                {children}
            </div>
        </label>
    );
})
