import { useState } from 'react'
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    useToast,
    Tooltip,
    IconButton
} from '@chakra-ui/react'
import { Navigate, Link } from 'react-router-dom'
import { AiFillInfoCircle } from 'react-icons/ai'

export function Registration() {
    const toast = useToast()
    const [formData, setFormData] = useState({
        name: '',
        userName: '',
        password: '',
        password2: ''
    })
    const [showError1, setShowError1] = useState('hidden')
    const [showError2, setShowError2] = useState('hidden')
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
    const [userCreated, setUserCreated] = useState(false)
    const handleOcultar = () => {
        setShowError1('hidden')
        setShowError2('hidden')
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(formData)
        if (formData.password !== formData.password2) {
            setShowError1('block')
            return
        }
        if (!regex.test(formData.password)) {
            setShowError2('block')
            return
          }
        const dataToSend = {
            name: formData.name,
            userName: formData.userName,
            password: formData.password,
        }

        fetch('http://localhost/miPrueba/creacionUsuario.php', {
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
                console.log(jsonData)
                if (jsonData.created) {
                    toast({
                        title: 'Usuario creado exitosamente',
                        description: 'Ahora, inicie sesión.',
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                    })
                    setUserCreated(true)
                } else {
                    if (jsonData.error == `Duplicate entry 'usuario_prueba' for key 'user_name'`) {
                        toast({
                            title: 'No se pudo crear el usuario',
                            description: 'El nombre de usuario ya existe, pruebe con otro',
                            status: 'error',
                            duration: 9000,
                            isClosable: true,
                        })
                    }
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
                <FormControl id='userName'>
                    <FormLabel>Nombre de usuario</FormLabel>
                    <Input
                        type='text'
                        name='userName'
                        value={formData.userName}
                        onChange={handleChange}
                        required
                        className='mt-1 mb-5 w-full'
                    />
                </FormControl>
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
                    <FormLabel>Contraseña
                        <Tooltip label='La contraseña debe contener al menos 8 caracteres de los cuales: 1 mayúscula, 1 minúscula y 1 número'>
                            <IconButton
                                variant='ghost'
                                className='text-black'
                                aria-label='Call Segun'
                                size='sm'
                                icon={<AiFillInfoCircle />}
                            />
                        </Tooltip>
                    </FormLabel>
                    <Input
                        type='password'
                        name='password'
                        value={formData.password}
                        onFocus={handleOcultar}
                        onChange={handleChange}
                        required
                        className='mt-1 mb-5 w-full'
                    />
                </FormControl>
                <FormControl id='password2'>
                    <FormLabel>Repetir contraseña</FormLabel>
                    <Input
                        type='password'
                        name='password2'
                        value={formData.password2}
                        onChange={handleChange}
                        onFocus={handleOcultar}
                        required
                        className='mt-1 mb-5 w-full'
                    />
                </FormControl>
                <span className={`mb-4 text-red-500 ${showError1}`}>Las contraseñas no coinciden</span>
                <span className={`mb-4 text-red-500 ${showError2}`}>La contraseña no cumple con los requisitos mínimos</span>
                <Button colorScheme='blue' type='submit' className='w-full'>
                    Registrarse
                </Button>
                <Button colorScheme='black' variant='link' className='w-full mt-5' onClick={() => { }}>
                    <Link to='/'>¿Ya tiene cuenta? Inicie sesión</Link>
                </Button>
                {userCreated && (
                    <Navigate to="/" />
                )}
            </form>
        </div>
    )
}
