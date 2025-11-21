import { validatePassword } from "../utils/validation/validatePassword";

describe("validatePassword()", () => {
  test("should fail when password is empty", () => {
    const result = validatePassword("");
    expect(result.valid).toBe(false);
    expect(result.message).toBe("Mat khau khong duoc de trong");
  });

  test("should fail when password is too short", () => {
    const result = validatePassword("abc1");
    expect(result.valid).toBe(false);
    expect(result.message).toBe("Mat khau qua ngan (toi thieu 6 ky tu)");
  });

  test("should fail when password is too long", () => {
    const result = validatePassword("a1".repeat(51)); // 102 kí tự
    expect(result.valid).toBe(false);
    expect(result.message).toBe("Mat khau qua dai (toi da 100 ky tu)");
  });

  test("should fail when password has no number", () => {
    const result = validatePassword("abcdef");
    expect(result.valid).toBe(false);
    expect(result.message).toBe("Mat khau phai chua ca chu va so");
  });

  test("should fail when password has no letter", () => {
    const result = validatePassword("123456");
    expect(result.valid).toBe(false);
    expect(result.message).toBe("Mat khau phai chua ca chu va so");
  });

  test("should pass when password has both letters and numbers", () => {
    const result = validatePassword("abc123");
    expect(result.valid).toBe(true);
    expect(result.message).toBe("Mat khau hop le");
  });
});
