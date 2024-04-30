import { RegisterForm } from '@/app/4_features/authentication';
import { H2 } from '@/app/6_shared/ui/Titles';

export default function registrationPage() {
    return (
        <main>
            <section className='py-9 lg:py-20'>
                <div className="container">
                    <H2>регистрация</H2>
                    <RegisterForm />
                </div>
            </section >
        </main >
    );
}