import { useContext } from "react";
import BooksContext from "../context/BooksProvider";

const UseBooks = ()=>{
    return useContext(BooksContext);
}

export default UseBooks;