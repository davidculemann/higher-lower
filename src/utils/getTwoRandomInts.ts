//returns two unique random numbers from 1 to the max (size of the data)
//if you only need one random number, then call getTwoRandomInts(max)[0]

export function getTwoRandomInts(max: number): number[] {
  const nums = new Set<number>();
  while (nums.size !== 2) {
    nums.add(Math.floor(Math.random() * (max - 1)));
  }
  return Array.from(nums);
}
