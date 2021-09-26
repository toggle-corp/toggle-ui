import React from 'react';
import { _cs } from '@togglecorp/fujs';

import Button, { ButtonProps } from '../Button';
import RadioInput, { Props as RadioInputProps } from '../RadioInput';
import { Props as RadioProps } from '../RadioInput/Radio';

import styles from './styles.css';

// Note: more props can be picked as per requirement
type ExtraSegmentProps = Pick<ButtonProps<undefined>, 'icons' | 'iconsClassName' | 'actions' | 'actionsClassName'>;
export interface SegmentProps<N> extends RadioProps<N>, ExtraSegmentProps {
}

function Segment<N extends string | number | undefined>(props: SegmentProps<N>) {
    const {
        label,
        name,
        onClick,
        value,
        className,
        inputName, // eslint-disable-line @typescript-eslint/no-unused-vars
        ...otherProps
    } = props;

    return (
        <Button
            {...otherProps}
            className={_cs(styles.segment, className)}
            name={name}
            onClick={onClick}
            variant={value ? 'primary' : 'default'}
        >
            { label }
        </Button>
    );
}

export interface Props<
    N, O, V, RRP extends RadioProps<V>
> extends Omit<RadioInputProps<N, O, V, RRP>, 'rendererParams' | 'renderer' | 'listContainerClassName' | 'keySelector' | 'labelSelector'> {
    rendererParams?: RadioInputProps<N, O, V, RRP>['rendererParams'];
    listContainerClassName?: RadioInputProps<N, O, V, RRP>['listContainerClassName'];
    keySelector: RadioInputProps<N, O, V, RRP>['keySelector'];
    labelSelector: RadioInputProps<N, O, V, RRP>['labelSelector'];
}

// eslint-disable-next-line @typescript-eslint/ban-types
function SegmentInput<
    N extends string | number,
    // eslint-disable-next-line @typescript-eslint/ban-types
    O extends object,
    V extends string | number,
    RRP extends RadioProps<V>,
>(props: Props<N, O, V, RRP>) {
    const {
        rendererParams,
        listContainerClassName,
        keySelector,
        labelSelector,
        ...otherProps
    } = props;
    return (
        <RadioInput
            {...otherProps}
            renderer={Segment}
            rendererParams={rendererParams}
            listContainerClassName={listContainerClassName}
            keySelector={keySelector}
            labelSelector={labelSelector}
        />
    );
}

export default SegmentInput;
