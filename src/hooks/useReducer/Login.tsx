// @ts-nocheck
import React, { useState } from 'react'

const Login = () => {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const login = (event: React.FormEvent<InputEvent>) => {
        event.preventDefault()
        setError('')
        setIsLoading(true)
        login({ name, password }).then(() => {
            setIsLoading(false)
            setIsLoggedIn(true)
        }).
            catch(error => {
                setError(error.message)
                setName('')
                setPassword('')
                setIsLoggedIn(false)
                setIsLoading(false)
            })
    }
    return <></>
}