import { useState, useEffect} from 'react'

function useClientSize() {
    const [ clientSize, setClientSize ] = useState({})
    
    useEffect(() => {
        function getClientSize() {
            setClientSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }

        window.addEventListener('resize', getClientSize)
        getClientSize()
    }, [])

    return clientSize
}

export default useClientSize
