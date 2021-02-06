export type SignUp = {
  name: string,
  email: string,
  password: string,
  passwordConfirm: string,
  agreement: boolean | null
}

export type SignIn = {
  email: string,
  password: string
}