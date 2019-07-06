import React from 'react'
import { Form, Button } from "semantic-ui-react"

const SettingForm = (props) => {
    return (
        <Form>
            <Form.Field onSubmit={props.update}>
                <label>{props.label}</label>
                <Form.Input
                    icon={props.icon}
                    iconPosition="left"
                    type="text"
                    value={props.value}
                    onChange={({ target }) => props.setValue(target.value)}
                />
                <Button type="submit">Change</Button>
                <p>After refreshing the page you should see your new {props.label}</p>
            </Form.Field>
        </Form>
    )
}

export default SettingForm