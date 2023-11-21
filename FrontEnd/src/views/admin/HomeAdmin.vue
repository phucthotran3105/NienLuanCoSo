<template>
    <headerAdmin></headerAdmin>
    <div class="container form-show-product">
        <div class="row">
            <div class="col-md-offset-1 col-md-10">
                <div class="panel">
                    <div class="panel-heading">
                        <div class="row">
                            <div class="col-sm-12 col-xs-12 Text-sp">
                                <h3 class="abc">KHO SẢN PHẨM</h3>
                            </div>
                            <div>
                                <AddProduct></AddProduct>
                            </div>
                        </div>
                    </div>
                    <div class="panel-body table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>TT</th>
                                    <th>Tên</th>
                                    <th>Thương hiệu</th>
                                    <th>Giá tiền (VNĐ)</th>
                                    <th>Số lượng</th>
                                    <th>Ảnh minh họa</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="pictures.length == 0">
                                    <th colspan="8" class="text-center">
                                        <h3>
                                            Không có sản phẩm nào trong kho
                                        </h3>
                                    </th>
                                </tr>
                                <tr v-for="(item, index) in paginatedData" :key="index">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ item.name }}</td>
                                    <td>{{ item.address }}</td>
                                    <td>{{ (item.price).toLocaleString('en-US', { style: 'currency', currency: 'VND' }) }}
                                    </td>
                                    <td>{{ item.Quantity }}</td>
                                    <td v-if="item.image != undefined"><img class="img-item" :src="`${item.image.url}`"
                                            alt="Ảnh minh họa"></td>
                                    <td>
                                        <ul class="action-list">
                                            <li><button type="button" class="btn1 btn-primary" data-toggle="modal"
                                                    data-target="#exampleModalCenter" @click="getOneProduct(item._id)"><i
                                                        class="fa fa-pencil-alt"></i></button>
                                            </li>
                                            <li><button class="btn2 btn-i btn-danger" @click="copyID(item._id)" type="button"
                                                    data-toggle="modal" data-target="#exampleModal"><i
                                                        class="fa fa-times"></i></button>
                                            </li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr class="tongnav">
                                    <th class="tong" colspan="2" >
                                        <h6>Tổng số: <b>{{ pictures.length }}</b> sản phẩm</h6>
                                    </th>
                                </tr>
                                <tr>
                                    <th colspan="8">
                                        <div class="btn-pt">
                                            <div class="phantrang">
                                                <button class="btn" @click="prevPage" :disabled="currentPage === 1">Trang
                                                    Trước</button>
                                                <span>Trang {{ currentPage }} / {{ pageCount }}</span>
                                                <button class="btn" @click="nextPage"
                                                    :disabled="currentPage === pageCount">Trang
                                                    Sau</button>
                                            </div>
                                        </div>
                                    </th>
                                </tr>
                            </tbody>
                        </table>

                        <!-- Button trigger modal -->

                        <!-- Modal Delete -->
                        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog"
                            aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Xóa sản phẩm</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        Bạn có chắc chắn muốn xóa sản phẩm?
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Trở
                                            lại</button>
                                        <button type="button" @click="deleteProduct()" class="btn btn-danger">Xóa</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Button trigger modal -->

                        <!-- Modal Update -->
                        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog"
                            aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLongTitle">Tshoes</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <form @submit.prevent="updateProduct(this.product._id)">
                                            <div class="card-details">
                                                <h3 class="title">Chỉnh sửa thông tin</h3>
                                                <div class="row">
                                                    <div class="form-group col-sm-7">
                                                        <label for="add">Thương hiệu</label>
                                                        <div class="input-group expiration-date ">
                                                            <select disabled class="form-control select-TH" name="" id="add"
                                                                v-model="this.product.address" required="true">
                                                                <option disabled selected value="">Chọn danh mục</option>
                                                                <option v-for="(item, index) in this.thuonghieu"
                                                                    :key="index" :value="`${item.nameTH}`">
                                                                    {{ item.nameTH }}

                                                                </option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="form-group col-sm-5">
                                                        <label for="prices">Giá gốc</label>
                                                        <div class="input-group expiration-date">
                                                            <input type="number" class="form-control" placeholder="VNĐ"
                                                                id="prices" v-model="this.product.priceR" required="true">
                                                        </div>
                                                    </div>
                                                    <div class="form-group col-sm-5">
                                                        <label for="prices">Giảm giá</label>
                                                        <div class="input-group expiration-date">
                                                            <input type="number" max="100" min="0" class="form-control"
                                                                placeholder="Tỉ lệ %" id="prices"
                                                                v-model="this.product.discount">
                                                        </div>
                                                    </div>
                                                    <div class="form-group col-sm-5">
                                                        <label for="prices">Giá tiền</label>
                                                        <div class="input-group expiration-date">

                                                            <input type="radio" checked class="form-control ip-price"
                                                                placeholder="VNĐ"
                                                                :value="priceSum(this.product.priceR, this.product.discount)"
                                                                id="prices" v-model="this.product.price" required="true">
                                                            <div class="form-control">{{ priceSum(this.product.priceR,
                                                                this.product.discount) }}</div>

                                                        </div>

                                                    </div>
                                                    <div class="form-group col-sm-8">
                                                        <label for="names">Tên giày</label>
                                                        <input type="text" class="form-control" id="names"
                                                            placeholder="Nhập tên giày..." v-model="this.product.name"
                                                            required="true">
                                                    </div>
                                                    <div class="form-group col-sm-4">
                                                        <label for="cvc">Số lượng</label>
                                                        <input id="cvc" min="1" type="number" class="form-control"
                                                            placeholder="SL" v-model="this.product.Quantity"
                                                            required="true">
                                                    </div>
                                                    <div class="form-group col-sm-8">
                                                        <label for="image">Ảnh minh họa</label>
                                                        <input type="file" class="form-control" id="image" ref="imageInput">
                                                        <div v-if="this.product.image.url != undefined">
                                                            <img class="img-product" :src="this.product.image.url" alt="">
                                                        </div>

                                                    </div>
                                                    <!-- <div class="form-group col-sm-4">
                                                        <label for="gen">Danh mục</label>
                                                        <select class="form-control" name="" id="gen"
                                                            v-model="this.product.gen" required="true">
                                                            <option disabled selected value="">Chọn danh mục</option>
                                                            <option v-for="(item, index) in this.Danhmuc" :key="index"
                                                                :value="`${item.nameDM}`">
                                                                {{ item.nameDM }}
                                                            </option>
                                                        </select>
                                                    </div> -->
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary"
                                                    data-dismiss="modal">Close</button>
                                                <button class="btn btn-primary">Cập nhật</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
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
import AddProduct from '../../components/AddProduct.vue';
import CreactTrademark from '../../components/CreactTrademark.vue';
import CreateProductPortfolio from '../../components/CreateProductPortfolio.vue';
import headerAdmin from '../../components/headerAdmin.vue';
export default {
    components: {
        CreactTrademark,
        AddProduct,
        CreateProductPortfolio,
        headerAdmin
    },
    data() {
        return {
            thuonghieu: [],
            Danhmuc: [],
            product: {
                gen: '',
                name: '',
                address: '',
                price: '',
                image: {
                    url: '',
                    id: ''
                }
            },
            pictures: [],
            id: '',
            pageSize: 4, // Số lượng mục trên mỗi trang
            currentPage: 1, // Trang hiện tại
        }
    },

    computed: {
        pageCount() {
            return Math.ceil(this.pictures.length / this.pageSize);
        },
        paginatedData() {
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            return this.pictures.slice(startIndex, endIndex);
        },
    },

    mounted() {
        // Simulate fetching data from an API
        // Mô phỏng việc lấy dữ liệu từ API
        setTimeout(() => {
            this.pictures
        }, 1000);
    },
    methods: {
        async fetchData() {
            try {
                const res = await axios.get('http://localhost:3000/api/picture/stored',);
                this.pictures = res.data;
            } catch (error) {
                console.error(error);
            }
        },

        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextPage() {
            if (this.currentPage < this.pageCount) {
                this.currentPage++;
            }
        },

        copyID(id) {
            this.id = id
            console.log(this.id);
        },

        deleteProduct() {
            axios.delete(`http://localhost:3000/api/picture/delete/${this.id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('Token')}`, // Đính kèm Token vào tiêu đề
                }
            })
                .then(() => {
                    window.location.reload()
                })
                .catch(err => {
                    console.log(err);
                })
        },

        priceSum(a, b) {
            if (b == undefined) {
                return a
            }
            let s = a * (b / 100)
            return a - s

        },

        getOneProduct(id) {
           // this.product.price = this.priceSum(this.product.priceR, this.product.discount)
            axios.get(`http://localhost:3000/api/picture/product/${id}`)
                .then(res => {
                    this.product = res.data
                })
                .catch(err => {
                    console.log(err);
                })
        },

        async upLoadFiles() {
            const file = await document.getElementById('image').files[0]
            if (file) {
                const CLOUD_NAME = "dllc8aaxl";
                const PRESET_NAME = "NienLuan";
                const FOLDER_NAME = "NienLuan";
                const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

                const formData = new FormData();

                formData.append("upload_preset", PRESET_NAME);
                formData.append("folder", FOLDER_NAME);

                formData.append("file", file);

                const response = await axios.put(api, formData, {
                    headers: {
                        "content-type": "multipart/formdata"
                    },
                });
                if (response) {
                    this.product.image.id = response.data.public_id
                    this.product.image.url = response.data.secure_url
                }
            }
        },

        async updateProduct(id) {
            await this.upLoadFiles()
            const dataItem = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('Token')}`, // Đính kèm Token vào tiêu đề
                },
                product: this.product,
            }
            console.log(id);
            axios.put(`http://localhost:3000/api/picture/update/${id}`, dataItem)
                .then(() => {
                    alert('Cập nhật thành công')
                    window.location.reload()
                })
                .catch(err => {
                    console.log(err);
                })
        }
    },

    async created() {
        await this.fetchData();

        axios.get(`http://localhost:3000/api/thuonghieu/stored`)
            .then(res => {
                this.thuonghieu = res.data
            })
            .catch(err => {
                console.log(err);
            })
        axios.get(`http://localhost:3000/api/danhmuc/stored`)
            .then(res => {
                this.Danhmuc = res.data
            })
            .catch(err => {
                console.log(err);
            })

    },
}
</script >


