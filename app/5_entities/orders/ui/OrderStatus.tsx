import clsx from 'clsx';
import { OrderStatuses } from '../lib/types';
import { ClockIcon, RocketLaunchIcon, XCircleIcon, CheckCircleIcon } from '@heroicons/react/24/solid';


interface OrderStatusProps {
    status: OrderStatuses;
}

export function OrderStatus({ status }: OrderStatusProps): JSX.Element {

    const content =
        status === 'PROCESSING'
            ? <span className=' text-gray-500'>В обработке <ClockIcon className='inline h-[1em] w-auto' /></span> :
            status === 'PENDING'
                ? <span className='text-[#0d6efd]'>В дороге <RocketLaunchIcon className='inline h-[1em] w-auto'/></span> :
                status === 'COMPLETED'
                    ? <span className='text-green-600'>Выполнен <CheckCircleIcon className='inline h-[1em] w-auto'/></span>
                    : <span className='text-rose-500'>Отменен <XCircleIcon className='inline h-[1em] w-auto'/></span>

    return (<div>Статус: {content}</div>);
}