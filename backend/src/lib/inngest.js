import { Inngest } from "inngest";
import { connectDB } from "./db.js";

import User from "../models/User.js";

export const inngest = new Inngest({
  id: "talent-iq",
});

// CREATE USER
const syncUser = inngest.createFunction(
  { id: "sync-user" },
  { event: "clerk/user.created" },

  async ({ event }) => {
    try {
      await connectDB();

      const {
        id,
        email_addresses,
        first_name,
        last_name,
        image_url,
      } = event.data;

      const email = email_addresses?.[0]?.email_address;

      // check if already exists
      const existingUser = await User.findOne({
        $or: [{ clerkId: id }, { email }],
      });

      if (existingUser) {
        console.log("User already exists");
        return { message: "User already exists" };
      }

      const newUser = await User.create({
        clerkId: id,
        email,
        name: `${first_name || ""} ${last_name || ""}`,
        profileImage: image_url,
      });

      console.log("User created:", newUser);

      return { success: true };

    } catch (error) {
      console.log("SYNC USER ERROR:", error);
      throw error;
    }
  }
);

// UPDATE USER
const updateUser = inngest.createFunction(
  { id: "update-user" },
  { event: "clerk/user.updated" },

  async ({ event }) => {
    await connectDB();

    const {
      id,
      email_addresses,
      first_name,
      last_name,
      image_url,
    } = event.data;

    await User.findOneAndUpdate(
      { clerkId: id },
      {
        email: email_addresses[0]?.email_address,
        name: `${first_name || ""} ${last_name || ""}`,
        profileImage: image_url,
      }
    );

    return { success: true };
  }
);

// DELETE USER
const deleteUserFromDB = inngest.createFunction(
  { id: "delete-user-from-db" },
  { event: "clerk/user.deleted" },

  async ({ event }) => {
    await connectDB();

    const { id } = event.data;

    await User.deleteOne({ clerkId: id });

    return { success: true };
  }
);

export const functions = [
  syncUser,
  updateUser,
  deleteUserFromDB,
];