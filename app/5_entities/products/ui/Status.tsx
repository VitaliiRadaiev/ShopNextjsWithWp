import { StockStatusVariantsType } from '@/app/6_shared/types/types';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'

interface StatusProps {
    status: StockStatusVariantsType;
}

export function Status({ status }: StatusProps) {

    const value = status === 'IN_STOCK'
        ? <>
            <CheckCircleIcon className='text-[#6a9a4d] h-[1.4em] w-auto absolute top-1/2 left-0 translate-x-[calc(-100%-6px)] -translate-y-1/2' />
            <span className='border-b border-[currentColor] border-dashed'>
                В наличии
            </span>
        </>
        : <>
            <XCircleIcon className='text-[#ff0000] h-[1.4em] w-auto absolute top-1/2 left-0 translate-x-[calc(-100%-6px)] -translate-y-1/2' />
            <span className='border-b border-[currentColor] border-dashed'>
                Не в наличии
            </span>
        </>

    return (
        <div className='status text-primary-light flex justify-center'>
            <div className='flex items-center justify-center gap-1 relative self-center'>
                {value}
            </div>
        </div>
    );
}