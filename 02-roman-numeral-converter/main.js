/*
Convert the given number into a roman numeral.

All roman numerals answers should be provided in upper-case.
*/

let convertToRoman = num => {
  if (num > 3999) { return undefined };
  let numbers = num.toString().split('').map(el => Number(el));
  const thousand = {
      1: "M",
      2: "MM",
      3: "MMM"
  }
  const hundred = {
      1: "C",
      2: "CC",
      3: "CCC",
      4: "CD",
      5: "D",
      6: "DC",
      7: "DCC",
      8: "DCCC",
      9: "CM"
  }
  const ten = {
      1: "X",
      2: "XX",
      3: "XX/////////X",
      4: "XL",
      5: "L",
      6: "LX",
      7: "LXX",
      8: "LXXX",
      9: "XC"
  }
  const one = {
      1: "I",
      2: "II",
      3: "III",
      4: "IV",
      5: "V",
      6: "VI",
      7: "VII",
      8: "VIII",
      9: "IX"
  }
  let result;
  if (numbers.length === 4) {
      let zero = numbers.slice(0,1).map(el => thousand[el]).join("");
      let first = numbers.slice(1,2).map(el => hundred[el]).join("");
      let second = numbers.slice(2,3).map(el => ten[el]).join("");
      let third = numbers.slice(3,).map(el => one[el]).join("");
      result = zero + first + second + third;
  }
  if (numbers.length === 3) {
      let first = numbers.slice(0,1).map(el => hundred[el]).join("");
      let second = numbers.slice(1,2).map(el => ten[el]).join("");
      let third = numbers.slice(2,).map(el => one[el]).join("");
      result = first + second + third
  }
  if (numbers.length === 2) {
      let second = numbers.slice(0,1).map(el => ten[el]).join("");
      let third = numbers.slice(1,).map(el => one[el]).join("");
      result = second + third;
  }
  if (numbers.length === 1) {
      let third = numbers.map(el => one[el]).join("");
      result = third
  }
  return result
}