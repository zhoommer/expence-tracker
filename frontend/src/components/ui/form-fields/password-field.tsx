import React, { useState } from "react";
import { Field, FieldProps } from "formik";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useThemeContext } from "@/providers/theme";
import { Password, Visibility, VisibilityOff } from "@mui/icons-material";

export default function PasswordField() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { mode } = useThemeContext();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  return (
    <>
      <Field name="password">
        {({ field }: FieldProps) => (
          <TextField
            {...field}
            type={showPassword ? "text" : "password"}
            label="Password"
            placeholder="Enter your password"
            color={mode === "dark" ? "secondary" : "primary"}
            variant="standard"
            margin="normal"
            fullWidth
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      color={mode === "dark" ? "secondary" : "primary"}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                startAdornment: (
                  <InputAdornment position="start">
                    <Password
                      color={mode === "dark" ? "secondary" : "primary"}
                    />
                  </InputAdornment>
                ),
              },
            }}
          />
        )}
      </Field>
    </>
  );
}
