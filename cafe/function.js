var $ = function (id) {
    return document.getElementById(id); 
};

//Define variables
var total = 0;
var priceespresso = 1.95;
var pricelatte = 2.95;
var pricecappuccino = 3.45;
var pricecoffee = 1.75;
var pricebiscotti = 1.95;
var pricescone = 2.95; 


//preload rollover images
function preloadpic() {
	var espressoroll = new Image();
	var latteroll = new Image();
	var biscottiroll = new Image();
	var cappuccinoroll = new Image();
	var coffeeroll = new Image();
	var sconeroll = new Image();
	
	espressoroll.src = "images/espresso_info.jpg";
	latteroll.src = "images/latte_info.jpg";
	biscottiroll.src = "images/biscotti_info.jpg";
	cappuccinoroll.src = "images/cappuccino_info.jpg";
	coffeeroll.src = "images/coffee_info.jpg";
	sconeroll.src = "images/scone_info.jpg";
	
	console.log("All pictures are loaded");	//make sure all the pictures are loaded
}

//Click picture and update order list and total
function ClickToOrder (item) {
	var optionnew = document.createElement('option'); //create new option for select box

	switch (item) { //when user click on certain item, it will add the price to total and also add the item as an option to the select box
		case "espresso":
		  total = total + priceespresso;
		  optionnew.appendChild(document.createTextNode("$" + priceespresso + " - Espresso"));
		  break;
		case "latte":
		  total = total + pricelatte;
		  optionnew.appendChild(document.createTextNode("$" + pricelatte + " - Latte"));
		  break;
		case "cappuccino":
		  total= total + pricecappuccino;
		  optionnew.appendChild(document.createTextNode("$" + pricecappuccino + " - Cappuccino"));
		  break;
		case "coffee":
		  total = total + pricecoffee;
		  optionnew.appendChild(document.createTextNode("$" + pricecoffee + " - Drip Coffee"));
		  break;
		case "biscotti": 
		  total = total + pricebiscotti;
		  optionnew.appendChild(document.createTextNode("$" + pricebiscotti + " - Biscotti"));
		  break;
		case "scone":
		  total = total + pricescone;
		  optionnew.appendChild(document.createTextNode("$" + pricescone + " - Scone"));
		  break;
		default:
		  break;	
	}
	
	$("order").appendChild(optionnew);  //add option to select box
	$("total").innerHTML = "Total: $" + total.toFixed(2); //update the total value on the page
}


function ClearOrder() {
	//change total order value to 0
	total = 0;
	
	//clear the total display on the website
	$("total").innerHTML = "&nbsp;"; 
	
	//clear the display of each item
	$("order").innerHTML="";
}





window.onload=function(){
	preloadpic(); //pre-load pictures
	
	$("clear_order").onclick = function() {ClearOrder();} //click the clear order button, everything will be disappeared
	
	$("place_order").onclick = function() {window.open("checkout.html","_self");} //once the place order is selected, confirmation page will show up
	
	
}