import { useState, useEffect } from 'react'

function usePath() {
    const [path, setPath] = useState(window.location.pathname);

    const listenToPopstate = () => {
        const winPath = window.location.pathname;
        setPath(winPath)
    }

    useEffect(() => {
        window.addEventListener("popstate", listenToPopstate)

        return () => {
            
            window.removeEventListener("popstate", listenToPopstate)
        }
    }, [])
    return path
}

export default usePath
