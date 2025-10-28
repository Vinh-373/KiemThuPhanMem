export function validatePassword(password) {
  if (!password || password.trim() === "") {
    return { valid: false, message: "Password cannot be empty" };
  }

  if (password.length < 6) {
    return { valid: false, message: "Password is too short (min 6 chars)" };
  }

  if (password.length > 20) {
    return { valid: false, message: "Password is too long (max 20 chars)" };
  }

  const hasLetter = /[a-zA-Z]/.test(password);//có ít nhát 1 kí tự
  const hasNumber = /[0-9]/.test(password);// có số

  if (!hasLetter || !hasNumber) {
    return { valid: false, message: "Password must contain both letters and numbers" };
  }

  return { valid: true, message: "Valid password" };
}
