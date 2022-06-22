import Library from '../components/Library/Library'
import { UsersProvider } from '../context/UsersProvider'

const Books = () => {
    return (<>
        <UsersProvider>
            <Library />
        </UsersProvider>
    </>)
}

export default Books