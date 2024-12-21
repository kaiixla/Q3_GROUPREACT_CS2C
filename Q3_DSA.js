//Group React
//Order by the Kios 

let seller = {
    "username": "reactresto",
    "password": "pasadocutie"
};

//Array that contain the products by the seller
let products = {
    PASTA: [
        { name: 'Spaghetti', price: 180 },
        {    name: 'Carbonara', price: 199},
        {    name: 'Baked Mac', price: 249}
    ],
    DESSERTS: [
        { name: 'Halo Halo', price: 99 },
        { name: 'Cookies', price: 75 },
        { name: 'Blueberry Cheesecake', price: 150 }
    ],
    DRINKS: [
        { name: 'Matcha Latte', price: 190 },
        { name: 'Lemonade', price: 69 },
        { name: 'Capuccino', price: 175 }
    ]
};

//Sorting Algorithms to sort to price of an item
function sortProductPrice(){
    for (const category in products){
        products[category].sort((a, b) => a.price - b.price);
    }
}

//Array that will hold the customer's cart
let cart = [];

//A sellerCustomer function that prompts to ask you a seller or customer
function sellerCustomer() {
    let kiosk = prompt("Hi! Are you a seller or a customer?").toLowerCase();
    if (kiosk === "seller") {
        sellLog();
    } else if (kiosk === "customer") {
        cusLog();
        } else {
            console.log("Invalid. Try again.")
            sellerCustomer();
        } 
    }

//A function when the user entered seller
function sellLog(){
    let username = prompt("Enter your username");
        if (username === seller.username) {
            let pWord = prompt("Enter your password");
            
            if (pWord === seller.password) {
                console.log("Good day, Dear seller!");
                sellerActions();                //If it matches it will direct to this function
            } else {
                console.log("Invalid password");
                sellLog();                      //It will return from the top
            }
        } else {
            console.log("Invalid username");
            sellLog();                          //It will return from the top
        }
}

//A function when the user entered customer
function cusLog(){
    console.log("Good day, Dear customer!");         //Displays when you're a customer
    customerMenu();                                  //Directs you to the next function
}

//Function when you're a seller
function sellerActions() {
    let choice = prompt("Do you want to LOGOUT, ADD, REMOVE?").toUpperCase();   //prompts that ask you where to proceed

//Using a switch statements to implement the next procedure of the choices
    switch (choice) {
        case "LOGOUT":
            console.log("Logging out...");
            sellerCustomer(); // Return to main menu
            break;
        case "ADD":
            addItem();                          //Choosing ADD will direct you to the specified function for that
            break;
        case "REMOVE":
            removeItem();                        //Choosing ADD will direct you to the specified function for that
            break;
        default:
            console.log("Invalid choice. Please try again.");
            sellerActions(); // Prompt again for valid choice
    }
}

//Function when you chose ADD
function addItem() {
    let categoryAdd = prompt("Preferred category to add: PASTA, DESSERTS, DRINKS").toUpperCase();   //Ask you what category
    let newItemName = prompt("Enter new item name:").toUpperCase();     //Where you enter the item name
    let newItemPrice = parseFloat(prompt("Enter new item price:"));     //Where you enter the item price

//Using a switch statements to implement the next procedure of the choices
    switch (categoryAdd) {
        case "PASTA":
            products.PASTA.push({ name: newItemName, price: newItemPrice });                //Push method to add the name and price of the item
            console.log(`Added ${newItemName} priced at ₱${newItemPrice} to PASTA.`);       //Displays what you add
            continueAdd();                                                                  //This directs you to a function that will ask you
            break;
        case "DESSERTS":
            products.DESSERTS.push({ name: newItemName, price: newItemPrice });
            console.log(`Added ${newItemName} priced at ₱${newItemPrice} to DESSERTS.`);
            continueAdd();
            break;
        case "DRINKS":
            products.DRINKS.push({ name: newItemName, price: newItemPrice });
            console.log(`Added ${newItemName} priced at ₱${newItemPrice} to DRINKS.`);
            continueAdd();
            break;
        default:
            console.log("Invalid category. Please try again.");
            addItem();
    }
}

