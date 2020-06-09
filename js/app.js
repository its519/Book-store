//show cart
let storeItems = [
	{id: 0, name:"Calculus 1", img:"img/cal-1.jpeg", price: 10},
	{id: 1, name:"Calculus 2", img:"img/cal-2.jpg", price: 34},
	{id: 2, name:"C++", img:"img/cpp.jpg", price: 55},

];
// var itemId = 12;
// function s() {
//     var input, filter, ul, li, a, i, txtValue;
//     input = document.getElementByclass("myInput");
//     filter = input.value.toUpperCase();
//     ul = document.getElementById("myUL");
//     li = ul.getElementsByTagName("li");
//     for (i = 0; i < li.length; i++) {
//         a = li[i].getElementsByTagName("a")[0];
//         txtValue = a.textContent || a.innerText;
//         if (txtValue.toUpperCase().indexOf(filter) > -1) {
//             li[i].style.display = "";
//         } else {
//             li[i].style.display = "none";
//         }
//     }
// }
//search item
(function(){
	const searchItemForm = document.getElementById('search-store-item');
	
	searchItemForm.addEventListener('submit', function(event){
		event.preventDefault();
		
		const searchFieldValue = document.getElementById('search-item').value;
		// alert(searchFieldValue);
		item_found = "";
		
		storeItems.forEach(function(item){
			if(item.name == searchFieldValue){
				item_found = item;
				return;
			}
		});

		if(item_found != ""){ 
			const searchResultsContainer = document.getElementById('search-results-container');
			searchResultsContainer.innerHTML = `<div class="card ">
            <div class="img-container">
			<img src="${item_found.img}" class="card-img-top store-img" alt="">
              <span class="store-item-icon">
                <i class="fas fa-shopping-cart" onClick="addToCart(this)"></i>
              </span>
            </div>
            <div class="card-body">
              <div class="card-text d-flex justify-content-between text-capitalize">
                <h5 id="store-item-name">${item_found.name}</h5>
                <h5 class="store-item-value">$ <strong id="store-item-price" class="font-weight-bold">${item_found.price}</strong></h5>
              </div>
            </div>
          </div>`
		}
		
		return false;
	});
	
})();

//display all items
(function(){
	
	const storeItemsContainer = document.getElementById('store-items');
	
	storeItems.forEach(function(item){
		const newItem = document.createElement('div');
		newItem.classList.add('col-10', 'col-sm-6', 'col-lg-4', 'mx-auto', 'my-3', 'store-item', 'cupcakes');
		newItem.setAttribute("data-id", item.id);
		
		newItem.innerHTML =`<div class="card ">
            <div class="img-container">
			<img src="${item.img}" class="card-img-top store-img" alt="">
              <span class="store-item-icon">
                <i class="fas fa-shopping-cart" onClick="addToCart(this)"></i>
              </span>
            </div>
            <div class="card-body">
              <div class="card-text d-flex justify-content-between text-capitalize">
                <h5 id="store-item-name">${item.name}</h5>
                <h5 class="store-item-value">$ <strong id="store-item-price" class="font-weight-bold">${item.price}</strong></h5>
              </div>
            </div>
          </div>
		  <button class="delete-item-from-shop" onClick="deleteItem(this)">Delete</button>`
		  
		storeItemsContainer.append(newItem);
	});
	
})();


(function(){
	const addItemForm = document.getElementById('mht-add-item-form');
	addItemForm.addEventListener('submit', function(event){
		event.preventDefault();
		
		const item = {};
		item.name = document.getElementById('mht-item-name-field').value;
		item.img = document.getElementById('mht-item-image-field').value;
		item.price = document.getElementById('mht-item-price-field').value;
		
		const newItem = document.createElement('div');
		newItem.classList.add('col-10', 'col-sm-6', 'col-lg-4', 'mx-auto', 'my-3', 'store-item', 'cupcakes');
		
		
		newItem.setAttribute("data-id", itemId);
		itemId = itemId+1;
		storeItems.push(newItem);
		
		newItem.innerHTML =`<div class="card ">
            <div class="img-container">
			<img src="${item.img}" class="card-img-top store-img" alt="">
              <span class="store-item-icon">
                <i class="fas fa-shopping-cart" onClick="addToCart(this)"></i>
              </span>
            </div>
            <div class="card-body">
              <div class="card-text d-flex justify-content-between text-capitalize">
                <h5 id="store-item-name">${item.name}</h5>
                <h5 class="store-item-value">$ <strong id="store-item-price" class="font-weight-bold">${item.price}</strong></h5>
              </div>
            </div>
          </div>
		  <button class="delete-item-from-shop" onClick="deleteItem(this)">Delete</button>`
		
		const storeItemsContainer = document.getElementById('store-items');
		storeItemsContainer.append(newItem);
		
		// alert("Item Added");
		
		// return false;
	});
})();

