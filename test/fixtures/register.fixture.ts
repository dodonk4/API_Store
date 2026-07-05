export const goodRegister = {
    username: "Gustavo",
    email: "gustavo@gmail.com",
    password: "abcd1234",
    password_confirmation: "abcd1234"
}

export const badRegister = {
    username: "Gustavo",
    password: "abcd1234",
    password_confirmation: "abcd1234"
}

export const emailRepeatedRegister = {
    username: "Gustavo",
    email: "maria@example.com",
    password: "abcd1234",
    password_confirmation: "abcd1234"
}

export const nonValidEmailRegister = {
    username: "Gustavo",
    email: "gustavogmail.com",
    password: "abcd1234",
    password_confirmation: "abcd1234"
}

export const nonValidPasswordRegister = {
    //La única limitante de la contraseña actualmente
    //es la longitud de minimamente ocho caracteres
    username: "Gustavo",
    email: "gustavo@gmail.com",
    password: "abcd123",
    password_confirmation: "abcd123"
}