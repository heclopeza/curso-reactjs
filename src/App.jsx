import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import { BooksProvider } from './context/BooksProvider';
import BooksLayout from './layouts/BooksLayout'
import UsersLayout from './layouts/UsersLayout';
import Books from './pages/Books'
import User from './pages/User';

const App = ()=> {
  /*
  <BooksProvider>
  </BooksProvider>
   */
  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path="/books" element={<BooksLayout />}>
              <Route path="all" element={<Books />} />
            </Route>
            <Route path="/users" element={<UsersLayout />}>
              <Route path="all" element={<User />} />
            </Route>
          </Routes>
        </BrowserRouter>
      
    </div>
  )
}

export default App