/* eslint-disable react/prop-types */
import { Registration } from './Registration'
import { Route, Routes, Navigate } from 'react-router-dom'
import { Home } from './Home.jsx'
import { Settings } from './Settings'
import { Tablero } from './Tablero'
import { TresEnRaya } from './TresEnRaya'
import { LoginContext } from './IsLogged'
import { useContext } from 'react'


const ProtectedRoute = ({
  session,
  redirectPath = '/',
  children,
}) => {
  if (!session) {
    return <Navigate to={redirectPath} replace />;
  }
  return children
}
export default function App() {
  const { session } = useContext(LoginContext)
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      {/* <div className='flex justify-center items-center'> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path="3enraya"
          element={
            <ProtectedRoute session={session}>
              <TresEnRaya />
            </ProtectedRoute>
          }
        />
        <Route path='registration' element={<Registration />} />
        <Route
          path="tablero"
          element={
            <ProtectedRoute session={session}>
              <Tablero />
            </ProtectedRoute>
          }
        />
        <Route
          path="settings"
          element={
            <ProtectedRoute session={session}>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<h1>Not found</h1>} />
      </Routes>
      {/* </div> */}
    </div>
  );
}
