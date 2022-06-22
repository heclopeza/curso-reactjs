import { useEffect, useState } from "react";

const useUpdateBook = (fnUpdate)=>{
    const [isUpdated, setIsUpdated] = useState(false);
    useEffect(()=> {
        if(isUpdated){
            fnUpdate();
            setIsUpdated(false);
        }
    },[isUpdated]);
    return ({setIsUpdated})
}

export default useUpdateBook;