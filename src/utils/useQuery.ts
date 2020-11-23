import { useState, useEffect, useMemo } from 'react';
import { rankedSearchOnList } from './index';

// NOTE: this is just a helper function
interface Entity {
    id: string;
    name: string;
}
function labelSelector(item: Entity) {
    return item.name;
}

type EntityVariable = string | undefined;
export function entityListTransformer<T extends Entity>(
    variable: EntityVariable | undefined,
    values: T[],
) {
    return rankedSearchOnList(
        values,
        variable,
        labelSelector,
    );
}

function useQuery<T, V>(
    values: T,
    variable: V,
    transformer: (variable: V, values: T) => T,
    skip: boolean,
) {
    const [pending, setPending] = useState(!skip);

    useEffect(
        () => {
            if (skip) {
                setPending(false);
                return undefined;
            }
            setPending(true);
            const timer = setTimeout(
                () => {
                    setPending(false);
                },
                400,
            );
            return () => {
                clearTimeout(timer);
            };
        },
        [variable, transformer, skip],
    );

    const result = useMemo(
        () => transformer(variable, values),
        [values, variable, transformer],
    );

    return [
        pending,
        pending || skip ? undefined : result,
    ] as const;
}

export default useQuery;
