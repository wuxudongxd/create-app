import "./app.scss";

/* eslint-disable @typescript-eslint/no-useless-constructor */
export const arr = [1, [2, 3], 4];
let res = arr.flat();
console.log(res);

class Person {
  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  constructor() {}
}
