<script setup lang="ts">
import { computed } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

const excludeRoutePaths: Array<string | symbol> = ['/']

type HasNameValueRouteRecordRaw = Omit<RouteRecordRaw, 'name'> & {
  name: string | symbol
}

function isHasNameRouteRecordRaw(value: unknown): value is HasNameValueRouteRecordRaw {
  const isObject = typeof value === 'object' && value !== null

  if (!isObject || !('name' in value)) {
    return false
  }

  return value.name !== undefined
}

function isDisplayRoute(value: unknown): value is HasNameValueRouteRecordRaw {
  return isHasNameRouteRecordRaw(value) ? !excludeRoutePaths.includes(value.name) : false
}

const links = computed(() => {
  return routes.flatMap((route) =>
    isDisplayRoute(route) ? [{ name: route.name, path: route.path }] : []
  )
})
</script>

<template>
  <main class="HomePage">
    <h1 class="sr-only">Home</h1>
    <nav>
      <ul>
        <li v-for="(link, index) of links" :key="index">
          <RouterLink :to="link.path">{{ link.name }}</RouterLink>
        </li>
      </ul>
    </nav>
  </main>
</template>

<style scoped>
nav {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100dvh;
  padding: 1rem;
}

nav ul {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
