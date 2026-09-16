// Minimal bearer-token gate for admin write routes. This is a starting
// point, not production-grade auth — swap in proper session/JWT auth with
// hashed credentials before going live. Set ADMIN_API_TOKEN in your .env.
export function adminAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  const expected = process.env.ADMIN_API_TOKEN || "mandyal-admin-secret-2026";

  if (!token || token !== expected) {
    return res.status(401).json({ error: "Unauthorized. Invalid admin token." });
  }
  next();
}
