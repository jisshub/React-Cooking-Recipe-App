import {useState, useRef, useEffect} from "react"

export const useFetch = (url, method='GET') => {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)
    const [options, setOptions] = useState(null)
    const ref = useRef(false)
    
    const postData = (postData) => {
        setOptions({
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postData)
        });
    };
    useEffect(() => {
        ref.current = true
        const controller = new AbortController()
        let {signal} = controller
        const fetchData = async (fetchOptions) => {
            setIsPending(true)
        try {
            const response = await fetch(url, {
                ...fetchOptions, signal
            });
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            const json = await response.json()
            setIsPending(false)
            setData(json)
            setError(null)
        } catch (error) {
            if (error.name === 'AbortError' && !ref) {
                console.log('fetch aborted');
            } else {
                setIsPending(false)
                setError('Could not fetch data')
            }
        }
        }
        if (method==='GET') {
            fetchData();
        }
        if (method==='POST' && options) {
            fetchData(options);
        }
            
        fetchData()
        return () => {
            ref.current = false;
            controller.abort()
        }
    }, [url, options, method])
    
    return {data, isPending, error, postData}
}