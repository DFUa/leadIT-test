<template>
  <div>
    <ul v-if="bots.length" class="bot-list">
      <li class="bot-list-item" v-for="(bot, index) in bots" :key="index">
        <span class="bot-name" @click="editBot(index)">{{ bot.name }}</span>
        <button class="remove-bot btn" @click="removeBot(index)">remove bot</button>
      </li>
    </ul>
    <span class="empty-list" v-else>You have no bots yet. Click button "Create Bot"</span>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'List',
  props: {
    bots: Array
  },
  methods: {
    ...mapActions(['removeBot']),
    editBot(index) {
      this.$emit('editBot', index)
    }
  }
}
</script>

<style lang="scss" scoped>
.bot-list {
  margin: 0 auto;
  padding: 0;
  list-style: none;
  border: 1px solid lightgrey;
  border-radius: 5px;
  max-width: 700px;
  width: 100%;
  .bot-list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    & + .bot-list-item {
      border-top: 1px solid lightgrey;
    }
  }
}

.bot-name {
  cursor: pointer;
}

.remove-bot {
  background-color: #dc3545;
}

.empty-list {
  display: block;
  text-align: center;
}
</style>
