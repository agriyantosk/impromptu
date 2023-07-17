const bcrypt = require("bcryptjs");

const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
};

const checkPassword = (password, hashedPassword) => {
    const result = bcrypt.compareSync(password, hashedPassword);
    return result
}

module.exports = { hashPassword, checkPassword };
