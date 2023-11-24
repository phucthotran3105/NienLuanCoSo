<template>
    <div>
        <!-- Button trigger modal -->
    <button type="button" class="btn item-admin " data-toggle="modal" data-target="#exampleModal1">
        Thêm Thương Hiệu
    </button>
    <!-- Modal -->

    <div class="modal fade" id="exampleModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel1"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <form method="post" @submit.prevent="addThuongHieu()">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel1">Thêm thương hiệu</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <label class="mr-3" for="th">Thương hiệu</label>
                        <input type="text" placeholder="Nike, Adidas,..." id="th" v-model="this.ThuongHieu.nameTH">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
                        <button class="btn btn-primary">Thêm</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            ThuongHieu: {
                nameTH: ''
            }

        }
    },
    methods: {
        addThuongHieu() {
            const dataItem = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('Token')}`, // Đính kèm Token vào tiêu đề
                },
                product: this.ThuongHieu,
            }
            console.log(dataItem);
            axios.post(`http://localhost:3000/api/thuonghieu/add`, dataItem)
                .then(() => {
                    alert('Thêm thành công thương hiệu mới')
                    this.ThuongHieu.nameTH = ''
                })
                .catch(err => {
                    console.log(err);
                    alert(err.response.data.mes)
                    this.ThuongHieu.nameTH = ''
                })
        }
    }
}
</script>

<style scoped>
.item-admin {
    position: relative;
    left: 150px;
    top: -100px;
    margin-top: 2px;
    padding: 5px;
    background-color: rgb(69, 63, 63);
    border-radius: 5px;
    color: rgb(255, 255, 255);
    text-decoration: none;
    border:1px solid white;
}
.item-admin:hover {
    background-color: aqua;
    color: black;
}
</style>