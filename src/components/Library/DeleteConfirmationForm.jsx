import {Modal, Button} from 'react-bootstrap';

const DeleteConfirmationForm = ({show,handleClose,book,deleteBookConfirmation})=>{
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
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Desea eliminar el libro "{book.titulo}"
          </Modal.Body>
          <Modal.Footer>
            <Button variant='primary' onClick={()=>deleteBookConfirmation()}>Aceptar</Button>{'  '}
            <Button variant='dark' onClick={()=>handleClose()}>Cancelar</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default DeleteConfirmationForm;