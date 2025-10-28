
import { validateUsername } from "../utils/validation/validateUsername";

describe("validateUsername()", () => {
  test("should fail when username is empty", () => {
    const result = validateUsername("");
    expect(result.valid).toBe(false);    //thực tế và mong đợi
    expect(result.message).toBe("Ten nguoi dung khong duoc de trong");
  });

  test("should fail when username is too short", () => {
    const result = validateUsername("ab");
    expect(result.valid).toBe(false);
    expect(result.message).toBe("Ten nguoi dung phai co it nhat 3 ky tu");
  });

  test("should fail when username is too long", () => {
    const result = validateUsername("a".repeat(25));
    expect(result.valid).toBe(false);
    expect(result.message).toBe("Ten nguoi dung khong duoc vuot qua 20 ky tu");
  });

  test("should fail when username contains invalid characters", () => {
    const result = validateUsername("user@123");
    expect(result.valid).toBe(false);
    expect(result.message).toBe("Ten nguoi dung chua ky tu khong hop le");
  });

  test("should pass when username is valid", () => {
    const result = validateUsername("user_123");
    expect(result.valid).toBe(true);
    expect(result.message).toBe("Ten nguoi dung hop le");
  });
});