import { useState } from 'react';
import { useEffect } from 'react';
import { Pagination } from 'react-bootstrap'

const usePaginationHook = (books) => {

    let items = [];

    const [paginatedBooks, setPaginatedBooks] = useState([])
    const [numberPages, setNumberPages] = useState(0)
    const [numberPerPages, setNumberPerPages] = useState(2)
    const [current, setCurrent] = useState(1)
    const [active, setActive] = useState(1)

    const createItemsPagination = () => {
        for (let number = 1; number <= numberPages; number++) {
            items.push(
                <Pagination.Item key={number} active={number === active} onClick={e => handlePage(Number(e.target.text))}>
                    {number}
                </Pagination.Item>,
            )
        }
    }

    const createNumberPages = () => {
        setNumberPages(
            ((books.length / numberPerPages).toFixed(2).split('.')[1] > 0)
                ? Math.floor(books.length / numberPerPages) + 1
                : Math.floor(books.length / numberPerPages)
        )
    }

    const handlePage = (currentPage) => {
        let currentWhenBlank = ((currentPage * numberPerPages) - 1)
        if (currentWhenBlank > books.length && books.length > 0) {
            setCurrent(currentPage - 1)
            setActive(currentPage - 1)
            currentPage = currentPage - 1
        } else {
            setCurrent(currentPage)
            setActive(currentPage)
        }

        setPaginatedBooks(
            books.slice((currentPage - 1) * numberPerPages, currentPage * numberPerPages)
        )
    }

    createItemsPagination()

    useEffect(() => {
        createNumberPages()
        handlePage(current)
    }, [books])

    return { items, paginatedBooks }
}

export default usePaginationHook