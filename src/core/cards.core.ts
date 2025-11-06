import bcrypt from "bcryptjs";

export const comparePin = (plainPin: string, hashedPin: string): boolean => {
  return bcrypt.compareSync(plainPin, hashedPin);
};
