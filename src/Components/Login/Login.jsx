/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword} from "firebase/auth";
import app from '../../firebase/firebase.init';
import { Link } from 'react-router-dom';

const auth = getAuth(app);
const Login = () => {

    const [success, setSuccess] = useState('')


    const handleOnSubmit = event => {
        event.preventDefault();
        setSuccess(false)
        //console.log('from function' );
        // event.preventDefault use korle reload dekhabena.
        //or form tag ke div a convert korleo ek e kaj hobe.

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        //console.log(name, email, password);

       
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setSuccess(true)
                form.reset();
                
            })
            .catch(error => {
                console.log('error', error);
            
            })




    }
   




    return (
        <div className='register'>

            <form onSubmit={handleOnSubmit} className='shadow'>
                <h4>Please Login</h4>
               
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" name='email' placeholder='Email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" name='password' placeholder='Password' className="form-control" id="exampleInputPassword1" />
                </div>
                <p>New User in Website <Link to='/register'>Please Register</Link></p>
                <button type="submit" className="btn btn-info">Login</button>
              
                
                {
                    success && <p className='text-success'>Login Successfully Done</p>
                }
            </form>

        </div>
    );
};

export default Login;