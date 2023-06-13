import React, { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./signin.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { setUserData, login } from "../../features/authSlice";
const initialValues = {
  userName: "",
  password: "",
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(()=> {
    if (isLoggedIn) {
      navigate("/home");
    }  
  },  [isLoggedIn])


  const validate = (values) => {
    const errors = {};
    if (!values.userName.trim()) {
      errors.userName = "Required";
    } else if (
      values.userName.trim().length < 6 ||
      values.userName.trim().length > 15
    ) {
      errors.userName = "Username must be between 3 and 15 characters long";
    }
    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    } else if (!/[a-zA-Z]/.test(values.password)) {
      errors.password = "Password must contain at least one letter";
    }
    return errors;
  };

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}/users/signin`,
        { userName: values.userName, password: values.password }
      );

      if (response.status === 200) {
        resetForm();
        cookies.set("token", response.data.token);
        dispatch(setUserData(response.data.user));
        dispatch(login());
        navigate("/home");
      } else {
        toast.error("Failed to submit the form, please try again later.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const { data } = error.response;

        if (typeof data === "string") {
          toast.error(data, {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else if (typeof data === "object") {
          const errorMessages = Object.values(data).flat();

          errorMessages.forEach((errorMessage) => {
            toast.error(errorMessage, {
              position: toast.POSITION.TOP_RIGHT,
            });
          });
        } else {
          toast.error("An error occurred while submitting the form.", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      } else {
        toast.error("An error occurred while submitting the form.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={onSubmit}
      validateOnChange={true}
    >
      {({ isSubmitting, isValid }) => (
        <Form className="container">
          <h1>Sign In</h1>

          <div className="flex flex-row mb-4">
            <div className="w-1/2 col">
              <label
                htmlFor="userName"
                className="block text-gray font-bold mb-2 "
              >
                Username
              </label>
              <Field
                type="text"
                name="userName"
                className="w-full border field form-control border-gray p-2"
                onBlur={(e) => {
                  e.target.value = e.target.value.trim();
                }}
              />
              <ErrorMessage
                name="userName"
                component="div"
                className="text-danger text-sm mt-2"
              />
            </div>
          </div>
          <div className="mb-4 col">
            <label
              htmlFor="password"
              className="block text-gray font-bold mb-2"
            >
              Password
            </label>
            <Field
              type="password"
              name="password"
              className="w-full border form-control field border-gray p-2 "
              onBlur={(e) => {
                e.target.value = e.target.value.trim();
              }}
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-danger text-sm mt-2"
            />
          </div>
          <div className="mt-8">
            <button type="submit" className={isValid || !isSubmitting ? "btn btn-primary" : "btn btn-gray"} disabled={!(isValid && !Formik.dirty) || isSubmitting}>
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
