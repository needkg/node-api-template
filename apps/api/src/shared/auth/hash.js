import bcrypt from "bcrypt";

export function hashPassword(password) {
    return bcrypt.hash(password, 10);
}

export function comparePasswords(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
}