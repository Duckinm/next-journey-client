import React from "react";
import { Form, Formik } from "formik";
import Wrapper from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { Box } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { useMutation } from "urql";

const REGISTER_MUT = `
mutation Register($username: String!, $password: String!, $name:  String!, $email: String!) {
  register(options: {username: $username, password: $password, name: $name, email: $email}) {
    errors {
      field,
      message
    }
    user {
      id,
      username,
      name,
      email
      }
    
  }
}
`;

const Register = () => {
  const [{}, register] = useMutation(REGISTER_MUT);

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "", name: "", email: "" }}
        onSubmit={async (values) => {
          const res = await register(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              label="Username"
              placeholder="Username"
            />
            <Box mt={4}>
              <InputField
                name="password"
                label="Password"
                placeholder="Password"
                type="password"
              />
            </Box>
            <Box mt={4}>
              <InputField
                name="name"
                label="name"
                placeholder="name"
                type="name"
              />
            </Box>
            <Box mt={4}>
              <InputField
                name="email"
                label="email"
                placeholder="email"
                type="email"
              />
            </Box>
            <Button
              mt={4}
              isLoading={isSubmitting}
              colorScheme="teal"
              type="submit"
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
