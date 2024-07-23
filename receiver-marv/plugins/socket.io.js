import { io } from 'socket.io-client';

export default defineNuxtPlugin(() => {
  const socket = io('http://localhost:3002');

  return {
    provide: {
      socket
    }
  };
});
