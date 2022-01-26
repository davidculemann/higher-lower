import { readableNumber } from "./readableNumber";

test("Readable number correctly rounds and adds unit to a large number input", () => {
  expect(readableNumber(129942)).toBe("129.9K");
  expect(readableNumber(1299421)).toBe("1.3M");
  expect(readableNumber(1299421987)).toBe("1.3B");
  expect(readableNumber(134)).toBe("134");
});
