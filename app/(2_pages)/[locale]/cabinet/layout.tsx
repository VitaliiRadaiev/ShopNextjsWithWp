import { LogOut } from '@/app/4_features/authentication';
import { CabinetNav } from '@/app/5_entities/cabinet';
import { H2 } from '@/app/6_shared/ui/Titles';

export default function cabinetLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className=''>
            <section className="py-9 lg:py-20">
                <div className="container">
                    <H2>Личный кабинет</H2>
                    <div className='lg:grid grid-cols-[250px_1fr] gap-8 mt-4'>
                        <CabinetNav>
                            <LogOut />
                        </CabinetNav>
                        <div className='mt-4 lg:mt-0'>
                            {children}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}