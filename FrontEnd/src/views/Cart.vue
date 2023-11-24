<template>
  <div class="mt-5">
    <div class="card">
      <form class="row">
        <div class="col-md-8 cart">
          <div class="title">
            <div class="row">
              <div class="col">
                <h4><b>Giỏ hàng</b></h4>
              </div>
              <div class="col align-self-center text-right text-muted">
                {{ this.Cart.idProduct_item.length }}
                sản phẩm
              </div>
            </div>
          </div>

          <div
            v-for="(item, index) in this.showProduct"
            :key="index"
            class="row border-top border-bottom"
          >
            <div
              class="text-center"
              v-if="this.Cart.idProduct_item.length == 0"
            >
              <h3>Giỏ hàng rỗng</h3>
            </div>
            <div
              v-if="item.image.url != ''"
              class="row main align-items-center"
            >
              <div class="col-2">
                <img class="img-fluid" :src="item.image.url" />
              </div>
              <div class="col">
                <div class="row text-muted">{{ item.address }}</div>
                <div class="row">{{ item.name }}</div>
              </div>
              <div class="col">
                <input
                  type="number"
                  class="border ip-quantity"
                  min="1"
                  :max="item.Quantity"
                  @change="
                    (e) => {
                      handleChange(e, item._id);
                    }
                  "
                  v-model="item.quantity"
                />
              </div>
              <div class="col">
                {{
                  item.price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "VND",
                  })
                }}
              </div>
              <div class="col">
                {{
                  TTien(item.quantity, item.price).toLocaleString("en-US", {
                    style: "currency",
                    currency: "VND",
                  })
                }}
              </div>
              <span @click="deleteProductInCart(item.idCart)" class="close"
                >&#10005;</span
              >
            </div>
          </div>
          <div class="back-to-shop">
            <routerLink to="/home"
              >&leftarrow;<span class="text-muted"
                >Trở về cửa hàng</span
              ></routerLink
            >
          </div>
        </div>
        <div class="col-md-4 summary">
          <div>
            <h5><b>Tóm tắt chi tiết</b></h5>
          </div>
          <hr />
          <div class="row">
            <div class="col" style="padding-left: 0">
              {{ this.Cart.idProduct_item.length }} sản phẩm
            </div>
            <div class="col text-right">
              {{
                this.Sum.toLocaleString("en-US", {
                  style: "currency",
                  currency: "VND",
                })
              }}
            </div>
          </div>
          <div
            class="row"
            style="border-top: 1px solid rgba(0, 0, 0, 0.1); padding: 2vh 0"
          >
            <div class="col">TỔNG CỘNG:</div>
            <div class="col text-right">
              {{
                this.Sum.toLocaleString("en-US", {
                  style: "currency",
                  currency: "VND",
                })
              }}
            </div>
          </div>
          <div style="text-align: center; margin: 10px">Địa chỉ giao hàng</div>
          <div class="delivery-address1">
            Tỉnh / Thành phố
            <input
              type="text"
              class="form-control"
              placeholder=""
              v-model="this.deliveryAddress.tp"
            />
          </div>
          <div class="delivery-address2">
            Quận / Huyện
            <input
              type="text"
              class="form-control"
              placeholder=""
              v-model="this.deliveryAddress.huyen"
            />
          </div>
          <div class="delivery-address3">
            Số Đường / Số nhà
            <input
              type="text"
              class="form-control"
              placeholder=""
              v-model="this.deliveryAddress.duong"
            />
          </div>
          <div class="delivery-address4">
            Số Điện Thoại
            <input
              type="text"
              class="form-control"
              placeholder=""
              v-model="this.deliveryAddress.sdt"
            />
          </div>
          <button
            type="button"
            class="btnOder"
            data-toggle="modal"
            data-target="#exampleModalCenter"
          >
            ĐẶT HÀNG
          </button>

          <!-- Modal -->
          <div
            class="modal fade"
            id="exampleModalCenter"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLongTitle">
                    Bạn có chắc chắn muốn đặt hàng?
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
                <form method="post" @submit.prevent="(e) => Oder()">
                  <!-- Revenue(), -->
                  <div class="modal-body">
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">TT</th>
                          <th scope="col">Thương hiệu</th>
                          <th scope="col">Sản phẩm</th>
                          <th scope="col">Số lượng</th>
                          <th scope="col">Giá</th>
                        </tr>
                      </thead>
                      <tbody
                        v-for="(item, index) in this.showProduct"
                        :key="index"
                      >
                        <tr>
                          <th scope="row">{{ index + 1 }}</th>
                          <td>{{ item.address }}</td>
                          <td>{{ item.name }}</td>
                          <td>{{ item.quantity }}</td>
                          <td>{{ TTien(item.quantity, item.price) }} VNĐ</td>
                        </tr>
                      </tbody>
                    </table>

                    <div>
                      <b
                        >Tổng cộng:
                        {{
                          this.Sum.toLocaleString("en-US", {
                            style: "currency",
                            currency: "VND",
                          })
                        }}
                        VNĐ</b
                      ><br />
                      <div style="margin-top: 5px">
                        <b>Địa điểm giao: </b> {{ this.deliveryAddress.tp }}-{{
                          this.deliveryAddress.huyen
                        }}-{{ this.deliveryAddress.duong }}
                      </div>
                      <div style="margin-top: 5px">
                        <b> Số điện thoại khách hàng: </b
                        >{{ this.deliveryAddress.sdt }}
                      </div>
                      <div style="margin-top: 5px">
                        <b
                          >Thanh toán khi nhận hàng, được giao từ 5-7 ngày kể từ
                          khi đặt hàng !</b
                        >
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Đóng
                    </button>
                    <button class="btn btn-primary">Đặt hàng</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { addOrder } from "../api/order.api";
