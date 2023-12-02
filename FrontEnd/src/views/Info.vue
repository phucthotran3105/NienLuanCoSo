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
        <li
          class="list-group-item cusor-pointer"
          :class="{ active: menu === 3 }"
          @click="menu = 3"
        >
          Cài đặt địa chỉ
        </li>
        <li
          class="list-group-item cusor-pointer"
          :class="{ active: menu === 4 }"
          @click="menu = 4"
        >
          Đổi mật khẩu
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
        <template v-else-if="menu === 2">
          <template v-if="orders.length">
            <div
              class="d-flex w-full product-list py-3"
              v-for="order in orders"
              :key="order._id"
            >
              <div class="products flex-1">
                <div
                  :class="`${index !== 0 ? 'mt-2' : ''}`"
                  v-for="(product, index) in order.products"
                  :key="index"
                >
                  <div class="d-flex align-items-center">
                    <img :src="product?.info?.image?.url" class="img-product" />
                    <span class="ml-2">{{ product?.info?.name }}</span>
                  </div>
                </div>
              </div>
              <div
                style="
                   {
                    width: 30%;
                  }
                "
                class="text-grey"
              >
                <i class="fas fa-ambulance text-grey"></i>
                {{ dayjs(order.createdAt).format("DD-MM-YYYY") }}
              </div>
              <div class="order-price flex-1">
                <div class="text-right">
                  <span :class="`${order.status ? 'approve' : 'pending'}`">{{
                    !order.status ? "Đang Chờ Xác Nhận" : "Đã Xác Nhận Đơn Hàng"
                  }}</span>
                </div>
                <span class="price text-right">
                  {{ new Intl.NumberFormat().format(sumPrice(order)) }} đ
                </span>
              </div>
            </div>
          </template>
          <div class="my-5 text-center" v-else>Bạn Chưa Có Đơn Hàng Nào</div>
        </template>
        <template v-else-if="menu === 3">
          <div>
            <button
              type="button"
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#exampleModalCenter"
              @click="createAdd()"
            >
              Thêm Địa Chỉ
            </button>
            <div
              class="modal fade"
              id="exampleModalCenter"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalCenterTitle"
              aria-hidden="true"
              ref="refModal"
            >
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">
                      Thêm địa chỉ
                    </h5>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div class="form-group">
                      <label for="exampleInputEmail1">Tên</label>
                      <input
                        type="email"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        v-model="formAddress.name"
                      />
                    </div>
                    <div class="form-group">
                      <label for="exampleInputPassword1">Số điện thoại</label>
                      <input
                        type="email"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        v-model="formAddress.phone"
                      />
                    </div>
                    <span class="d-block mb-2">Địa chỉ cụ thể</span>
                    <ckeditor :editor="editor" v-model="formAddress.address" />
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Đóng
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary"
                      :data-dismiss="openModal"
                      @click="saveAddress"
                    >
                      Lưu
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <template v-if="addressData.length">
              <div v-for="add in addressData" :key="add._id" class="my-2">
                <div class="card position-relative">
                  <div class="card-body">
                    <div
                      class="d-flex align-items-center position-absolute action-add"
                    >
                      <button
                        type="button"
                        class="btn btn-warning mr-2"
                        data-toggle="modal"
                        data-target="#exampleModalCenter"
                        @click="modalOpen(add)"
                      >
                        <i class="fas fa-broom mr-1" />Sửa
                      </button>
                      <button
                        type="button"
                        class="btn btn-danger"
                        data-toggle="modal"
                        data-target="#exampleModal"
                        @click="deleteId = add._id"
                      >
                        <i class="fas fa-box-open" />
                        Xoá
                      </button>
                    </div>
                    <span class="font-weight-bold"
                      ><i class="fa fa-user-circle mr-2" />{{ add.name }}</span
                    >
                    <span class="d-block my-2">
                      <i class="fa fa-phone mr-2" />{{ add.phone }}</span
                    >
                    <span>
                      <div class="font-weight-bold">
                        <i class="far fa-address-card mr-2" /> Địa chỉ
                      </div>
                      <span class="text-style" v-html="add.address"></span>
                    </span>
                  </div>
                </div>
              </div>
            </template>
            <div v-else class="my-5 text-center">Bạn chưa có địa chỉ nào</div>
          </div>
        </template>
        <template v-else>
          <div>
            <div class="form-group">
              <label for="passwordOld">Mật Khẩu Cũ</label>
              <input
                v-model="changePassword.pass"
                type="password"
                class="form-control"
                id="passwordOld"
              />
            </div>
            <div class="form-group">
              <label for="passwordNew">Mật Khẩu Mới</label>
              <input
                v-model="changePassword.newPass"
                type="password"
                class="form-control"
                id="passwordNew"
              />
            </div>
            <div class="form-group">
              <label for="passwordNewConfirm">Nhập Lại Mật Khẩu Mới</label>
              <input
                v-model="changePassword.passConfirm"
                type="password"
                class="form-control"
                id="passwordNewConfirm"
              />
            </div>
            <button class="btn btn-primary" @click="changePass">Submit</button>
          </div>
        </template>
      </div>
    </div>
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Xoá Địa Chỉ</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">Bạn có chắc chắn muốn xoá</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Huỷ
            </button>
            <button
              type="button"
              class="btn btn-danger"
              :data-dismiss="openModalDelete"
              @click="deleteAdd"
            >
              Xoá
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getMe, updateMe } from "../api/user.api";
import { getOrderMe } from "../api/order.api";
import {
  createAddress,
  getAddressByUser,
  updateAddress,
  deleteAddress,
} from "../api/address.api";
import {changePasswordApi} from '../api/user.api'
import { onMounted, ref } from "vue";
import { inject } from "vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import dayjs from "dayjs";

