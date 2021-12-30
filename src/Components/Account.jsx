import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router';


const Account = (props) => {
    
    let navigate = useNavigate();
    return (
        <div>
            {
                (props.account.first_name !== undefined && props.account.email !== undefined && props.account.other_names !== undefined ) &&
                <div>
                    <p>Complete Name: {props.account.first_name} {props.account.other_names}</p>
                    <br />
                    <p>Your Email: {props.account.email}</p>
                    <button onClick = {() => {
                        navigate("/")
                    }}>Log Out</button>
                </div>
            }
              
        </div>
    )
}

export default Account;
