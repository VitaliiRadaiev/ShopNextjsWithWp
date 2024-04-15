import { ProductTagType } from '@/app/6_shared/types/types';
import clsx from 'clsx';


interface LabelProps {
    productTags: ProductTagType[] 
}


export function Label({ productTags }: LabelProps) {
    return (
        <>
            {productTags.map(productTag => {

                return (
                    <div key={productTag.id}
                        className={clsx(
                            'py-[2px] px-1 rounded-[2px] uppercase text-[8px] md:text-[11px] leading-none self-start text-white bg-primary',
                            {
                                '!bg-info': productTag.slug === 'novelty',
                                '!bg-secondary': productTag.slug === 'promotion',
                                '!bg-primary': productTag.slug === 'best-seller',
                                '!bg-third': productTag.slug === 'recommended',
                            }
                        )}
                    >
                        {productTag.name}
                    </div>
                );
            })}
        </>
    );
}
