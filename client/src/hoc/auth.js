import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_actions'

export default function (SpecificComponent, option, adminRoute = null) {


    //null  -> Anyone can enter
    //true  -> only for logged in user
    //false -> only for logged out user

    function AuthenticationCheck(props) {

        const dispatch = useDispatch();

        useEffect(() => {

            dispatch(auth()).then(response => {
                console.log(response)

                //if not logged in
                if(!response.payload.isAuth) {
                    if(option) {
                        props.history.push('/login')
                    }
                } else {
                    //if logged in
                    if(adminRoute && !response.payload.isAdmin) {
                        props.history.push('/')
                    } else {
                        if (option === false)
                            props.history.push('/')
                    }
                }
            })
        }, [])

        return (
            <SpecificComponent/>
        )
    }
    return AuthenticationCheck
}