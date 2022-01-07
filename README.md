Login System Simulation, a CRUD app, which simulates the user experience of registering and login process.
The user can execute 5 main operations: register, login, logout, delete account, change password.
The flow of the app looks like this: Register (full name, email, password, password confirmation) 
the data is filtered by some functions to check if they are valid. After registering, you can login using your email and your password and then you will 
be redirected to a page with your account information (full name and email), then you will have only 2 possibilities: logout and delete account.
The last operation presented above, "change password", can be executed whenever you want, just by introducing your email 
(not very safe, because you won't receive an email to confirm your identity, but it is a good way to practice a PUT request).
Used technologies: React.js, JavaScript, Python, Flask, PostgreSQL, CSS, Axios.
(I used some tutorials to build that simple RestAPI).
