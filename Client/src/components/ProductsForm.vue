<template>
  <div class="container-product">
    <div class="header-product">PRODUCTS IN CAMBODIA</div>
    <div class="box">
      <div class="title">
        <div v-for="i in numofCategory" :key="i" style="margin: 0 0 20px 10px">
          <img
            v-bind:src="titleData.data[parseInt(i - 1)].imageURL"
            alt=""
            style="width: 10px"
          />
          <span style="margin-left: 2%">
            {{ titleData.data[parseInt(i - 1)].name }}
          </span>
          <div v-for="j in numofSub[parseInt(i - 1)]" :key="j">
            <ul>
              <li
                style="
                  list-style-type: none;
                  cursor: pointer;
                  padding: 5px 0 0 0px;
                "
              >
                -
                <router-link
                  @click="subCate(titleData.data[i - 1].item[j - 1]._id, i)"
                  v-bind:to="
                    '?' +
                    titleData.data[parseInt(i - 1)].item[parseInt(j - 1)].name
                  "
                  >{{
                    titleData.data[parseInt(i - 1)].item[parseInt(j - 1)].name
                  }}
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="items">
        <div class="items-card" v-for="k in numofProduct" :key="k">
          <img
            v-bind:src="
              'src/assets/uploads/' + titleProduct.data[k - 1].imageURL
            "
            alt=""
            style="width: 200px; height: 100px"
          />
          <h4 style="padding: 4px 0 8px 0; font-weight: 700">
            {{ titleProduct.data[k - 1].name }}
          </h4>
          <table style="width: 100%; text-align: center">
            <tr v-for="n in numShop[k - 1]" :key="n">
              <td>{{ shop[parseInt(k - 1)][parseInt(n - 1)].source }}</td>
              <td>{{ shop[parseInt(k - 1)][parseInt(n - 1)].price }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductsForm",
  data() {
    return {
      titleData: null,
      titleProduct: null,
      numofCategory: 0,
      category: 0,
      numofSub: [],
      numofProduct: 0,
      shop: [],
      numShop: [],
    };
  },
  async mounted() {
    // POST request using fetch with async/await
    const requestOptions = {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    };
    const response = await fetch(
      "http://localhost:3001/category/item",
      requestOptions
    );
    const data = await response.json();
    this.titleData = data;
    // console.log(this.titleData);
    this.numofCategory = this.titleData.data.length;
    for (var i = 0; i < this.numofCategory; i++) {
      this.numofSub[i] = this.titleData.data[i].item.length;
    }
    this.subCate(this.titleData.data[0].item[0]._id, "0");
  },
  methods: {
    async subCate(number, category) {
      // console.log(number);
      this.category = category - 1;

      const requestItems = {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemId: number,
        }),
      };
      const responseItem = await fetch(
        "http://localhost:3001/product/each-item",
        requestItems
      );
      const dataItem = await responseItem.json();
      this.titleProduct = dataItem;
      // console.log(this.titleProduct);
      this.numofProduct = this.titleProduct.data.length;
      // console.log(this.numofProduct);
      for (let j = 0; j < this.titleProduct.data.length; j++) {
        this.shop[j] = this.titleProduct.data[j].shop;
        this.numShop[j] = this.titleProduct.data[j].shop.length;
      }
      // console.log(this.shop);
    },
  },
};
</script>

<style>
header {
  display: none;
}
body {
  margin: 0;
  padding: 0;
  font-size: 18px;
  display: block;
  color: rgba(91, 91, 91, 0.7);
  background-color: rgba(247, 247, 247);
}
#app {
  padding: 0;
  margin: 0;
}
.container-product {
  margin: 0 0 0 20vw;
  height: 100%;
}
.container-product .header-product {
  background-color: rgba(139, 157, 195, 0.8);
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  padding: 10px 0;
}

.container-product .box {
  display: flex;
  width: 100vw;
}

.box .title {
  background-color: rgba(223, 227, 238);
  border-radius: 3px;
  margin: 0.3% 0 0 0;
  width: 19%;
  height: 90vh;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
    rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
    rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
}
.box .items {
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  /* height: auto; */
  max-height: 660px;
  overflow-y: scroll;
  margin: 0 0 0 1%;
}
.items-card {
  background-color: rgba(255, 255, 255);
  width: 23%;
  margin: 1%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 18px 0 10px 0;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 8px;
  height: 300px;
}

a {
  color: rgba(91, 91, 91, 0.7);
}
a:hover {
  background-color: rgba(91, 91, 91, 0.1);
}
</style>
