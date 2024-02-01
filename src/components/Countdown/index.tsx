import React, {useEffect, useRef} from 'react';
import s from './styles.module.scss';
import useCountdown from '@/hooks/useCountdown';
import clsx from 'classnames';

interface IProps {
    expiredTime: string;
    hideIcon?: boolean;
    className?: string;
    onRefreshEnd?: () => void;
}

const Countdown: React.FC<IProps> = ({
                                         expiredTime,
                                         hideIcon,
                                         className,
                                         onRefreshEnd,
                                     }: IProps): React.ReactElement => {
    const refCallEnd = useRef(false);
    const {
        days = 0,
        hours,
        minutes,
        seconds,
        ended,
    } = useCountdown(expiredTime);

    useEffect(() => {
        if (ended && expiredTime && onRefreshEnd && !refCallEnd.current) {
            refCallEnd.current = true;
            onRefreshEnd?.();
        }
    }, [ended, expiredTime, onRefreshEnd]);

    return (
        <div className={clsx(s.countdown, className)}>
            {ended && <span className={s.text}>Ended</span>}
            {!ended && (
                <span className={s.text}>{`${hours}h:${minutes}m`}</span>
            )}
        </div>
    );
};

export default React.memo(Countdown);
