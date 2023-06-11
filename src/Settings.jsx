import { useContext, useState } from 'react'
import {
    Card, CardHeader, CardFooter, Flex, Avatar, useToast, Text, IconButton, CardBody, FormControl, FormLabel, Input, Menu, Box, MenuButton, MenuList, MenuItem, Heading, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Grid, Image
} from '@chakra-ui/react'
import { LoginContext } from './IsLogged'
import { FaUser } from 'react-icons/fa'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { Link } from 'react-router-dom'

export function Settings() {
    const { user, setUser } = useContext(LoginContext)
    const [showNameModal, setShowNameModal] = useState(false)
    const [showUserNameModal, setShowUserNameModal] = useState(false)
    const [showProfileModal, setShowProfileModal] = useState(false)
    const [nameValue, setNameValue] = useState(user.name)
    const [userNameValue, setUserNameValue] = useState(user.user_name)
    const [selectedProfileImg, setSelectedProfileImg] = useState(user.profile_img)
    const [updatedName, setUpdatedName] = useState(user.name)
    const [updatedUserName, setUpdatedUserName] = useState(user.user_name)
    const [profileImg, setProfileImg] = useState(user.profile_img)
    const toast = useToast()

    const handleModalClose = () => {
        setNameValue(user.name)
        setShowNameModal(false)
    }

    const handleUserNameModalClose = () => {
        setUserNameValue(user.user_name)
        setShowUserNameModal(false)
    }

    const handleProfileModalClose = () => {
        setShowProfileModal(false)
    }

    const handleChange = (e) => {
        const { name, value } = e.target

        if (name === 'name') {
            setNameValue(value)
        } else if (name === 'userName') {
            setUserNameValue(value)
        }
    }

    const handleSaveName = () => {
        setUpdatedName(nameValue)
        setShowNameModal(false)
    }

    const handleSaveUserName = () => {
        setUpdatedUserName(userNameValue)
        setShowUserNameModal(false)
    }

    const handleProfileImageClick = (imgName) => {
        setSelectedProfileImg(imgName)
    }

    const handleSaveProfileImage = () => {
        setProfileImg(selectedProfileImg)
        setShowProfileModal(false)
    }

    function handleUpdateData() {
        const dataToSend = {
            name: nameValue,
            userName: userNameValue,
            img: selectedProfileImg,
            id: user.id
        }
        fetch('http://localhost/miPrueba/modificarUsuario.php', {
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
                if (jsonData.modificado) {
                    setUser(prevState => ({
                        ...prevState,
                        name: nameValue,
                        user_name: userNameValue,
                        profile_img: selectedProfileImg
                    }))
                    toast({
                        title: 'Usuario modificado correctamente',
                        description: 'Puede que necesite actualizar la sesión para ver los cambios.',
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                    })
                } else {
                    toast({
                        title: 'Error',
                        description: 'No se puedo modificar el usuario correctamente.',
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                    })
                }
                console.log(jsonData)
            })
            .catch(error => {
                console.error('Error:', error)
            })

    }

    return (
        <div className="h-screen flex flex-col justify-start items-center">
            <h1 className="text-3xl mt-4">Ajustes</h1>
            <div className="flex flex-col justify-center items-center flex-grow">
                <Card width={{ base: 'xs', md: 'lg' }}>
                    <CardHeader>
                        <Flex spacing='4'>
                            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                {profileImg !== null ? (
                                    <Avatar name='avatar' src={`./img/${profileImg}.png`} alt='Perfil' />
                                ) : (
                                    <FaUser />
                                )}
                                <Box>
                                    <Heading size='sm'>{updatedUserName}</Heading>
                                    <Text>{updatedName}</Text>
                                </Box>
                            </Flex>
                            <Menu>
                                <MenuButton
                                    as={IconButton}
                                    aria-label='Options'
                                    icon={<BsThreeDotsVertical />}
                                    variant='outline'
                                />
                                <MenuList>
                                    <MenuItem onClick={() => setShowNameModal(true)}>
                                        Cambiar Nombre
                                    </MenuItem>
                                    <MenuItem onClick={() => setShowUserNameModal(true)}>
                                        Cambiar nombre de usuario
                                    </MenuItem>
                                    <MenuItem onClick={() => setShowProfileModal(true)}>
                                        Cambiar foto de perfil
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </Flex>
                    </CardHeader>
                    <CardBody>
                        <Text>
                            Aquí irá más información del usuario
                        </Text>
                    </CardBody>
                    <CardFooter
                        justify='space-between'
                        flexWrap='wrap'
                        sx={{
                            '& > button': {
                                minW: '136px',
                            },
                        }}
                    >
                    </CardFooter>
                </Card>
                <Button className='mt-12' onClick={handleUpdateData}>Confirmar Cambios</Button>
                <Button className='mt-12' >
                    <Link to="/" className="flex items-center">
                        <span>Volver</span>
                    </Link>
                </Button>
                <Modal isOpen={showNameModal} onClose={handleModalClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Cambiar nombre</ModalHeader>
                        <ModalBody>
                            <FormControl id='name'>
                                <FormLabel>Nombre</FormLabel>
                                <Input
                                    type='text'
                                    name='name'
                                    value={nameValue}
                                    onChange={handleChange}
                                    required
                                    className='mt-1 mb-5 w-full'
                                />
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='red' mr={3} onClick={handleModalClose}>
                                Cerrar
                            </Button>
                            <Button colorScheme='green' mr={3} onClick={handleSaveName}>
                                Guardar
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
                <Modal isOpen={showUserNameModal} onClose={handleUserNameModalClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Cambiar nombre de usuario</ModalHeader>
                        <ModalBody>
                            <FormControl id='userName'>
                                <FormLabel>Nombre de usuario</FormLabel>
                                <Input
                                    type='text'
                                    name='userName'
                                    value={userNameValue}
                                    onChange={handleChange}
                                    required
                                    className='mt-1 mb-5 w-full'
                                />
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='red' mr={3} onClick={handleUserNameModalClose}>
                                Cerrar
                            </Button>
                            <Button colorScheme='green' mr={3} onClick={handleSaveUserName}>
                                Guardar
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
                <Modal isOpen={showProfileModal} onClose={handleProfileModalClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Cambiar foto de perfil</ModalHeader>
                        <ModalBody>
                            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                                <Image
                                    src="./img/dog.png"
                                    alt="Avatar 1"
                                    cursor="pointer"
                                    onClick={() => handleProfileImageClick('dog')}
                                />
                                <Image
                                    src="./img/cat.png"
                                    alt="Avatar 2"
                                    cursor="pointer"
                                    onClick={() => handleProfileImageClick('cat')}
                                />
                                <Image
                                    src="./img/lion.png"
                                    alt="Avatar 3"
                                    cursor="pointer"
                                    onClick={() => handleProfileImageClick('lion')}
                                />
                                <Image
                                    src="./img/own.png"
                                    alt="Avatar 4"
                                    cursor="pointer"
                                    onClick={() => handleProfileImageClick('own')}
                                />
                            </Grid>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='red' mr={3} onClick={handleProfileModalClose}>
                                Cerrar
                            </Button>
                            <Button colorScheme='green' mr={3} onClick={handleSaveProfileImage}>
                                Guardar
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </div>
        </div>
    )
}

export default Settings
