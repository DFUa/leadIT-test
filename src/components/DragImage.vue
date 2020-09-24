<template>
  <label
    class="drag-drop"
    @dragenter.prevent
    @dragover.prevent
    @drop.prevent="updateImage">
    <span>Drag and drop image here (jpg, jpeg, png only) or click here</span>
    <input
      type="file"
      name="image"
      id="image"
      accept=".jpg, .jpeg, .png"
      @change="chooseImage"/>
  </label>
</template>

<script>
export default {
  name: 'GragImage',
  methods: {
    chooseImage($event) {
      if (this.validateImageType($event.target.files[0])) {
        this.imageTo64($event.target.files[0])
      }
    },
    updateImage($event) {
      if (this.validateImageType($event.dataTransfer.files[0])) {
        this.imageTo64($event.dataTransfer.files[0])
      }
    },
    validateImageType(image) {
      this.$emit('error', null)
      if (image.type.match(/image-*/)) {
        return true
      } else {
        this.$emit('error', 'Invalid Type')
        return false
      }
    },
    imageTo64(image) {
      let fileReader = new FileReader()
      fileReader.readAsDataURL(image)
      fileReader.onloadend = (event) => {
        this.$emit('previewImage', event.target.result)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.drag-drop {
  border: 1px solid lightgrey;
  border-radius: 5px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: grey;
  cursor: pointer;
  input {
    display: none;
  }
}
</style>
