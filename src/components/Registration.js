//import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { testUrl } from "../util/utils";

function RegistrationForm() {

    //url= "http://employeerevabursementsystem-env.eba-s9jgpymb.us-east-2.elasticbeanstalk.com/users";
    //let url = "https://fb73e971-5b14-484f-8715-b57ce28d29a7.mock.pstmn.io/users";

    let url = testUrl + "/users";
    let navigate = useNavigate();

    //why
    // const [ registrationInfo, setRegistration ] = useState({
    //     username: "bsun",
    //     email: "boris.sun@revature.net",
    //     password: "password",
    //     firstName: "Boris",
    //     lastName: "Sun",
    //     authority: "EMPLOYEE"
    // });

    // const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(registrationInfo)
    // };

    function submitRegistration(event) {
        event.preventDefault();
        const registrationInfo = {
            username: event.currentTarget.usernameInput.value,
            email: event.currentTarget.emailInput.value,
            password: event.currentTarget.passwordInput.value,
            firstName: event.currentTarget.fNameInput.value,
            lastName: event.currentTarget.lNameInput.value,
            authority: event.currentTarget.authorityInput.value
        };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(registrationInfo)
        };
        fetch(url, requestOptions)
            .then(response => {
                //console.log(response)
                if (response.ok)
                    return response.json()
                else
                    throw new Error("bad registration")

            })
            .then(
                //navigate to login
                response => {
                    //console.log(response);
                    alert("registration successful")
                    navigate("/login")
                }
            )
            .catch(err => {
                //display error message
                alert("username or email already in use")
            })
    }

    return (
        <form onSubmit={submitRegistration}>
            <label>username</label>
            <input type="text" name="usernameInput"></input>
            <label>password</label>
            <input type="password" name="passwordInput"></input>
            <label>email</label>
            <input type="text" name="emailInput"></input>
            <label>password</label>
            <input type="text" name="fNameInput"></input>
            <label>password</label>
            <input type="text" name="lNameInput"></input>
            <select name="authorityInput">
                <option value="EMPLOYEE">employee</option>
                <option value="MANAGER">admin</option>
                <option value="ADMIN">manager</option>
                <option value="LOCKED">locked</option>
            </select>
            <input type="submit"></input>
            
        </form>
    )
}

export default RegistrationForm;