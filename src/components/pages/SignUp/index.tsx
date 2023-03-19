import { useEffect } from 'react'
import { useNavigate } from 'react-router'

import { useAppSelector } from '../../redux/hooks'
import { getAuthToken } from '../../redux/reducers/auth/selectors'
import RegistrationForm from '../../registration'

const SignUpPage = () => {
  const navigate = useNavigate()
  const auth = useAppSelector(getAuthToken)
  useEffect(() => {
    if (auth) {
      navigate('/')
    }
  }, [auth, navigate])
  return <RegistrationForm />
}

export default SignUpPage
