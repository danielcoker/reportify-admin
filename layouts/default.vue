<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useToast, TwFeather, TwToast } from "vue3-tailwind";
import { useAuthStore } from "~/store/auth";
const { toasts } = useToast();
const cookieDark = useCookie('dark-mode')

const StoreAuth = useAuthStore();
const { isAuthenticated } = storeToRefs(StoreAuth);

onBeforeMount(() => {
  if (!isAuthenticated.value) {
    const router = useRouter();
    router.push("/login");
  }
});
</script>

<template>
  <div id="dark-mode" :class="cookieDark ? 'dark vt-dark' : ''">
    <TwToast position="bottom-right" :toasts="toasts" />
    <div>
      <LayoutFloating />
      <LayoutHeader />
      <div class="py-4 px-0 md:px-1">
        <div
          class="flex min-h-screen text-sky-900 dark:text-gray-200 bg-opacity-40 bg-gray-900 rounded-3xl shadow-lg"
        >
          <LayoutSidebar class="h-full" />
          <div
            class="w-full md:w-[calc(100%-8rem)] lg:w-[calc(100%-16rem)] sm:rounded-l-none"
          >
            <div class="p-4 bg-gray-100 dark:bg-gray-900 h-full rounded-3xl">
              <slot />
            </div>
          </div>
        </div>
        <div class="px-6 md:px-11">
          <div
            class="w-full bg-gray-900 shadow-xl bg-opacity-60 rounded-b-2xl h-4"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