export default {
  data() {
    return {
      deliveryAddress: [
        {
          tp: "",
          huyen: "",
          duong: "",
          sdt: "",
        },
      ],

      Sum_item: [],
      Sum: 0,
      SL: 1,
      Cart: {
        idProduct_item: [
          {
            id_item: {
              image: {
                url: "",
              },
            },
          },
        ],
      },

      showProduct: [
        {
          quantity: 0,
          idCart: "",
          image: {
            url: "",
          },
        },
      ],

      Product: {
        image: {
          url: "",
        },
      },
    };
  },
  watch: {
    showProduct: {
      handler(a) {
        let b = 0;
        for (let index = 0; index < a.length; index++) {
          b += a[index].price * a[index].quantity;
        }
        this.Sum = b;
      },
      deep: true,
    },
  },
  async created() {
    let res = await axios.get(`http://localhost:3000/api/user/show`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`, // Đính kèm Token vào tiêu đề
      },
    });

    this.Cart = res.data.cart;
    for (let index = 0; index < this.Cart.idProduct_item.length; index++) {
      let res = await axios.get(
        `http://localhost:3000/api/picture/product/${this.Cart.idProduct_item[index].id_item}`
      );
      this.Product = res.data;
      this.showProduct[index] = this.Product;
      this.showProduct[index].quantity =
        this.Cart.idProduct_item[index].quantity;
      this.showProduct[index].idCart = this.Cart.idProduct_item[index]._id;
      this.Sum_item.push(
        this.TTien(
          this.showProduct[index].quantity,
          this.showProduct[index].price
        )
      );
    }
  },
  methods: {
    updateQuantity() {
      axios
        .put(
          `http://localhost:3000/api/picture/updateQuantity`,
          this.showProduct
        )
        .then(() => {})
        .catch((err) => {
          console.log(err);
        });
    },

    Revenue() {
      axios
        .post(`http://localhost:3000/api/revenue/create`, this.showProduct)
        .then(() => {})
        .catch((err) => {
          console.log(err);
        });
    },

    TTien(a, b) {
      if (a != undefined && b != undefined) return a * b;
    },
    SumMoney(array) {
      let Sum = 0;
      for (let index = 0; index < array.length; index++) {
        if (array[index] != undefined) {
          Sum += array[index];
        }
      }
      return Sum;
    },

    async Oder() {
      const id_cart = JSON.parse(localStorage.getItem("cart"));
      if (this.showProduct[0].quantity == 0) {
        return alert("Vui lòng thêm sản phẩm");
      } else if (this.deliveryAddress == "") {
        return alert("Vui lòng nhập địa chỉ giao hàng");
      }
      const dataOrder = {
        ...this.deliveryAddress,
        products: this.showProduct.map((product) => ({
          info: product._id,
          quantity: product.quantity,
        })),
      };
      try {
        await addOrder(dataOrder, {
          id_cart
        });
        alert('Đặt hàng thành công')
        window.location.reload()
      } catch (error) {
        console.log(error);
      }

      // axios.post(`http://localhost:3000/api/cart/oder/${id}`)
      //     .then(() => {
      //         alert('Đặt hàng thành công')
      //         window.location.reload()
      //     })
      //     .catch(err => {
      //         console.log(err);
      //     })
    },

    handleChange(e, id) {
      // console.log(e.target.value, id);
      const dataItem = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`, // Đính kèm Token vào tiêu đề
        },
        quantity: e.target.value,
        id: JSON.parse(localStorage.getItem("cart")),
        id_obj: id,
      };
      axios
        .put(`http://localhost:3000/api/cart/update/${id}`, dataItem)
        .catch((err) => {
          console.log(err);
        });
    },
    deleteProductInCart(e) {
      const dataItem = {
        id: JSON.parse(localStorage.getItem("cart")),
        id_obj: e,
      };
      console.log(dataItem);
      axios
        .delete(`http://localhost:3000/api/cart/delete/${e}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`, // Đính kèm Token vào tiêu đề
          },
          data: dataItem,
        })
        .then(() => {
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
body {
  background: #ddd;
  min-height: 100vh;
  vertical-align: middle;
  display: flex;
  font-family: sans-serif;
  font-size: 0.8rem;
  font-weight: bold;
}

ul li {
  display: inline-block;
}

li.col {
  display: inline;
}

li.row {
  display: inline;
}

.title {
  margin-bottom: 5vh;
}

.delivery-address1 {
  position: relative;
}

.delivery-address2 {
  position: relative;
  margin-top: -25px;
}

.delivery-address3 {
  position: relative;
  margin-top: -25px;
}

.delivery-address4 {
  position: relative;
  margin-top: -25px;
}

.delivery-address5 {
  position: relative;
  margin-top: -25px;
}

.form-control {
  position: relative;
  width: 200px;
  height: 22px;
  text-align: left;
}

.card {
  margin: auto;
  max-width: 950px;
  width: 90%;
  box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 1rem;
  border: transparent;
}

.ip-quantity {
  width: 55px;
}

@media (max-width: 767px) {
  .card {
    margin: 3vh auto;
  }
}

.cart {
  background-color: #fff;
  padding: 4vh 5vh;
  border-bottom-left-radius: 1rem;
  border-top-left-radius: 1rem;
}

@media (max-width: 767px) {
  .cart {
    padding: 4vh;
    border-bottom-left-radius: unset;
    border-top-right-radius: 1rem;
  }
}

.summary {
  background-color: #ddd;
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  padding: 4vh;
  color: rgb(65, 65, 65);
}

@media (max-width: 767px) {
  .summary {
    border-top-right-radius: unset;
    border-bottom-left-radius: 1rem;
  }
}

.summary .col-2 {
  padding: 0;
}

.summary .col-10 {
  padding: 0;
}

.row {
  margin: 0;
}

.title b {
  font-size: 1.5rem;
}

.main {
  margin: 0;
  padding: 2vh 0;
  width: 100%;
}

.col-2,
.col {
  padding: 0 1vh;
}

a {
  padding: 0 1vh;
}

.close {
  margin-left: auto;
  font-size: 0.7rem;
  cursor: pointer;
}

img {
  width: 3.5rem;
}

.back-to-shop {
  margin-top: 4.5rem;
}

h5 {
  margin-top: 4vh;
}

hr {
  margin-top: 1.25rem;
}

form {
  padding: 2vh 0;
}

select {
  border: 1px solid rgba(0, 0, 0, 0.137);
  padding: 1.5vh 1vh;
  margin-bottom: 4vh;
  outline: none;
  width: 100%;
  background-color: rgb(247, 247, 247);
}

input {
  border: 1px solid rgba(0, 0, 0, 0.137);
  padding: 1vh;
  margin-bottom: 4vh;
  outline: none;
  width: 100%;
  background-color: rgb(247, 247, 247);
}

input:focus::-webkit-input-placeholder {
  color: transparent;
}

.btnOder {
  background-color: #000;
  border-color: #000;
  color: white;
  width: 100%;
  font-size: 0.7rem;
  margin-top: 4vh;
  padding: 1vh;
  border-radius: 0;
}

.btn:focus {
  box-shadow: none;
  outline: none;
  box-shadow: none;
  color: white;
  -webkit-box-shadow: none;
  /* -webkit-user-select: none; */
  transition: none;
}

.btn:hover {
  color: white;
}

a {
  color: black;
}

a:hover {
  color: black;
  text-decoration: none;
}

#code {
  background-image: linear-gradient(
      to left,
      rgba(255, 255, 255, 0.253),
      rgba(255, 255, 255, 0.185)
    ),
    url("https://img.icons8.com/small/16/000000/long-arrow-right.png");
  background-repeat: no-repeat;
  background-position-x: 95%;
  background-position-y: center;
}

.rm .ph {
  display: inline-block;
  cursor: pointer;
}

.modal-content {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1000px;
  margin-top: 300px;
}
</style>
