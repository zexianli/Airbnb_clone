import { useCallback, useEffect, useRef } from "react";

// from https://github.com/hupe1980/react-is-mounted-hook/blob/master/src/use-is-mounted.tsx
export const useIsMounted = () => {
    const ref = useRef(false);

    useEffect(() => {
        ref.current = true;
        return () => {
            ref.current = false;
        };
    }, []);

    return useCallback(() => {
        return ref.current;
    }, [ref]);
};
