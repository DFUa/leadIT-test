<template>
  <div class="modal" @click="clickOverlay" ref="overlay">
    <div class="modal-content">
      <button class="close-btn" @click="closeModal">X</button>
      <div class="modal-header"><span>Create</span> Bot</div>
      <div class="modal-body">
        <form action="#" class="form" @submit.prevent="submitForm">
          <div class="form-element w-50">
            <label class="label" for="name">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              required
              v-model="name"
            />
          </div>
          <div class="form-element w-50">
            <label class="label" for="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              placeholder="Choose Date"
              v-model="date"
            />
          </div>
          <div class="form-element">
            <label class="label" for="desc">Description</label>
            <textarea
              name="description"
              id="desc"
              placeholder="Enter Description"
              rows="4"
              v-model="desc"
            ></textarea>
          </div>
          <div class="form-element">
            <drag-image
              v-if="!image.value"
              @error="showImageError"
              @previewImage="showImagePreview"
            ></drag-image>
            <div class="image-preview" v-else>
              <button @click="removeImage" class="remove-btn btn">
                remove image
              </button>
              <img alt="image" :src="image.value" />
            </div>
            <div v-if="image.error" class="error">{{ image.error }}</div>
          </div>
          <button type="submit" class="submit btn">Save</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import DragImage from './DragImage'

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Modal',
  props: {
    editBotIndex: Number
  },
  components: {
    DragImage
  },
  data: () => ({
    name: null,
    date: null,
    desc: null,
    image: {
      value: null,
      error: null
    }
  }),
  methods: {
    ...mapActions(['addBot', 'editBot']),
    clickOverlay($event) {
      if ($event.target === this.$refs.overlay) {
        this.closeModal()
      }
    },
    closeModal() {
      this.$emit('closeModal')
    },
    removeImage() {
      this.image.value = null
    },
    showImagePreview(image) {
      this.image.value = image
    },
    showImageError(error) {
      this.image.error = error
    },
    submitForm($event) {
      let data = {
        name: this.name,
        date: this.date,
        desc: this.desc,
        image: this.image.value
      }
      if (this.checkEdit) {
        this.editBot({ index: this.editBotIndex, bot: data })
      } else {
        this.addBot(data)
        this.$emit('closeModal')
      }
    }
  },
  computed: {
    ...mapGetters(['getBots']),
    checkEdit() {
      return this.editBotIndex === 0 || this.editBotIndex
    }
  },
  mounted() {
    if (this.checkEdit) {
      this.name = this.getBots[this.editBotIndex].name
      this.date = this.getBots[this.editBotIndex].date
      this.desc = this.getBots[this.editBotIndex].desc
      this.image.value = this.getBots[this.editBotIndex].image
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  z-index: 1;
  padding-top: 30px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  .modal-content {
    position: relative;
    border-radius: 7px;
    margin-bottom: 30px;
  }
  .close-btn {
    padding: 0;
    position: absolute;
    top: 15px;
    right: 20px;
    cursor: pointer;
    font-size: 18px;
    background-color: transparent;
    border: none;
    outline: none;
  }
  .modal-header {
    margin: 0;
    font-weight: 500;
    font-size: 20px;
    text-align: center;
    margin-bottom: 15px;
  }
  .modal-content {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 50%;
  }
}

.form {
  display: flex;
  flex-wrap: wrap;
  .form-element {
    margin-bottom: 10px;
    width: 100%;
    font-size: 15px;
    .label {
      display: block;
      margin-bottom: 5px;
    }
    input {
      height: 35px;
    }
    input,
    textarea {
      resize: none;
      display: block;
      width: 100%;
      padding: 5px 10px;
      border: 1px solid lightgrey;
      border-radius: 5px;
      font-family: inherit;
    }
    &.w-50 {
      width: 50%;
    }
  }
}

.image-preview {
  text-align: center;
  .remove-btn {
    margin-bottom: 10px;
  }
  img {
    display: block;
    margin: 0 auto;
    max-width: 100%;
  }
}

.submit {
  display: block;
  margin-left: auto;
  background-color: #28a745;
}
</style>
