import React from "react"
import { Message } from "semantic-ui-react"

const Notification = (props) => {
    // since users don't want to see a notification 100% of the time
    if (props.message === undefined || props.message === null) {
        return null
    }

    if (props.type === "success")  {
        return (
            <div>
                <Message positive>
                    <Message.Header>You added a new expense</Message.Header>
                    <p>{props.message}</p>
                </Message>
            </div>
        )
    }
}

export default Notification