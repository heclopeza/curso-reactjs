import { useEffect } from 'react';
import BookService from '../services/BookService';
import Constants from '../commons/Constants';
import AlertManagement from '../commons/AlertManagement';

const {
    UPDATE_BOOK_SUCCESS_MSG,
    UPDATE_BOOK_ERROR_MSG,
    DELETE_BOOK_SUCCESS_MSG,
    DELETE_BOOK_ERROR_MSG,
    CREATED_BOOK_SUCCESS_MSG,
    CREATED_BOOK_ERROR_MSG,
    PRESTAMO_BOOK_SUCCESS_MSG,
    PRESTAMO_BOOK_ERROR_MSG
} = Constants()

const useBookHooks = (setBooks,books,setUpdateBook,setShow,setOptionsAlert,setShowPrestar)=>{
    const {success, error} = AlertManagement();

    const {findAllBooks, saveBook,deleteBook,updateBook} = BookService();
    
    const handleSaveBook = async (book)=>{
        let newBook = await saveBook(construyeFormData(book));
        setShow(false);
        if(newBook){
            setBooks([newBook, ...books]);
            setOptionsAlert(success(CREATED_BOOK_SUCCESS_MSG));
        }else{
            setOptionsAlert(error(CREATED_BOOK_ERROR_MSG));
        }
        setTimeout(() => {
            setOptionsAlert({alertShow: false})
        }, 2000);
    }

    const handleFindAllBook = async()=>{
        const allBooks = await findAllBooks();
        /*Se debe parsear los datos ya que no son los mismos. El ISBN si coincide   */
        if(allBooks){
            const booksMap = Object.values(allBooks.data).map(item => convertDataToBook(item));
            setBooks(booksMap);
        }
    };

    const handleDeleteHook = async(id)=>{
        const deletedBook = await deleteBook(id);
        if(deletedBook){
            const newBooks = books.filter(b=>b.id!==deletedBook._id);
            setBooks(newBooks);
            setOptionsAlert(success(DELETE_BOOK_SUCCESS_MSG));
        }else{
            setOptionsAlert(error(DELETE_BOOK_ERROR_MSG));
        }
        setTimeout(() => {
            setOptionsAlert({alertShow: false})
        }, 2000);
    }

    const handlUpdateBook = async (book)=>{
        const updatedBook = await updateBook(construyeFormData(book));
        setShow(false);
        if(updatedBook){
            const updBooks = books.map(b=>(b.id===updatedBook.id)?updatedBook:b);
            setBooks(updBooks);
            setUpdateBook(null);
            setOptionsAlert(success(UPDATE_BOOK_SUCCESS_MSG));
        }else{
            setOptionsAlert(error(UPDATE_BOOK_ERROR_MSG));
        }
        setTimeout(() => {
            setOptionsAlert({alertShow: false})
        }, 2000);
    }

    const selectUpdateBook = (book)=>{
        setUpdateBook(book);
        setShow(true);
    }

    const construyeFormData = (book)=>{
        let formData = new FormData();
        if(book.id){
            formData.append('id',book.id);
        }
        if(book.idUser){
            formData.append('takenBy',book.idUser);
        }
        formData.append('isbn',book.isbn);
        formData.append('title',book.titulo);
        formData.append('city',book.ciudad);
        formData.append('author',book.autor);
        formData.append('publicationDate',book.publicationDate);
        formData.append('editorial',book.editorial);
        formData.append('edition',book.edicion);
        formData.append('numPages',book.numPaginas);
        formData.append('description',book.descripcion);
        formData.append('status',book.estatusSelect);
        formData.append('file',book.file);
        return formData;
    }

    const convertDataToBook = (data) =>{
        return {
            id:data._id,
            isbn:data.isbn,
            titulo:data.title,
            ciudad:data.city,
            autor:data.author,
            publicationDate:data.publicationDate,
            editorial:data.editorial,
            edicion:data.edition,
            numPaginas:data.numPages,
            descripcion:data.description,
            estatusSelect:data.status,
            file:data.bookFile,
            takenBy:(data.takenBy)
                    ?{
                        id:data.takenBy._id,
                        nombreCompleto:data.takenBy.fullName
                    }
                    :null
        }
    }

    const handlePrestar = async (book, idUser)=>{
        if(book.takenBy){
            book.takenBy=null;
        }
        const bookPrest = (idUser!=='0')?{...book,idUser}
                            :book;
        const updatedBook = await updateBook(construyeFormData(bookPrest));
        setShowPrestar(false);
        if(updatedBook){
            const updBooks = books.map(b=>(b.id===updatedBook.id)?updatedBook:b);
            setBooks(updBooks);
            setOptionsAlert(success(PRESTAMO_BOOK_SUCCESS_MSG));
        }else{
            setOptionsAlert(error(PRESTAMO_BOOK_ERROR_MSG));    
        }
        setTimeout(() => {
            setOptionsAlert({alertShow: false})
        }, 2000);
    }

    useEffect(()=>{
        handleFindAllBook()
    },[]);

    return {handleSaveBook,handleDeleteHook,handlUpdateBook,selectUpdateBook,handlePrestar}
}

export default useBookHooks;