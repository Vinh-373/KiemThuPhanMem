export function validatePassword(password) {
  if (!password || password.trim() === "") {
    return { valid: false, message: "Mat khau khong duoc de trong" };
  }

  if (password.length < 6) {
    return { valid: false, message: "Mat khau qua ngan (toi thieu 6 ky tu)" };
  }

  if (password.length > 100) {
    return { valid: false, message: "Mat khau qua dai (toi da 100 ky tu)" };
  }

  const hasLetter = /[a-zA-Z]/.test(password);//có ít nhát 1 kí tự
  const hasNumber = /[0-9]/.test(password);// có số

  if (!hasLetter || !hasNumber) {
    return { valid: false, message: "Mat khau phai chua ca chu va so" };
  }

  return { valid: true, message: "Mat khau hop le" };
}
