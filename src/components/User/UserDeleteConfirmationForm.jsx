import {Modal, Button} from 'react-bootstrap';

const UserDeleteConfirmationForm = ({show,handleClose,user,deleteUserConfirmation})=>{
    return (
      <>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Eliminación de usuario</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            ¿Esta seguro de eliminar el usuario "{user.nombreCompleto}"?
          </Modal.Body>
          <Modal.Footer>
            <Button variant='primary' onClick={()=>deleteUserConfirmation()}>Aceptar</Button>{'  '}
            <Button variant='dark' onClick={()=>handleClose()}>Cancelar</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default UserDeleteConfirmationForm;