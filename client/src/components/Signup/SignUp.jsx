import React, { useState } from "react";

import { Modal, Button, Form } from "semantic-ui-react";

const SignUp = ({ open, setOpen }) => {
  const [signUpInfo, setSignUpInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "M",
    password: "",
    confirmPassword: "",
  });

  const setInfo = (key, value) => {
    setSignUpInfo((prev) => ({ ...prev, [key]: value }));
  };

  const onSumbit = () => {};

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      dimmer="blurring"
      centered
      size="tiny"
    >
      <Modal.Header>Sign Up</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="First Name"
              placeholder="First Name"
              onChange={(e) => setInfo("firstName", e.target.value)}
            />
            <Form.Input
              fluid
              label="Last Name"
              placeholder="Last Name"
              onChange={(e) => setInfo("lastName", e.target.value)}
            />
          </Form.Group>
          <Form.Group label="gender">
            <Form.Button
              label="Male"
              icon="male"
              color={signUpInfo.gender === "M" ? "blue" : "grey"}
              onClick={() => setInfo("gender", "M")}
            />
            <Form.Button
              label="Female"
              icon="female"
              color={signUpInfo.gender === "F" ? "pink" : "grey"}
              onClick={() => setInfo("gender", "F")}
            />
          </Form.Group>
          <Form.Field>
            <Form.Input
              fluid
              label="Email"
              placeholder="Email"
              type="email"
              onChange={(e) => setInfo("email", e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <Form.Input
              fluid
              label="Password"
              placeholder="Password"
              type="password"
              onChange={(e) => setInfo("password", e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <Form.Input
              fluid
              label="Confirm Password"
              placeholder="Confirm Password"
              type="password"
              onChange={(e) => setInfo("confirmPassword", e.target.value)}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button
          content="Create"
          labelPosition="right"
          icon="checkmark"
          onClick={onSumbit}
          color="yellow"
        />
      </Modal.Actions>
    </Modal>
  );
};

export default SignUp;
