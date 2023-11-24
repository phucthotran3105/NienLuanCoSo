<script setup>
import Header from "./components/header.vue";
import Footer from "./components/footer.vue";
import { provide, ref } from "vue";
const loading = ref(false);
const startLoading = () => {
  loading.value = true;
};
const stopLoading = () => {
  loading.value = false;
};
provide("startLoading", startLoading);
provide("stopLoading", stopLoading);
</script>

<template>
  <div class="position-relative">
    <div class="t-loading" v-if="loading">
      <div
        class="spinner-border text-danger"
        style="width: 3rem; height: 3rem"
        role="status"
      >
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <Header />
    <div class="t-container">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<style scoped>
.t-container {
  padding-top: 100px;
  min-height: 70vh;
  max-height: 100vh;
  overflow: auto;
  margin-bottom: 100px;
}

.t-loading-container {
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
}
.t-loading {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.3);
  position: fixed !important;
}
</style>
