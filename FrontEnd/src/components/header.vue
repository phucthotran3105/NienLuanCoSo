<template>
  <nav class="navbar my-navbar navbar-expand-lg navbar-light bg-white z-10">
    <div class="container">
      <routerLink to="/" class="navbar-brand">
        <img src="https://imgur.com/sbUlQpy" alt="" />
        Tshoes
      </routerLink>
      <button
        class="navbar-toggler border-0"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span
          class="iconify bar-icon"
          data-icon="fa-solid:bars"
          data-inline="false"
        ></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml1-auto">
          <li class="nav-item nav-active">
            <routerLink to="" class="nav-link"
              >Home<span class="sr-only">(current)</span></routerLink
            >
          </li>
          <!-- <li class="nav-item">
                        <routerLink to="" class="nav-link">Features</routerLink>
                    </li>
                    <li class="nav-item">
                        <routerLink to="" class="nav-link">Pricing</routerLink>
                    </li>
                    <li class="nav-item">
                        <routerLink to="" class="nav-link">About</routerLink>
                    </li> -->
        </ul>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item mr-4" v-if="!this.checkAuth">
            <router-link class="login-cls" to="/login">Đăng nhập</router-link>
          </li>
          <li class="nav-item mr-4" v-else>
            <div class="dropdown">
              <div
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Xin chào, {{ this.user.fullName }}
              </div>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" @click="logOut()">Đăng Xuất</a>
                <a class="dropdown-item">
                  <router-link class="info-link" to="/info"
                    >Thông Tin Của Tôi</router-link
                  >
                </a>
              </div>
            </div>
          </li>
          <li class="nav-item cart-item">
            <router-link class="cart_header" to="/cart">
              <span class="cart_icon">
                <i
                  v-if="this.cart.idProduct_item != undefined"
                  class="fas fa-shopping-cart mr-1 bx bx-cart cartNum"
                  ><span>{{ this.cart.idProduct_item.length }}</span></i
                >
              </span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import axios from "axios";
export default {
  inject: ["checkAuth"],
  data() {
    return {
      user: {},
      idcart: "",
      check: localStorage.getItem("Token"),
      cart: [],
    };
  },
  watch: {
    checkAuth(value) {
      if (value) {
        this.showData();
        this.getCart()
      }
    },
  },
  methods: {
    async showData() {
      const token = JSON.parse(localStorage.getItem("Token"));
      if (token != undefined) {
        axios
          .get(`http://localhost:3000/api/user/show`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("Token")}`, // Đính kèm Token vào tiêu đề
            },
          })
          .then((res) => {
            this.user = res.data;
            this.check = true;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    async getCart() {
      this.idcart = JSON.parse(localStorage.getItem("cart"));
      if (this.idcart != undefined) {
        axios
          .get(`http://localhost:3000/api/cart/show/${this.idcart}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("Token")}`, // Đính kèm Token vào tiêu đề
            },
          })
          .then((res) => {
            this.cart = res.data;
            this.check = true;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    async logOut() {
      localStorage.clear();
      this.checkAuth = false;
      this.$router.replace({ path: "/home" });
      window.location.reload();
    },
  },
};
</script>

<style scoped>
.z-10 {
  z-index: 10 !important;
}
.cartNum span {
  background-color: aqua;
  padding: 5px;
  border-radius: 100%;
  font-size: 12px;
  text-decoration: none;
  position: absolute;
  top: 17px;
}

.info-link {
  color: black;
  text-decoration: none;
}

.cart_header {
  color: black;
  text-decoration: none;
}

.my-navbar {
  z-index: 2;
}

.my-navbar {
  padding: 20px;
}

body {
  font-family: "Poppins" !important;
}

.dropdown-item {
  cursor: pointer;
}

.cart-item {
  cursor: pointer;
}

.login-cls {
  text-decoration: none;
  color: black;
}

.my-navbar {
  box-shadow: 0px 10px 30px rgba(216, 216, 216, 0.45);
  position: fixed;
  width: 100%;
  top: 0;
}

.ml-auto1 {
  margin-left: 50px !important;
}

.navbar-brand {
  font-weight: bold;
}

.navbar-brand img {
  width: 50px;
}

.nav-link {
  border-bottom: 4px solid white;
  margin-right: 24px;
  transition: 0.3s ease;
  padding: 5px;
}

.nav-link:hover {
  color: black;
  border-bottom: 4px solid #eb4027;
}

.nav-active a {
  color: black !important;
  font-weight: 600;
  border-bottom: 4px solid #eb4027;
}
</style>
