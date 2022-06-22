import { useEffect } from 'react';
import UserService from '../services/UserService';
import Constants from '../commons/Constants';
import AlertManagement from '../commons/AlertManagement';

const {
    UPDATE_USER_SUCCESS_MSG,
    UPDATE_USER_ERROR_MSG,
    DELETE_USER_SUCCESS_MSG,
    DELETE_USER_ERROR_MSG,
    CREATED_USER_SUCCESS_MSG,
    CREATED_USER_ERROR_MSG
} = Constants();

const UseUserHooks = (setUsers,users,setUpdateUser,setShow,setOptionsAlert)=>{
    const {success, error} = AlertManagement();
    
    const {findAllUsers, saveUser, deleteUser, updateUser} = UserService();
    
    const handleSaveUser = async (user)=>{
        const userAlta = {
            fullName:user.nombreCompleto,
            mail:user.correo,
            phone:user.telefono,
            birthDay:user.fechaNacimiento,
            address:user.direccion,
            userType:'2',
            password:user.password
        };
        let newUser = await saveUser(userAlta);
        setShow(false);
        if(newUser){
            setUsers([newUser, ...users]);
            setOptionsAlert(success(CREATED_USER_SUCCESS_MSG));
        }else{
            setOptionsAlert(error(CREATED_USER_ERROR_MSG));
        }
        setTimeout(() => {
            setOptionsAlert({alertShow: false})
        }, 2000);
    }

    const handleFindAllUser = async()=>{
        const allUsers = await findAllUsers();
        /*Se debe parsear los datos ya que no son los mismos. El ISBN si coincide   */
        if(allUsers){
            const usersMap = Object.values(allUsers.data).map(item => convertDataToUser(item));
            setUsers(usersMap);
        }
    };

    const handleDeleteUserHook = async(id)=>{
        const deletedUser = await deleteUser(id);
        if(deletedUser){
            const newUsers = users.filter(b=>b.id!==deletedUser._id);
            setUsers(newUsers);
            setOptionsAlert(success(DELETE_USER_SUCCESS_MSG));
        }else{
            setOptionsAlert(error(DELETE_USER_ERROR_MSG));
        }
        setTimeout(() => {
            setOptionsAlert({alertShow: false})
        }, 2000);
    }

    const handlUpdateUser = async (user)=>{
        const userUpd = {
            id:user.id,
            fullName:user.nombreCompleto,
            mail:user.correo,
            phone:user.telefono,
            birthDay:user.fechaNacimiento,
            address:user.direccion,
            userType:'2',
            password:user.password
        };
        const updatedUser = await updateUser(userUpd);
        setShow(false);
        if(updatedUser){
            const updUsers = users.map(b=>(b.id===updatedUser.id)?updatedUser:b);
            setUsers(updUsers);
            setUpdateUser(null);
            setOptionsAlert(success(UPDATE_USER_SUCCESS_MSG));
        }else{
            setOptionsAlert(error(UPDATE_USER_ERROR_MSG));
        }
        setTimeout(() => {
            setOptionsAlert({alertShow: false})
        }, 2000);
    }

    const selectUpdateUser = (user)=>{
        setUpdateUser(user);
        setShow(true);
    }

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

    useEffect(()=>{
        handleFindAllUser()
    },[]);

    return {handleSaveUser,handleDeleteUserHook,handlUpdateUser,selectUpdateUser}
}

export default UseUserHooks;