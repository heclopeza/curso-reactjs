import {useEffect, useState} from 'react';
import {Form,Button} from 'react-bootstrap';
import UserFormValidation from '../../validations/UserFormValidation';
import UseUpdateUser from '../../hooks/UseUpdateUser';
import AlertManagement from '../../commons/AlertManagement';
import Constants from '../../commons/Constants';

const { UPDATE_USER_WARNING_MSG } = Constants()

const UsersForm = ({updateUser,setOptionsAlert,handleSaveUser,handlUpdateUser,setShow}) =>{
    const { warning } = AlertManagement();

    const [id, setId] = useState(null);
    const [nombreCompleto, setNombreCompleto] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [direccion, setDireccion] = useState('');
    const [password, setPassword] = useState('');

    const [errors, setErrors] = useState({});
    const [validated, setValidated] = useState(false);

    function createUser(user){
        setId(user.id);
        setNombreCompleto(user.nombreCompleto);
        setCorreo(user.correo);
        setTelefono(user.telefono);
        setFechaNacimiento(user.fechaNacimiento.substring(0,10));
        setDireccion(user.direccion);
        setPassword(user.password);
    }

    useEffect(()=>{ //Sirve para controlar el ciclado de peticiones.
        if(updateUser){
            createUser(updateUser);
        }
    },[updateUser]);

    const handleSave = () => {
        let user = {
            nombreCompleto,
            correo,
            telefono,
            fechaNacimiento,
            direccion,
            password
        }
        const userValidations = UserFormValidation(user);
        setErrors(userValidations);
        if(Object.keys(userValidations).length>0){
            setOptionsAlert(warning(UPDATE_USER_WARNING_MSG));
            setValidated(true);
        }else{
            handleSaveUser(user);
            limpiarForm();
        }
    }

    const handleUpdate = ()=>{
        let user = {
            id,
            nombreCompleto,
            correo,
            telefono,
            fechaNacimiento,
            direccion,
            password
        }
        const userValidations = UserFormValidation(user);
        setErrors(userValidations);
        if(Object.keys(userValidations).length>0){
            setValidated(true);
            setOptionsAlert(warning(UPDATE_USER_WARNING_MSG));
        }else{
            handlUpdateUser(user);
            limpiarForm();
        }
    }

    const {setIsUpdated} = UseUpdateUser(handleUpdate);

    const limpiarForm = ()=>{
        setId('');
        setNombreCompleto('');
        setCorreo('');
        setTelefono('');
        setFechaNacimiento('');
        setDireccion('');
        setPassword('');
    }

    return (
        <>
            <Form noValidate validated={validated}>
                <Form.Group className="mb-3" controlId="nombreCompleto">
                    <Form.Label>Nombre completo</Form.Label>
                    <Form.Control type="text" 
                        value = {nombreCompleto}
                        onChange={e => setNombreCompleto(e.target.value)} 
                        placeholder="Introduce nombre completo"
                        required
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.nombreCompleto}
                        </Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="correo">
                    <Form.Label>Correo</Form.Label>
                    <Form.Control type="text" 
                        value = {correo} 
                        onChange={e => setCorreo(e.target.value)} 
                        placeholder="Introduce correo"
                        required
                        />
                        <Form.Control.Feedback type='invalid'>
                            {errors.correo}
                        </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="telefono">
                    <Form.Label>Telefono</Form.Label>
                    <Form.Control type="text" 
                        value = {telefono} 
                        onChange={e => setTelefono(e.target.value)} 
                        placeholder="Introduce telefono"
                        required/>
                        <Form.Control.Feedback type='invalid'>
                            {errors.telefono}
                        </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="fechaNacimiento">
                    <Form.Label>Fecha de nacimiento</Form.Label>
                    <Form.Control type="date"
                        value = {fechaNacimiento} 
                        onChange={e => setFechaNacimiento(e.target.value)} 
                        placeholder="Introduce fecha de nacimiento"
                        required/>
                        <Form.Control.Feedback type='invalid'>
                            {errors.fechaNacimiento}
                        </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="direccion">
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control type="text" 
                        value = {direccion} 
                        onChange={e => setDireccion(e.target.value)} 
                        placeholder="Introduce dirección"
                        required/>
                        <Form.Control.Feedback type='invalid'>
                            {errors.direccion}
                        </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" 
                        value = {password} 
                        onChange={e => setPassword(e.target.value)} 
                        placeholder="Introduce password"
                        required/>
                        <Form.Control.Feedback type='invalid'>
                            {errors.password}
                        </Form.Control.Feedback>
                </Form.Group>
                {
                    (id)
                    ? (
                        <Button variant="primary" type="button" onClick={()=>setIsUpdated(true)}>
                            Editar
                        </Button>
                    )
                    : (
                        <Button variant="primary" type="button" onClick={()=>handleSave()}>
                            Guardar
                        </Button>
                    )
                }
                {' '}
                {' '}
                <Button variant="dark" type="button" onClick={()=>setShow(false)}>
                    Cancelar
                </Button>
            </Form>
        </>
    )
}

export default UsersForm;