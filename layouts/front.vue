<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useToast } from 'vue3-tailwind';
import { useAuthStore } from "~/store/auth";

useHead({
  htmlAttrs: {
    lang: 'en',
  }
})

const { toasts } = useToast();

const StoreAuth = useAuthStore();
const { isAuthenticated } = storeToRefs(StoreAuth);

onBeforeMount(() => {
  if (isAuthenticated.value) {
    const router = useRouter();
    router.push("/");
  }
});
</script>

<template>
  <div>
    <TwToast position="top-right" :toasts="toasts" />
    <div class="px-0 md:px-3 lg:px-4">
      <slot />
    </div>
  </div>
</template>
