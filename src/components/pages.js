import { Link } from "react-router-dom"
import RegistrationForm from "./Registration"
import LoginForm from "./Login"
import ReimbursementList from "./Reimbursement"
import NewReimbursement from "./NewReimbursement"

export function Login({ setUserCreds }) {
    return (
        <>
            <h1>login</h1>
            <LoginForm setUserCreds={setUserCreds}></LoginForm>
            <Link to="/registration">register</Link>
        </>
    )

}

export function Registration() {

    return (
        <>
            <h1>register</h1>
            <RegistrationForm></RegistrationForm>
            <Link to="/login">go back</Link>
        </>
    )
}

export function Reimbursements(props) {
    return (
        <>
            <h1>list of reimbursements</h1>
            <ReimbursementList userCreds={props.userCreds}></ReimbursementList>
            <NewReimbursement userCreds={props.userCreds}></NewReimbursement>
            <Link to="/login" onClick={() => {
                props.setUserCreds({
                    username: "",
                    userId: 0,
                    jwt: ""
                })
            }}>log out</Link>
        </>
    )
}