<style scoped>
.select-TH {
    cursor: no-drop;
}
.container{
    position: relative;
    height: 800px;
}
.ip-price{
    display: none;
}

.img-product {
    margin-top: 10px;
    width: 80px;
    height: 80px;
}

.phantrang {
    text-align: center;
    display: inline-block;
    margin: auto;
}

.btn-i {
    display: inline-block;
    margin-left: 5px;
    padding: 8px;
    
}

.home {
    position: relative;
    border-radius: 15px;
    background-color: rgb(202, 198, 198);
    margin-top: 10px;
    width: 95%;
    margin-left: 2.5%;

}

.card {
    border-radius: 10px;
    position: relative;
    display: inline-block;
    width: 16rem;
    margin: 20px 10px 10px 10px;
    left: 12px;
    font-size: 15px;
    margin-left: 20px;
    background-color: rgb(199, 229, 235);

}

.card-img-top {
    border-radius: 10px;
    height: 280px;

}

.item-admin {

    margin-top: 20px;
    padding: 20px;
    width: 200px;
    background-color: aqua;
    border-radius: 5px;
    color: black;
    text-decoration: none;
}

.form-admin {
    margin-bottom: 20px;
    margin-top: 20px;
}

.section {
    position: relative;
    margin-left: 100px;

}

