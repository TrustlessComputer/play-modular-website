'use client';

import React, {useEffect, useRef, useState} from 'react'
import s from './styles.module.scss'
import ItemTimeLine from "@/modules/home2d/TimeLine/Item";
import useAnimationStore from "@/stores/useAnimationStore";

const DATA_CONTENTS: {
    id: string,
    time: string,
    title: string,
    label: string
}[] = [
    {
        id: 'phase-1',
        time: 'Jan 2024',
        title: 'Modular Inscriptions',
        label: 'Phase I'
    },
    {
        id: 'phase-2',
        time: 'Feb 2024',
        title: 'Build Whatever',
        label: 'Phase II'
    },
    {
        id: 'phase-3',
        time: 'mar 2024',
        title: 'Trade Whatever',
        label: 'Phase III'
    },
]

export default function TimeLine() {
  const {vidIndexActive, vidIsPlay} = useAnimationStore();
    return (
        <div className={s.timeLine}>
            {
                DATA_CONTENTS.map((item, idx) => {
                    return <ItemTimeLine key={item.id} timeLine={item} isActive={vidIsPlay && idx === vidIndexActive}/>
                })
            }
        </div>
    )
}
