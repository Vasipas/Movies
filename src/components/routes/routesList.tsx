import MovieForm from '../pages/Create'
import HomePage from '../pages/Home'
import LoginPage from '../pages/Login'
import MoviePage from '../pages/Movie'
import SignUpPage from '../pages/SignUp'
import UpdatePage from '../pages/Update'

const navList = [
  { path: '/login', element: <LoginPage /> },
  {
    path: '/signup',
    element: <SignUpPage />,
  },
  { path: '/', element: <HomePage /> },
  { path: '/create', element: <MovieForm /> },
  { path: '/movie/:id', element: <MoviePage /> },
  { path: '/update/:id', element: <UpdatePage /> },
]

export { navList }
