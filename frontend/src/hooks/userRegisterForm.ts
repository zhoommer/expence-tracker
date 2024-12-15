import { ref, reactive, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { registerFormRules } from "@/rules/register.rules";
import { ThemeStore } from "@/stores/theme/themeStore";
import { UserStore } from "@/stores/user/userStore";
import { AlertStore } from "@/stores/alert/alertStore";
import type { SignUpCredentials } from "@/definations/signup-credentials.type";

interface InitialState extends SignUpCredentials {
  rePassword: string;
  countryCode: { country: string; code: string };
}

export function useRegisterForm() {
  const themeStore = ThemeStore();
  const userStore = UserStore();
  const alertStore = AlertStore();

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
