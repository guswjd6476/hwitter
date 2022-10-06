import React from "react";

const AuthForm = () => {
    const [email, setEmail] =  useState("")
    const [password, setPassword] =  useState("")
    const [newAccount, setNewAccount] = useState(true)
    const [error, setError] = useState("")
    
    const subM = async(event) => {
        event.preventDefault();
       try{
        let data
        if(newAccount){
            data = await authService.createUserWithEmailAndPassword(
                email, password
            )
        }else{
            data = await authService.signInWithEmailAndPassword(
                email, password
            )
        }
        console.log(data);
       }catch(error){
        setError(error.message)
       }
    } 
    const toggleAccount = () => setNewAccount((prev) => !prev);
    const onChange = (event) => {
        const {
            target: {name, value},
        } = event;
        if (name === "email"){
            setEmail(value);
        }else if (name ==="password"){
            setPassword(value)
        }
    }
   return  (
    <>
        <form onSubmit={subM}> 
            <input name="email" type="text" placeholder="Email" required value={email} onChange={onChange}/>
            <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange}/>
            <input type="submit" value={newAccount ? "회원가입" : "LogIn"}/>{error}
        </form>
        <span onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create Account"}
        </span>
    </>
   )
   
}

export default AuthFrom