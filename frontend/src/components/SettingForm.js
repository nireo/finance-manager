import React from 'react';
import { Form, Button } from 'semantic-ui-react';

const SettingForm = props => {
  // since just saying 'you should see your new Username' so this is for
  // making it look a lot better (probably a bit over engineered but just works)
  const lowerCasedFirst =
    props.label[0].toLowerCase() + props.label.slice(1, props.label.length);
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
        <p>
          After refreshing the page you should see your new {lowerCasedFirst}
        </p>
      </Form.Field>
    </Form>
  );
};

export default SettingForm;
