import { useState } from 'react'
import Library from './Library/Library';


const Layout = () =>{
    const [count, setCount] = useState(0)
    return(
        <>
            <Library/>
        </>
    )
}

export default Layout