.Text-sp h3 {
    color: #fff;
    font-weight: 700;
}


.form-show-product {
    margin: auto;
    text-align: center;
    width: 100%;


}


.panel {
    font-family: 'Raleway', sans-serif;
    padding: 0;
    border: none;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.08);
}

.panel .panel-heading {
    background: #535353;
    padding: 15px;
    border-radius: 0;
}
.panel-heading {
    position: relative;
    margin-top: 20px;
}
.abc{
    position: relative;
    top: 15px;
}
.btn1{
    position: relative;
    width: 50px;
    height: 40px;
    top: -2px;
    text-align: center;
    border-radius: 5px;
}
.btn2{
    border-radius: 5px;
    position: relative;
    width: 50px;
    height: 40px;
    top: 3px;
    right:3px;
    text-align: center;
}

.panel .panel-heading .btn {
    color: #fff;
    background-color: #000;
    font-size: 14px;
    font-weight: 600;
    padding: 7px 15px;
    border: none;
    border-radius: 0;
    transition: all 0.3s ease 0s;
}

.panel .panel-heading .btn:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.panel .panel-heading .form-horizontal .form-group {
    margin: 0;
}

.panel .panel-heading .form-horizontal label {
    color: #fff;
    margin-right: 10px;
}

.panel .panel-heading .form-horizontal .form-control {
    display: inline-block;
    width: 80px;
    border: none;
    border-radius: 0;
}

