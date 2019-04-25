import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styled from "styled-components";
import { Formik, Form as FormikForm, FormikProps } from "formik";

const CardWrapper = styled.div`
  margin-top: 5rem;
`;

const FormWrapper = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
`;

interface FormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <CardWrapper>
            <Card body>
              <h3>Login</h3>
              <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                  }, 400);
                }}
                render={({
                  values,
                  setFieldValue,
                  isSubmitting
                }: FormikProps<FormValues>) => (
                  <FormWrapper>
                    <FormikForm>
                      <Form.Group>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          name={"email"}
                          value={values["email"]}
                          onChange={(e: any) =>
                            setFieldValue("email", e.target.value)
                          }
                        />
                      </Form.Group>

                      <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          name={"password"}
                          value={values["password"]}
                          onChange={(e: any) =>
                            setFieldValue("password", e.target.value)
                          }
                        />
                      </Form.Group>

                      <Button
                        variant="success"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Log in
                      </Button>
                    </FormikForm>
                  </FormWrapper>
                )}
              />
            </Card>
          </CardWrapper>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
