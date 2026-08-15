const ADMIN_EMAIL = "suvagiyaaganik@gmail.com";

export function isAdmin(email: string | null | undefined): email is string {
  return email === ADMIN_EMAIL;
}
