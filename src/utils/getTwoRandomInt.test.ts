import { getTwoRandomInts } from "./getTwoRandomInts";

test("returns two ints", () => {
  expect(getTwoRandomInts(250)).toHaveLength(2);
});

test("returns unique ints", () => {
  expect(getTwoRandomInts(250)[0]).not.toEqual(getTwoRandomInts(250)[1]);
});

test("returns two ints (whole number test)", () => {
  const testInt = getTwoRandomInts(250)[0];
  expect(Math.floor(testInt)).toEqual(testInt);
});

test("returns two ints within the range 0-max", () => {
  expect(getTwoRandomInts(250)[0]).toBeGreaterThanOrEqual(0);
  expect(getTwoRandomInts(250)[1]).toBeGreaterThanOrEqual(0);
  expect(getTwoRandomInts(250)[0]).toBeLessThanOrEqual(250);
  expect(getTwoRandomInts(250)[1]).toBeLessThanOrEqual(250);
});
