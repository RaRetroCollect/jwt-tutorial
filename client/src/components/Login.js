import React, { Fragment, useState } from 'react';
import { toast } from 'react-toastify';
import './login.css';

const Login = ({ setAuth }) => {

    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    const { email, password } = inputs;

    const onchange = (e) => {
        setInputs({...inputs, [e.target.name]: e.target.value})
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { email, password};

            const response = await fetch('http://localhost:5000/auth/login', {method: "POST", headers: {"Content-Type": "application/json" }, body: JSON.stringify(body)});

            const parseRes = await response.json();

            if(parseRes.token) {
                localStorage.setItem("token", parseRes.token);

                setAuth(true);
                toast.success("Login succesfull!")
            } else {
                setAuth(false);
                toast.error(parseRes);
            }



        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <div class="test">
		        <div class="d-flex justify-content-center">
			        <div class="user_card">
				        <div class="d-flex justify-content-center">
					        <div class="brand_logo_container">
						        <img src="https://www.heemskerkflowers.com/Themes/Default/images/header-logo-small.svg?v=180830123710" class="brand_logo" alt="Logo" />
					        </div>
				        </div>
				        <div class="d-flex justify-content-center form_container">
					        <form onSubmit={onSubmitForm}>
						        <div class="input-group mb-3">
							        <div class="input-group-append">
								        <span class="input-group-text"><i class="fas fa-user"></i></span>
							        </div>
                                    <input type="email" name="email" placeholder="Gebruikersnaam" class="form-control input_user" value={email} onChange={e => onchange(e)} />
						        </div>
						        <div class="input-group mb-2">
							        <div class="input-group-append">
								        <span class="input-group-text"><i class="fas fa-key"></i></span>
							        </div>
                                    <input type="password" name="password" placeholder="Wachtwoord" class="form-control input_pass" value={password} onChange={e => onchange(e)} />
						        </div>
							    <div class="d-flex justify-content-center mt-3 login_container">
				 	                <button class="btn btn-success login_btn">Login</button>
				                </div>
					        </form>
				        </div>		
			        </div>
		        </div>
	        </div>            
        </Fragment>
    );
};

export default Login;