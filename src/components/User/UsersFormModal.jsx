import {Button, Modal, Alert} from 'react-bootstrap';
import UsersForm from './UsersForm';

const UsersFormModal = ({show,setShow,handleSaveUser,updateUser,handlUpdateUser,setOptionsAlert})=>{
    return (
      <>
        <Button variant="primary" onClick={()=>setShow(true)}>
          Nuevo Usuario
        </Button>
  
        <Modal
          show={show}
          onHide={()=>setShow(false)}
          backdrop="static"
          keyboard={false}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>{(updateUser)?'Actualiza ':'Nuevo '}usuario</Modal.Title>
          </Modal.Header>
          <Modal.Body>
                <UsersForm  
                  updateUser={updateUser}
                  setOptionsAlert={setOptionsAlert}
                  handleSaveUser={handleSaveUser} 
                  handlUpdateUser={handlUpdateUser}
                  setShow={setShow}
                  />
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default UsersFormModal;