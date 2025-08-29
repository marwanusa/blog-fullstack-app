const jwt = require("jsonwebtoken");

// Verify Token
function verifyToken(req, res, next) {
  const authToken = req.headers.authorization;
  if (authToken) {
    const token = authToken.split(" ")[1];
    try {
      const decodedPayload = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decodedPayload; 
      next();
    } catch (error) {
      res.status(401).json({ message: "invalid token, access denied" });
    }
  } else {
    res.status(401).json({ message: "no token provided, access denied" });
  }
}

// Verify Token & User
function verifyTokenAndUser(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user && (req.user.id === req.params.id) ) {
      next();
    } else {
      res.status(403).json({ message: "not allowed, user himself only" });
    }
  });
}

// Verify Token & Admin
function verifyTokenAndAdmin(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({ message: "not allowed, admin only" });
    }
  });
}

// Verify Token & User himself or admin
function verifyTokenAdminAndUser(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.isAdmin || req.user.id === req.params.id) {
      next();
    } else {
      res.status(403).json({ message: "not allowed, admin and user himslef only" });
    }
  });
}

module.exports = {
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndUser,
    verifyTokenAdminAndUser
}
