// @ts-nocheck
import React, { useContext, useReducer } from 'react'

// 先看一个简单的demo

const initialState = { count: 0 }

function reducer(state: any, action: any) {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 }
        case 'decrement':
            return { count: state.count - 1 }
        default:
            throw new Error()
    }
}

const Counter = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return <>
        Count:{state.count}
        <button onClick={() => dispatch({ type: 'increment' })}>+</button>
        <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </>
}

const initState = {
    name: '',
    password: '',
    isLoading: false,
    error: '',
    isLoggedIn: false
}
function loginReducer(state: any, action: any) {
    switch (action.type) {
        case 'login':
            return {
                ...state,
                isLoading: true,
                error: ''
            }
        case 'success':
            return {
                ...state,
                isLogerIn: true,
                isLoading: false
            }
        case 'error':
            return {
                ...state,
                error: action.payload.error,
                name: '',
                password: ''
            }
        default:
            return state
    }
}

const LoginContext = React.createContext()

function Login() {
    const [state, dispatch] = useReducer(loginReducer, initialState)
    const { name, password, isLoading, isLoggedIn } = state
    const login = (event: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault()
        dispatch({ type: 'login' })
        login({ name, pwd }).then(() => {
            dispatch({ type: 'sucess' })
        }).catch(error => {
            dispatch({
                type: 'error',
                payload: { error: error.message }
            })
        })
    }
    return <LoginContext.Provider value={dispatch}>
        <LoginButton />
    </LoginContext.Provider>
}
function LoginButton() {
    const dispatch = useContext(LoginContext)

    const click = () => {
        if (error) {
            dispatch({
                type: 'error',
                payload: { error: error.message }
            })
        }

    }

}