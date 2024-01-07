const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    const hash = await bcrypt.hash(password, 12);
    return hash;
};

const comparePassword = async (pswd, hashedPswd) => {
    const result = await bcrypt.compare(pswd, hashedPswd);
    return result;
};

module.exports = {
    hashPassword,
    comparePassword
};