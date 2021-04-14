import { useEffect, useRef, useState } from "react";

export const useFetch = ( url ) => {
    const [state, setState] = useState({
        data: null,
        loading: true,
        error: null
    });

    /* Creamos la referencia y evaluamos en el momento que ha sido montado
    * En caso de ser desmontado, actualizamos el valor de la referencia
    */
    const isMounted = useRef(true);
    useEffect(() => {

        return () => {
            isMounted.current = false;
        }
    }, [])

    useEffect(() => {
        fetch( url )
        .then( resp => resp.json() )
        .then( data => {
            if( isMounted.current ) {
                setState({
                    data,
                    loading: false,
                    error: null
                });
            }
        }).catch( () => {
            if( isMounted.current ) {
                setState({
                    data: null,
                    loading: false,
                    error: 'Error: No se puede cargar la información'
                });
            }
        });
    }, [url])

    return state;
}
