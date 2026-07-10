import { redisClient } from "../lib/redis.js";

export const cacheTest = async (req, res) => {
    try {
        const cache = await redisClient.get("message");

        if (cache) {
            return res.json({
                source: "Redis Cache",
                data: JSON.parse(cache),
            });
        }

        const data = {
            message: "Hello from MongoDB",
            time: new Date(),
        };

        await redisClient.setEx(
            "message",
            60,
            JSON.stringify(data)
        );

        return res.json({
            source: "Database",
            data,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};