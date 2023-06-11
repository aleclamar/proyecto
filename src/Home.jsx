import { useState, useContext, useEffect } from 'react'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  Button,
  Flex,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardHeader,
  Heading,
  CardBody,
  Text,
  CardFooter,
  Tag
} from '@chakra-ui/react'
import { LoginContext } from './IsLogged'
import { FaUser } from 'react-icons/fa'
import { RiUserSettingsLine, RiLogoutBoxLine } from 'react-icons/ri'
import { Form } from './Form'
import { Link } from 'react-router-dom'

export function Home() {
  const { session, setSession, user } = useContext(LoginContext)
  const [showModal, setShowModal] = useState(false)

  function logout() {
    setSession(false)
  }

  function handleLoginButtonClick() {
    if (!session) {
      setShowModal(true)
    }
  }
  useEffect(() => {
    handleModalClose()
  }, [session])
  function handleModalClose() {
    setShowModal(false)
  }
  return (
    <div>
      <div className='fixed top-0 right-0 mt-4 mr-20'>
        <Menu>
          <MenuButton
            as={Button}
            colorScheme='gray'
            className='flex items-center space-x-1 h-10'
            onClick={handleLoginButtonClick}
          >
            <Flex alignItems='center' gap={2}>
              {session ? (
                user.profile_img !== null ? (
                  <Image
                    borderRadius='full'
                    w='40px'
                    h='auto'
                    src={`./img/${user.profile_img}.png`}
                    alt='Perfil'
                  />
                ) : (
                  <FaUser />
                )
              ) : (
                <FaUser />
              )}

              {session ? user.name : 'Iniciar Sesión'}
            </Flex>
          </MenuButton>
          {session ? (
            <MenuList>
              <MenuGroup title='Perfil'>
                <MenuItem>
                  <Link to='settings' className='flex items-center'>
                    <RiUserSettingsLine className='mr-2' />
                    <span>Ajustes de usuario</span>
                  </Link>
                </MenuItem>
                <MenuItem onClick={logout}>
                  <RiLogoutBoxLine className='mr-2' />
                  <span>Cerrar Sesión</span>
                </MenuItem>
              </MenuGroup>
              <MenuDivider />
            </MenuList>
          ) : null}
        </Menu>
        <Modal isOpen={showModal} onClose={handleModalClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Iniciar Sesión</ModalHeader>
            <ModalBody>
              <Form />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='red' mr={3} onClick={handleModalClose}>
                Cerrar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
      <div className='grid grid-cols-1 mt-8 lg:grid-cols-2 gap-12'>
        <Card>
          <CardHeader>
            <Heading size='lg' className='text-center'>
              PARCHÍS
            </Heading>
          </CardHeader>
          <CardBody>
            <Image
              mx='auto'
              my='auto'
              w='200px'
              h='200px'
              src='./img/parchis.png'
              alt='Perfil'
            />
            <Text className='text-center mt-4'>
              Juegue al tradicional juego de mesa.
            </Text>
          </CardBody>
          <CardFooter>
          {session ? (
              <Link to='tablero' className='flex items-center'>
                <Button>Juegue haciendo clic aquí</Button>
              </Link>
            ) : (
              <Tag>Inicie sesión para jugar</Tag>
            )}
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <Heading size='lg' className='text-center'>
              3 EN RAYA
            </Heading>
          </CardHeader>
          <CardBody>
            <Image
              mx='auto'
              my='auto'
              w='200px'
              h='200px'
              src='./img/3enraya.png'
              alt='Perfil'
            />
            <Text className='text-center mt-4'>
              Desafíe a un amigo a un duelo al cláscio 3 en raya.
            </Text>
          </CardBody>
          <CardFooter>
            {session ? (
              <Link to='3enraya' className='flex items-center'>
                <Button>Juegue haciendo clic aquí</Button>
              </Link>
            ) : (
              <Tag>Inicie sesión para jugar</Tag>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
