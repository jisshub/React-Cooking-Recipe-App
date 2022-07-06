import {useState, useRef, useEffect} from "react"

export const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)
    const ref = useRef(false)
    
    useEffect(() => {
        ref.current = true
        const controller = new AbortController()
        let {signal} = controller
        const fetchData = async () => {
            setIsPending(true)
        try {
            const response = await fetch(url, {
                signal
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
        fetchData()
        return () => {
            ref.current = false;
            controller.abort()
        }
    }, [url])
    
    return {data, isPending, error}
}