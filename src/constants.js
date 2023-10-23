export const BACKEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://cheftalk-db.fly.dev"
    : "http://localhost:3000";
