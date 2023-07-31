const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const allowedSubscriptions = ['starter', 'pro', 'business'];

module.exports = { emailRegex, allowedSubscriptions };
