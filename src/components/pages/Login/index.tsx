import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import LoginForm from '../../login'
import { useAppSelector } from '../../redux/hooks'
import { getAuthToken } from '../../redux/reducers/auth/selectors'

const LoginPage = () => {
  const navigate = useNavigate()
  const auth = useAppSelector(getAuthToken)
  useEffect(() => {
    if (auth) {
      navigate('/')
    }
  }, [auth, navigate])
  return <LoginForm />
}

export default LoginPage
