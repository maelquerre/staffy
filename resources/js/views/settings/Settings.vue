<template>
  <div class="container mx-auto px-4 pt-8">
    <h2 class="mb-8 text-3xl font-bold tracking-tight">Settings</h2>

    <div>
      <div class="flex space-x-8 mb-8 text-sm font-medium border-b">
        <RouterLink
          class="mb-[-1px] pb-3"
          :class="{ 'text-red-500 border-b-2 border-red-500': $route.name === 'general-settings' }"
          :to="{ name: 'general-settings' }"
        >
          General
        </RouterLink>
        <RouterLink
          class="mb-[-1px] pb-3"
          :class="{ 'text-red-500 border-b-2 border-red-500': $route.name === 'password-settings' }"
          :to="{ name: 'password-settings' }"
        >
          Password
        </RouterLink>
      </div>

      <RouterView />
    </div>
  </div>
</template>

<script>
export default {}
</script>
