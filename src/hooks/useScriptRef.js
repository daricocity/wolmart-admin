import { useEffect, useRef } from 'react';

// Reference Hook
const useScriptRef = () => {
    const scripted = useRef(true);
    useEffect(
        () => () => {
            scripted.current = false;
        },
        []
    );

    return scripted;
};

export default useScriptRef;
