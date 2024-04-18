import { CatalogLoadingState } from '@/app/5_entities/catalog';
import clsx from 'clsx';

export default function catalogLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <CatalogLoadingState>
            {children}
        </CatalogLoadingState>
    );
}