//Function that will ask you if you want to add more
function continueAdd() {
    let ask = prompt("Do you want to add more? YES or NO").toUpperCase();
    switch (ask) {
        case "YES":
            addItem(); // Go back to adding items
            break;
        default:
            sellerActions(); // Return to seller actions        //If you chose NO, returns you to sellerActions
    }
}

//Function when you chose REMOVE
function removeItem() {
    let categoryRemove = prompt("Preferred category to remove: PASTA, DESSERTS, DRINKS").toUpperCase();

//Switch statement 
    switch (categoryRemove) {
        case "PASTA":
        case "DESSERTS":
        case "DRINKS":
            let itemNameToRemove = prompt(`What item you want to remove? ${categoryRemove}:`).toUpperCase();
            
            //Find the index of the category
            const index = products[categoryRemove].findIndex(item => item.name.toLowerCase() === itemNameToRemove.toLowerCase());
            
            //A condition
            if (index !== -1) {
                products[categoryRemove].splice(index, 1); // Remove the item
                console.log(`Successfully removed ${itemNameToRemove} from ${categoryRemove}.`);
                continueRemove();               //This directs you to a function that will ask you
            } else {
                console.log(`Error: ${itemNameToRemove} not found in ${categoryRemove}.`);
                removeItem();                //Return you from the start of the function
            }
            break;
    }
}

//Function that contains a question if you want to continue removing
function continueRemove() {
    let ask1 = prompt("Do you want to continue removing? YES or NO?").toUpperCase();
    switch (ask1) {
        case "YES":
            removeItem(); //Go back to removing items
            break;
        case "NO":
            sellerActions();        //Return you to the sellerAction
        default:
            console.log("Invalid. Try again."); //Return you to the top of this function
            continueRemove();
    }
}

//If you choose customer it proceeds you to this function
function customerMenu() {
    console.log(products);          //Displays the products
    
    let choice1 = prompt("Are you going to ORDER, CART, CANCEL?").toUpperCase();        
    
    //Using a switch statements to implement the next procedure of the choices
    switch (choice1) {
        case "ORDER":
            orderMenu();        //Directs you to next function
            break;
        case "CART":
            cartBut();          //Directs you to next function
            break;
        case "CANCEL":
            console.log("Order cancelled."); //Displays when you cancel
            sellerCustomer();               //Return you to the sellerCustomer
            break;
        default:
            console.log("Invalid. Try again.");
            customerMenu(); //Prompt again for valid choice
    }
}

//This will ask your order
function orderMenu() {
    let askOrder = prompt("What category is your order? PASTA, DESSERTS, DRINKS").toUpperCase();
    
    sortProductPrice();

    //Switch statements
    switch (askOrder) {
        case "PASTA":
            console.log(products.PASTA);        //Displays the products under pasta
            let cusOrder = prompt("What's your order?").toUpperCase();
            let cusQuantity = parseInt(prompt("Quantity"), 10);
            
           if(cusQuantity > 0){
               addToCart(cusOrder, cusQuantity); //Add this function for handling cart addition
           } else{
               console.log("Invalid quantity. Please enter a valid number.");
               orderMenu();
           }

           customerMenu(); //Return to customer menu after ordering
           break;

       case "DESSERTS":                         //Displays the products under desserts
           console.log(products.DESSERTS);
           let cusOrder1 = prompt("What's your order?").toUpperCase();
           let cusQuantity1 = parseInt(prompt("Quantity"), 10);
           
           if(cusQuantity1 > 0){
               addToCart(cusOrder1, cusQuantity1); //Add this function for handling cart addition
           } else{
               console.log("Invalid quantity. Please enter a valid number.");
               orderMenu();
           }

           customerMenu(); //Return to customer menu after ordering
           break;

       case "DRINKS":                          //Displays the products under desserts
           console.log(products.DRINKS);
           let cusOrder2 = prompt("Item of your choice:").toUpperCase();
           let cusQuantity2 = parseInt(prompt("Enter quantity:"), 10);
           
           if(cusQuantity2 > 0){
               addToCart(cusOrder2, cusQuantity2); //Add this function for handling cart addition
           } else{
               console.log("Invalid quantity. Please enter a valid number.");
               orderMenu();
           }

           customerMenu(); //Return to customer menu after ordering
           break;

       default:
           console.log("Invalid. Try again.");
           orderMenu(); // Prompt again for valid order
   }
}

