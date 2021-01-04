import React, { useCallback } from 'react';
import { _cs } from '@togglecorp/fujs';

import RawButton from '../RawButton';

import styles from './styles.css';

export interface ContentBaseProps {
    containerClassName?: string;
    title?: string;
}
export type OptionKey = string | number;

export interface GenericOptionParams<P extends ContentBaseProps, OK extends OptionKey, O> {
    optionContainerClassName?: string;
    contentRenderer: (props: Pick<P, Exclude<keyof P, 'containerClassName' | 'title'>>) => React.ReactNode;
    contentRendererParam: (key: OK, opt: O) => P;
    option: O;
    optionKey: OK;
    onClick: (optionKey: OK, option: O) => void;
}
function GenericOption<P extends ContentBaseProps, OK extends OptionKey, O>({
    optionContainerClassName,
    contentRenderer,
    contentRendererParam,
    option,
    onClick,
    optionKey,
}: GenericOptionParams<P, OK, O>) {
    const params = contentRendererParam(optionKey, option);
    const {
        containerClassName,
        title,
        ...props
    } = params;

    const handleClick = useCallback(
        () => {
            onClick(optionKey, option);
        },
        [optionKey, option, onClick],
    );

    return (
        <RawButton
            className={_cs(
                styles.optionRenderer,
                optionContainerClassName,
                containerClassName,
            )}
            onClick={handleClick}
            title={title}
            name={optionKey}
        >
            {contentRenderer(props)}
        </RawButton>
    );
}
export default GenericOption;
