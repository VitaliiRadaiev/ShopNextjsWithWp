import clsx from 'clsx';
import { InputHTMLAttributes, PropsWithChildren } from 'react';
import { CheckIcon } from '@heroicons/react/24/solid';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {

}

export function Checkbox( { children, type, className, ...props }: PropsWithChildren<CheckboxProps> ) {
    return (
        <label className={clsx(
            "flex items-center gap-3 relative",
            className
        )}>
            <input className='peer/draft  absolute -z-1 opacity-0' type="checkbox" {...props} />
            <div className={clsx(
                'shrink-0 grow-0 w-6 h-6 border border-third',
                'bg-white text-white peer-checked/draft:[&_svg]:opacity-100',
                'peer-checked/draft:bg-third'
            )}>
                <CheckIcon className='w-full h-auto opacity-0'/>
            </div>
            <div className='text-[16px]'>
                {children}
            </div>
        </label>
    );
}