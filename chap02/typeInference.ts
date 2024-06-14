export {};

// nameは string型に推論されている
let name = "Micael Jackson";
name.toUpperCase();

// total変数が数値型に推論されている
let total = 123;

const printTotal: (totalNum: number) => void = (totalNum: number): void => {
  console.log(`Total is ${totalNum}`);
};

printTotal(total);

// isPositive変数が真偽値型に推論されている
let isPositive = 0 < total;

const printIsPositive: (isPositiveFlag: boolean) => void = (
  isPositiveFlag: boolean
): void => {
  if (isPositiveFlag) {
    console.log("Total is a positive number");
  } else {
    console.log("Total is not a positive number");
  }
};

printIsPositive(isPositive);
