import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

const FormLogin = (props) => {

    const [users, setUsers] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:5000/user")
             .then(res => setUsers(res.data))
             .catch(console.log("couldn't get data"))
    }, [])

    const deleteAccount = (id) => {
          axios.delete("http://localhost:5000/user/" + id)
               .then(setUsers(users.users.filter(user => user.id !== id)))
               .catch(console.log("couldn't delete user"))
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogged, setIsLogged] = useState(false);

    let navigate = useNavigate();

    // used for formatting and mapping the accounts from database, 
    //only email and password (i don't use id because emails are unique),
    //emails cannot have duplicates in the database (emailsIsAlreadyUsed function in Functions folder)
    const formatAccount = (account) => {
        return {
            "email": account.email,
            "password": account.password
        }
    }

    // used for interpret the state
    const accountInterpreter = (email, password) => {
        return {
            "email": email,
            "password": password
        }
    }

    // mannualy comparition between two objects, used below in searchFor account function
    const comparationBetweenObjects = (objectOne, objectTwo) => {
          if((objectOne.email !== objectTwo.email) || (objectOne.password !== objectTwo.password)){
              return 0;
          }
          return 1;
    }

    // check if account exists in database
    const searchForAccount = (accounts, myAccount) => {
          for(let el of accounts){
              if(comparationBetweenObjects(el, myAccount) === 1){
                  return 1;
              }
          }
          return 0;
    }

    const findAccountByEmail = (email) => {
        try {
            const theUser = props.accounts.filter(user => user.email === email)
            return theUser[0];
        } catch {
            console.log("0 users")
        }
    }

    const accountWithEmailState = findAccountByEmail(email)
    // mapping only email and password
    let loginAccounts = []
    try {
         loginAccounts = props.accounts.map(account => formatAccount(account))                                
    } catch {
        console.log("0 users login");
    }

    return (
        <div>
               {   isLogged === false &&
                       <form>
                            <label htmlFor="email-login">Email:</label>
                                <input id = "email-login" className = "emailField" type = "text" value = {email} onChange = {e => setEmail(e.target.value)} />
                                <label htmlFor="password-login">Password:</label>
                            <input id = "password-login" className = "password" type = "password" value = {password} onChange = {e => setPassword(e.target.value)} />

                            <button
                                onClick = {() => {
                                        if(searchForAccount(loginAccounts, accountInterpreter(email, password))){
                                            setIsLogged(!isLogged)
                                        } else {return <p>Incorrect email or password</p>}    
                                }} 
                            >
                            Sign In
                            </button>

                            <button onClick = {() => navigate("/register")}> Register Now</button>

                            <button onClick = {() => navigate("/changePassword")}>I forget my password</button>
                        </form>
                   
               }
               {
                   (isLogged === true && (accountWithEmailState.first_name !== undefined && accountWithEmailState.email !== undefined && accountWithEmailState.other_names !== undefined )) && 
                   <div>
                        
                       <p>Complete name: {accountWithEmailState.first_name} {accountWithEmailState.other_names} </p>
                       <p>|</p>
                       <br />
                       <p>Email: {accountWithEmailState.email}</p>
                       <br/>
                       <button
                            onClick = {() => {
                                setIsLogged(!isLogged)
                                setEmail("");
                                setPassword("");
                            }}
                       >Log Out</button>
                       <button
                            onClick = {() => {
                                deleteAccount(accountWithEmailState.id)
                            }}
                       >
                        Delete Account
                       </button>
                   </div>
               } 
        </div>
    )
}

export default FormLogin;
