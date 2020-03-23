/**
 * Delete the card element if the right button is clicked
 * 
 * @param {Event} event The event
 */
function checkIfDeleteButton(event) {
 if (event.target.classList.contains("delete")) {
  event.target.closest(".card").remove();
 }
};

export default checkIfDeleteButton;