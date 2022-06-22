import { useState } from 'react';
import { useEffect } from 'react';
import { Pagination } from 'react-bootstrap'

const usePaginationUserHook = (users) => {

    let items = [];

    const [paginatedUsers, setPaginatedUsers] = useState([])
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
            ((users.length / numberPerPages).toFixed(2).split('.')[1] > 0)
                ? Math.floor(users.length / numberPerPages) + 1
                : Math.floor(users.length / numberPerPages)
        )
    }

    const handlePage = (currentPage) => {
        let currentWhenBlank = ((currentPage * numberPerPages) - 1)
        if (currentWhenBlank > users.length && users.length > 0) {
            setCurrent(currentPage - 1)
            setActive(currentPage - 1)
            currentPage = currentPage - 1
        } else {
            setCurrent(currentPage)
            setActive(currentPage)
        }

        setPaginatedUsers(
            users.slice((currentPage - 1) * numberPerPages, currentPage * numberPerPages)
        )
    }

    createItemsPagination()

    useEffect(() => {
        createNumberPages()
        handlePage(current)
    }, [users])

    return { items, paginatedUsers }
}

export default usePaginationUserHook