const emailIsAlreadyUsed = (email, emails) => {
    try {
        if (email.length > 0){
            return emails.includes(email) ? "This email is already used !" : " "
        }  
    } catch {
        console.log("0 users")
    }
    
}

export default emailIsAlreadyUsed;