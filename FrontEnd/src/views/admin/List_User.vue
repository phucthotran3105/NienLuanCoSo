<template>
    <headerAdmin></headerAdmin>
    <div class="bodys">  
        <div class="headanhmuc">
            <h3 class="abc">DANH SÁCH NGƯỜI DÙNG</h3>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th>TT</th>
                    <th>Tài khoản</th>
                    <th>Tên</th>
                    <th>Email</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="User.length < 1">
                    <th colspan="8" class="text-center">
                        <h3>
                            Không có người dùng nào
                        </h3>
                    </th>
                </tr>
                <tr v-for="(item, index) in paginatedData" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.userName }}</td>
                    <td>{{ item.fullName }}</td>
                    <td>{{ item.email }}</td>
                </tr>
                <tr>
                    <th colspan="2">
                        <h6>Tổng số: <b>{{ User.length }}</b> người dùng</h6>
                    </th>
                </tr>
                <tr>
                    <th colspan="8" class="text-center">
                        <div class="btn-pt">
                            <div class="phantrang">
                                <button class="btn" @click="prevPage" :disabled="currentPage === 1">Trang
                                    Trước</button>
                                <span>Trang {{ currentPage }} / {{ pageCount }}</span>
                                <button class="btn" @click="nextPage" :disabled="currentPage === pageCount">Trang
                                    Sau</button>
                            </div>
                        </div>
                    </th>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import headerAdmin from '../../components/headerAdmin.vue'
import axios from 'axios'
export default {
    components: {
        headerAdmin
    },
    data() {
        return {
            User: [],
            pageSize: 10, // Số lượng mục trên mỗi trang
            currentPage: 1, // Trang hiện tại
        }
    },
    async created() {
        let res = await axios.get(`http://localhost:3000/api/user`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('Token')}`, // Đính kèm Token vào tiêu đề
            }
        })
        let A = []
        for (let index = 0; index < res.data.length; index++) {
            if (res.data[index].admin == false) {
                A.push(res.data[index])
            }
        }
        this.User = A



    },
    mounted() {
        // Simulate fetching data from an API
        // Mô phỏng việc lấy dữ liệu từ API
        setTimeout(() => {
            this.User
        }, 1000);
    },
    computed: {
        pageCount() {
            return Math.ceil(this.User.length / this.pageSize);
        },
        paginatedData() {
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            return this.User.slice(startIndex, endIndex);
        },
    },

    methods: {
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
.abc{
    position: relative;
    top: 30px;
}
.table{
    text-align: center;
    width: 1150px;
    border: 2px solid rgb(212, 212, 212);
    margin-top: 10px;
    left: -225px;
}
</style>