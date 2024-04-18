// DynamicHeroIcon.tsx
// Simple Dynamic HeroIcons Component for React (typescript / tsx)
// by: Mike Summerfeldt (IT-MikeS - https://github.com/IT-MikeS)

import { FC } from 'react'
import * as HIcons from '@heroicons/react/20/solid'
import dynamic from 'next/dynamic'


const DynamicHeroIcon: FC<{ icon: string, className?: string }> = (props) => {
    const { ...icons } = HIcons
    // @ts-ignore
    const TheIcon: JSX.Element = icons[props.icon];

    return (
        <>
            {/* @ts-ignore */}
            <TheIcon className={props.className} aria-hidden="true" />
        </>
    )
}

export default DynamicHeroIcon