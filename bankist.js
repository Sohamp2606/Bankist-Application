'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Soham Patil',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Ram Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'John Williams',
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
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


// ///////////
// rendering movements row in movements , debit or credit 
// ///////////

const displayMovements = function(movements ,sort = false){

    // sorting 
    // sort ? if sort true then sort if false then : movements 
    const movs = sort? movements.slice()
      .sort((a,b) => a-b ) : movements;

    // it clear the page including html also 
    containerMovements.innerHTML = '';

    movs.forEach(function(mov , i){

        const type = mov>0 ? 'deposit':'withdrawal';

        // creating custom html for tag 
        const html =`
            <div class="movements__row">
                <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
                <div class="movements__value">${mov}€</div>
            </div>
        `;

        // insertng html that created in div that we select 
        containerMovements.insertAdjacentHTML('afterbegin',html)
    });
}
// displayMovements(account1.movements);


// dislay total balence using reduce method
const calcDisplayBalance = function(acc) {
  acc.balance = acc.movements
  .reduce((acc,mov)=> acc +mov,0);
 
  labelBalance.textContent = `${acc.balance} INR`;
};
// calcDisplayBalance(account1.movements);



// ///////
// computing usernames 
// ////////


// here split method return an array so we can call map here also 

// const username = user.toLowerCase().split(' ').map(function(name){
//     return name[0];
// }).join('');


const createUsername = function(accs){

    // iterate inside individual acc 
    accounts.forEach(function(acc){
        // in this fun we don't return anything we create username feild for acc and add username to it 
        acc.username = acc.owner
            .toLowerCase()
            .split(' ')
            .map(name =>{
                return name[0];
            })
            .join('');
    
    })

}
// send accounts to fun 
createUsername(accounts);
// console.log(accounts);


//  cal display summary
const calcDisplaySummary = function(acc){
  const incomes = acc.movements
      .filter(mov => mov>0)
      .reduce((acc ,mov)=> acc + mov ,0);
      labelSumIn.textContent = `${incomes}`;

  const out = acc.movements
    .filter(mov => mov <0)
    .reduce((acc,mov)=> acc + mov ,0);
    labelSumOut.textContent = `${Math.abs(out)}`;

  const interest = acc.movements
    .filter(mov => mov>0)
    .map(deposit => (deposit*acc.interestRate)/100)
    .filter(int => int >= 1)
    .reduce((acc,int)=> acc + int,0);
    labelSumInterest.textContent = `${interest}`;
};
// calcDisplaySummary(account1.movements);


// update ui 
const updateUi = function(currentAccount){
  // display movements 
  displayMovements(currentAccount.movements);

  // display balance 
  calcDisplayBalance(currentAccount);

  // display summary
  calcDisplaySummary(currentAccount);
}

//////////////
// event handlers
/////////////

let currentAccount ;
// in html when we click submit button it relod the page  
btnLogin.addEventListener('click',function(e){
  // this prevent from page reloding 
  e.preventDefault();

    currentAccount = accounts.find(acc => 
      acc.username === inputLoginUsername.value
    );
    console.log(currentAccount);

    if (currentAccount?.pin === Number(inputLoginPin.value)){
      // display ui and welcome message
      labelWelcome.textContent = `Welcome back, ${
        currentAccount.owner.split(' ')[0]
      }`;
      
      // if usser log in display dashbord 
      containerApp.style.opacity = 100;

      // clear the input feilds 
      inputLoginUsername.value = inputLoginPin.value ='';
      // that feild have focus , cursor is there 
      inputLoginPin.blur(); // it looses his focus 

      updateUi(currentAccount);
    }

})


// aprove loan 
// to approve loan their is minimum one deposite is present 
btnLoan.addEventListener('click',function(e){
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => 
        mov >= amount* 0.1 )){
        //add movement 
        currentAccount.movements.push(amount);
        
        // update ui
        updateUi(currentAccount);
  }
  inputLoanAmount.value = '';
})


// transfer funtionality 
btnTransfer.addEventListener('click',function(e){
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => 
    acc.username === inputTransferTo.value);
  
  console.log(amount,receiverAcc);

  inputTransferAmount.value = inputTransferTo.value = '';
  
  if(amount >0 && 
    receiverAcc &&
    currentAccount.balance >= amount && 
    receiverAcc?.username != currentAccount.username){
      currentAccount.movements.push(-amount);
      receiverAcc.movements.push(amount);

      // update ui 
      updateUi(currentAccount);
    }
})


btnClose.addEventListener('click',function(e){
  e.preventDefault();

  
  

  if( inputCloseUsername.value === currentAccount
      .username &&
      Number(inputClosePin.value) === currentAccount
      .pin
      ){
      
      const index = accounts.findIndex(acc =>
        acc.username === currentAccount.username);
      console.log(index);

      accounts.splice(index,1);
       // user log out hide the ui 
       containerApp.style.opacity = 0;

    }
    inputCloseUsername.value = inputClosePin.value = '';
})


//  sort btn 
let sorted = false;
btnSort.addEventListener('click',function(e){
  e.preventDefault();
  displayMovements(currentAccount.movements,!sorted);
  sorted = !sorted;
})

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['INR', 'Rupee'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
