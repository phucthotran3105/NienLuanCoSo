<template>
    <div>
        <div>
            <div>
                <!-- Button trigger modal -->
                <button type="button" class="btn item-admin" data-toggle="modal" data-target="#exampleModalCenter3">
                    Thêm Danh Mục
                    <!-- <i class="fas fa-plus"></i> -->
                </button>
                <!-- Modal -->
                <form method="post" @submit.prevent="create_DMuc()">
                    <div class="modal fade" id="exampleModalCenter3" tabindex="-1" role="dialog"
                        aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLongTitle">Thêm danh mục</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <label class="mr-3" for="t_hieu">Danh mục</label>
                                    <input type="text" placeholder="Nhập danh mục..." id="t_hieu"
                                        v-model="this.DMuc.nameDM">
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button class="btn btn-primary">Thêm</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            DMuc: {
                nameDM: ''
            }
        }
    },
    methods: {
        create_DMuc() {
            const dataItem = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('Token')}`, // Đính kèm Token vào tiêu đề
                },
                product: this.DMuc,
            }
            axios.post(`http://localhost:3000/api/danhmuc/add`, dataItem)
                .then(() => {
                    alert('Thêm danh mục thành công')
                    this.DMuc.nameDM = ''
                })
                .catch(err => {
                    console.log(err);
                    alert(err.response.data.mes)
                    this.DMuc.nameDM = ''
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