import { validatePassword } from "../utils/validation/validatePassword";

describe("validatePassword()", () => {
  test("should fail when password is empty", () => {
    const result = validatePassword("");
    expect(result.valid).toBe(false);
    expect(result.message).toBe("Password cannot be empty");
  });

  test("should fail when password is too short", () => {
    const result = validatePassword("abc1");
    expect(result.valid).toBe(false);
    expect(result.message).toBe("Password is too short (min 6 chars)");
  });

  test("should fail when password is too long", () => {
    const result = validatePassword("a1".repeat(11)); // 22 kí tự
    expect(result.valid).toBe(false);
    expect(result.message).toBe("Password is too long (max 20 chars)");
  });

  test("should fail when password has no number", () => {
    const result = validatePassword("abcdef");
    expect(result.valid).toBe(false);
    expect(result.message).toBe("Password must contain both letters and numbers");
  });

  test("should fail when password has no letter", () => {
    const result = validatePassword("123456");
    expect(result.valid).toBe(false);
    expect(result.message).toBe("Password must contain both letters and numbers");
  });

  test("should pass when password has both letters and numbers", () => {
    const result = validatePassword("abc123");
    expect(result.valid).toBe(true);
    expect(result.message).toBe("Valid password");
  });
});
