"use client";
import { useThemeContext } from "@/providers/theme";
import { Email } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import { Field, FieldProps } from "formik";

export default function EmailField() {
  const { mode } = useThemeContext();
  return (
    <>
      <Field name="email">
        {({ field }: FieldProps) => (
          <TextField
            {...field}
            type="email"
            label="Email"
            placeholder="Enter your email address"
            color={mode === "dark" ? "secondary" : "primary"}
            variant="standard"
            margin="normal"
            fullWidth
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color={mode === "dark" ? "secondary" : "primary"} />
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
