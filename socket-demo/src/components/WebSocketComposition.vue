<template>
  <div class="container-sm">
    <h1 class="row p-3">WebSocket 메시지 발송</h1>
    <div class="row justify-content-between p-3">
      <button
        :class="[
          'col-5 badge bg-gradient',
          !isConnected ? 'bg-primary' : 'bg-secondary',
        ]"
        @click="connectWebSocket"
        :disabled="socket !== null"
      >
        Connect
      </button>
      <button
        :class="[
          'col-5 badge bg-gradient',
          !isConnected ? 'bg-secondary' : 'bg-primary',
        ]"
        @click="disconnectWebSocket"
        :disabled="!isConnected"
      >
        Disconnect
      </button>
    </div>
    <div class="row justify-content-between p-3">
      <input
        class="col-8"
        type="text"
        v-model="message"
        placeholder="내용을 입력하고 엔터를 입력하세요"
        @keyup.enter="sendMessage"
      />
      <button
        :class="[
          'col-3 align-items-center badge bg-gradient',
          !isConnected ? 'bg-secondary' : 'bg-primary',
        ]"
        @click="sendMessage"
        :disabled="!isConnected"
      >
        Send
      </button>
    </div>
    <div id="messages">
      <p v-for="(msg, index) in messages" :key="index">{{ msg }}</p>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";

export default {
  setup() {
    const socket = ref(null);
    const message = ref("");
    const messages = ref([]);
    const isConnected = ref(false);

    const connectWebSocket = () => {
      socket.value = new WebSocket("ws://localhost:8080/ws");
    };

    const disconnectWebSocket = () => {
      if (socket.value) {
        socket.value.close();
      }
    };

    const sendMessage = () => {
      if (
        message.value &&
        socket.value &&
        socket.value.readyState === WebSocket.OPEN
      ) {
        socket.value.send(message.value);
        messages.value.push(`You: ${message.value}`);
        message.value = "";
      }
    };

    watch(socket, (newSocket) => {
      if (newSocket !== null) {
        newSocket.onopen = () => {
          console.log("Connected to server");
          isConnected.value = true;
        };

        newSocket.onmessage = (event) => {
          const msg = event.data;
          console.log("Received message:", msg);
          messages.value.push(`Server: ${msg}`);
        };

        newSocket.onclose = () => {
          console.log("Disconnected from server");
          isConnected.value = false;
          socket.value = null;
        };
      } else {
        isConnected.value = false;
      }
    });

    return {
      socket,
      message,
      messages,
      isConnected,
      connectWebSocket,
      disconnectWebSocket,
      sendMessage,
    };
  },
};
</script>

<style scoped></style>
