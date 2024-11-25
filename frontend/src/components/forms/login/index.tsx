"use client";
import { Login } from "@/app/(public)/(auth)/login/actions";
import EmailField from "@/components/ui/form-fields/email-field";
import PasswordField from "@/components/ui/form-fields/password-field";
import { useThemeContext } from "@/providers/theme";
import { FollowTheSigns } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Form, Formik } from "formik";
import { redirect } from "next/navigation";

type InitialState = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const { mode } = useThemeContext();
  const initialState: InitialState = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: InitialState) => {
    try {
      await Login(values);
      redirect("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div
        className={
          mode === "dark"
            ? "border-2 border-purple-500 rounded-lg p-36 h-[80vh] bg-zinc-700"
            : "border-2 rounded-lg p-36 h-[80vh] bg-gray-100"
        }
      >
        <Formik
          initialValues={initialState}
          onSubmit={(values: InitialState) => handleSubmit(values)}
        >
          <Form>
            <EmailField />
            <PasswordField />

            <Button
              type="submit"
              variant={mode === "dark" ? "contained" : "outlined"}
              color={mode === "dark" ? "secondary" : "primary"}
              endIcon={<FollowTheSigns />}
              fullWidth
            >
              Sign In
            </Button>
          </Form>
        </Formik>
      </div>
    </>
  );
}