.panel .panel-heading .form-horizontal .form-control:focus {
    box-shadow: none;
    border: none;
}

.panel .panel-body {
    padding: 0;
    border-radius: 0;
}

.panel .panel-body .table thead tr th {
    color: #fff;
    background: #8D8D8D;
    font-size: 17px;
    font-weight: 700;
    padding: 12px;
    border-bottom: none;
}

.panel .panel-body .table thead tr th:nth-of-type(1) {
    width: 1%;
}

.panel .panel-body .table thead tr th:nth-of-type(5) {
    width: 18%;
}

.panel .panel-body .table tbody tr td {
    color: #555;
    background: #fff;
    font-size: 17px;
    font-weight: 500;
    padding: 17px;
    vertical-align: middle;
    border-color: #e7e7e7;
}

.panel .panel-body .table tbody tr:nth-child(odd) td {
    background: #f5f5f5;
}

.panel .panel-body .table tbody .action-list {
    padding: 0;
    margin: 0;
    list-style: none;
}

.panel .panel-body .table tbody .action-list li {
    display: inline-block;
}

.panel .panel-body .table tbody .action-list li a {
    color: #fff;
    font-size: 13px;
    line-height: 28px;
    height: 28px;
    width: 33px;
    padding: 0;
    border-radius: 0;
    transition: all 0.3s ease 0s;
}

.panel .panel-body .table tbody .action-list li a:hover {
    box-shadow: 0 0 5px #ddd;
}

.panel .panel-footer {
    color: #fff;
    background: #535353;
    font-size: 16px;
    line-height: 33px;
    padding: 25px 15px;
    border-radius: 0;
}

.pagination {
    margin: 0;
}

.col-md-10 {
    margin: auto;
}


.pagination li a {
    color: #fff;
    background-color: rgba(0, 0, 0, 0.3);
    font-size: 15px;
    font-weight: 700;
    margin: 0 2px;
    border: none;
    border-radius: 0;
    transition: all 0.3s ease 0s;
}

.pagination li a:hover,
.pagination li a:focus,
.pagination li.active a {
    color: #fff;
    background-color: #000;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
}


.img-item {
    width: 60px;
    height: 60px;
    border-radius: 20%;
    border: 1px solid rgb(184, 184, 184);
}
</style>