import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import styled from "styled-components";
import { Formik, Form as FormikForm, FormikProps } from "formik";
import { RouteComponentProps } from "react-router";

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

class Login extends Component<RouteComponentProps> {
  state = {
    loginError: false
  };

  render() {
    return (
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <CardWrapper>
              <Card body>
                <h3>Login</h3>
                {this.state.loginError ? (
                  <Alert variant="danger">Unable to login</Alert>
                ) : null}
                <Formik
                  initialValues={{ email: "", password: "" }}
                  onSubmit={async (values, { setSubmitting }) => {
                    const response = await fetch(
                      "http://localhost:3002/login",
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json"
                        },
                        body: JSON.stringify(values)
                      }
                    );

                    if (response.status === 200) {
                      this.setState({ loginError: false });
                      const body = await response.json();
                      localStorage.setItem("token", body.token);
                      this.props.history.push("/welcome");
                    } else {
                      this.setState({ loginError: true });
                    }

                    setSubmitting(false);
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

                        <p>
                          Don't have an account?{" "}
                          <a href="/signup">Create one.</a>
                        </p>

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
  }
}

export default Login;
