import bcrypt from "bcrypt";

export function hashString(plainString) {
    return bcrypt.hash(plainString, 10);
}

export function compareHashedString(plainString, hashedString) {
    return bcrypt.compare(plainString, hashedString);
}