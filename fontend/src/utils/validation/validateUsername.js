
export function validateUsername(username) {
  if (!username || username.trim() === "") {
    return { valid: false, message: "Ten nguoi dung khong duoc de trong" };
  }

  if (username.length < 3) {
    return { valid: false, message: "Ten nguoi dung phai co it nhat 3 ky tu" };
  }

  if (username.length > 20) {
    return { valid: false, message: "Ten nguoi dung khong duoc vuot qua 20 ky tu" };
  }

  const invalidChars = /[^a-zA-Z0-9_]/;
  if (invalidChars.test(username)) {
    return { valid: false, message: "Ten nguoi dung chua ky tu khong hop le" };
  }

  return { valid: true, message: "Ten nguoi dung hop le" };
}