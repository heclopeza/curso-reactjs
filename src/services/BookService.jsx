import axios from "axios";

const multipart_config = {
    headers:{
        'Content-Type':'multipart/form-data'
    }
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
                ?data.takenBy
                :null
    }
}

const BookService = ()=>{

    const findAllBooks = async()=>{
        try{
            const url = `${import.meta.env.VITE_BOOKS_API_URL}book/all`;
            const {data} = await axios(url);
            return {data};
        }catch(error){
            console.log(`Ocurrió un error: ${error}`);
        }
    }

    const saveBook = async (book) =>{
        try{
            const url = `${import.meta.env.VITE_BOOKS_API_URL}book`;
            const {data} = await axios.post(url, book, multipart_config);
            return convertDataToBook(data);
        }catch(error){
            console.log('Ocurrió un error', error);
            return null;
        }
    }

    const deleteBook = async(id)=>{
        try{
            const url = `${import.meta.env.VITE_BOOKS_API_URL}book/id/${id}`;
            const deleteIdBook = await axios.delete(url);
            return deleteIdBook.data;
        }catch(error){
            console.log(error);
            return null;
        }
    }

    const updateBook = async(book)=>{
        try{
            const url = `${import.meta.env.VITE_BOOKS_API_URL}book`;
            const {data} = await axios.put(url, book, multipart_config);
            return convertDataToBook(data);
        }catch(error){
            console.log('Ocurrió un error', error);
            return null;
        }
    }
    return {findAllBooks, saveBook, deleteBook, updateBook}
}

export default BookService;