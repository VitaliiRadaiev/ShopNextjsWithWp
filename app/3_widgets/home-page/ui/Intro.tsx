import clsx from 'clsx';
import introBgDesk from "@/public/images/ingro-bg-desk.jpg"
import introBgMob from "@/public/images/intro-bg-mob.jpg"
import { Picture } from "@/app/6_shared/ui/Images";
import Link from "next/link";
import { ArrowRightIcon } from '@heroicons/react/24/solid';


export function Intro() {
    return (
        <section className="relative bg-primary">
            <Picture
                src={introBgMob}
                srcSet={introBgDesk}
                className="absolute top-0 left-0 h-full w-full object-cover z-1"
            />
            <div className="container relative z-2">
                <div className="min-h-[480px] md:min-h-[430px] py-5 flex flex-col gap-4 text-white lg:py-16">
                    <h1
                        className={clsx(
                            'text-[20px] font-semibold leading-snug',
                            'md:max-w-[640px] lg:text-[35px]'
                        )}
                    >
                        Более 27 лет продаём, ремонтируем и обслуживаем швейцарские часы
                        по стандартам производителей
                    </h1>
                    <p className={clsx(
                        'text-secondary font-light text-[15px] leading-[1.87em]',
                        'md:text-[18px] md:max-w-[506px]'
                    )}>
                        Наши мастера сертифицированы на фабриках Omega, Rado, Longines, Tissot, Balmain, Certina, Hamilton,
                        Mido и Calvin Klein. Мы — партнер Swatch Group.
                    </p>
                    <Link href="#" className={clsx(
                        "inline-flex items-center italic gap-1 font-light text-[18px] leading-tight border-b border-current self-start",
                        "transition lg:text-slate-300 hover:text-white [&_svg]:hover:translate-x-1"
                    )}>
                        Подробнее
                        <ArrowRightIcon className="h-[0.8em] w-auto transition" />
                    </Link>
                </div>
            </div>
        </section>

    );
}