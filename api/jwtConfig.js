module.exports = {
  secret: process.env.JWT_SECRET || "my secret is secure!",
  options: { expiresIn: "10m" },
};
