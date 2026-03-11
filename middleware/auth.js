const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

const isStateAdmin = (req, res, next) => {
  if (req.user.role !== 'state_admin') {
    return res.status(403).json({ msg: 'Access denied. State admin only.' });
  }
  next();
};

const isDistrictAdmin = (req, res, next) => {
  if (req.user.role !== 'district_admin' && req.user.role !== 'state_admin') {
    return res.status(403).json({ msg: 'Access denied. District admin only.' });
  }
  next();
};

module.exports = { auth, isStateAdmin, isDistrictAdmin };
