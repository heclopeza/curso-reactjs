import { useState } from 'react';
import {Table,Button} from 'react-bootstrap';
import UserDeleteConfirmationForm from './UserDeleteConfirmationForm'

const UsersList = ({users,selectUpdateUser,handleDeleteUserHook}) =>{
    const [show, setShow] = useState(false);

    const handleClose = ()=>setShow(false);
    const handleShow = ()=>setShow(true);
    const [user, setUser] = useState({});
    
    const deleteUser = (user)=>{
        setUser(user);
        handleShow();
    }

    const deleteUserConfirmation = ()=>{
        handleDeleteUserHook(user.id);
        handleClose();
    }

    return (
        <>
            <UserDeleteConfirmationForm show={show} handleClose={handleClose} user={user} deleteUserConfirmation={deleteUserConfirmation}/>
            <Table striped>
                <thead>
                    <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Dirección</th>
                    <th>Teléfono</th>
                    <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user => {
                            return (
                                <tr key={user.id}>
                                    <td>
                                        {user.nombreCompleto}
                                    </td>
                                    <td>
                                        {user.correo}
                                    </td>
                                    <td>
                                        {user.direccion}
                                    </td>
                                    <td>
                                        {user.telefono}
                                    </td>
                                    <td>
                                        <Button variant="primary" size='sm' onClick={()=>selectUpdateUser(user)}>Editar</Button>
                                        {'  '}
                                        <Button variant="danger" size='sm' onClick={()=>deleteUser(user)}>Eliminar</Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </>
    )
}

export default UsersList;