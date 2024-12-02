import { ref, reactive, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { useThemeStore } from "@/stores/theme/useThemeStore";
import { useUserStore } from "@/stores/user/useUserStore";
import { registerFormRules } from "@/rules/register.rules";
import { useAlertStore } from "@/stores/alert/useAlertStore";
import type { SignUpCredentials } from "@/definations/signup-credentials.type";

interface InitialState extends SignUpCredentials {
  rePassword: string;
  countryCode: { country: string; code: string };
}

export function useRegisterForm() {
  const themeStore = useThemeStore();
  const userStore = useUserStore();
  const alertStore = useAlertStore();

  const show = ref(false);
  const loading = userStore.loading;

  const initialState: InitialState = reactive({
    email: "",
    password: "",
    rePassword: "",
    firstname: "",
    lastname: "",
    birthDate: "",
    countryCode: { country: "Türkiye", code: "+90" },
    phone: "",
    gender: "MALE",
  });

  const { rules } = registerFormRules(initialState);

  const v$ = useVuelidate(rules, initialState);

  const switchColor = computed(() => {
    return initialState.gender === "MALE"
      ? { color: "primary", label: "MALE" }
      : { color: "pink", label: "FEMALE" };
  });

  const handleSubmit = async () => {
    const result = await v$.value.$validate();

    const credentials = {
      firstname: initialState.firstname,
      lastname: initialState.lastname,
      email: initialState.email,
      password: initialState.password,
      birthDate: new Date(initialState.birthDate).toISOString(),
      phone: initialState.countryCode.code + initialState.phone,
      gender: initialState.gender,
    };

    if (!result) {
      alertStore.error({ title: "Invalid form.", text: "The form is invalid" });
      return;
    }

    try {
      await userStore.signup(credentials);
      alertStore.success({
        title: "",
        text: "Registration process succcessful 👍",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    themeStore,
    userStore,
    initialState,
    switchColor,
    v$,
    show,
    handleSubmit,
    loading,
  };
}
