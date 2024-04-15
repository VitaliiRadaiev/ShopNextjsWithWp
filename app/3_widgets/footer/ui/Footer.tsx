import { CategoryType } from '@/app/5_entities/categories';
import clsx from 'clsx';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { SocialList } from '@/app/6_shared/ui/SocialList';

export async function Footer() {
    const categories: CategoryType[] = [];

    return (
        <div className=' bg-primary py-9 lg:py-14 text-white'>
            <div className="container">
                <div className='flex flex-col gap-8 md:grid md:grid-cols-2 lg:grid-cols-3 lg:gap-12'>
                    <div className=''>
                        <h2
                            className='text-[20px] uppercase font-bold'
                        >
                            Категории
                        </h2>
                        <ul
                            className={clsx(
                                "mt-3 ps-2 flex flex-col gap-2 text-secondary underline",
                                "lg:flex-row lg:flex-wrap lg:text-[18px] lg:gap-x-6 lg:ps-0"
                            )}
                        >
                            {categories && categories.map(category =>
                                <li key={category.slug}>
                                    <Link
                                        href={'/catalog/' + category.slug}
                                        className='transition-colors hover:text-secondary-light'
                                    >
                                        {category.name}
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                    <div className=''>
                        <h2 className='text-[20px] uppercase font-bold'>
                            будьте в курсе
                        </h2>
                        <div className='mt-3 text-[12px]'>
                            Подпишитесь на рассылку и мы сообщим вам о новинках и акциях:
                        </div>
                        <div className="flex mt-1 gap-2">
                            <input
                                type="text"
                                placeholder='Ваш e-mail'
                                className={clsx(
                                    'h-8 bg-white flex items-center px-2 py-1 rounded ',
                                    'w-full text-[14px] placeholder:text-[14px] text-dark outline-none'
                                )}
                            />
                            <button
                                className={clsx(
                                    'shrink-0 grow-0 h-8 flex items-center justify-start font-bold',
                                    'bg-secondary rounded w-8 p-1 transition hover:bg-secondary-light'
                                )}
                            >
                                <ArrowRightIcon />
                            </button>
                        </div>
                        <div className='mt-1 text-[12px] text-slate-400 [&_a]:underline'>
                            <p>

                            Нажимая на кнопку, вы даете <Link href="#" className='transition hover:text-white'>
                                согласие на обработку персональных данных.
                            </Link>
                            </p>
                        </div>
                    </div>
                    <div className='md:col-span-2 lg:col-auto'>
                        <h2 className='text-[20px] uppercase font-bold'>
                            контакты
                        </h2>
                        <div className="mt-3 flex flex-col gap-3">
                            <Link
                                href="tel:380932290322"
                                className='text-[20px]'
                            >
                                +380 (93) 22-903-22
                            </Link>

                            <address className='no-italic'>
                                ул. Большая Васильковская 5 Arena Class, 3 этаж, Luxgroups, Київ, 01032
                            </address>

                            <Link
                                href="#"
                                className=' text-secondary underline transition hover:text-secondary-light'
                            >
                                perfect@example.com
                            </Link>

                            <SocialList />
                        </div>
                    </div>
                </div>
                <div className='mt-6 border-t border-slate-600 pt-4 text-[12px] flex flex-col gap-2'>
                    <div>© 1991-2021, Часовой центр Perfect </div>
                    <Link
                        href='#'
                        className='text-secondary underline transition-colors hover:text-secondary-light'
                    >
                        Политика обработки персональных данных
                    </Link>
                </div>
            </div>
        </div>
    );
}