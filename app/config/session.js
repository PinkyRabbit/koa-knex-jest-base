module.exports = {
  domain: process.env.WEBSITE_DOMAIN,
  domainSecret: process.env.WEBSITE_DOMAIN_SECRET,
  secret: process.env.TOKEN_SECRET,
  expiresIn: process.env.TOKEN_EXPIREST_AT,
  resetPasswordCodeExpiresIn: 1 * 24 * 3600, // 1 day
  cookieName: process.env.WEBSITE_DOMAIN,
  cookieMaxAge: 15 * 60 * 1000, // 15 minutes in miliseconds
};
