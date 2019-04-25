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
  fullName: string;
}

class Signup extends Component<RouteComponentProps> {
  state = {
    signupError: false
  };

  render() {
    return (
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <CardWrapper>
              <Card body>
                <h3>Sign up</h3>
                {this.state.signupError ? (
                  <Alert variant="danger">Unable to login</Alert>
                ) : null}
                <Formik
                  initialValues={{ email: "", password: "", fullName: "" }}
                  onSubmit={async (values, { setSubmitting }) => {
                    const response = await fetch(
                      "http://localhost:3002/signup",
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json"
                        },
                        body: JSON.stringify(values)
                      }
                    );

                    if (response.status === 200) {
                      this.props.history.push("/login");
                    } else {
                      this.setState({ signupError: true });
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
                          <Form.Label>Full name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter full name"
                            name={"fullName"}
                            value={values["fullName"]}
                            onChange={(e: any) =>
                              setFieldValue("fullName", e.target.value)
                            }
                          />
                        </Form.Group>

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
                          Sign up
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

export default Signup;
