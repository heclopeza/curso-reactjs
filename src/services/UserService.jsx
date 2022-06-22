import axios from "axios";

const multipart_config = {
    headers:{
        'Content-Type':'application/json'
    }
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

const constMultipartConfig = (idUser = '') =>{
    return {
        headers:{
            'Content-Type':'application/json'
        },
        params: {
            id: idUser
        }
    };
}

const UserService = ()=>{

    const findAllUsers = async()=>{
        try{
            const url = `${import.meta.env.VITE_BOOKS_API_URL}user/all`;
            const {data} = await axios(url);
            return {data};
        }catch(error){
            console.log('Ocurrió un error (findAllUsers):',error);
        }
    }

    const saveUser = async (user) =>{
        try{
            const url = `${import.meta.env.VITE_BOOKS_API_URL}user`;
            const {data} = await axios.post(url, user, multipart_config);
            return convertDataToUser(data);
        }catch(error){
            console.log('Ocurrió un error (saveUser):', error);
            return null;
        }
    }

    const deleteUser = async(id)=>{
        try{
            const url = `${import.meta.env.VITE_BOOKS_API_URL}user/id/${id}`;
            const deleteIdUser = await axios.delete(url);
            return deleteIdUser.data;
        }catch(error){
            console.log('Ocurrió un error (deleteUser):',error);
            return null;
        }
    }

    const updateUser = async(user)=>{
        try{
            const url = `${import.meta.env.VITE_BOOKS_API_URL}user`
            const {data} = await axios.put(url, user, constMultipartConfig(user.id));
            return convertDataToUser(data);
        }catch(error){
            console.log('Ocurrió un error (updateUser):', error);
            return null;
        }
    }

    const findUserById = async(id)=>{
        try{
            const url = `${import.meta.env.VITE_BOOKS_API_URL}user/id/${id}`;
            const {data} = await axios.get(url);
            return convertDataToUser(data);
        }catch(error){
            console.log('Ocurrió un error (findUserById):',error);
            return null;
        }
    }

    return {findAllUsers, saveUser, deleteUser, updateUser, findUserById}
}

export default UserService;