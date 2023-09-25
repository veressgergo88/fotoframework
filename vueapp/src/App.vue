<script setup lang="ts">
import { ref } from 'vue'
import { loadImages } from './api';

type Image = {
    id: number;
    title: string;
    url: string;
    smallAmount: number;
    largeAmount: number;
};

let isLoading = ref(false)
let notificationText = ref<string | null>(null)
let images = ref<Image[]>([])
let page = ref('home')
let searchParam = ref("")

const changePage = (newPage: string) => {
  page.value = newPage
}

const clearSearchParam = () => {
  searchParam.value = ""
}

const search = async () => {
    isLoading.value = true
    const response = await loadImages(searchParam.value)
    isLoading.value = false
    if (!response.success)
      return notificationText.value = response.error
    const data = response.data
    images.value = data.map(img => ({...img, smallAmount: 0, largeAmount: 0}))
    notificationText.value = null
}
</script>

<template>
<div class="card">
  <div v-if="page === 'home'">
    <h1>Home</h1>
    <button @click="changePage('about')">To about</button>
    <input type="text" placeholder="Title" v-model="searchParam" />
    <button @click="clearSearchParam">Clear</button>
    <button @click="search">Search</button>

    <p v-if="isLoading">Loading...</p>
    <div v-else>
      <div v-for="image in images" :key="image.id">
        <p>{{ image.title }}</p>
        <img :src="image.url" :alt="image.title" />
      </div>
    </div>

    <h1 v-if="notificationText">{{ notificationText }}</h1>
  </div>

  <div v-else-if="page === 'about'">
    <h1>About</h1>
    <button @click="changePage('home')">To Home</button>
  </div>
</div>
</template>

<style scoped>
</style>
