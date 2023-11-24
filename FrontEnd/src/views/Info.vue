<template>
  <div class="container mb-5">
    <div class="d-flex">
      <ul class="list-group pr-5">
        <li
          class="list-group-item cusor-pointer"
          :class="{ active: menu === 1 }"
          @click="menu = 1"
        >
          Thông Tin Của Tôi
        </li>
        <li
          class="list-group-item cusor-pointer"
          :class="{ active: menu === 2 }"
          @click="menu = 2"
        >
          Đơn Hàng Của Tôi
        </li>
      </ul>
      <div class="w-full flex-1 position-relative">
        <template v-if="menu === 1">
          <button
            type="button"
            class="btn btn-primary position-absolute position-btn"
          >
            <span v-if="!checkUpdate" @click="checkUpdate = true"
              >Chỉnh Sửa</span
            >
            <span v-else @click="updateUser">Cập Nhật</span>
          </button>
          <div class="d-flex align-items-center mb-5">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJznMaDtgrRc1hXSb577HXXDxYbF8tpaZgKw&usqp=CAU"
              class="account-img mr-3"
              alt="info"
            />
            <span v-if="!checkUpdate" class="fs-20 font-weight-bold">{{
              userData?.userName
            }}</span>
            <input
              v-else
              type="text"
              class="form-control input-max"
              placeholder="Username"
              v-model="userData.userName"
            />
          </div>
          <div class="dropdown-divider"></div>
          <div class="my-5 d-flex align-items-center">
            <span class="mr-3">Họ Và Tên:</span>
            <span v-if="!checkUpdate" class="font-weight-bold">{{
              userData?.fullName
            }}</span>
            <input
              v-else
              type="text"
              class="form-control input-max"
              placeholder="Username"
              v-model="userData.fullName"
            />
          </div>
          <div class="dropdown-divider"></div>
          <div class="my-5 d-flex align-items-center">
            <span class="mr-3">Email:</span>
            <span v-if="!checkUpdate" class="font-weight-bold">{{
              userData?.email
            }}</span>
            <input
              v-else
              type="text"
              class="form-control input-max"
              placeholder="Username"
              v-model="userData.email"
            />
          </div>
        </template>
        <template v-else>
          <template v-if="orders.length">
            <div
              class="d-flex w-full product-list py-3"
              v-for="order in orders"
              :key="order._id"
            >
              <div class="products">
                <div
                  :class="`${index !== 0 ? 'mt-2' : ''}`"
                  v-for="(product, index) in order.products"
                  :key="index"
                >
                  <div class="d-flex align-items-center">
                    <img :src="product.info.image.url" class="img-product" />
                    <span class="ml-2">{{ product.info.name }}</span>
                  </div>
                </div>
              </div>
              <div class="order-price">
                <span :class="`${order.status ? 'approve' : 'pending'}`">{{
                  !order.status ? "Đang Chờ Xác Nhận" : "Đã Xác Nhận Đơn Hàng"
                }}</span>
                <span class="price">
                  {{ new Intl.NumberFormat().format(sumPrice(order)) }} đ
                </span>
              </div>
            </div></template
          >
          <div class="my-5 text-center" v-else>Bạn Chưa Có Đơn Hàng Nào</div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getMe, updateMe } from "../api/user.api";
import { getOrderMe } from "../api/order.api";
import { onMounted, ref } from "vue";
import { inject } from "vue";

const startLoading = inject("startLoading");
const stopLoading = inject("stopLoading");

const userData = ref({
  userName: "",
  fullName: "",
  email: "",
});
const orders = ref([]);
const menu = ref(1);
const checkUpdate = ref(false);

const sumPrice = (item) => {
  return item.products
    .map((product) => product.info.price * product.quantity)
    .reduce((a, b) => a + b);
};

const getMeApi = async () => {
  try {
    const { user } = await getMe();
    userData.value = {
      userName: user.userName,
      fullName: user.fullName,
      email: user.email,
    };
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async () => {
  try {
    const data = await updateMe(userData.value);
    console.log(data);
  } catch (error) {
    console.log(error);
  } finally {
    checkUpdate.value = false;
  }
};

const getOrderData = async (page) => {
  startLoading();
  try {
    const { data } = await getOrderMe();
    orders.value = data;
  } catch (error) {
    console.log(error);
  } finally {
    stopLoading();
  }
};

onMounted(() => {
  getMeApi();
  getOrderData();
});
</script>

<style scoped>
.account-img {
  height: 70px;
  width: 70px;
  border-radius: 50%;
}
.fs-20 {
  font-size: 20px;
}
.flex-1 {
  flex: 1;
}
.position-btn {
  right: 0;
  top: 5px;
}
.cusor-pointer {
  cursor: pointer;
}
.approve {
  background: rgb(129, 167, 243);
  padding: 5px 10px;
  border-radius: 6px;
}
.pending {
  background: rgb(255, 213, 0);
  padding: 5px 10px;
  border-radius: 6px;
}
.input-max {
  width: 300px;
}
.order-price {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.products {
  flex: 1;
}
.product-list {
  border-bottom: 1px solid #999;
}
.img-product {
  height: 100px;
  width: 150px;
  border-radius: 6px;
}
.price {
  color: red;
  font-weight: bold;
}
</style>
