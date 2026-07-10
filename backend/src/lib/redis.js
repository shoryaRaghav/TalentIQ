import { createClient } from "redis";
import { ENV } from "./env.js";

export const redisClient = createClient({
    url: ENV.REDIS_URL,
});

redisClient.on("error", (err) => {
    console.error("Redis Error:", err);
});

redisClient.on("connect", () => {
    console.log("Connected to Redis");
});