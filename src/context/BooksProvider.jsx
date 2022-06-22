import { createContext, useEffect, useState} from 'react';
import BookService from '../services/BookService';

const BooksContext = createContext();

const BooksProvider = ({children})=>{
    
    const [books, setBooks] = useState([]);
    const {findAllBooks} = BookService();
    const getAllBooks = async()=>{
        let allBooks = await findAllBooks();
        setBooks(allBooks);
    }
    useEffect(()=>{
        getAllBooks();
    },[])
    return (
        <BooksContext.Provider value={{books}}>
            {children}
        </BooksContext.Provider>
    )
}

export {
    BooksProvider
}

export default BooksContext;