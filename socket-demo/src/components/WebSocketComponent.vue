<template>
  <div class="container-sm">
    <h1 class="row p-3">WebSocket 메시지 발송</h1>
    <div class="row justify-content-between p-3">
      <button :class="['col-5 badge bg-gradient', !isConnected ? 'bg-primary' : 'bg-secondary']"
        @click="connectWebSocket" :disabled="socket !== null">
        Connect
      </button>
      <button :class="['col-5 badge bg-gradient', !isConnected ? 'bg-secondary' : 'bg-primary']"
        @click="disconnectWebSocket" :disabled="!isConnected">Disconnect</button>
    </div>
    <div class="row justify-content-between p-3">
      <input class="col-8" type="text" v-model="message" placeholder="내용을 입력하고 엔터를 입력하세요" @keyup.enter="sendMessage" />
      <button :class="['col-3 align-items-center badge bg-gradient', !isConnected ? 'bg-secondary' : 'bg-primary']"
        @click="sendMessage" :disabled="!isConnected">Send</button>
    </div>
    <div id="messages">
      <p v-for="(msg, index) in messages" :key="index">{{ msg }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      socket: null,
      message: '',
      messages: [],
      isConnected: false,
    };
  },
  watch: {
    socket(newSocket) {
      if (newSocket !== null) {
        newSocket.onopen = () => {
          console.log('Connected to server');
          this.isConnected = true;
        };

        newSocket.onmessage = (event) => {
          const message = event.data;
          console.log('Received message:', message);
          this.messages.push(`Server: ${message}`);
        };

        newSocket.onclose = () => {
          console.log('Disconnected from server');
          this.isConnected = false;
          this.socket = null;
        };
      } else {
        this.isConnected = false;
      }
    },
  },
  methods: {
    connectWebSocket() {
      this.socket = new WebSocket('ws://localhost:8080/ws');
    },
    disconnectWebSocket() {
      if (this.socket) {
        this.socket.close();
      }
    },
    sendMessage() {
      if (this.message && this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(this.message);
        this.messages.push(`You: ${this.message}`);
        this.message = '';
      }
    },
  },
};
</script>

<style scoped></style>
