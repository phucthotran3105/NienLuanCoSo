<template>
  <div>
    <headerAdmin></headerAdmin>
    <div class="container">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">TT</th>
            <th scope="col">Tên sản phẩm</th>
            <th scope="col">Số lượng</th>
            <th scope="col">Số tiền</th>
            <th scope="col">Tổng số tiền</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in Temp" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.nameP }}</td>
            <td>{{ item.SL }}</td>
            <td>
              {{
                item.gia.toLocaleString("en-US", {
                  style: "currency",
                  currency: "VND",
                })
              }}
            </td>
            <td>
              {{
                (item.SL * item.gia).toLocaleString("en-US", {
                  style: "currency",
                  currency: "VND",
                })
              }}
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="4" style="text-align: right">
              <strong>Tổng cộng:</strong>
            </td>
            <td>
              {{
                totalAmount.toLocaleString("en-US", {
                  style: "currency",
                  currency: "VND",
                })
              }}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
import headerAdmin from "../../components/headerAdmin.vue";
import axios from "axios";

export default {
  components: {
    headerAdmin,
  },
  data() {
    return {
      Revenue: [],
      Temp: [],
      totalAmount: 0, // Thêm biến để theo dõi tổng số tiền
    };
  },
  async created() {
    try {
      let res = await axios.get(`http://localhost:3000/api/revenue/getAll`);
      this.Revenue = res.data;

      // Tạo một đối tượng để theo dõi số lượng theo tên sản phẩm
      const productQuantities = {};

      const promises = [];
      this.Revenue.forEach((item) => {
        item.revenue.forEach((revenueItem) => {
          promises.push(
            new Promise(async (resolve) => {
              let pd = await axios.get(
                `http://localhost:3000/api/picture/product/${revenueItem._id}`
              );

              // Kiểm tra xem tên sản phẩm đã tồn tại trong đối tượng hay chưa
              if (!productQuantities[pd.data.name]) {
                // Nếu chưa tồn tại, thêm vào đối tượng và đặt số lượng là 0
                productQuantities[pd.data.name] = {
                  SL: 0,
                  gia: pd.data.price,
                };
              }

              // Cộng số lượng vào đối tượng
              productQuantities[pd.data.name].SL += revenueItem.quantity;
              resolve();
            })
          );
        });
      });

      await Promise.all(promises);
      this.Temp = Object.keys(productQuantities).map((productName) => {
        return {
          nameP: productName,
          SL: productQuantities[productName].SL,
          gia: productQuantities[productName].gia,
        };
      });
      // Tính tổng số tiền
      this.totalAmount = this.Temp.reduce(
        (total, item) => total + item.SL * item.gia,
        0
      );
      console.log("All data processed.");
    } catch (error) {
      console.error("Error:", error);
    }
  },
};
</script>

<style></style>
