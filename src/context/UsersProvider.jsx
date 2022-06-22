import { createContext, useEffect, useState} from 'react';
import UserService from '../services/UserService';

const UsersContext = createContext();

const convertDataToUser = (data) =>{
    return {
        id:data._id,
        nombreCompleto:data.fullName,
        correo:data.mail,
        telefono:data.phone,
        fechaNacimiento:data.birthDay,
        direccion:data.address,
        password:data.password
    }
}

const UsersProvider = ({children})=>{
    
    const [users, setUsers] = useState([]);
    const {findAllUsers} = UserService();
    const getAllUsers = async()=>{
        const allUsers = await findAllUsers();
        /*Se debe parsear los datos ya que no son los mismos. El ISBN si coincide   */
        if(allUsers){
            const usersMap = Object.values(allUsers.data).map(item => convertDataToUser(item));
            setUsers(usersMap);
        }
    }
    useEffect(()=>{
        getAllUsers();
    },[])
    return (
        <UsersContext.Provider value={{users}}>
            {children}
        </UsersContext.Provider>
    )
}

export {
    UsersProvider
}

export default UsersContext;