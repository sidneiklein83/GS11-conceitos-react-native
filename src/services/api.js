import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3333",
});

export default api;

/**
 * iOS com Emulador....: localhost
 * iOS com Físico......: Ip da Máquina
 * Android com Emulador: localhost (adb reverse tcp:3333 tcp:3333)
 * Android com Emulador: 10.0.2.2 (android studio)
 * Android com Emulador: 10.0.3.2 (genymotion)
 * Android com Físico..: Ip da Máquina
 */