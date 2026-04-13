{
    // using var
    var balance = 10;
    console.log("I have", balance, "in my wallet!");

    balance = 20;
    console.log("I now have", balance, "in my wallet!");

    // using let
    let debt = 5;
    console.log("Inside the scope, I have", debt, "dollars in debt!");

    const jobs = 0;
    console.log("Inside the scope, I have", jobs, "jobs 🥀");
}

console.log("Outside of the scope, I have", balance, "dollars!");
// console.log("Outside of the scope, I have", debt, "dollars in debt!"); // fails, inaccessible
// console.log("Outside the scope, I have", jobs, "jobs 🥀"); // also fails, inaccessible

// using const
// const balance = 10;
// console.log("I have", balance, "in my wallet!");

// balance = 20; // error
// console.log("I now have", balance, "in my wallet!");
