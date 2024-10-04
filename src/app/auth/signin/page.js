"use client";
import { FormControl } from "@mui/joy";
import { Sheet } from "@mui/joy";
import React from "react";
import { useForm } from "react-hook-form";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import InputField from "@/component/shared/form/InputField";
import { errorMsg, successMsg } from "@/component/Toastmsg/toaster";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignInValidation } from "@/component/validation/signInValidation";

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm(  {
    resolver:yupResolver(SignInValidation)
  });
  const router = useRouter();

  //handle Form is Submitted
  const onSubmit = async (data) => {
    const { username, password } = data;
    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });
      if (res.error) {
        return errorMsg("Invalid credentials");
      } else {
        router.replace("/");
        return successMsg("Login Successfully");
      }
    } catch (error) {
      return errorMsg("Login Error");
    }
  };

  return (
    <>
      <div>
        <Sheet
          sx={{
            width: 500,
            mx: "auto",
            my: 9,
            py: 7,
            px: 5,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            borderRadius: "sm",
            boxShadow: "md",
          }}
          variant="outlined"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Typography variant="h4" className="text-center">
                <b>Welcome!</b>
              </Typography>
            </div>
            <div>
              <FormControl>
                <InputField
                errors={errors}
                  className="w-96 ml-5"
                  label="Username"
                  control={control}
                  name="username"
                  type="text"
                  placeholder="example123@gmail.com"
                
                />
              </FormControl>
            </div>
            <br />
            <div>
              <FormControl>
                <InputField
                errors={errors}
                  className="w-96 ml-5"
                  control={control}
                  name="password"
                  type="password"
                  label="Password"
                />
              </FormControl>
            </div>
            <br />
            <div>
              <Button
                type="submit"
                className=" ml-5 bg-red-600 hover:bg-red-700 text-white font-bold cursor-pointer px-6 py-2 rounded-md transition duration-300"
              >
                Login
              </Button>
            </div>
          </form>
        </Sheet>
      </div>
    </>
  );
};

export default Login;
