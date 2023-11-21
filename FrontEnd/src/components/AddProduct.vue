<template>
    <!-- Button trigger modal -->
    <button type="button" class="btn item-admin" data-toggle="modal" data-target="#exampleModal2">
        Thêm Sản Phẩm
        <!-- <i class="fas fa-plus"></i> -->
    </button>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-sp" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Thêm sản phẩm</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <main class="page payment-page">
                        <section class="payment-form dark">
                            <div class="container">
                                <div class="block-heading">
                                    <h2>THÊM SẢN PHẨM MỚI</h2>
                                    <p></p>
                                </div>
                                <form method="POST" @submit.prevent="addProduct">
                                    <div class="card-details">
                                        <h3 class="title">ADMIN</h3>
                                        <div class="row">
                                            <div class="form-group col-sm-7">
                                                <label for="card-holder">Thương hiệu</label><br>
                                                <div class="dropdown">
                                                    <div v-if="this.pictures.address != undefined"
                                                        class="form-control option-TH">{{ this.pictures.address }}</div>
                                                    <div v-if="this.pictures.address == undefined"
                                                        class="form-control option-TH">--Chọn thương hiệu--</div>
                                                    <div class="dropdown-content">
                                                        <div v-for="(item, index) in this.thuonghieu" :key="index">
                                                            <label class="mr-3 form-control form-TH" :for="index + 'as'">{{
                                                                item.nameTH }}</label>
                                                            <input class="input-TH" @click="copyID(item._id)" type="radio"
                                                                :id="index + 'as'" :value="`${item.nameTH}`"
                                                                v-model="this.pictures.address">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group col-sm-5">
                                                <label for="prices">Giá gốc</label>
                                                <div class="input-group expiration-date">
                                                    <input type="number" class="form-control" placeholder="VNĐ" id="prices"
                                                        v-model="this.pictures.priceR" required="true">
                                                </div>
                                            </div>
                                            <div class="form-group col-sm-5">
                                                <label for="prices">Giảm giá</label>
                                                <div class="input-group expiration-date">
                                                    <input type="number" max="100" min="0" class="form-control"
                                                        placeholder="Tỉ lệ %" id="prices" v-model="this.pictures.discount">
                                                </div>
                                            </div>
                                            <div class="form-group col-sm-5">
                                                <label for="prices">Giá tiền</label>
                                                <div class="input-group expiration-date">

                                                    <input type="radio" checked class="form-control ip-price"
                                                        placeholder="VNĐ"
                                                        :value="priceSum(this.pictures.priceR, this.pictures.discount)"
                                                        id="prices" v-model="this.pictures.price" required="true">
                                                    <div class="form-control">{{ priceSum(this.pictures.priceR,
                                                        this.pictures.discount) }}</div>

                                                </div>

                                            </div>
                                            <div class="form-group col-sm-8">
                                                <label for="names">Tên giày</label>
                                                <input type="text" class="form-control" id="names"
                                                    placeholder="Nhập tên giày..." v-model="this.pictures.name"
                                                    required="true">
                                            </div>
                                            <div class="form-group col-sm-4">
                                                <label for="cvc">Số lượng</label>
                                                <input id="cvc" min="1" type="number" class="form-control" placeholder="SL"
                                                    v-model="this.pictures.Quantity" required="true">
                                            </div>
                                            <div class="form-group col-sm-8">
                                                <label for="image">Ảnh minh họa</label>
                                                <input type="file" class="form-control" id="image" ref="imageInput"
                                                    required="true">
                                            </div>
                                            <div class="form-group col-sm-4">
                                                <label for="gen">Danh mục</label>
                                                <div v-for="(item, index) in this.Danhmuc" :key="index">
                                                    <input type="checkbox" :id="index + 'ascsc'" name="vehicle1"
                                                        @change="(e) => { inputChange(e, item._id, item.nameDM) }">
                                                    <label :for="index + 'ascsc'"> {{ item.nameDM }}</label><br>
                                                </div>
                                            </div>
                                            <div class="form-group col-sm-12">
                                                <button class="btn btn-primary btn-block">Thêm sản phẩm</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {

    data() {
        return {
            thuonghieuid: '',
            thuonghieu: [
                {
                    nameTH: ''
                }
            ],

            Danhmuc: [
                {
                    nameDM: ''
                }
            ],
            pictures: {
                gen: [],
                price: null,
                address: null,
                discount: null,
                priceR: null,
                name: null,
                Quantity: null,
                image: {
                    id: '',
                    url: ''
                }
            },
            lists: []
        };
    },

    created() {

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
    methods: {
        inputChange(e, id, name) {
            console.log(e.target.checked, id, name)
            if (this.lists.includes(id) == true && e.target.checked == false) {
                let newList = this.lists.filter((idDanhMuc) => {
                    return idDanhMuc != id
                })
                this.lists = newList
                let newname = this.pictures.gen.filter((nameDanhMuc) => {
                    return nameDanhMuc != name
                })
                this.pictures.gen = newname
            }
            if (this.lists.includes(id) == false && e.target.checked == true) {
                this.lists.push(id)
                this.pictures.gen.push(name)
            }

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

                const response = await axios.post(api, formData, {
                    headers: {
                        "content-type": "multipart/formdata"
                    },
                });
                if (response) {
                    this.pictures.image.id = response.data.public_id
                    this.pictures.image.url = response.data.secure_url
                }
            }
        },

        copyID(e) {
            console.log(e);
            this.thuonghieuid = e
        },

        async addProduct() {
            await this.upLoadFiles();
            this.pictures.price = this.priceSum(this.pictures.priceR, this.pictures.discount)
            const dataItem = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('Token')}`, // Đính kèm Token vào tiêu đề
                },
                product: this.pictures,
                idTH: this.thuonghieuid,
                listsDM: this.lists, 
                nameDanhMuc: this.pictures.gen
            }
            axios.post('http://localhost:3000/api/picture/add', dataItem)
                .then(res => {
                    window.alert("Thêm sản phẩm mới thành công")
                    // this.pictures.gen = "";
                    this.pictures.address = "";
                    this.pictures.price = "";
                    this.pictures.name = "";
                    this.pictures.priceR = "";
                    this.pictures.discount = "";
                    this.pictures.image = "";

                }).catch(err => console.log(err))
        },

        priceSum(a, b) {
            if (b == undefined) {
                return a
            }
            let s = a * (b / 100)
            return a - s

        }


    }

}
</script>

<style scoped>
.ip-price {
    display: none;
}

.dropdown {
    position: relative;
    display: inline-block;
}

.dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    padding: 12px 16px;
    z-index: 1;
}

.dropdown:hover .dropdown-content {
    display: block;
}

.input-TH {
    display: none;
}

.option-TH {
    /* display: block; */
    padding-left: 3rem;
    padding-right: 3rem;
    cursor: pointer;
    text-align: start;

}

.form-TH {
    cursor: pointer;
}

.modal-dialog {
    max-width: 50%;
    margin: 1.75rem auto;
}

.add-note {
    margin: auto;
}

.item-admin {
    /* margin-top: -18px; */
    position: relative;
    margin-left: 760px;
    padding: 5px;
    background-color: rgb(69, 63, 63);
    border-radius: 5px;
    color: rgb(255, 255, 255);
    text-decoration: none;
    margin-top: -40px;
    border: 1px solid white;
}

.item-admin:hover {
    background-color: aqua;
    color: black;
}




.payment-form {
    padding-bottom: 50px;
    font-family: 'Montserrat', sans-serif;
}

.payment-form.dark {
    background-color: #f6f6f6;
}

.payment-form .content {
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.075);
    background-color: white;
}

.payment-form .block-heading {
    padding-top: 20px;
    margin-bottom: 40px;
    text-align: center;
}

.payment-form .block-heading p {
    text-align: center;
    max-width: 420px;
    margin: auto;
    opacity: 0.7;
}

.payment-form.dark .block-heading p {
    opacity: 0.8;
}

.payment-form .block-heading h1,
.payment-form .block-heading h2,
.payment-form .block-heading h3 {
    margin-bottom: 1.2rem;
    color: #3b99e0;
}

.payment-form form {
    border-top: 2px solid #5ea4f3;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.075);
    background-color: #ffffff;
    padding: 0;
    max-width: 600px;
    margin: auto;
}

.payment-form .title {
    font-size: 1em;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    margin-bottom: 0.8em;
    font-weight: 600;
    padding-bottom: 8px;
}

.payment-form .products {
    background-color: #f7fbff;
    padding: 25px;
}

.payment-form .products .item {
    margin-bottom: 1em;
}

.payment-form .products .item-name {
    font-weight: 600;
    font-size: 0.9em;
}

.payment-form .products .item-description {
    font-size: 0.8em;
    opacity: 0.6;
}

.payment-form .products .item p {
    margin-bottom: 0.2em;
}

.payment-form .products .price {
    float: right;
    font-weight: 600;
    font-size: 0.9em;
}

.payment-form .products .total {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    margin-top: 10px;
    padding-top: 19px;
    font-weight: 600;
    line-height: 1;
}

.payment-form .card-details {
    padding: 25px 25px 15px;
}

.payment-form .card-details label {
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 15px;
    color: #79818a;
    text-transform: uppercase;
}

.payment-form .card-details button {
    margin-top: 0.6em;
    padding: 12px 0;
    font-weight: 600;
}

.payment-form .date-separator {
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 5px;
}

@media (min-width: 576px) {
    .payment-form .title {
        font-size: 1.2em;
    }

    .payment-form .products {
        padding: 40px;
    }

    .payment-form .products .item-name {
        font-size: 1em;
    }

    .payment-form .products .price {
        font-size: 1em;
    }

    .payment-form .card-details {
        padding: 40px 40px 30px;
    }

    .payment-form .card-details button {
        margin-top: 2em;
    }
}
</style>