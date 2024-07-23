<template>
  <div>
    <h1>Socket.io Event Listener</h1>
    <p>Message: {{ message }}</p>
    <audio ref="audio" preload="auto">
      <source src="../notification.mp3" type="audio/mpeg">
    </audio>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useNuxtApp } from "#app";

const message = ref("");
const audio = ref(null);
const { $socket } = useNuxtApp();

if (process.client) {
  // Initialize the audio object if needed
  console.log("Successfully Connected");
}

const handleEvent = (data) => {
  message.value = data.data; // Update the ref value
  console.log(message.value); // Log the value for debugging
  // alert(message.value); 



    // Play the sound effect
    if (audio.value) {
    audio.value.currentTime = 0; // Reset audio to start
    audio.value.play().catch(e => console.error("Audio playback failed:", e));
  }
};

onMounted(() => {
  $socket.on("purchase", handleEvent); // Register the event listener with the correct handler
});

onUnmounted(() => {
  $socket.off("purchase", handleEvent); // Clean up the event listener
});
</script>
