import { useContext } from "react"
import UsersContext from "../context/UsersProvider";

const UseContextUsers = ()=>{
    return useContext(UsersContext);
}

export default UseContextUsers;