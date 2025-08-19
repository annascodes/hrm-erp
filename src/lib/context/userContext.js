'use client'
import { createContext, useContext, useEffect, useState } from "react";
import useApiReq from "../hooks/useApiReq";


const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const {request, data, loading, err} = useApiReq()
    // on first mount
    useEffect(() => {
        async function getMe() {
            request(`/api/user/me`)
        }
        getMe() // calling 
        // NOTE: using localstorge to persist the state was risky so used api/user/me based on token; so that every refresh will fetch the user(me)

        // const storedUser = localStorage.getItem('user')
        // if (storedUser) setUser(JSON.parse(storedUser))
    }, [])

    useEffect(()=>{
        if(data)
            setUser(data)
    },[data])

    // methods
    const login = (payload) => {
        setUser(payload)
        // localStorage.setItem('user', JSON.stringify(payload))
    }

    const logout = () => {
        setUser(null)
        // localStorage.removeItem('user')
    }
    return <UserContext.Provider value={{ user, login, logout }}>
        {children}
    </UserContext.Provider>
}
export const useUser= ()=>{
    return useContext(UserContext)
}
