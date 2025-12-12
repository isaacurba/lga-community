import jwt from "jsonwebtoken";

const verifyUser = (req, res, next, requiredRole) => {
  const { token } = req.cookies;
  if (!token) return res.json({ success: false });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (requiredRole && decoded.role !== requiredRole) {
      return res.json({ success: false, message: "Forbidden" });
    }
    req.userId = decoded.id;
    next();
  } catch {
    return res.json({ success: false });
  }
};

const citizenAuth = (req, res, next) => verifyUser(req, res, next, "citizen");
const staffAuth = (req, res, next) => verifyUser(req, res, next, "staff");
const genericAuth = (req, res, next) => verifyUser(req, res, next);


export { citizenAuth, staffAuth, genericAuth };

export default citizenAuth;
