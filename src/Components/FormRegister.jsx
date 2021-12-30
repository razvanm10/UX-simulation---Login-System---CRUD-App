import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";

//Functions
import passwordIsWeakMediumStrong from '../Functions/PasswordValidation';
import emailValidation from '../Functions/EmailValidation';
import emailIsAlreadyUsed from '../Functions/EmailIsUsed';

// emails array

const FormRegister = (props) => {
    const [firstName, setFirstName] = useState("");
        const [otherNames, setOtherNames] = useState("");
            const [email, setEmail] = useState("");
                const [password, setPassword] = useState("");
                    const [confPassword, setConfPassword] = useState("");
                        const [error, setError] = useState("");

    let navigate = useNavigate();
     
    return (
          <div>
                <form className = "register-form">
                        <label htmlFor = "fN">First Name: </label>
                            <input id = "fN" type = "text" value = {firstName} onChange = {e => setFirstName(e.target.value)}/>                                                     
                                <label htmlFor = "oN">Other Names: </label>
                                    <input id = "oN" type = "text" value = {otherNames} onChange = {e => setOtherNames(e.target.value)}/>
                                        <label htmlFor = "email">Email: </label>
                                            <input id = "email" type = "text" value = {email} onChange = {e => setEmail(e.target.value)}/>
                                                
                                            <p>{ emailIsAlreadyUsed(email, props.emails) }</p>
                                        <label id = "password">Password: </label>
                                    <input id = "password" type = "password" value = {password} onChange = {e => setPassword(e.target.value)}/>
                                        
                                <label htmlFor = "confPass">Confirm Password: </label>
                        <input id = "confPass" type = "password" value = {confPassword} onChange = {e => setConfPassword(e.target.value)}/>

                        {  password !== confPassword ? <p>Passwords doesn't match !</p> : <p>Passwords match !</p> }

                        <button type = "button" 
                                onClick = {
                                    (e) => {
                                        e.preventDefault();
                                        if(password === confPassword){
                                            if(passwordIsWeakMediumStrong(password, "[a-z]", "[A-Z]", "[?|!|@|#|$]", "[0-9]") !== "Weak"){
                                                if(emailValidation(email) !== "Invalid format for email"){
                                                    if(emailIsAlreadyUsed(email, props.emails) !== "This email is already used !"){
                                                        if(firstName !== "" && otherNames !== "" && email !== "" && password !== ""){
                                                            props.submitForm(firstName, otherNames, email, password);
                                                                  navigate("/");
                                                                     setFirstName("");
                                                                         setOtherNames("");
                                                                         setEmail("");
                                                                     setPassword("");
                                                                  setConfPassword("");
                                                        } else {setError("All the fields are required !")} 
                                                    }
                                                }
                                            }
                                        }
                                    }
                        }> Create Account </button>

                           

                </form>
                <div>
                    <p>{ emailValidation(email) }</p>
                        <p>{error}</p> 
                    <p>{passwordIsWeakMediumStrong(password, "[a-z]", "[A-Z]", "[?|!|@|#|$]", "[0-9]")}</p>
                </div>
         </div>
    )
}

export default FormRegister;
