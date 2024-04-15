import { notFound } from 'next/navigation'
import { AddToBasket } from '@/app/4_features/basket';
import { LeaveCommentForm } from '@/app/4_features/leave-comment-form';
import { fetchBasket } from '@/app/5_entities/basket';
import { Gallery, Status, fetchProductBySlug } from '@/app/5_entities/products';
import { fetchMe } from '@/app/5_entities/users';
import { fetchWishlist } from '@/app/5_entities/wishlist';
import { H2, H4 } from '@/app/6_shared/ui/Titles';
import { addCurrencySymbol } from '@/app/6_shared/utils/addCurrencySymbol';
import clsx from 'clsx';
import Link from 'next/link';
import { CommentsList } from './CommentsList';
import { Stars } from '@/app/6_shared/ui/Stars';
import { formatCurrencyString } from '@/app/6_shared/utils/formatCurrencyString';
import { Button } from '@/app/6_shared/ui/Buttons/Button';


interface ProductProps {
    productSlug: string;
}

export async function Product({ productSlug }: ProductProps) {
    const product = await fetchProductBySlug(productSlug);

    if (!product) notFound();

    // const basket = await fetchBasket();
    // const wishlist = await fetchWishlist();
    // const me = await fetchMe();

    return (
        <div className='container'>
            <h1
                className={clsx(
                    'uppercase text-[25px] text-third font-bold leading-snug -tracking-wide',
                    'max-w-[980px] lg:text-[39px]'
                )}
            >
                {product.title}
            </h1>
            <div className='mt-6 lg:flex lg:gap-20 lg:mt-14'>
                <div className=' shrink-0 grow-0 lg:basis-[500px] min-w-0'>
                    <div className="sticky top-[150px]">
                        <Gallery
                            product={product}
                        //toggleWishlistSlot={<ToggleWishlistProduct productId={product.id} inWishlist={inWishlist} />}
                        />
                    </div>
                </div>
                <div className='mt-6 lg:mt-0 flex flex-col gap-5 shrink grow lg:gap-8'>
                    {!!product.commentCount &&
                        <Link href='#comments' className='flex flex-col gap-1'>
                            <Stars clickable={false} startValue={+product.averageRating} />
                            <div className='text-[12px] text-primary'>Отзывы ({product.commentCount})</div>
                        </Link>
                    }

                    <div className='text-[20px] [&_.status]:justify-start [&_.status]:ps-[1.5em]'>
                        <Status status={product.stockStatus} />
                    </div>

                    <div className="text-[32px] text-[#5e616b]">
                        {product.salePrice
                            ? <>
                                <div className="text-[0.6em] text-primary-light line-through">{formatCurrencyString(product.regularPrice)}</div>
                                <div className=" font-bold">{formatCurrencyString(product.salePrice)}</div>
                            </>
                            : <div className=" font-bold">{formatCurrencyString(product.regularPrice)}</div>
                        }
                    </div>
                    <div className='[&_.button]:w-full [&_.button]:h-10'>
                        <AddToBasket productId={product.databaseId} stockStatus={product.stockStatus} />
                    </div>

                    <hr />

                    {!!product.description.trim().length &&
                        <div
                            className='prose text-[12px] lg:text-[15px]'
                            dangerouslySetInnerHTML={{ __html: product.description }}
                        />
                    }

                    {!!product.attributes.nodes.length &&
                        <table
                            className={clsx(
                                'text-primary text-[12px] lg:text-[15px]',
                                '[&_th]:text-start [&_th]:pr-3 [&_th]:w-[200px] [&_th]:uppercase',
                                'lg:[&_th]:w-[294px] [&_th]:border-t [&_th]:border-b [&_th]:border-primary',
                                '[&_td]:h-7 lg:[&_td]:h-9 [&_td]:border-t [&_td]:border-b [&_td]:border-primary'
                            )}
                        >
                            <tbody>
                                {product.attributes.nodes.map(attribute =>
                                    <tr key={attribute.id}>
                                        <th>{attribute.label}</th>
                                        <td>{attribute.terms ? attribute.terms.nodes.map(term => term.name).join(' ,') : attribute.options.join(' ,')}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    }
                </div>
            </div>

            <div id='comments' className="mt-9 lg:mt-20">
                <H2>
                    Отзывы ({product.reviewCount})
                </H2>
                <div className='mt-4 flex flex-col gap-6 lg:flex-row lg:gap-20'>
                    <div className='lg:basis-[500px]'>
                        <LeaveCommentForm
                            productDataBaseId={product.databaseId}
                        />
                    </div>
                    <div className='shrink grow'>
                        {
                            !product.commentCount
                                ? 'У этого товара ещё нет отзывов.'
                                : <CommentsList comments={product.reviews.edges} />
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}