<script setup lang="ts">
import { TwButton, TwDropdownMenu, TwFeather } from "vue3-tailwind";
import { useSidebarStore } from "~~/store/sidebar";
import { useAuthStore } from "~/store/auth";

const sidebarStore = useSidebarStore();
const animationOpenClose = useAnimationOpenClose();

const router = useRouter();

const StoreAuth = useAuthStore();

const logout = () => {
  StoreAuth.toggleAuthState(false);
  router.push("/login");
};
</script>
<template>
  <header
    class="md:flex w-full text-gray-200 border-spacing-1 border-t-0 shadow-xl border-[#343434] bg-gray-800 px-2 md:sticky md:top-0 z-20"
  >
    <div
      class="h-14 flex justify-between md:justify-center items-center w-full md:w-52 px-4"
    >
      <div class="font-bold">Reportify Admin</div>
      <button
        class="block md:hidden float-right"
        @click="sidebarStore.mobileOpen = !sidebarStore.mobileOpen"
      >
        <div class="-rotate-90">
          <TwFeather type="bar-chart-2"></TwFeather>
        </div>
      </button>
    </div>
    <transition
      name="expand"
      @enter="animationOpenClose.animateEnter"
      @after-enter="animationOpenClose.animateAfterEnter"
      @leave="animationOpenClose.animateLeave"
    >
      <div class="block md:hidden" v-show="sidebarStore.mobileOpen">
        <LayoutMobileNav />
      </div>
    </transition>
    <div class="h-14 flex items-center w-full justify-between px-4 md:px-10">
      <div class=""></div>
      <div class="">
        <TwDropdownMenu align="right" width="48">
          <template #trigger>
            <button>
              <img
                class="w-10 h-10 rounded-full border border-[#1d152a7a]"
                src="/images/profile.jpeg"
                alt=""
              />
            </button>
          </template>

          <template #content>
            <TwButton
              @click="logout"
              variant="none"
              icon="log-out"
              class="block w-full px-4 py-2 text-sm leading-5 text-gray-700 dark:text-gray-200 text-left hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition"
            >
              Logout
            </TwButton>
          </template>
        </TwDropdownMenu>
      </div>
    </div>
  </header>
</template>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: all 0.4s ease-in-out;
  overflow: hidden;
}
</style>
