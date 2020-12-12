import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import { registerUser } from '../../../_actions/user_actions'
import { withRouter } from 'react-router-dom'

function RegisterPage(props) {
    const dispatch = useDispatch();
    const [Name, setName] = useState("")
    const [LastName, setLastName] = useState("")
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }

    const onLastNameHandler = (event) => {
        setLastName(event.currentTarget.value)
    }

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }


    const onSubmitHandler = (event) => {
        event.preventDefault();

        if (Password !== ConfirmPassword) {
            return alert('Please check the password')
        }
        //Create body
        let body = {
            name: Name,
            lastname: LastName,
            email: Email,
            password: Password
        }

        //call dispatcher for registering a user
        dispatch(registerUser(body))
            .then(response => {
                if(response.payload.success) {
                    props.history.push('/login')
                } else {
                    alert('Failed to register the User')
                }
            })
    }


    return (
        <div style={{ display:'flex', justifyContent: 'center', alignItems: 'center'
                    , width: '100%', height: '100vh'
        }}>
            <form style={{ display: 'flex', flexDirection:'column'}}
                    onSubmit={onSubmitHandler}        
            >
                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler}/>
                <label>Last Name</label>
                <input type="text" value={LastName} onChange={onLastNameHandler}/>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler}/>
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>
                <label>Password Confirm</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>                
                <br/>
                <button>Register User</button>
            </form>
        </div>
    )
}

export default withRouter(RegisterPage)
