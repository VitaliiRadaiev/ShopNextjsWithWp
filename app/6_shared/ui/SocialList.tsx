import clsx from 'clsx';

import IconInstagram from '@/public/icons/instagram.svg';
import IconFacebook from '@/public/icons/facebook.svg';
import IconTelegram from '@/public/icons/telegram.svg';
import Link from 'next/link';

export function SocialList() {
    return (
        <div className=''>
            <ul className='flex flex-col gap-3'>
                <li>
                    <Link
                        href='#'
                        className='flex items-center underline gap-3 [&_svg]:hover:text-secondary-light'
                    >
                        <IconInstagram className=' w-7 h-auto shrink-0 grow-0 text-secondary transition-colors' />
                        Instagram
                    </Link>
                </li>
                <li>
                    <Link
                        href='#'
                        className='flex items-center underline gap-3 [&_svg]:hover:text-secondary-light'
                    >
                        <IconFacebook className=' w-7 h-auto shrink-0 grow-0 text-secondary transition-colors' />
                        Facebook
                    </Link>
                </li>
                <li>
                    <Link
                        href='#'
                        className='flex items-center underline gap-3 [&_svg]:hover:text-secondary-light'
                    >
                        <IconTelegram className=' w-7 h-auto shrink-0 grow-0 text-secondary transition-colors' />
                        Telegram
                    </Link>
                </li>
            </ul>
        </div>
    );
}