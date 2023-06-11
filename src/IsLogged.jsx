/* eslint-disable react/prop-types */
import { createContext, useState } from 'react'

//Crear contexto
export const LoginContext = createContext()

//Crear Provider
export function LoginProvider ({children}) {
    const [user, setUser] = useState({
        id: null,
        name: null,
        user_name: null,
        profile_img: null
    })
    const [session, setSession] = useState(null)
    return(
        <LoginContext.Provider value={{
            user,
            setUser,
            session,
            setSession
        }}
        >
            {children}
        </LoginContext.Provider>
    )
}