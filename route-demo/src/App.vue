<template>
  <div>
    <nav>
      <ul>
        <li>
          <router-link to="/">메인</router-link>
        </li>
        <li>
          <router-link to="/about">About</router-link>
        </li>
        <li>
          <router-link to="/about/John">About John</router-link>
        </li>
        <li>
          <router-link to="/info">Info</router-link>
        </li>
        <li>
          <router-link to="/search">Search</router-link>
        </li>
      </ul>
    </nav>
    <router-view />
  </div>
</template>
