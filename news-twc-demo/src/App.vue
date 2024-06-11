<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-8">Latest News</h1>
    <button
      @click="fetchNews"
      class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-8"
    >
      새 기사 불러오기
      <svg
        v-if="loading"
        class="inline-block animate-spin h-5 w-5 mr-2 text-white"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </button>
    <p v-if="news.length === 0" class="text-gray-600">
      조회된 뉴스가 없습니다.
    </p>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div
        v-for="(article, index) in news"
        :key="index"
        class="bg-white rounded-lg shadow-md"
      >
        <div
          v-if="article.urlToImage"
          class="h-48 bg-cover bg-center rounded-t-lg"
          :style="{ backgroundImage: `url(${article.urlToImage})` }"
        ></div>
        <div class="p-6">
          <a
            :href="article.url"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-blue-500 hover:cursor-pointer"
          >
            <h2 class="text-xl font-bold mb-2">{{ article.title }}</h2>
          </a>
          <p class="text-gray-700 line-clamp-3">{{ article.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const news = ref([]);
const loading = ref(false);

const fetchNews = async () => {
  loading.value = true;

  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${import.meta.env.VITE_NEWSAPI_KEY}`
    );
    const data = await response.json();
    news.value = data.articles;
  } catch (error) {
    console.error("Error fetching news:", error);
  }

  loading.value = false;
};

onMounted(() => {
  fetchNews();
});
</script>