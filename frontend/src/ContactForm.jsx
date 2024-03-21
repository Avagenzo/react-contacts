import { useState } from "react";

const ContactForm = ({existingContact = {}, updateCallback}) => {
    // if there is contact, it'll put in the values, else there will be an empty string
    const [firstName, setFirstName] = useState(existingContact.firstName || "")
    const [lastName, setLastName] = useState(existingContact.lastName || "")
    const [email, setEmail] = useState(existingContact.email || "")

    const updating = Object.entries(existingContact).length !== 0

    const onSubmit = async (e) => {
        e.preventDefault()

        const data = {
            firstName,
            lastName,
            email
        }
        const url = "http://127.0.0.1:5000/" + ( updating ? `update_contact/${existingContact.id}`: "create_contact")
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, options)
        if(response.status !== 201 && response.status !==200){
            const message = await response.json()
            alert(message.message)
        } else {
            updateCallback()
        }
    }

    return <form onSubmit={onSubmit}>
        <div>
            <label htmlFor="firstName">First Name: </label>
            <input 
                type="text" 
                id="firstName" 
                vlaue={firstName} 
                onChange={(e) => setFirstName(e.target.value)} 
            />
        </div>
        <div>
            <label htmlFor="lastName">Last Name: </label>
            <input 
                type="text" 
                id="lastName" 
                vlaue={lastName} 
                onChange={(e) => setLastName(e.target.value)} 
            />
        </div>
        <div>
            <label htmlFor="email">Email: </label>
            <input 
                type="text" 
                id="email" 
                vlaue={email} 
                onChange={(e) => setEmail(e.target.value)} 
            />
        </div>
        <button type="submit">Create Contact</button>
    </form>
}

export default ContactForm