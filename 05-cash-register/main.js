/*
Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price), payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.

cid is a 2D array listing available currency.

The checkCashRegister() function should always return an object with a status key and a change key.

Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due, or if you cannot return the exact change.

Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change if it is equal to the change due.

Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills, sorted in highest to lowest order, as the value of the change key.
*/

let checkCashRegister = (price, cash, cid) => {

  let changeTotal = cash - price;
  let registerStatus = '';

  let statusCalc = () => {
      let registerTotal = Number(cid.flat().filter(el => typeof el === 'number').reduce((total, val) => total += val).toFixed(2));

      if (changeTotal < registerTotal) {
          registerStatus = "OPEN";
      } else if (changeTotal === registerTotal) {
          registerStatus = "CLOSED";
      }
  }

  let changeCalc = () => {
      let cidWords = cid.flat().filter(el => typeof el === 'string')
      let cidNumbers = cid.reverse().flat().filter(el => typeof el === 'number')
      const moneyUnits = [100, 20, 10, 5, 1, .25, .1, .05, .01];
      let change = [0, 0, 0, 0, 0, 0, 0, 0, 0];

          for (let i = 0; i < cidNumbers.length; i++) {
              if (moneyUnits[i] <= changeTotal) {
                  while (cidNumbers[i] > 0 && moneyUnits[i] <= changeTotal) {
                          cidNumbers[i] -= moneyUnits[i]
                          changeTotal -= moneyUnits[i]
                          changeTotal = changeTotal.toFixed(2)
                          change[i] += moneyUnits[i]
                  }
              }
          }


          if (Number(changeTotal) !== 0) {
              registerStatus = "INSUFFICIENT_FUNDS";
          }

      return change.reverse()
                   .map(el => el === 0 ? 0 : Number(el.toFixed(2)))
                   .map((elem, i) => [cidWords[i], elem])
  }

  statusCalc();
  let changeClosed = changeCalc();

  let changeOpen = [...changeClosed].reverse().filter(e1 => !e1.includes(0))
  console.log(registerStatus);
  if (registerStatus === 'INSUFFICIENT_FUNDS') {
      return {status: registerStatus, change: []};
  } else if (registerStatus === 'CLOSED') {
      return {status: registerStatus, change: changeClosed};
  } else {
      return {status: registerStatus, change: changeOpen};
  }
}