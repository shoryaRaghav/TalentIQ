import dotenv from "dotenv";
import { StreamChat } from "stream-chat";
import { StreamClient } from "@stream-io/node-sdk";

dotenv.config();

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.error("Stream API key and secret are required");
  process.exit(1);
}

// VIDEO CLIENT
export const streamClient = new StreamClient(
  apiKey,
  apiSecret
);

// CHAT CLIENT
export const chatClient = StreamChat.getInstance(
  apiKey,
  apiSecret
);

export const upsertStreamUser = async (userData) => {
  try {
    await chatClient.upsertUser(userData);

    console.log(
      "Stream user upserted successfully:",
      userData
    );
  } catch (error) {
    console.error(
      "Error upserting Stream user:",
      error.message
    );
  }
};

export const deleteStreamUser = async (userId) => {
  try {
    await chatClient.deleteUser(userId);

    console.log(
      "Stream user deleted successfully:",
      userId
    );
  } catch (error) {
    console.error(
      "Error deleting Stream user:",
      error.message
    );
  }
};

export const generateStreamToken = (userId) => {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }

    const token = chatClient.createToken(userId);

    console.log(
      "Stream token generated successfully"
    );

    return token;

  } catch (error) {

    console.error(
      "Error generating Stream token:",
      error.message
    );

    throw error;
  }
};