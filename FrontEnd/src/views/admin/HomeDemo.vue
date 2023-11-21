<template>
    <headerAdmin></headerAdmin>
    <div class="containt">
        <div id="products" class="products-container">
            <div class="card-container">
                <div type="button" data-toggle="modal" data-target="#exampleModalCenter" class="col-lg-4 ml-1 col-md-6"
                    v-for="(item, index) in this.product" :key="index">
                    <div @click="copyID(item._id)" class="card d-flex flex-column align-items-center">
                        <div class="discount-tt">EXTRA SALE</div>

                        <div class="discount-pt">-{{ item.discount }}%</div>

                        <div class="card-img"> <img class="img-product" :src="item.image.url" alt=""> </div>

                        <div class="product-name">{{ item.name }}</div>

                        <div class="card-body pt-5">
                            <div class="d-flex align-items-center price">
                                <div class="del mr-2"><span class="text-dark">{{ (item.priceR).toLocaleString('en-US', {
                                    style: 'currency', currency:
                                        'VND'
                                }) }}</span></div>
                                <div class="font-weight-bold">{{ (item.price).toLocaleString('en-US', {
                                    style: 'currency', currency:
                                        'VND'
                                }) }}</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import headerAdmin from '../../components/headerAdmin.vue';

export default {
    components: {
        headerAdmin
    },
    data() {
        return {
            money: 0,
            product: [],
            element: {
                image: {
                    url: ''
                }
            },
            discount: '',
        }
    },
    created() {
        // this.IDcart = JSON.parse(localStorage.getItem('cart'))
        axios.get(`http://localhost:3000/api/picture/stored`)
            .then(res => {
                this.product = res.data
            })
            .catch(err => {
                console.log(err);
            })

        axios.get(`http://localhost:3000/api/thuonghieu/stored`)
            .then(res => {
                this.thuonghieu = res.data
            })
            .catch(err => {
                console.log(err);
            })

        axios.get(`http://localhost:3000/api/danhmuc/stored`)
            .then(res => {
                this.danhmuc = res.data
            })
            .catch(err => {
                console.log(err);
            })
    },
}

</script>
<style scoped>
.discount-pt{
  position: relative;
  border: 1px solid rgb(255, 255, 255);
  width: 40px;
  text-align: center;
  background-color: rgb(212, 48, 48);
  color: rgb(255, 255, 255);
  margin-left: 220px;
  bottom: 25px;
}
.discount-tt{
  position: relative;
  border: 1px solid rgb(255, 255, 255);
  width: 100px;
  text-align: center;
  background-color: rgb(212, 48, 48);
  color: rgb(255, 255, 255);
  margin-left: -160px;
}

.containt {
    display: flex;
    justify-content: center; /* Căn giữa theo chiều ngang */
    align-items: center; /* Căn giữa theo chiều dọc */
    width: 950px;
    margin-top: 100px;
    margin-bottom: 100px;
    margin-left: 17%;
}

/* Xóa các dòng sau và thêm CSS Grid cho card-container */


.products-container {
    display: flex;
    text-align: center;
    justify-content: center; /* Căn giữa theo chiều ngang */
    align-items: center; /* Căn giữa theo chiều dọc */
    margin-left: auto;
    margin-right: auto;
}

.card-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 3 cột trên mỗi hàng */
    grid-gap: 20px; /* Khoảng cách giữa các card */

}

.card {
    position: relative;
    padding: 5px;
    cursor: pointer;
    transition: .3s all ease-in-out;
    background-color: rgb(250, 250, 250);
    height: 380px; /* Điều chỉnh chiều cao cho các card */
    width: 300px;
}

.card:hover {
    box-shadow: 2px 2px 15px #fd9a6ce5;
    transform: scale(1.02);
}

.card .product-name {
    position: relative;
    font-weight: 600;
    top: 20px;
}

.card-body {
    position: relative;
    padding-bottom: 0;
    top: 0px;
}

.card .text-muted {
    font-size: 0.82rem;
}

.card-img img {
    padding-top: 0;
    width: 100%;
    height: 180px;
    object-fit: contain;
    display: block;
}

.card-body .btn-group .btn {
    padding: 0;
    width: 20px;
    height: 20px;
    margin-right: 5px;
    border-radius: 50%;
    position: relative;
}



</style>