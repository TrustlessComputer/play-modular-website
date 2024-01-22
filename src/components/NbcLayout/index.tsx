import React, {PropsWithChildren} from 'react';
import s from './styles.module.scss';

const NbcLayout: React.FC<PropsWithChildren> = ({
                                                    children,
                                                }): React.ReactElement => {

    return (
        <div className={s.layout}>
            <header className={s.layout_header}>
            </header>
            {children}
            <footer className={s.footer}>

            </footer>
        </div>
    );
};

export default NbcLayout;
