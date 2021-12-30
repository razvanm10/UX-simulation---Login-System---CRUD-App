import React, {useEffect, useState} from 'react';
import axios from 'axios';

import emailValidation from '../Functions/EmailValidation';
import passwordIsWeakMediumStrong from '../Functions/PasswordValidation';

const ChangePassword = (props) => {

    const [data, setData] = useState([]);
        const [email, setEmail] = useState("");
            const [newPassword, setNewPassword] = useState("");
                const [confirmation, setConfirmation] = useState("");

    useEffect(() => {
        axios.get("http://localhost:5000/user")
             .then(res => setData(res.data))
             .catch(err => console.log("couldn't get users data"))
    }, [])
    
    const accounts = data.users;
    const findTheUser = (accounts, email) => {
          try {
               const user = accounts.filter(account => account.email === email) // emails are unique
               return user;
          } 
          catch {
               console.log("some error")
          }
    }

    const passwordStatus = (password) => {
          let value = "";
          if(password.length <= 8){
             value = "Password is too short !";
          } else {
              if(passwordIsWeakMediumStrong(password, "[a-z]", "[A-Z]", "[?|!|@|#|$]", "[0-9]") === "Weak"){
                    value = "Password is too weak ! Make it stronger by adding uppercase letters, numbers and symbols '?#!$@'"
              }
          } 
          return value 
    }
    
    const changePassword = async (email, newPassword) => {
        if(newPassword.length >= 8){
                if(passwordIsWeakMediumStrong(newPassword, "[a-z]", "[A-Z]", "[?|!|@|#|$]", "[0-9]") !== "Weak"){
                    const account = findTheUser(accounts, email)
                    const changedUser = await axios.put(`http://localhost:5000/user/${account[0].id}`, 
                    {first_name: account[0].first_name, other_names: account[0].other_names, email: account[0].email, password: newPassword})
                    console.log(changedUser);
                } else {console.log("Choose a stronger password, who contains upper case letters, numbers, and symbols '?!$#@' ")}
          } else {console.log("Too short")}
    }
    
    return (
        <div>
            <form>
                <label htmlFor="email">Email</label>
                    <input id = "email" type="text" value = {email} onChange = {(e) => setEmail(e.target.value)}/>
                        <label htmlFor="new-password">New Password</label>
                            <input id = "new-password" type="password" value = {newPassword} onChange = {(e) => setNewPassword(e.target.value)}/>
                        <label htmlFor="confirmation">Confirmation</label>
                    <input id = "confirmation" type="password" value = {confirmation} onChange = {(e) => setConfirmation(e.target.value)}/>
                <button 
                    onClick = {() => {
                        changePassword(email, newPassword);
                        setEmail("");
                        setConfirmation("");
                        setNewPassword("");
                    }}> Change </button>
            </form>
            {
                newPassword !== "" &&
                <div>
                    <br />
                    <p>{newPassword === confirmation? "Passwords match!" : "Passwords doesn't match!"}</p>
                    <p>{passwordStatus(newPassword)}</p>
                </div>
            }
        </div>
    )
}

export default ChangePassword;
