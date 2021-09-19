import React, { useState } from "react";

import { Modal, Button, Form } from "semantic-ui-react";

import { postUserSignup } from "../../services/apis";

const initialFormState = {
  firstName: "",
  lastName: "",
  email: "",
  gender: "M",
  password: "",
  confirmPassword: "",
};

const SignUp = ({ open, setOpen }) => {
  const [form, setFormInfo] = useState(initialFormState);

  const setForm = (key, value) => {
    setFormInfo((prev) => ({ ...prev, [key]: value }));
  };

  const onSumbit = async (e) => {
    try {
      await postUserSignup(form);
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  const onClose = () => {
    setOpen(false);
    setFormInfo(initialFormState);
  };

  return (
    <Modal
      onClose={onClose}
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
              value={form.firstName}
              label="First Name"
              placeholder="First Name"
              onChange={(e) => setForm("firstName", e.target.value)}
            />
            <Form.Input
              value={form.lastName}
              fluid
              label="Last Name"
              placeholder="Last Name"
              onChange={(e) => setForm("lastName", e.target.value)}
            />
          </Form.Group>
          <Form.Group label="gender">
            <Form.Button
              label="Male"
              icon="male"
              color={form.gender === "M" ? "blue" : "grey"}
              onClick={() => setForm("gender", "M")}
            />
            <Form.Button
              label="Female"
              icon="female"
              color={form.gender === "F" ? "pink" : "grey"}
              onClick={() => setForm("gender", "F")}
            />
          </Form.Group>
          <Form.Field>
            <Form.Input
              fluid
              label="Email"
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={(e) => setForm("email", e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <Form.Input
              fluid
              label="Password"
              placeholder="Password"
              type="password"
              value={form.password}
              onChange={(e) => setForm("password", e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <Form.Input
              fluid
              label="Confirm Password"
              placeholder="Confirm Password"
              type="password"
              value={form.confirmPassword}
              onChange={(e) => setForm("confirmPassword", e.target.value)}
              error={
                form.password !== "" &&
                form.confirmPassword !== "" &&
                form.password !== form.confirmPassword
              }
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
