'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
// const labelWelcome = document.querySelector('.welcome');
// const labelDate = document.querySelector('.date');
// const labelBalance = document.querySelector('.balance__value');
// const labelSumIn = document.querySelector('.summary__value--in');
// const labelSumOut = document.querySelector('.summary__value--out');
// const labelSumInterest = document.querySelector('.summary__value--interest');
// const labelTimer = document.querySelector('.timer');

// const containerApp = document.querySelector('.app');
// const containerMovements = document.querySelector('.movements');

// const btnLogin = document.querySelector('.login__btn');
// const btnTransfer = document.querySelector('.form__btn--transfer');
// const btnLoan = document.querySelector('.form__btn--loan');
// const btnClose = document.querySelector('.form__btn--close');
// const btnSort = document.querySelector('.btn--sort');

// const inputLoginUsername = document.querySelector('.login__input--user');
// const inputLoginPin = document.querySelector('.login__input--pin');
// const inputTransferTo = document.querySelector('.form__input--to');
// const inputTransferAmount = document.querySelector('.form__input--amount');
// const inputLoanAmount = document.querySelector('.form__input--loan-amount');
// const inputCloseUsername = document.querySelector('.form__input--user');
// const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////


// point:  Array methods 

// -->>  slice : arr.slice(startIndx , lastIndx);

let arr = ['a','b','c','d'];
console.log(arr.slice(2));

console.log('----------------------------');
// -->>  splice : same as sloce but it make change in orignal array 
// this method mutate the array 
console.log(arr.splice(2));
console.log(arr);

console.log('----------------------------');
// -->>  reverse : it reverce element in orignal array alos 
//  this method mutate the array 
console.log(arr.reverse());
console.log(arr);

console.log('----------------------------');
// -->>  concat 
let arr2 = [1,2,3,4];
let arr3 = arr.concat(arr2);
//  we preffer arr3 = [...arr,...arr3]- spreding operator 
console.log(arr3);

console.log('----------------------------');
// -->>  join 
console.log(arr3.join('_'));


console.log('----------------------------');
// -->>  At method : give element of specific lastIndx
console.log(arr2.at(3));
//  this return undefined 
console.log(arr2[-1]); 
// becuse of at now we use negative index , other option is slice method
console.log(arr2.slice(-1)[0]);
console.log(arr2.at(-2));


console.log('----------------------------');
// point:  forEach loop 

arr3 = ['tommy','sammy','ronny','danny','all get hornyy'];

// for of loop 
for(const [indx ,data] of arr3.entries()){
  console.log(`index : ${indx} data : ${data} `);
}
// forEach loop 
arr3.forEach(function(data , indx ){
  console.log(`index : ${indx} data : ${data} `);
})

// note:  in entries method first para is indx always but in forEach first para is data always
// note:  difference is : we can't use break and continous in foreach loop 

console.log('----------------------------');
// -->>  forEach with map and set  

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

currencies.forEach(function(value , key,map){
  console.log(`key : ${key} value : ${value} `);
})


//  point:  map methods : 

const eurToUsd = 1.1;

// map method return a new array 
const movementsUsd = movements.map(function(mov){
  return mov*eurToUsd;
});
//  it also contain index and value like array method
console.log(movements,movementsUsd);



// -->>  filter method : 
const deposits = movements.filter(function(mov) {
    return mov > 0 ;
})
console.log(movements);
console.log(deposits);


// -->>  reduce method 
// reduce(fun(accu,curr){},0)  0 is initial value of accumulator 
const balance = movements.reduce(function(accumulator,current,i){
  console.log(`iteration no ${i} accumulator :${accumulator} current : ${current}`);
  return accumulator+current;
},0);

console.log(balance);


// -->>  chaning method 
// we chanin a method after another if it return an array 

const totalDeposit = movements
  .filter(mov => mov>0)
  .map(mov=>mov*eurToUsd)
  .reduce((acc ,mov) => acc+mov ,0);

console.log(totalDeposit);


// point:  find method 
// it loop over array and just like filter method 
// note:  difference in filter and find 
// 1 .filter return all element that pass condition 
// 1. find return only one element that pass condition
// 2.filter return new array 
// 2. find return just one element

let firstWithdra = movements.find(mov => mov <0);
console.log(firstWithdra);

console.log(accounts);
const account = accounts.find(acc => acc.owner ===
  'Jessica Davis');
console.log(account);


console.log('**********************');
// point:  include method 

console.log(movements);
console.log(movements.includes(-1300),movements.includes(-400));

// -->>  some method : value is present or not return true or false 
let x = movements.some(mov => mov>4000);
console.log(x);

//  -->>  every : if every method pass condition then it pass true 
console.log(movements.every(mov => mov >0));
console.log(account4.movements.every(mov => mov >0));



// point:  sort array 

// it mutate the array  
const owner = ['tommy','sammy','danny','ronny'];
console.log(owner.sort());
console.log(owner);

// by default it work on number as string 
console.log(movements.sort());

movements.sort((a,b)=>{
  // -1 is for keeping the order 
  // a>b -1 to keep order means decending 
  // a<b -1 to keep order , means accesnding 
  // if(a<b) return -1;
  if(a>b) return -1;
})
console.log(movements);
