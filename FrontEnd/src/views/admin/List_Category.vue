<template>
    <headerAdmin></headerAdmin>
    <div class="bodys">
        <div class="headanhmuc">
            <h3 class="abc">DANH SÁCH DANH MỤC</h3>
        </div>
        <table class="table container mt-3">
            <thead class="thead-light">
                <tr>
                    <th scope="col">TT</th>
                    <th scope="col">Tên danh mục</th>
                    <th scope="col">Số lượng sản phẩm</th>
                    <!-- <th scope="col">Sửa</th> -->
                    <th scope="col">Xóa</th>
                    <th><CreateProductPortfolio></CreateProductPortfolio></th>
                </tr>
            </thead>
            <tbody class="text-center" v-if="this.danhmuc.length == 0">
                <tr>
                    <td colspan="5">
                        <h3>
                            Danh sách rỗng
                        </h3>
                    </td>
                </tr>
            </tbody>
            <tbody v-for="(item, index) in this.danhmuc" :key="index">
                <tr>
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ item.nameDM }}</td>
                    <td>{{ item.idProduct.length }}</td>
                    <!-- <td><i class="fas fa-edit edit-i"></i></td> -->
                    <td><i @click="e => { deleteTH(item._id) }" class="fas fa-trash-alt delete-i"></i></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import headerAdmin from '../../components/headerAdmin.vue';
import CreateProductPortfolio from '../../components/CreateProductPortfolio.vue';
import axios from 'axios';
export default {
    components: {
        headerAdmin,
        CreateProductPortfolio
    },
    data() {
        return {
            danhmuc: [],
            id: ''

        }
    },
    created() {
        axios.get(`http://localhost:3000/api/danhmuc/stored`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('Token')}`, // Đính kèm Token vào tiêu đề
            }
        })
            .then(res => {
                this.danhmuc = res.data
            })
            .catch(err => {
                console.log(err);
            })
    },

    methods: {
        copyID(e) {
            this.id = e
            console.log(e);
        },

        deleteTH(e) {
            axios.delete(`http://localhost:3000/api/danhmuc/delete/${e}`)
                .then(() => {
                    alert('Xóa danh mục thành công')
                    window.location.reload()
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }
}
</script>
<style scoped>
.bodys {
    display: flex;
    height: 700px;
    flex-direction: column;
    align-items: center; /* Căn giữa theo chiều ngang */

}
.headanhmuc{
    text-align: center;
    position: relative;
    height: 100px;
    width: 1150px;
    background-color: #535353;
    margin-top: 40px;
    color: white;
}

.delete-i {
    color: red;
    cursor: pointer;
}

.abc{
    position: relative;
    top: 30px;
}
.table{
    position: relative;
    border: 2px solid rgb(213, 213, 213);

}
</style>