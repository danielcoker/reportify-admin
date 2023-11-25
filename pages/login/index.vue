<script setup lang="ts">
import {
  useToast,
  TwButton,
  TwErrorMessage,
  TwForm,
  TwInput,
} from "vue3-tailwind";
import { useAuthStore } from "~/store/auth";

definePageMeta({
  layout: "front",
});

useHead({
  title: "Login | Reportify Admin",
});

const StoreAuth = useAuthStore();

const toast = useToast();
const formLogin = ref();
const formError = ref(false);
const submitBtnDisabled = ref(false);

const formData: {
  [key: string]: any;
} = reactive({});

const login = async () => {
  const validator = formLogin.value.validator();
  validator.clearErrors();
  await validator.validate();

  // If form validation fails.
  if (validator.fail()) {
    toast.error({
      message: validator.getErrorMessage(),
    });

    toggleFormError();
    return;
  }

  submitBtnDisabled.value = true;

  try {
    await StoreAuth.login({
      ...formData,
    });

    const router = useRouter();

    toast.success({
      message: "Login successful.",
      lifetime: 1000,
    });

    router.push("/");
  } catch (error: any) {
    // toast.error({
    //   message: "Incorrect email or password.",
    //   lifetime: 5000,
    // });

    toggleFormError();
    return;
  }
};

const toggleFormError = () => {
  formError.value = true;

  setTimeout(() => {
    formError.value = false;
    submitBtnDisabled.value = false;
  }, 1000);
};
</script>

<template>
  <div class="text-white flex justify-center pt-40">
    <div
      class="text-gray-800 rounded-t-lg w-96 shadow-lg p-1 bg-gradient-to-b from-indigo-400 h-20"
      :class="{
        'tw-shake': formError,
      }"
    >
      <div
        class="header bg-white dark:bg-gray-900 border-b dark:border-gray-700 text-indigo-900 dark:text-gray-200 p-4 rounded-t"
      >
        <h1 class="text-2xl font-bold text-center">Welcome</h1>
      </div>
      <TwForm
        ref="formLogin"
        name="login"
        :rules="{
          email: ['required', 'email'],
          password: ['required'],
        }"
        @submit="login"
        class="body bg-white dark:bg-gray-900 p-4 rounded-b-lg"
      >
        <div class="grid grid-cols-12 gap-2">
          <div class="col-span-12">
            <TwInput
              class="dark:text-gray-200"
              v-model="formData.email"
              name="email"
              label="Email"
              placeholder="Enter Email"
            />
            <TwErrorMessage name="email"></TwErrorMessage>
          </div>
          <div class="col-span-12">
            <TwInput
              class="dark:text-gray-200"
              v-model="formData.password"
              name="password"
              label="Password"
              type="password"
              placeholder="Enter Password"
            />
            <TwErrorMessage name="password"></TwErrorMessage>
          </div>
          <div class="col-span-12">
            <TwButton :disabled=submitBtnDisabled class="w-full text-center"> Login </TwButton>
          </div>
        </div>
      </TwForm>
    </div>
  </div>
</template>