function deleteItem(element){
	const itemContainer = element.parentElement;
	itemContainerId = itemContainer.getAttribute("data-id");
			
	storeItems = $.grep(storeItems, function(e){ 
		 return e.id != itemContainerId; 
	});

	itemContainer.remove();
}
function removeFromCart(element){
	const elementParent = element.parentElement;
	elementParent.remove();
	showTotals();
}
(function(){
	const clearCartButton = document.getElementById("clear-cart");
	clearCartButton.addEventListener("click", function(){
		const cartItems = document.querySelectorAll(".cart-item");
		cartItems.forEach(function(element){
			element.remove();
		});
		showTotals();
	});
})();

(function(){
	const cartInfo = document.getElementById('cart-info');
	const cart = document.getElementById('cart');
	
	cartInfo.addEventListener('click', function(){
		
		cart.classList.toggle('show-cart');
	})
})();

//add items to the cart

function addToCart(element){
	
	if(element.parentElement.classList.contains("store-item-icon"))
			{
				
				let fullPath = element.parentElement.previousElementSibling.src;
				let pos = fullPath.indexOf("img") + 3;
				let partPath = fullPath.slice(pos);
				
				const item = {};
				
				item.img = `img-cart${partPath}`;
					
				let name = element.parentElement.parentElement.nextElementSibling.children[0].children[0].textContent;
				
				item.name = name;
				
				let price = element.parentElement.parentElement.nextElementSibling.children[0].children[1].textContent;
				
				let finalPrice = price.slice(1).trim();
				
				item.price = finalPrice;
				

				
				const cartItem = document.createElement('div');
				cartItem.classList.add('cart-item', 'd-flex', 'justify-content-between', 'text-capitalize', 'my-3');
				
				cartItem.innerHTML =`
					<img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
					<div class="cart-item-text">

					  <p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p>
					  <span>$</span>
					  <span id="cart-item-price" class="cart-item-price" class="mb-0">${item.price}</span>
					</div>
					<a href="#" id='cart-item-remove' onClick="removeFromCart(this)" class="cart-item-remove">
					  <i class="fas fa-trash"></i>
					</a>
				`;
				
				//select cart
				const cart = document.getElementById('cart');
				const total = document.querySelector(".cart-total-container");
				
				cart.insertBefore(cartItem, total);

				
				showTotals();
				
			}
}


function showTotals(){
	
	const total = [];
	const items = document.querySelectorAll(".cart-item-price");
	
	items.forEach(function(item){
		total.push(parseFloat(item.textContent));
	});	
	const totalMoney = total.reduce(function(total, item){
		total += item;
		return total;
	}, 0);
	
	const finalMoney = totalMoney.toFixed(2);
	
	document.getElementById('cart-total').textContent = finalMoney;
	document.querySelector('.item-total').textContent = finalMoney;
	document.getElementById('item-count').textContent = total.length;
}

function getTotal(){
	const total = [];
	const items = document.querySelectorAll(".cart-item-price");
	
	items.forEach(function(item){
		total.push(parseFloat(item.textContent));
	});
	const totalMoney = total.reduce(function(total, item){
		total += item;
		return total;
	}, 0);

	return totalMoney;
}

function checkout(){
	if(getTotal()==0){
		alert("Nothing Added to Cart");
	}
	else{
		alert("Order Placed...\n Total Amount: "+ getTotal());		
	}

	
	const clearCartButton = document.getElementById("co");
		const cartItems = document.querySelectorAll(".cart-item");
		cartItems.forEach(function(element){
			element.remove();
		});
		showTotals();


	// const clearCartButton = document.getElementById("co");
	// clearCartButton.addEventListener("click", function(){
	// 	const cartItems = document.querySelectorAll(".cart-item");
	// 	cartItems.forEach(function(element){
	// 		element.remove();
	// 	});
	// 	showTotals();
	// });
}



