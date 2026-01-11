import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

if (!ACCESS_SECRET || !REFRESH_SECRET) {
  throw new Error(
    "JWT secrets are not defined. Set ACCESS_SECRET and REFRESH_SECRET in environment variables."
  );
}

export function generateAccessToken(userId) {
  const accessToken = jwt.sign(
    {},
    ACCESS_SECRET,
    {
      subject: userId,
      expiresIn: "15m"
    }
  );

  return accessToken;
}

export function generateRefreshToken(userId) {
  const refreshToken = jwt.sign(
    {},
    REFRESH_SECRET,
    {
      subject: userId,
      expiresIn: "7d"
    }
  );

  return refreshToken;
}

export function verifyAccessToken(token) {
  return jwt.verify(token, ACCESS_SECRET);
}

export function verifyRefreshToken(token) {
  return jwt.verify(token, REFRESH_SECRET);
}

export function getRefreshTokenExpiryDate(token) {
  const decoded = jwt.decode(token);

  if (!decoded || typeof decoded !== "object" || !decoded.exp) {
    throw new Error("Invalid refresh token: missing exp claim");
  }

  return new Date(decoded.exp * 1000);
}