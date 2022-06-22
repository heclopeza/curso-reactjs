import {Button, Modal, Alert} from 'react-bootstrap';
import LibraryForm from './LibraryForm';

const LibraryFormModal = ({show,setShow,handleSaveBook,updateBook,handlUpdateBook,setOptionsAlert})=>{
  return (
    <>
      <Button variant="primary" onClick={()=>setShow(true)}>
        Nuevo Libro
      </Button>

      <Modal
        show={show}
        onHide={()=>setShow(false)}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Biblioteca</Modal.Title>
        </Modal.Header>
        <Modal.Body>
              <LibraryForm  
                handleSaveBook={handleSaveBook} 
                updateBook={updateBook}
                handlUpdateBook={handlUpdateBook}
                setShow={setShow}
                setOptionsAlert={setOptionsAlert}
                />
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LibraryFormModal;