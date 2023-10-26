/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './Register.css'
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile, } from "firebase/auth";
import app from '../../firebase/firebase.init';
import { Link } from 'react-router-dom';

const auth = getAuth(app);
const Register = () => {

    const [passwordError, setPasswordError] = useState(false)
    const [success, setSuccess] = useState('')


    const handleOnSubmit = event => {
        event.preventDefault();
        setSuccess(false)
        //console.log('from function' );
        // event.preventDefault use korle reload dekhabena.
        //or form tag ke div a convert korleo ek e kaj hobe.

        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        console.log(name, email, password);

        if (!/(?=.*?[A-Z].*[A-Z])/.test(password)) {
            setPasswordError('Please Provide at least tow Capital letters')

        }
        if (password.length < 6) {
            setPasswordError('Password should be at least six characters')
        }
        if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
            setPasswordError('Please Provide a Special Character')
        }

        setPasswordError('')
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setSuccess(true)
                form.reset();
                // Verify Email
                verifyEmail()
                // Update User
                updateUserName(name)



            })
            .catch(error => {
                console.log('error', error);
                setPasswordError(error.message)
            })




    }
    // Verify User

    const verifyEmail = () => {
        sendEmailVerification(auth.currentUser)
            .then(() => {
                alert('Please check your Email and verify your Email Address')

            });

    }
    //update Profile

    const updateUserName = (name) => {
        updateProfile(auth.currentUser, {
            displayName: name,

        })
            .then(() => {
                console.log('Update user successfully');
            })
            .catch(error => console.log(error))
    }





    return (
        <div className='register'>

            <form onSubmit={handleOnSubmit} className='shadow'>
                <h4>Please Register here</h4>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                    <input type="text" name='name' placeholder='Name' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" name='email' placeholder='Email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" name='password' placeholder='Password' className="form-control" id="exampleInputPassword1" />
                </div>
                <p>Already Registered <Link to='/login'>Please Login</Link></p>
                <button type="submit" className="btn btn-info">Register</button>
                <br /><br />
                <p className='text-danger'>{passwordError}</p>
                {
                    success && <p className='text-success'>Registered Successfully Done</p>
                }
            </form>

        </div>
    );
};

export default Register;