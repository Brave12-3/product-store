import type { Request, Response } from "express";
import * as queries from "../db/queries";

import { getAuth } from "@clerk/express";

/**
 * Synchronizes the authenticated user's profile by upserting `email`, `name`, and `imageUrl` from the request body into the database.
 *
 * Responds with:
 * - 200: the upserted user object
 * - 400: when `email`, `name`, or `imageUrl` are missing from the request body
 * - 401: when the request is unauthenticated
 * - 500: on internal server error
 *
 * @param req - Express request whose body must include `email`, `name`, and `imageUrl`; authentication is derived from the request
 * @param res - Express response used to send HTTP status and JSON payloads
 */
export async function syncUser(req: Request, res: Response) {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { email, name, imageUrl } = req.body;

    if (!email || !name || !imageUrl) {
      return res.status(400).json({ error: "Email, name, and imageUrl are required" });
    }

    const user = await queries.upsertUser({
      id: userId,
      email,
      name,
      imageUrl,
    });

    res.status(200).json(user);
  } catch (error) {
    console.error("Error syncing user:", error);
    res.status(500).json({ error: "Failed to sync user" });
  }
}