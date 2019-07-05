import React from 'react'
import { Form } from "semantic-ui-react"

const SettingForm = (props) => {
    return (
        <Form>
            <Form.Field>
                <label>{props.label}</label>
                <Form.Input
                    icon={props.icon}
                    iconPosition="left"
                    type="text"
                    value={props.value}
                    onChange={({ target }) => props.setValue(target.value)}
                />
            </Form.Field>
        </Form>
    )
}

export default SettingForm