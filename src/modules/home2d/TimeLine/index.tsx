'use client';

import React, {useEffect, useRef, useState} from 'react'
import s from './styles.module.scss'
import ItemTimeLine from "@/modules/home2d/TimeLine/Item";

const DATA_CONTENTS: {
  id: string,
  time: string,
  title: string,
  label: string
}[] = [
  {
    id: 'phase-1',
    time: 'JAN 2024',
    title: 'The Module Factory',
    label: 'Phase I'
  },
  {
    id: 'phase-2',
    time: 'March 2024',
    title: 'Build whatever',
    label: 'Phase II'
  },
  {
    id: 'phase-3',
    time: 'May 2024',
    title: 'The Module Factory',
    label: 'Phase III'
  },
]

export default function TimeLine() {
  const [indexActive, setIndexActive] = useState(0);
  const reIndex = useRef<number>(0);
  const refTime = useRef<NodeJS.Timeout>(null);

  useEffect(() => {

    const next = () => {
      reIndex.current++;
      if (reIndex.current >= 3) {
        reIndex.current = 0;
      }
      setIndexActive(reIndex.current);
    }

    refTime.current = setInterval(next, 3000);
    return () => {
      if (refTime.current) clearInterval(refTime.current);
    }
  }, []);

  return (
    <div className={s.timeLine}>
      {
        DATA_CONTENTS.map((item, idx) => {
          return <ItemTimeLine key={item.id} timeLine={item} isActive={idx === indexActive}/>
        })
      }
    </div>
  )
}
