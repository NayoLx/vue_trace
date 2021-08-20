import Vue from 'vue'
import mqtt from "mqtt";

export var connect = {
    host: "broker.emqx.io",
    port: 8083,
    endpoint: "/mqtt",
    clean: true, // 保留会话
    connectTimeout: 4000, // 超时时间
    reconnectPeriod: 4000, // 重连时间间隔
    clientId: "",
    username: "",
    password: "",
}

const { host, port, endpoint, ...options } = connect;
const connectUrl = "ws://" + host + ":" + port + endpoint;

export function setClient(user) {
    connect.clientId = user;
}

export function init() {
    const client = mqtt.connect(connectUrl, options);

    client.on("connect", () => {
        console.log("Connection succeeded!");
    });
    client.on("error", (error) => {
        console.log("Connection failed", error);
    });

    Vue.prototype.$client = client;
}

export default {
    setClient, init
};