//This function will contain what's in your cart
function addToCart(itemName, quantity) {
   const categoryNames = Object.keys(products);     //Get the names in the category in product object
   for (const category of categoryNames) {          //Loop through each category to find the item
       const itemIndex = products[category].findIndex(item => item.name.toLowerCase() === itemName.toLowerCase());
       if (itemIndex !== -1) {
           const selectedProduct = products[category][itemIndex];
           const existingCartIndex = cart.findIndex(cartItem => cartItem.name.toLowerCase() === selectedProduct.name.toLowerCase());
           
            //Check if the item was found in the current category
           if (existingCartIndex !== -1) {
               cart[existingCartIndex].quantity += quantity; //Update quantity in cart
           } else {
               cart.push({ name: selectedProduct.name, price: selectedProduct.price, quantity }); //Add new item to cart
           }

           //Displays the quantity and name of the item in your cart
           console.log(`Added ${quantity} x ${selectedProduct.name} to your cart.`);    
           return; // Exit once added to cart
       }
   }

   console.log(`${itemName} not found.`);
}


//
function cartBut() {
   if (cart.length === 0) {
       console.log("Your cart is empty.");
       customerMenu(); // Return to customer menu
       return;
   }

    //Displays the price, quantity and the item you order
   console.log("Your Cart Contents:");
   printCart();

    //Prompts asking you what you like to do
   let action = prompt("What would you like to do? PRINT, ADD, REMOVE, CANCEL").toUpperCase();

   switch (action) {
       case "PRINT":
           printCart();
           cartBut(); //Go back to cart options after printing
           break;

       case "ADD":
           orderMenu(); //Go back to order menu to add more items
           break;

       case "REMOVE":
           customerRemove(); //Go to remove an item from the cart
           break;

       case "CANCEL":
           console.log("Order canceled.");
           customerMenu(); //Return to main menu after cancellation
           break;

       default:
           console.log("Invalid option. Please try again.");
           cartBut(); //Prompt again for valid action
   }
}

//Function that where is the price, quantity and item
function printCart() {
   let totalCost = 0;

   cart.forEach(item => {
       const costPerItem = item.price * item.quantity; //Using multipilication to compute
       totalCost += costPerItem;            
       console.log(`${item.name} - Price: ₱${item.price}, Quantity: ${item.quantity}, Total Price: ₱${costPerItem}`);
   });

   console.log(`Total Cost of Cart: ₱${totalCost}`);
}

//Remove function
function customerRemove() {
   if (cart.length === 0) { //when there is no item on the cart 
       console.log("Your cart is empty. Nothing to remove.");   //This displays
       cartBut(); //Go back to cart options
       return;
   }

//Ask the user what item to remove
   let itemNameToRemove = prompt("Enter the name of the item you want to remove from your cart:").toUpperCase;

   const index = cart.findIndex(item => item.name.toLowerCase() === itemNameToRemove.toLowerCase());

   if (index !== -1) {
       cart.splice(index, 1); // Remove the item from the cart
       console.log(`Successfully removed ${itemNameToRemove} from your cart.`);
   } else {
       console.log(`Error: ${itemNameToRemove} not found in your cart.`);
   }

   cartBut(); //Go back to cart options after removal
}

//Start the kiosk program 
sellerCustomer();