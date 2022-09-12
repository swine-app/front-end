// Team Number
// Member
// Meeting
// Date
// Commitment Amount
// Commitment Type

function UserForm() {

    function handleSubmit(e) {
        e.preventDefault();
        console.log('Form submitted.');
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <h3 Data Entry></h3>
                </div>
                <div>
                    <input
                        type="text"
                        name="team number"
                        placeholder="Team Number"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="member"
                        placeholder="Member"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="meeting"
                        placeholder="Meeting"
                    />
                </div>
                <div>
                    <input
                        type="date"
                        name="date"
                        placeholder=""
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="commitment amount"
                        placeholder="Commitment Amount"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="commitment type"
                        placeholder="Commitment Type"
                    />
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default UserForm;