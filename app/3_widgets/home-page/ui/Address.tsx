import { ImageFadeIn } from '@/app/6_shared/ui/Images';
import { H2 } from '@/app/6_shared/ui/Titles';
import clsx from 'clsx';

import metroIcon from '@/public/images/metro.png';
import frontOfTheShop from '@/public/images/contact.jpg';
import { AddressMap } from './AddressMap';

export function Address() {

    return (
        <div className='bg-[#0c1b311a] py-9 lg:py-14'>
            <div className="container">
                <H2>Адрес</H2>

                <div className="mt-6 lg:grid lg:grid-cols-6 gap-10">
                    <div className='col-span-2 lg:flex lg:flex-col lg:justify-between'>
                        <div className="ps-14 text-dark">
                            <h4
                                className={clsx(
                                    "text-[22px] font-bold relative uppercase"
                                )}
                            >
                                <ImageFadeIn
                                    src={metroIcon}
                                    className=' w-12 h-auto absolute top-1/2 left-0 -translate-y-1/2 translate-x-[calc(-100%-8px)]'
                                />
                                Палац Спорта
                            </h4>
                            <div className='font-semibold text-[16px] mt-1'>
                                ул. Большая Васильковская 5 Arena Class, 3 этаж, Luxgroups, Київ, 01032
                            </div>

                            <table
                                className='text-secondary mt-1'
                            >
                                <tbody>
                                    <tr>
                                        <td>ПН-СБ:</td>
                                        <td className='ps-1'><strong>12-19ºº</strong></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className='mt-2'>
                            <ImageFadeIn
                                src={frontOfTheShop}
                                className='w-full h-auto'
                            />
                        </div>
                    </div>
                    <div
                        className="h-[400px] bg-gray-300 mt-4 lg:mt-0 col-span-4"
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2541.0807267651035!2d30.51944835682787!3d50.439596985459545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ceff11506df1%3A0xade245830f3992bb!2zTHV4R3JvdXBzINCo0LLQtdC50YbQsNGA0YHQutC40LUg0YfQsNGB0Ysg0J_RgNC-0LTQsNC20LAuINCS0YvQutGD0L8g0YfQsNGB0L7Qsg!5e0!3m2!1sru!2sua!4v1709295318569!5m2!1sru!2sua"
                            width="600"
                            height="450"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className='w-full h-full'
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
}