import { computed } from "vue";
import { required, email, sameAs, helpers } from "@vuelidate/validators";
import type { InitialState } from "@/definations/register-form.type";

export function registerFormRules(initialState: InitialState) {
  const rules = computed(() => {
    return {
      firstname: {
        required: helpers.withMessage("Firstname is required", required),
      },
      lastname: {
        required: helpers.withMessage("Lastname is required", required),
      },
      email: {
        required: helpers.withMessage("Email is required", required),
        email,
      },
      password: {
        required: helpers.withMessage("Password is required", required),
      },
      rePassword: {
        required,
        sameAs: sameAs(initialState.password),
      },
      birthDate: {
        required: helpers.withMessage("Birth Date is required", required),
      },
      phone: {
        required: helpers.withMessage("Phone is required", required),
      },
      gender: {
        required: helpers.withMessage("Gender is required", required),
      },
    };
  });

  return { rules };
}
