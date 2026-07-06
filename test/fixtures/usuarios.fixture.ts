import bcrypt from 'bcryptjs';

export const usuarioCrear = {
    "username": "Sebastian",
    "email": "sebastian@example.com",
    "password": "abcd1234",
}

export const badUsuarioCrear = {
    "nombreseses": "Sebastian",
    "emailsasas": "sebastian@example.com",
    "passwordsosos": "abcd1234",
}

export const usuarioActualizar = {
    "email": "sebastian@ejemplo.com",
    "password": "bcda3241",
}

const saltRounds = 12;
const hashedPassword = await bcrypt.hash("abcd1234", saltRounds);

export const usuarioActualizarRollback = {
    "email": "carlos@example.com",
    "password": hashedPassword,
}