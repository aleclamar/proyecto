import { useState, useContext } from 'react'
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Icon,
  Flex,
  Image
} from '@chakra-ui/react'
import { GrPowerReset } from 'react-icons/gr'
import { Link } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'
import { RiArrowGoBackFill } from 'react-icons/ri'
import { LoginContext } from './IsLogged'

export function TresEnRaya() {
  const TURNS = {
    X: '×',
    O: '○',
  }
  const { user } = useContext(LoginContext)
  const [showModal, setShowModal] = useState(false)
  // eslint-disable-next-line react/prop-types
  const Square = ({ children, isSelected, updateBoard, index }) => {
    const className = `square ${isSelected ? 'is-selected' : ''} `

    function handleClick() {
      updateBoard(index)
    }

    return (
      <div onClick={handleClick} className={className}>
        {children}
      </div>
    )
  }
  const WINNER_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)

  function checkWinner(boardToCheck) {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
    }
    return null
  }

  function resetGame() {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    setShowModal(false)
  }

  function checkEndGame(newBoard) {
    return newBoard.every((square) => square !== null)
  }

  function updateBoard(index) {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
      setShowModal(true)
    } else if (checkEndGame(newBoard)) {
      setShowModal(true)
      setWinner(false)
    }
  }

  return (
    <div>
      <div className='fixed top-0 left-0 mt-10 ml-14'>
        <Link to='/' className='flex items-center'>
          <Button>
            <Icon as={RiArrowGoBackFill} />
            <span>Volver</span>
          </Button>
        </Link>
      </div>
      <div className='fixed top-0 right-0 mt-10 mr-14'>
        <Button>
          <Flex alignItems='center' gap={2}>
            {
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
            }

            <span>{user.name}</span>
          </Flex>
        </Button>
      </div>
      <main className='board bg-gray-200 dark:bg-gray-400 p-28 rounded-lg'>
        <h1 className='text-4xl'>3 en raya</h1>
        <section className='turn'>
          <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
          <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
        </section>
        <section className='game'>
          {board.map((_, index) => (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          ))}
        </section>

        <Button
          className='mt-6'
          colorScheme='yellow'
          width='48'
          onClick={resetGame}
        // leftIcon={GrPowerReset}
        >
          <Icon as={GrPowerReset} />
          <span className='ml-2'>Reiniciar partida</span>
        </Button>
        <Modal isOpen={showModal}>
          <ModalOverlay />
          <ModalContent className='flex items-center justify-center mt-4'>
            <ModalHeader>
              <h2 className='text-xl mb-4'>{winner === false ? 'Empate' : 'Ha ganado: '}</h2>
              {winner && <div className='text-7xl text-center'>{winner}</div>}
            </ModalHeader>
            <ModalFooter>
              <Button colorScheme='yellow' width='full' onClick={resetGame}>
                Nueva partida
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </main>
    </div>
  )
}
