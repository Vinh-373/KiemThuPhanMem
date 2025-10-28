
export function validateUsername(username) {
  if (!username || username.trim() === "") {
    return { valid: false, message: "Username cannot be empty" };
  }

  if (username.length < 3) {
    return { valid: false, message: "Username must be at least 3 characters long" };
  }

  if (username.length > 20) {
    return { valid: false, message: "Username cannot exceed 20 characters" };
  }

  const invalidChars = /[^a-zA-Z0-9_]/;
  if (invalidChars.test(username)) {
    return { valid: false, message: "Username contains invalid characters" };
  }

  return { valid: true, message: "Valid username" };
}