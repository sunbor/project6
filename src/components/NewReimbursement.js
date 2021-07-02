import { apiUrl } from "../util/utils"

function NewReimbursement({ userCreds }) {

    let url = apiUrl + "/reimbursements"

    function submitReim(event) {
        event.preventDefault();
        const reimInfo = {
            amount: event.currentTarget.amount.value,
            description: event.currentTarget.description.value,
            authorUsername: userCreds.username,
            reimbursementStatus: event.currentTarget.status.value,
            reimbursementType: event.currentTarget.type.value
        };
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + userCreds.jwt
            },
            body: JSON.stringify(reimInfo)
        };
        fetch(url, requestOptions)
            .then(response => {
                if (response.ok)
                    return response.json()
                else
                    throw new Error("submit reimbursement failed")
            })
            .then(
                //might need to refresh the list somehow
            )
            .catch(err => {
                alert("failed to submit reimbursement")
            })

    }

    return (
        <form onSubmit={submitReim}>
            <label>amount</label>
            <input type="number" name="amount"></input>
            <label>description</label>
            <input type="text" name="description"></input>
            <select name="status">
                <option value="Pending">pending</option>
                <option value="Approved">approved</option>
                <option value="Denied">denied</option>
            </select>
            <select name="type">
                <option value="Lodging">lodging</option>
                <option value="Travel">travel</option>
                <option value="Food">food</option>
                <option value="Other">other</option>
            </select>
            <input type="submit"></input>
        </form>
    )
}

export default NewReimbursement;