function checkIfDeleteButton(event) {
 if (event.target.classList.contains("delete")) {
  event.target.closest(".card").remove();
 }
};

export {checkIfDeleteButton}