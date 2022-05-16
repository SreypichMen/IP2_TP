<template>
  <div class="container-dashboard">
    <!-- header-part -->
    <div class="header-product">
      <div>ADMIN DASHBOARD</div>
      <div>PRODUCT IN CAMBODIA</div>
    </div>

    <!-- login-part -->
    <div class="log-in" v-show="show != false">
      <div class="container">
        <div class="log_in">
          <div><img src="/src/assets/pic.png" alt="" /></div>
          <label for="email">Username</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Input username"
            v-model="email"
          />
          <label for="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Input password"
            v-model="password"
            @keyup.enter="created()"
          />
          <button type="submit" @click="logged()" id="btn_login">Log In</button>
          <div
            v-text="msg"
            v-bind:style="{ backgroundColor: input_color }"
          ></div>
        </div>
      </div>
    </div>

    <!-- table of data-part -->
    <div class="items" v-show="show != true">
      <div class="item-1">
        <ul>
          <li>
            <router-link to="?category" @click="category()"
              >Category</router-link
            >
          </li>
          <li>
            <router-link
              to="?item"
              @click="items()"
              style="padding: 0.5vh 3.5vw"
              >Items</router-link
            >
          </li>
          <li>
            <router-link to="?product" @click="products()"
              >Products</router-link
            >
          </li>
        </ul>
      </div>

      <!-- table-part -->
      <div class="item-2" v-show="tabledisplay != false">
        <div
          style="display: flex; justify-content: space-between; margin: 0 1vw"
        >
          <div>{{ titleData.message }}</div>
          <button @click="addBtn(page)">Add new</button>
        </div>

        <!-- category-table -->
        <div v-show="categoryTable != false">
          <table>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>imageURL</th>
              <th>action</th>
            </tr>

            <tr v-for="i in numOfCate" :key="i">
              <td>{{ titleData.data[i - 1].name }}</td>
              <td>{{ titleData.data[i - 1].description }}</td>
              <td>{{ titleData.data[i - 1].imageURL }}</td>
              <td>
                <button @click="editBtn(`${titleData.data[i - 1]._id}`)">
                  Edit</button
                ><button @click="deleteBtn(`${titleData.data[i - 1]._id}`)">
                  Delete
                </button>
              </td>
            </tr>
          </table>
        </div>

        <!-- item-table -->
        <div v-show="itemTable != false">
          <table>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>action</th>
            </tr>

            <tr v-for="i in numOfCate" :key="i">
              <td>{{ titleData.data[i - 1].name }}</td>
              <td>{{ titleData.data[i - 1].description }}</td>
              <td>{{ titleData.data[i - 1].category }}</td>
              <td>
                <button @click="editBtn(`${titleData.data[i - 1]._id}`)">
                  Edit</button
                ><button @click="deleteBtn(`${titleData.data[i - 1]._id}`)">
                  Delete
                </button>
              </td>
            </tr>
          </table>
        </div>

        <!-- product-table -->
        <div v-show="productTable != false">
          <table>
            <tr>
              <th>Name</th>
              <th>ImageURL</th>
              <th>Item</th>
              <th>action</th>
            </tr>

            <tr v-for="i in numOfCate" :key="i">
              <td>{{ titleData.data[i - 1].name }}</td>
              <td>{{ titleData.data[i - 1].imageURL }}</td>
              <td>{{ titleData.data[i - 1].item }}</td>
              <td>
                <button @click="editBtn(`${titleData.data[i - 1]._id}`)">
                  Edit</button
                ><button @click="deleteBtn(`${titleData.data[i - 1]._id}`)">
                  Delete
                </button>
              </td>
            </tr>
          </table>
        </div>
      </div>

      <!-- edit-product which is show the detail info -->
      <div v-show="editProduct != false" class="editProd">
        <h3 style="margin-left: 55px">Product details</h3>
        <div
          style="
            display: flex;
            flex-direction: row;
            margin-left: 100px;
            margin-bottom: 20px;
          "
        >
          <img :src="imageLINK" />
          <div style="margin-left: 1vw" v-for="j in numofproduct" :key="j">
            <div>Name: {{ productData.data.name }}</div>
            <div>Item: {{ productItem.data.name }}</div>
            <div>Category: {{ productCategory.data.name }}</div>
          </div>
        </div>
        <hr />
        <div
          style="
            margin: 1% 5% 0 5%;
            display: flex;
            justify-content: space-between;
          "
        >
          <h3>Product prices</h3>
          <button @click="addNewPrice()">Add new price</button>
        </div>
        <table>
          <tr>
            <th>Price</th>
            <th>Source</th>
            <th>action</th>
          </tr>
          <tr v-if="numofprice == 0">
            <td>No data</td>
            <td>No data</td>
            <td>No data</td>
          </tr>

          <tr v-for="i in numofprice" :key="i">
            <td>{{ productData.data.shop[i - 1].price }}</td>
            <td>{{ productData.data.shop[i - 1].source }}</td>
            <td>
              <button
                @click="
                  editPrice(
                    `${i}`,
                    `${productData.data._id}`,
                    `${productData.data.shop[i - 1]._id}`
                  )
                "
              >
                Edit</button
              ><button
                @click="
                  deletePrice(
                    `${productData.data._id}`,
                    `${productData.data.shop[i - 1]._id}`
                  )
                "
              >
                Delete
              </button>
            </td>
          </tr>
        </table>
        <!-- <button @click="cancelEdit()">Cancel</button> -->
      </div>

      <!-- add data of category and item -->
      <div v-show="cate != false" class="addData">
        <div class="add_container">
          <div v-if="page == 1">
            <div>Create new category</div>
            <input
              type="text"
              name="category"
              placeholder="name"
              v-model="input1"
            />
            <input
              type="text"
              name="item"
              placeholder="description"
              v-model="input2"
            />
            <input
              type="url"
              name="product"
              placeholder="imageURL"
              v-model="input3"
            />
          </div>
          <div v-else-if="page == 2">
            <div>Create new item</div>
            <input
              type="text"
              name="item"
              placeholder="name"
              v-model="input1"
            />
            <input
              type="text"
              name="decription"
              placeholder="description"
              v-model="input2"
            />
            <input
              type="url"
              name="categoryID"
              placeholder="categoryID"
              v-model="input3"
            />
          </div>
          <div v-else-if="page == 3">
            <div>Create new product</div>
            <input
              type="file"
              name="imageURL"
              id="fileimg"
              accept="image/*"
              @change="imageData"
            />
            <input
              type="text"
              name="product"
              placeholder="name"
              v-model="input1"
            />
            <!-- <input
              type="text"
              name="image"
              placeholder="imageURL"
              v-model="input2"
            /> -->
            <input
              type="url"
              name="itemID"
              placeholder="itemID"
              v-model="input3"
            />
          </div>
          <button @click="closeAdd(page)">Cancel</button>
          <button @click="createData(page)">Create</button>
        </div>
      </div>

      <!--edit price -->
      <div v-show="editPricedata != false" class="addData">
        <div class="add_container">
          <div>
            <div>Edit price data</div>
            <input
              type="text"
              name="price"
              placeholder="price"
              v-model="input1"
            />
            <input
              type="text"
              name="source"
              placeholder="source"
              v-model="input2"
            />
          </div>
          <button @click="cancelEditPrice()">Cancel</button>
          <button @click="editPriceData()">Confirm</button>
        </div>
      </div>
      <div v-show="priceTable != false" class="addData">
        <div class="add_container">
          <div>
            <div>Create new price</div>
            <input
              type="text"
              name="price"
              placeholder="price"
              v-model="input1"
            />
            <input
              type="text"
              name="source"
              placeholder="source"
              v-model="input2"
            />
          </div>
          <button @click="cancelAddPrice()">Cancel</button>
          <button @click="addPrice()">Add</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      email: "",
      password: "",
      show: true,
      tabledisplay: true,
      msg: "",
      input_color: "",
      imageLINK: "",
      titleData: [],
      productData: [],
      productItem: [],
      productCategory: [],
      numOfCate: 0,
      numofproduct: 0,
      numofprice: 0,
      page: 0,
      cate: false,
      editProduct: false,
      categoryTable: false,
      itemTable: false,
      productTable: false,
      priceTable: false,
      editPricedata: false,
      productId: "",
      priceId: "",
      input1: "",
      input2: "",
      input3: "",
      imageURL: null,
    };
  },
  async mounted() {
    // POST request using fetch with async/await
    const requestOptions = {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(
      "http://localhost:3001/category/all",
      requestOptions
    );
    // const product = await fetch(
    //   "http://localhost:3001/product/id/6247762f802a20af6b94a71e",
    //   requestOptions
    // );
    const data = await response.json();
    // const productdata = await product.json();
    this.titleData = data;
    // this.productData = productdata;
    this.numOfCate = this.titleData.data.length;
    this.categoryTable = true;
    this.itemTable = false;
    this.productTable = false;
    this.page = 1;
    // console.log(this.productData);
    // console.log(this.numOfCate);
  },
  methods: {
    //delete data of product
    deleteBtn(id) {
      this.deleteData(id);
    },

    //delete price of shop
    deletePrice(pId, id) {
      this.deletePriceData(pId, id);
    },

    async editPrice(index, pId, id) {
      this.editPricedata = true;
      this.input1 = this.productData.data.shop[index - 1].price;
      this.input2 = this.productData.data.shop[index - 1].source;
      // alert(pId);
      // alert(id);
      this.productId = pId;
      this.priceId = id;
    },
    cancelEditPrice() {
      this.editPricedata = false;
      this.input1 = "";
      this.input2 = "";
    },
    async editPriceData() {
      const requestOptions = {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: this.priceId,
          product: this.productId,
          price: this.input1,
          source: this.input2,
        }),
      };
      const response = await fetch(
        `http://localhost:3001/price/update`,
        requestOptions
      );
      await response.json();
      alert("Edit successfull");
      this.editPricedata = false;
      this.input1 = "";
      this.input2 = "";
      // POST request using fetch with async/await
      const requestOptions_1 = {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: this.productId,
        }),
      };
      const response_1 = await fetch(
        `http://localhost:3001/product/each-shop`,
        requestOptions_1
      );
      const data = await response_1.json();
      this.productData = data;
      this.numofprice = this.productData.data.shop.length;
    },
    //edit data product
    async editBtn(id) {
      this.numofprice = 0;
      // POST request using fetch with async/await
      const requestOptions = {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: id,
        }),
      };
      const response = await fetch(
        `http://localhost:3001/product/each-shop`,
        requestOptions
      );
      const data = await response.json();
      this.productData = data;
      const requestOptions1 = {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      };
      const item = await fetch(
        `http://localhost:3001/item/id/${this.productData.data.item}`,
        requestOptions1
      );
      this.productItem = await item.json();

      const category = await fetch(
        `http://localhost:3001/category/id/${this.productItem.data.category}`,
        requestOptions1
      );
      this.productCategory = await category.json();
      // console.log("Item: ", this.productItem);
      this.imageLINK = "src/assets/uploads/" + this.productData.data.imageURL;
      this.numofproduct = 1;
      this.numofprice = this.productData.data.shop.length;
      // console.log(this.productData);
      if (this.page == 3) {
        this.editProduct = true;
        this.tabledisplay = false;
      }
    },
    cancelEdit() {
      this.editProduct = false;
      this.tabledisplay = true;
    },
    addNewPrice() {
      // alert(this.productData.data._id);
      this.priceTable = true;
    },
    cancelAddPrice() {
      this.priceTable = false;
    },
    async addPrice() {
      const requestOptions = {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: this.productData.data._id,
          price: this.input1,
          source: this.input2,
        }),
      };
      const response = await fetch(
        "http://localhost:3001/price/create",
        requestOptions
      );
      await response.json();
      // POST request using fetch with async/await
      const requestOptions_1 = {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: this.productData.data._id,
        }),
      };
      const response_1 = await fetch(
        `http://localhost:3001/product/each-shop`,
        requestOptions_1
      );
      const data = await response_1.json();
      this.productData = data;
      this.numofprice = this.productData.data.shop.length;
      // this.productData.data.shop[this.numofprice] = {
      //   product: this.productData.data._id,
      //   price: this.input1,
      //   source: this.input2,
      // };
      // this.numofprice = this.productData.data.shop.length;
      alert("Congrate add new price succesfully!");
      this.priceTable = false;
    },

    //log in daskboard
    logged() {
      if (!this.email || !this.password) {
        this.msg = "Username or password cannot empty.";
        this.input_color = "rgba(240,0,0,.6)";
      } else {
        if (this.email == "admin" && this.password == "12345") {
          this.show = false;
        } else {
          this.msg = "Username or password is incorrect.";
          this.input_color = "rgba(240,0,0,.6)";
        }
      }
    },

    //load category data
    async category() {
      // POST request using fetch with async/await
      const requestOptions = {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      };
      const response = await fetch(
        "http://localhost:3001/category/all",
        requestOptions
      );
      const data = await response.json();
      this.titleData = data;
      this.numOfCate = this.titleData.data.length;
      this.categoryTable = true;
      this.itemTable = false;
      this.productTable = false;
      this.editProduct = false;
      this.tabledisplay = true;
      this.page = 1;
      // console.log(this.titleData);
      // console.log(this.numOfCate);
    },

    //load item data
    async items() {
      // POST request using fetch with async/await
      const requestOptions = {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      };
      const response = await fetch(
        "http://localhost:3001/item/all",
        requestOptions
      );
      const data = await response.json();
      // console.log(data);
      this.titleData = data;
      this.numOfCate = this.titleData.data.length;
      this.categoryTable = false;
      this.itemTable = true;
      this.productTable = false;
      this.editProduct = false;
      this.tabledisplay = true;
      this.page = 2;
      // console.log(this.titleData);
      // console.log(this.numOfCate);
    },

    //load product data
    async products() {
      // POST request using fetch with async/await
      const requestOptions = {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      };
      const response = await fetch(
        "http://localhost:3001/product/all",
        requestOptions
      );
      const data = await response.json();
      this.titleData = data;
      // console.log(this.titleData.data);

      this.numOfCate = this.titleData.data.length;
      this.categoryTable = false;
      this.itemTable = false;
      this.productTable = true;
      this.editProduct = false;
      this.tabledisplay = true;
      this.page = 3;
      // console.log(this.numOfCate);
    },

    //Add new button
    async addBtn(num) {
      this.cate = true;
      this.page = num;
    },
    //close add new button
    closeAdd(page) {
      this.cate = false;
    },

    //create Category,Item,Product to database
    async createData(numofPage) {
      if (numofPage == 1) {
        const requestOptions = {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: this.input1,
            description: this.input2,
            imageURL: this.input3,
          }),
        };
        const response = await fetch(
          "http://localhost:3001/category/add",
          requestOptions
        );
        await response.json();
        this.titleData.data[this.numOfCate] = {
          name: this.input1,
          description: this.input2,
          imageURL: this.input3,
        };
        // console.log(this.titleData.data);
        this.numOfCate = this.titleData.data.length;
        alert("Create successful");
      } else if (numofPage == 2) {
        const requestOptions = {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: this.input1,
            description: this.input2,
            category: this.input3,
          }),
        };
        const response = await fetch(
          "http://localhost:3001/item/add",
          requestOptions
        );
        await response.json();
        this.titleData.data[this.numOfCate] = {
          name: this.input1,
          description: this.input2,
          category: this.input3,
        };
        // console.log(this.titleData.data);
        this.numOfCate = this.titleData.data.length;
        alert("Create successful");
      } else if (numofPage == 3) {
        // console.log(this.imageURL);
        const formData = new FormData();
        formData.append("name", this.input1);
        formData.append("imageFile", this.imageURL);
        formData.append("item", this.input3);
        // for (let [name, value] of formData) {
        //   console.log(`${name} = ${value}`); // key1 = value1, then key2 = value2
        // }

        const requestOptions = {
          method: "POST",
          body: formData,
          credentials: "include",
        };
        const response = await fetch(
          "http://localhost:3001/product/add",
          requestOptions
        );
        await response.json();
        this.products();
        this.formData = "";
        alert("Create successful");
      }

      this.input1 = "";
      this.input2 = "";
      this.input3 = "";
    },

    //delete Category, Item, Product
    async deleteData(idofData) {
      if (this.page == 1) {
        const requestOptions = {
          method: "DELETE",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            _id: idofData,
          }),
        };
        const response = await fetch(
          "http://localhost:3001/category/remove",
          requestOptions
        );
        await response.json();
        this.category();
        alert("Delete successful");
      } else if (this.page == 2) {
        const requestOptions = {
          method: "DELETE",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            _id: idofData,
          }),
        };
        const response = await fetch(
          "http://localhost:3001/item/delete",
          requestOptions
        );
        await response.json();
        this.items();
        alert("Delete successful");
      } else if (this.page == 3) {
        const requestOptions = {
          method: "DELETE",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            _id: idofData,
          }),
        };
        const response = await fetch(
          "http://localhost:3001/product/delete",
          requestOptions
        );
        await response.json();
        this.products();
        alert("Delete successful");
      }
    },

    //delete price of product
    async deletePriceData(pId, id) {
      const requestOptions = {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: id,
        }),
      };
      const response = await fetch(
        "http://localhost:3001/price/delete",
        requestOptions
      );
      await response.json();
      // POST request using fetch with async/await
      const requestOptions_1 = {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: pId,
        }),
      };
      const response_1 = await fetch(
        `http://localhost:3001/product/each-shop`,
        requestOptions_1
      );
      const data = await response_1.json();
      this.productData = data;
      this.numofprice = this.productData.data.shop.length;
      alert("Delete successful");
    },

    //Image data from user upload
    imageData(e) {
      this.imageURL = e.target.files[0];
    },
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-size: 18px;
  display: block;
  color: rgba(91, 91, 91, 0.7);
  background-color: rgba(247, 247, 247);
}
header {
  display: none;
}
#app {
  padding: 0;
  margin: 0;
}
.container-dashboard {
  width: 100%;
}
.container-dashboard .header-product {
  background-color: rgba(139, 157, 195, 0.8);
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  padding: 10px 5vw;
  width: 99vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.container-dashboard .log-in {
  height: 92.5vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
.log_in {
  background-color: rgba(170, 170, 170, 0.8);
  width: 27vw;
  padding: 1rem;
  border-radius: 2px;
  box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 6px;
}

.log_in > div {
  text-align: center;
}

.log_in > label {
  color: rgb(255, 255, 255);
}

.log_in > div > img {
  width: 13rem;
  margin-bottom: 0.78rem;
}

.log_in > input {
  background-color: #fafafa;
  width: 100%;
  border: 2px solid #aaa;
  border-radius: 4px;
  margin: 8px 0;
  outline: none;
  padding: 8px;
  box-sizing: border-box;
  transition: 0.3s;
}

.log_in > input:focus {
  border-color: dodgerBlue;
  box-shadow: 0 0 8px 0 dodgerBlue;
}

.container2 {
  margin: -45rem 0 0 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 93vw;
  height: 93vh;
}

#btn_login {
  cursor: pointer;
  background-color: rgb(61, 133, 198);
  color: white;
  border-style: outset;
  border-color: #0066a2;
  height: 2rem;
  width: 4rem;
  font: sans-serif;
  text-shadow: none;
  margin-top: 0.645rem;
  border-radius: 0.165rem;
  margin: 0.5rem 0 0.67rem 0;
}

.container-dashboard .items {
  display: flex;
  width: 99vw;
}
.items .item-1 {
  width: 10%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 92.5vh;
  margin: 10px;
  border-radius: 6px;
  background-color: rgba(173, 185, 211, 0.3);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  position: relative;
}
.items .item-2 {
  width: 90%;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  margin-top: 10px;
  border-radius: 5px;
  background-color: #fafafa;
  height: auto;
}
ul {
  width: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  flex-direction: column;
}
li {
  list-style-type: none;
}
li > a {
  border-bottom: 1px solid grey;

  padding: 0.5vh 2.7vw;
}
li > a:focus {
  background-color: rgb(24, 54, 33, 0.8);
}

table {
  font-family: arial, sans-serif;
  border-collapse: separate;
  font-size: 16px;
  width: 90%;
  margin: 1% 5% 0 5%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}

.addData {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.44);
  margin-top: -7vh;
  width: 100vw;
  height: 100vh;
}

.add_container {
  background: #aaa;
  padding: 3vw 10vh;
  border-radius: 7px;
}

.add_container > div > input {
  background-color: #fafafa;
  width: 100%;
  border: 2px solid #aaa;
  border-radius: 4px;
  margin: 8px 0;
  outline: none;
  padding: 8px;
  box-sizing: border-box;
  transition: 0.3s;
}

.add_container > div > input:focus {
  border-color: dodgerBlue;
  box-shadow: 0 0 8px 0 dodgerBlue;
}

.editProd {
  width: 90%;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  margin-top: 10px;
  border-radius: 5px;
  background-color: #fafafa;
  height: auto;
  padding: 10px 10px;
}
.editProd img {
  height: 100px;
  width: 100px;
  padding: 0px;
  border-radius: 100px;
  box-sizing: border-box;
  border: 2px solid black;
}
</style>
