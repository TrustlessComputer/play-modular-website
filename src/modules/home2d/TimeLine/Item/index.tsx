import s from "@/modules/home2d/TimeLine/styles.module.scss";
import React, {useEffect, useRef} from "react";
import IconDots from "@/components/NbcLayout/Ioncs/IcDot";
import {gsap} from 'gsap';

type IItem = {
  isActive: boolean,
  timeLine: {
    id: string,
    time: string,
    title: string,
    label: string
  }
}
export default function ItemTimeLine({isActive, timeLine}: IItem) {
  const refPo = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!refPo.current) return;
    if (isActive) {
      gsap.fromTo(refPo.current, {x: '0%', width: '0%'}, {width: '100%', duration: 3});
    } else {
      gsap.to(refPo.current, {x: '100%', duration: 1, ease: 'power3.out'});
    }
  }, [isActive]);

  return <div className={s.itemTimeLine}>
    <div className={`${s.itemTop} ${isActive && s.itemTop_isActive}`}>
      <p className={s.itemTop_timeline}>{timeLine.time}</p>
      <h5 className={s.itemTop_title}>{timeLine.title}</h5>
    </div>
    <div className={`${s.itemBottom} ${isActive && s.itemBottom_isActive}`}>
      <IconDots/>
      <p className={s.itemBottom_text}>{timeLine.label}</p>
      <div ref={refPo} className={s.po}></div>
    </div>
  </div>
}
