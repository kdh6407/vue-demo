<template>
  <div>
    <nav>
      <ul>
        <li>
          <router-link to="/">메인</router-link>
        </li>
        <li>
          <router-link to="v-model">v-model</router-link>
        </li>
        <li>
          <router-link to="v-model-number">v-model-number</router-link>
        </li>
        <li>
          <router-link to="infinite-scroll">infinite-scroll</router-link>
        </li>
        <li>
          <router-link to="define-model">define-model</router-link>
        </li>
      </ul>
    </nav>
    <router-view />
  </div>
</template>
