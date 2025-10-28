
import { validateUsername } from "../utils/validation/validateUsername";

describe("validateUsername()", () => {
  test("should fail when username is empty", () => {
    const result = validateUsername("");
    expect(result.valid).toBe(false);    //thực tế và mong đợi
    expect(result.message).toBe("Username cannot be empty");
  });

  test("should fail when username is too short", () => {
    const result = validateUsername("ab");
    expect(result.valid).toBe(false);
    expect(result.message).toBe("Username must be at least 3 characters long");
  });

  test("should fail when username is too long", () => {
    const result = validateUsername("a".repeat(25));
    expect(result.valid).toBe(false);
    expect(result.message).toBe("Username cannot exceed 20 characters");
  });

  test("should fail when username contains invalid characters", () => {
    const result = validateUsername("user@123");
    expect(result.valid).toBe(false);
    expect(result.message).toBe("Username contains invalid characters");
  });

  test("should pass when username is valid", () => {
    const result = validateUsername("user_123");
    expect(result.valid).toBe(true);
    expect(result.message).toBe("Valid username");
  });
});