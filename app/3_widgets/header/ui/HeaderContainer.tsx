import React, { JSX } from 'react';
import { Header } from './Header';
import { fetchCategories } from '@/app/5_entities/categories';
import { fetchMe } from '@/app/5_entities/users';
import { fetchBasket } from '@/app/5_entities/basket';
import { fetchWishlist } from '@/app/5_entities/wishlist';

export async function HeaderContainer({ locale }: { locale: string }) {
    const categories = await fetchCategories(locale);
    // const [ categories, user, basket ] = await Promise.all([
    //     fetchCategories(),
    //     fetchMe(),
    //     fetchBasket()
    // ])

    // const wishlist = user?.isIdentified ? await fetchWishlist() : undefined;

    return (
        <Header
            categories={categories}
            user={undefined}
            basket={undefined}
            wishlist={undefined}
        />
    );
}