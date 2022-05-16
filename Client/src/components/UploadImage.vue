<template>
  <div class="container">
    <div class="row">
      <input type="file" name="file" @change="changeFile" /><br />
    </div>
  </div>
</template>

<script>
export default {
  name: "UploadImage",
  data() {
    return {
      fileURL: null,
    };
  },
  methods: {
    changeFile(e) {
      this.fileURL = e.target.files[0];
      console.log(this.fileURL);
    },
  },
};
</script>
