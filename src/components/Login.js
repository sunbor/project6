import { useNavigate } from "react-router";
import { apiUrl } from "../util/utils";

function LoginForm({ setUserCreds }) {


    let url = apiUrl + "/users/authenticate";
    let navigate = useNavigate();

    function submitLogin(event) {
        event.preventDefault();
        const loginInfo = {
            username: event.currentTarget.usernameInput.value,
            password: event.currentTarget.passwordInput.value,
        };
        //console.log(loginInfo)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginInfo)
        };
        fetch(url, requestOptions)
            .then(response => {
                //console.log(response)
                if (response.ok)
                    return response.json()
                else
                    throw new Error("bad login")
            })
            .then(response => {
                //store token
                //console.log(response)
                setUserCreds({
                    username: loginInfo.username,
                    userId: response.userId,
                    jwt: response.jwt
                })
                navigate("/reimbursements")
            })
            //if 403, throw error
            .catch(err => {
                alert("incorrect credentials")
            })

    };

    return (
        <form onSubmit={submitLogin}>
            <label>username</label>
            <input type="text" name="usernameInput"></input>
            <label>password</label>
            <input type="password" name="passwordInput"></input>
            <input type="submit"></input>
        </form>
    )
}

export default LoginForm;