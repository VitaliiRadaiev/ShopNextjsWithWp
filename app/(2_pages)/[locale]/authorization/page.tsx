import { AuthForm } from '@/app/4_features/authentication';
import { ScrollTop } from '@/app/6_shared/ui/ScrollTop';
import { H2, H4 } from '@/app/6_shared/ui/Titles';

export default function authorizationPage(
    { searchParams } : { searchParams: Record<string, string> }
) {
    return (
        <main>
            <section className='py-9 lg:py-20'>
                <div className="container">
                    {searchParams.registration &&  
                        <H4>Регистрация произошла успешно, пожалуйста авторизируйтесь.</H4>
                    }
                    <H2>Авторизация</H2>
                    <AuthForm />
                </div>
            </section >
            <ScrollTop />
        </main >
    );
}