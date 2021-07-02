import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { apiUrl } from "../util/utils";


function ReimbursementList({ userCreds }) {

    let url = apiUrl + "/reimbursements"
    let updateUrl = apiUrl + "/reimbursements/resolve"
    let navigate = useNavigate();

    //logout if there is no current user
    useEffect(() => {
        if (!userCreds) {
            navigate("/login")
        }
    },
        [userCreds, navigate]
    )

    const [reimData, setReimData] = useState();

    //get list data from server
    useEffect(() => {
        fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + userCreds.jwt,
                "Accept": "*/*"
            },
            mode: 'cors'
        })
            .then(response => {
                // console.log(response)
                // console.log(userCreds.jwt)
                if (response.ok) {
                    return response.json()
                }
                else {
                    throw new Error("get reimbursements failed")
                }
            })
            .then(setReimData)
            .catch(() => {

                //havent decided yet
                //maybe have a message box to either resubmit or logout
                // if (window.confirm("retry?")) {
                //     //doesnt quite work
                //     navigate("/reimbursements")
                // }
                // else {
                //just kick the user out for now
                navigate("/login")
                //}
            }
            )

    },
        [userCreds, url, navigate, reimData]
    )


    //update reimbursement status
    function updateReim(reimId, update) {
        const updateInfo = {
            id: reimId,
            resolverUsername: userCreds.username,
            reimbursementStatus: update
        };
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + userCreds.jwt
            },
            body: JSON.stringify(updateInfo)
        };
        fetch(updateUrl, requestOptions)
            .then(response => {
                if (response.ok)
                    return response.json()
                else
                    throw new Error("update reimbursement failed")
            })
            .then(
                // response => {
                //     console.log(response)
                // }
                //might need to refresh the list somehow
            )
            .catch(err => {
                alert("failed to update reimbursement")
            })
    }

    if (reimData) {
        return (
            <>
                <table>
                    <thead>
                        <tr>
                            <th>amount</th>
                            <th>submitted</th>
                            <th>resolved</th>
                            <th>description</th>
                            <th>receipt URI</th>
                            <th>author username</th>
                            <th>resolver username</th>
                            <th>reimbursement status</th>
                            <th>reimbursement type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reimData.content.map(
                                (reim) =>
                                    <tr key={reim.id}>
                                        <td>{reim.amount}</td>
                                        <td>{reim.submitted}</td>
                                        <td>{reim.resolved}</td>
                                        <td>{reim.description}</td>
                                        <td>{reim.receiptURI}</td>
                                        <td>{reim.authorUsername}</td>
                                        <td>{reim.resolverUsername}</td>
                                        <td>{reim.reimbursementStatus}</td>
                                        <td>{reim.reimbursementType}</td>
                                        <td>
                                            <button onClick={() => { updateReim(reim.id, "Approved") }}>approve</button>
                                        </td>
                                        <td>
                                            <button onClick={() => { updateReim(reim.id, "Denied") }}>deny</button>
                                        </td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
            </>
        )
    }
    else {
        return (
            <>
                <h1>reimbursements not found</h1>
            </>
        )
    }
}

export default ReimbursementList;