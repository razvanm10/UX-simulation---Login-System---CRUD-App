const passwordIsWeakMediumStrong = (password, patternOne, patternTwo, patternThree, patternFour) => {
      let value = "";
      if(password.length >= 8)
      {
          if(password.match(patternOne) || password.match(patternTwo) !== null || password.match(patternThree) !== null || password.match(patternFour) !== null)
             value = "Weak";
          if((password.match(patternOne) !== null && password.match(patternTwo) !== null) 
              || 
              (password.match(patternOne) !== null && password.match(patternThree) !== null)
              || 
              (password.match(patternOne) !== null && password.match(patternFour) !== null) 
              || 
              (password.match(patternTwo) !== null && password.match(patternFour) !== null)
              || 
              (password.match(patternTwo) !== null && password.match(patternThree) !== null)
              || 
              (password.match(patternThree) !== null && password.match(patternFour) !== null))
              { value = "Medium" }
          if(password.match(patternOne) !== null && password.match(patternTwo) !== null && password.match(patternThree) && password.match(patternFour) !== null){
             value = "Strong"
      }
          return value;
      }
      if(password.length > 0){
        return "Password must contain minimum 8 characters!";
      } 
        
}

export default passwordIsWeakMediumStrong;


