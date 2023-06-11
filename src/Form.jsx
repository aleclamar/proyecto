import { useState, useContext } from 'react'
import { LoginContext } from './IsLogged'
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast
} from '@chakra-ui/react'
import { Navigate, Link } from 'react-router-dom'

export function Form() {
  const { session, setSession, setUser } = useContext(LoginContext)
  const toast = useToast()
  const [formData, setFormData] = useState({
    name: '',
    password: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const dataToSend = {
      name: formData.name,
      password: formData.password,
    }

    fetch('http://localhost/miPrueba/iniciarSesion.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la solicitud')
        }
        return response.json()
      })
      .then(jsonData => {
        if (jsonData.existe) {
          setUser(prevState => ({
            ...prevState,
            name: jsonData.usuario.name,
            id: jsonData.usuario.id,
            user_name: jsonData.usuario.user_name,
            profile_img: jsonData.usuario.profilePhoto
          }))
          setSession(true)
        } else {
          toast({
            title: 'Usuario no encontrado',
            description: 'El usuario no existe.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
        }
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  return (
    <div className=''>
      <form onSubmit={handleSubmit} className='w-full max-w-sm'>
        <FormControl id='name'>
          <FormLabel>Nombre</FormLabel>
          <Input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            required
            className='mt-1 mb-5 w-full'
          />
        </FormControl>
        <FormControl id='password'>
          <FormLabel>Contraseña</FormLabel>
          <Input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            required
            className='mt-1 mb-5 w-full'
          />
        </FormControl>
        <Button colorScheme='blue' className='w-full' type='submit' >
          Submit
        </Button>
        <Button colorScheme='black' variant='link' className='w-full mt-5' >
          <Link to='registration'>¿No tiene cuenta? Regístrese</Link>
        </Button>
        {session && (
          <Navigate to="/" />
        )}
      </form>
    </div>
  )
}
