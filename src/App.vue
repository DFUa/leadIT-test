<template>
  <div id="app">
    <button @click="createBot" class="create-bot-btn btn">create bot</button>
    <list :bots="bots" @editBot="editBot"></list>
    <transition name="fade">
      <modal
        v-if="showModal"
        @closeModal="closeModal"
        :editBotIndex="editBotIndex"
      ></modal>
    </transition>
  </div>
</template>

<script>
import Modal from './components/Modal'
import List from './components/List'

import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    Modal,
    List
  },
  data: () => ({
    showModal: false,
    editBotIndex: null
  }),
  methods: {
    editBot(index) {
      this.showModal = true
      this.editBotIndex = index
    },
    createBot() {
      this.editBotIndex = null
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
    }
  },
  computed: {
    ...mapGetters({ bots: 'getBots' })
  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

body {
  margin: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding-top: 15px;
}

.btn {
  cursor: pointer;
  border: none;
  background-color: #343a40;
  padding: 6px 12px;
  border-radius: 5px;
  color: #fff;
  text-transform: capitalize;
  font-size: 15px;
}

.create-bot-btn {
  margin: 0 auto 15px;
  display: block;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: 0.3s opacity ease-out;
}
</style>
