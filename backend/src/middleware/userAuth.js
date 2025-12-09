import jwt from "jsonwebtoken";

const citizenAuth = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return res.json({ success: false });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "citizen") {
      return res.json({ success: false, message: "Forbidden" });
    }
    req.userId = decoded.id;
    next();
  } catch {
    return res.json({ success: false });
  }
};

const staffAuth = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return res.json({ success: false });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "staff") {
      return res.json({ success: false, message: "Forbidden" });
    }
    req.userId = decoded.id;
    next();
  } catch {
    return res.json({ success: false });
  }
};


// Keep named exports and export a single default middleware function
export { citizenAuth, staffAuth };

// default export: generic auth middleware (verifies token and sets req.userId)
export default citizenAuth;