const startLoading = inject("startLoading");
const stopLoading = inject("stopLoading");

const userData = ref({
  userName: "",
  fullName: "",
  email: "",
});

const changePassword = ref({
  pass: "",
  newPass: "",
  passConfirm: "",
});

const formAddress = ref({
  name: "",
  phone: "",
  address: "",
});
const orders = ref([]);
const menu = ref(1);
const checkUpdate = ref(false);
const editor = ref(ClassicEditor);
const refModal = ref(null);
const openModal = ref("false");
const openModalDelete = ref("false");
const addressData = ref([]);
const updateId = ref("");
const deleteId = ref("");

const changePass = async () => {
  if (!Object.values(changePassword.value).every((e)=>e)) {
    alert("Vui lòng điền thông tin đầy đủ");
  } else {
    try {
      const res = await changePasswordApi({ ...changePassword.value });
      alert(res?.data?.message ?? 'Vui lòng kiểm tra lại thông tin');
    } catch (error) {
      alert("Vui lòng kiểm tra lại thông tin");
    }
  }
};

const sumPrice = (item) => {
  return item.products
    .map((product) => product.info.price * product.quantity)
    .reduce((a, b) => a + b);
};

const saveAddress = async () => {
  startLoading();
  openModal.value = "modal";
  try {
    if (updateId.value) {
      await updateAddress(updateId.value, formAddress.value);
    } else {
      await createAddress(formAddress.value);
    }
  } catch (error) {
    console.log(error);
  } finally {
    getAddress();
    stopLoading();
  }
};

const deleteAdd = async () => {
  startLoading();
  openModalDelete.value = "modal";
  try {
    await deleteAddress(deleteId.value);
  } catch (error) {
    console.log(error);
  } finally {
    getAddress();
    stopLoading();
  }
};

const getAddress = async () => {
  try {
    const { data } = await getAddressByUser();
    addressData.value = data;
  } catch (error) {
    console.log(error);
  }
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

const modalOpen = (add) => {
  updateId.value = add._id;
  formAddress.value = {
    name: add.name,
    phone: add.phone,
    address: add.address,
  };
};

const createAdd = () => {
  updateId.value = "";
  formAddress.value = {
    name: "",
    phone: "",
    address: "",
  };
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
  getAddress();
});
</script>

<style scoped>
.action-add {
  right: 20px;
  top: 10px;
}
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
}

.flex-1 {
  flex: 1;
}
.product-list {
  border-bottom: 1px solid #999;
  justify-content: space-between;
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
.text-style {
  color: #888;
  font-size: 14px;
  font-style: italic;
}
.text-grey {
  color: #777;
}
</style>
