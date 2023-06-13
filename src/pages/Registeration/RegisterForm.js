import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./registeration.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";


const initialValues = {
  email: "",
  userName: "",
  firstName: "",
  lastName: "",
  password: "",
  confirm_password: "",
  date_of_birth: "",
  image: null,
};

const RegistrationForm = () => {
  const isLogged = useSelector(state => state.auth.isLoggedIn)
  const navigate = useNavigate();
  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.userName.trim()) {
      errors.userName = "Required";
    } else if (
      values.userName.trim().length < 6 ||
      values.userName.trim().length > 15
    ) {
      errors.userName = "Username must be between 3 and 15 characters long";
    }

    if (!values.firstName.trim()) {
      errors.firstName = "Required";
    } else if (
      values.firstName.trim().length < 3 ||
      values.firstName.trim().length > 15
    ) {
      errors.firstName = "First Name must be between 3 and 15 characters long";
    }

    if (!values.lastName.trim()) {
      errors.lastName = "Required";
    } else if (
      values.lastName.trim().length < 3 ||
      values.lastName.trim().length > 15
    ) {
      errors.lastName = "Last name must be between 3 and 15 characters long";
    }

    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 6 ) {
      errors.password = "Password must be at least 8 characters long";
    } else if (!/[a-zA-Z]/.test(values.password)) {
      errors.password = "Password must contain at least one letter";
    }

    if (!values.image) {
      errors.image = "Required";
    } else if (values.image.size > 1000000) {
      errors.image = "Image size cannot exceed 1MB";
    }

    if (values.image && values.image.size > 1000000) {
      errors.image = "File size must be less than 1MB";
    }

    if (values.confirm_password !== values.password) {
      errors.confirm_password = "Passwords do not match";
    }

    return errors;
  };

  const uploadImage = () => {
    const data = new FormData()
    fetch("  https://api.cloudinary.com/v1_1/breellz/image/upload",{
    method:"post",
    body: data
    })
    .then(resp => resp.json())
    .then(data => {
    })
    .catch(err => console.log(err))
    }

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      let formData = new FormData();
      formData.append("userName", values.userName);
      formData.append("firstName", values.userName);
      formData.append("lastName", values.userName);
      formData.append("password", values.password);
      formData.append("email", values.email);
      formData.append("DOB", values.date_of_birth);
      formData.append("avatar", values.image);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}/users`,
        formData
      );

      if (response.status === 201) {
        resetForm();
        toast.success("Form submitted successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        navigate("/login");
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
      {({ isSubmitting, setFieldValue, isValid }) => (
        <Form className="container">
          <h1 className="my-2">
            Registration
          </h1>

          <div className="flex flex-row mb-4">
            <div className="m-1">
              <label
                htmlFor="firstName"
                className="block text-gray font-bold mb-2"
              >
                First Name
              </label>
              <Field
                type="text"
                name="firstName"
                className=" border form-control border-gray p-2"
                onBlur={(e) => {
                  e.target.value = e.target.value.trim();
                }}
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="text-danger text-sm mt-2"
              />
            </div>
            <div className="m-1">
              <label
                htmlFor="lastName"
                className="block text-gray font-bold mb-2"
              >
                Last Name
              </label>
              <Field
                type="text"
                name="lastName"
                className="w-full border form-control border-gray-400 p-2"
                onBlur={(e) => {
                  e.target.value = e.target.value.trim();
                }}
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="text-dnager text-sm mt-2"
              />
            </div>
            <div className="m-1">
              <label
                htmlFor="userName"
                className="block text-gray-700 font-bold mb-2"
              >
                Username
              </label>
              <Field
                type="text"
                name="userName"
                className="w-full border form-control border-gray p-2 rounded-lg"
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
          <div className="m-1">
              <label
                htmlFor="email"
                className="block text-gray font-bold mb-2"
              >
                Email
              </label>
              <Field
                type="email"
                name="email"
                className="w-full border form-control border-gray-400 p-2 rounded-lg"
                onBlur={(e) => {
                  e.target.value = e.target.value.trim();
                }}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-danger text-sm mt-2"
              />
            </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray font-bold mb-2"
            >
              Password
            </label>
            <Field
              type="password"
              name="password"
              className="w-full border form-control border-gray-400 p-2 rounded-lg"
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

          <div className="mb-4">
            <label
              htmlFor="confirm_password"
              className="block text-gray font-bold mb-2"
            >
              Confirm Password
            </label>
            <Field
              type="password"
              name="confirm_password"
              className="w-full border form-control border-gray-400 p-2 rounded-lg"
              onBlur={(e) => {
                e.target.value = e.target.value.trim();
              }}
            />
            <ErrorMessage
              name="confirm_password"
              component="div"
              className="text-danger text-sm mt-2"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="date_of_birth"
              className="block text-gray font-bold mb-2"
            >
              Date of Birth
            </label>
            <Field
              type="date"
              name="date_of_birth"
              className="w-full border form-control border-gray-400 p-2 rounded-lg"
            />
            <ErrorMessage
              name="date_of_birth"
              component="div"
              className="text-danger text-sm mt-2"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-gray font-bold mb-2"
            >
              Profile Image
            </label>
            <input
              type="file"
              name="x"
              onChange={(e) => {
                setFieldValue("image", e.currentTarget.files[0]);
              }}
            />

            <ErrorMessage
              name="image"
              component="div"
              className="text-danger text-sm mt-2"
            />
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className={isValid || !isSubmitting ? "btn btn-primary" : "btn btn-gray"}
              disabled={(!isValid && Formik.dirty) || isSubmitting}
            >
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
