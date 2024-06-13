<template>
  <div>
    <nav>
      <ul>
        <li>
          <router-link to="/">메인</router-link>
        </li>
        <li>
          <router-link to="v-model">VModel</router-link>
        </li>
        <li>
          <router-link to="v-model-number">VModelNumber</router-link>
        </li>
      </ul>
    </nav>
    <router-view />
  </div>
</template>
