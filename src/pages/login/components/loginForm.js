import React, { useState } from 'react';
import { Alert } from 'antd';

import './loginForm.css';

const LoginForm = ({ login }) => {
    const [error, setError] = useState("");
    const [details, setDetails] = useState({ name: '', email: '', password: '' });

    // const getErrorList = (errorFields) => {
    //     return errorFields.map((field) =>
    //         <li key={field.name.toString()}>{field.errors.toString()}</li>
    //     );
    // }

    const submitHandler = (e) => {
        e.preventDefault();

        setError(login(details));

    }

    const clearError = () => {
        setError("");
    }

    return (
        <div className='login-wrapper'>

            <div className='login-header'>
                <div className='login-header-wrapper'>
                    <div className='login-header-title'>Login</div>
                </div>
            </div>
            <div className='login-error'>
                {(error !== "") ?
                    (<Alert
                        message="Login Failed"
                        description={error}
                        type="error"
                        closable
                        onClose={() => clearError()}
                    />) : null}
            </div>
            <div className='login-body'>
                <form onSubmit={submitHandler}>
                    <div className='login-form'>
                        <div className='login-form-group'>
                            {/* <label htmlFor='name'>Name: </label> */}
                            <input
                                className='login-form-input'
                                type='text' name='name' id='name'
                                onChange={e => setDetails({ ...details, name: e.target.value })}
                                value={details.name}
                                placeholder='Name'></input>
                        </div>
                        <div className='login-form-group'>
                            {/* <label htmlFor='email'>Email: </label> */}
                            <input
                                className='login-form-input'
                                type='text' name='email' id='email'
                                onChange={e => setDetails({ ...details, email: e.target.value })}
                                value={details.email}
                                placeholder='Email'></input>
                        </div>
                        <div className='login-form-group'>
                            {/* <label htmlFor='password'>Password: </label> */}
                            <input
                                className='login-form-input'
                                type='password' name='password' id='password'
                                onChange={e => setDetails({ ...details, password: e.target.value })}
                                value={details.password}
                                placeholder='Password'></input>
                        </div>
                        <div className='login-form-group'>
                            <input className='login-form-button' type='submit' value='Login'></input>
                        </div>
                    </div>
                </form>
                <div className='login-another'>
                    <div className='login-text'>
                        Chưa có tài khoản?
                    </div>
                    <div className='login-link-wrapper'>
                        <a href='/signup' className='login-link'>Đăng kí</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;