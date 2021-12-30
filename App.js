import React, {useState, useEffect} from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

// Components
import Account from "./Components/Account";
import FormRegister from "./Components/FormRegister";
import FormLogin from "./Components/FormLogin";
import ChangePassword from "./Components/ChangePassword";

// Functions
import passwordIsWeakMediumStrong from "./Functions/PasswordValidation";
import emailValidation from "./Functions/EmailValidation";
import emailIsAlreadyUsed from "./Functions/EmailIsUsed";




const baseURL = "http://localhost:5000"; // server-side

const App = () => {

   //Form fields
    const [users, setUsers] = useState([]);

    useEffect(() => {
          axios.get(baseURL + '/user')
               .then(response => setUsers(response.data))
               .catch(err => console.log("error"))
    },[])

    const accounts = users.users;

    let emails = []
    try {
        emails = accounts.map(user => user.email) 
    } catch {
      console.log("0 users")
    }

    const submitData = async (firstName, otherNames, email, password) => { 
          try {
                console.log(firstName, otherNames, email, password)
                if(passwordIsWeakMediumStrong(password) !== "Password must contain minimum 8 characters!" 
                   && emailValidation(email) !== "Invalid format for email"
                   && emailIsAlreadyUsed(email, emails) !== "This email is already used !"){
                   const data = await axios.post(baseURL + '/user', {first_name: firstName, other_names: otherNames, email: email, password: password})
                   setUsers([...users, data.data])
              } else {
                console.log("couldn't create account")
              }
          } catch {TypeError("Type Error")} 
    }


    return (
      <div className = "App">
        <Router>
            <Routes>
                <Route path = "/" element = {<FormLogin accounts = {accounts} />} /> 
                <Route path = "/register" element = {<FormRegister submitForm = {submitData} emails = {emails} />} />
                <Route path = "/account" element = {<Account /> } />
                <Route path = "/changePassword" element = {<ChangePassword /> }/>
            </Routes>
        </Router>
                                                  
      </div>
    );
}

export default App;
