/**
 * Braden McCoy
 * 8/20/2019
 * 154AE
 *
 * This is the script file for the Giraffe Store website, it adds the items in stock, populates
 * their info, and enables purchases.
 */
"use strict";

(function() {
  window.addEventListener("load", init);

  const BASE_URL = "/giraffes/";
  let cart = [];

  /**
   * Initial function, adds function to the checkout button, search feature and purchase button.
   */
  function init() {
    document.getElementById("checkout-button").addEventListener("click", checkout);
    document.getElementById("input-form").addEventListener("submit", function(e) {
      e.preventDefault();
      search(document.querySelector("input").value);
    });
    document.getElementById("purchase").addEventListener("click", purchase);
    populateItems();
  }

  /**
   * Handles displaying the proper info during checkout
   */
  function checkout() {
    document.getElementById("item-page").classList.add("hidden");
    document.getElementById("item-view").classList.add("hidden");
    document.getElementById("review-page").classList.add("hidden");
    document.getElementById("search").classList.add("hidden");
    document.getElementById("checkout-button").classList.add("hidden");
    document.getElementById("checkout-page").classList.remove("hidden");
    addCart();
  }

  /**
   * Handles displaying an error message to the user if something goes wrong
   * @param {string} name - name of the product searched.
   */
  function search(name) {
    fetch(BASE_URL + "search/" + name)
      .then(checkStatus)
      .then(resp => resp.json())
      .then(function(resp) {
        let itemPage = document.getElementById("item-page");
        itemPage.innerHTML = "";
        for (let i = 0; i < resp.length; i++) {
          let itemContainer = document.createElement("div");
          itemContainer.classList.add("item");
          let img = document.createElement("img");
          img.src = "imgs/giraffe" + resp[i]["id"] + ".jpeg";
          img.alt = resp[i]["description"];
          let itemName = document.createElement("p");
          itemName.textContent = resp[i]["name"];
          itemContainer.appendChild(img);
          itemContainer.appendChild(itemName);
          itemPage.appendChild(itemContainer);
          itemContainer.addEventListener("click", () => {
            dispItem(itemContainer);
          });
        }
      })
      .catch(handleError);
  }

  /**
   * Handles purchasing items and displaying the result of the purchase to the user.
   */
  function purchase() {
    let params = new FormData();

    let param = JSON.stringify(cart[0]);
    params.append("cart", param);
    fetch(BASE_URL + "purchase", {method: "POST", body: params})
      .then(checkStatus)
      .then(resp => resp.text())
      .then(function(resp) {
        let result = document.createElement("p");
        result.textContent = resp;
        document.querySelector("main").appendChild(result);
      })
      .catch(handleError);
  }

  /**
   * Handles displaying the items that are in stock, if they aren't they won't be displayed.
   */
  function populateItems() {
    fetch(BASE_URL + "all")
      .then(checkStatus)
      .then(resp => resp.json())
      .then(function(resp) {
        let itemPage = document.getElementById("item-page");
        for (let i = 0; i < resp.length; i++) {
          let itemContainer = document.createElement("div");
          itemContainer.classList.add("item");
          let img = document.createElement("img");
          img.src = "imgs/giraffe" + resp[i]["id"] + ".jpeg";
          img.alt = resp[i]["description"];
          let name = document.createElement("p");
          name.textContent = resp[i]["name"];
          itemContainer.appendChild(img);
          itemContainer.appendChild(name);
          itemPage.appendChild(itemContainer);
          itemContainer.addEventListener("click", () => {
            dispItem(itemContainer);
          });
        }
      })
      .catch(handleError);
  }

  /**
   * Handles displaying an individual item and its stats to the user.
   * @param {DOM} item - container that the item to be displayed is added to.
   */
  function dispItem(item) {
    let name = item.children[1].textContent;
    name = name.replace(" ", "-");
    document.getElementById("search").classList.add("hidden");
    fetch(BASE_URL + name)
      .then(checkStatus)
      .then(resp => resp.json())
      .then(function(resp) {
        addStats(resp, item);
        addBtns(resp);
        dispReviews(resp[0].name);
      })
      .catch(handleError);
  }

  /**
   * Handles adding the stats the given DOM element
   * @param {promise} resp - completed promise that contains stats
   * @param {DOM} item - promise that is checked
   */
  function addStats(resp, item) {
    document.getElementById("item-page").classList.add("hidden");
    let itemView = document.getElementById("item-view");
    itemView.classList.remove("hidden");
    itemView.appendChild(item);
    let stats = document.createElement("div");
    stats.classList.add("vert-section");
    let itemStats = document.createElement("div");
    itemStats.classList.add("item-info");
    let nameText = document.createElement("h3");
    nameText.textContent = "Name: " + resp[0].name;
    stats.appendChild(nameText);
    let price = document.createElement("p");
    price.textContent = "Price: " + resp[0].price;
    stats.appendChild(price);
    let description = document.createElement("p");
    description.textContent = "Description: " + resp[0].description;
    stats.appendChild(description);
    let spotDensity = document.createElement("p");
    spotDensity.textContent = "Spot Density: " + resp[0].spot_density;
    stats.appendChild(spotDensity);
    let neckLength = document.createElement("p");
    neckLength.textContent = "Neck Length: " + resp[0].neck_length;
    stats.appendChild(neckLength);
    let stock = document.createElement("p");
    stock.textContent = "Stock: " + resp[0].stock;
    stats.appendChild(stock);
    itemStats.appendChild(stats);
    itemView.appendChild(itemStats);
  }

  /**
   * Handles adding buttons to the displayed giraffe
   * @param {promise} resp - completed promise that contains stats
   */
  function addBtns(resp) {
    let stats = document.querySelector("#item-view div div");
    let addToCart = document.createElement("p");
    addToCart.classList.add("add-to-cart");
    addToCart.textContent = "Add to Cart";
    addToCart.addEventListener("click", () => {
      if (resp[0].stock > 0) {
        cart.push(resp);
      }
    });
    stats.appendChild(addToCart);

    let back = document.createElement("p");
    back.classList.add("add-to-cart");
    back.textContent = "Back";
    back.addEventListener("click", goBack);
    stats.appendChild(back);
  }

  /**
   * Handles displaying an error message to the user if something goes wrong
   * @param {string} name - name of the giraffe, reviews of this giraffe will be displayed.
   */
  function dispReviews(name) {
    let reviewPage = document.getElementById("review-page");
    reviewPage.innerHTML = "";
    reviewPage.classList.remove("hidden");
    name = name.replace(" ", "-");
    fetch(BASE_URL + "reviews/" + name)
      .then(checkStatus)
      .then(resp => resp.json())
      .then(function(resp) {
        if (resp.length > 0) {
          for (let i = 0; i < resp.length; i++) {
            dispReview(reviewPage, resp, i);
          }
        } else {
          let noReviews = document.createElement("p");
          noReviews.textContent = "No reviews yet!";
          reviewPage.appendChild(noReviews);
        }
        addReviewBtn();
      })
      .catch(handleError);
  }

  /**
   * Displays reviews
   * @param {DOM} reviewPage - container for all reviews
   * @param {promise} resp - completed promise that contains review info
   * @param {int} i - index of this singular review
   */
  function dispReview(reviewPage, resp, i) {
    let review = document.createElement("blockquote");
    let title = document.createElement("h3");
    title.textContent = "Reviews";
    reviewPage.appendChild(title);
    let text = document.createElement("p");
    text.textContent = resp[i].review;
    review.appendChild(text);
    review.appendChild(document.createElement("hr"));
    let author = document.createElement("footer");
    author.textContent = resp[i].name;
    review.appendChild(author);
    reviewPage.appendChild(review);
  }

  /**
   * adds the "add a review" button to the viewed item
   */
  function addReviewBtn() {
    let reviewPage = document.getElementById("review-page");
    let addReviewLink = document.createElement("a");
    addReviewLink.classList.add("btn");
    addReviewLink.href = "review.html";
    let addReview = document.createElement("p");
    addReview.classList.add("add-to-cart");
    addReview.textContent = "Add a Review";
    addReviewLink.appendChild(addReview);
    reviewPage.appendChild(addReviewLink);
  }

  /**
   * adds all items in the cart to the checkout view
   */
  function addCart() {
    let checkoutPage = document.getElementById("checkout-page");
    for (let i = 0; i < cart.length; i++) {
      let name = cart[0][i].name.replace(" ", "-");
      let item = document.createElement("div");
      item.classList.add("cart-item");
      let itemName = document.createElement("p");
      itemName.textContent = name;
      item.appendChild(itemName);
      let rmBtn = document.createElement("p");
      rmBtn.classList.add("add-to-cart");
      rmBtn.textContent = "Remove from cart";
      rmBtn.addEventListener("click", () => {
        rmFromCart(i);
      });
      item.appendChild(rmBtn);
      checkoutPage.appendChild(item);
    }
  }

  /**
   * Handles going back to the main page after selecting an item
   */
  function goBack() {
    let itemView = document.getElementById("item-view");
    itemView.classList.add("hidden");
    itemView.innerHTML = "";
    let reviewPage = document.getElementById("review-page");
    reviewPage.innerHTML = "";
    reviewPage.classList.add("hidden");
    document.getElementById("item-page").classList.remove("hidden");
    document.getElementById("search").classList.remove("hidden");
  }

  /**
   * removes an item from the cart
   * @param {int} index - index of cart item
   */
  function rmFromCart(index) {
    cart.splice(index, 1);
  }

  /**
   * Handles displaying an error message to the user if something goes wrong
   * @param {err} err - error displayed
   */
  function handleError(err) {
    let result = document.createElement("p");
    result.textContent = "Unexpected problem " + err;
    document.querySelector("main").appendChild(result);
  }

  /**
   * verifies the integrity of the promise
   * @param {response} response - promise that is checked
   * @return {response} response
   */
  function checkStatus(response) {
    if (!response.ok) {
      handleError();
    }
    return response; // a Response object
  }
})();
