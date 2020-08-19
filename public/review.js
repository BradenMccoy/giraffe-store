/**
 * Braden McCoy
 * 8/20/2019
 * 154AE
 *
 * This is the script file for the review.html page for the giraffe store, it enables users to
 * add persistent reviews and feedback on the store.
 */
"use strict";

(function() {
  window.addEventListener("load", init);
  const BASE_URL = "/giraffes/";

  /**
   * initial function adds function to the forms;
   */
  function init() {
    document.getElementById("input-form").addEventListener("submit", function(e) {
      e.preventDefault();
      addReview();
    });
    document.getElementById("feedback-form").addEventListener("submit", function(e) {
      e.preventDefault();
      addFeedback();
    });
  }

  /**
   * adds a user review to the server
   */
  function addReview() {
    let params = new FormData(document.getElementById("input-form"));
    fetch(BASE_URL + "add-review", {method: "POST", body: params})
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
   * adds user feedback to the server.
   */
  function addFeedback() {
    let params = new FormData(document.getElementById("feedback-form"));
    fetch(BASE_URL + "add-feedback", {method: "POST", body: params})
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
   * Handles displaying an error message to the user if something goes wrong
   * @param {err} err - error that is displayed
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
