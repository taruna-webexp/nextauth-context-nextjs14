import * as Yup from "yup";

// validation for signin form
export const SignInValidation = Yup.object().shape({
    username:Yup.string().required("Username is required"),
    password:Yup.string().required("Password is required"),
  });


