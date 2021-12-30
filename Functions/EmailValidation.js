const emailValidation = (email) => {
    const validEmailPattern = "@[yahoo.com|yahoo.ro|gmail.ro|gmail.com]";
    if(email.match(validEmailPattern) === null && email.length > 0)
       return "Invalid format for email";
}

export default emailValidation;