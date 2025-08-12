let cartCount = 0;

function addToCart() {
  cartCount++;
  document.getElementById('cart-count').textContent = cartCount;
}

function showLogin() {
  document.getElementById('loginModal').style.display = 'flex';
}

function showSignup() {
  document.getElementById('signupModal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('loginModal').style.display = 'none';
  document.getElementById('signupModal').style.display = 'none';
}

function viewCart() {
  alert(`Items in cart: ${cartCount}`);
}

// Optional: Close modals when clicking outside the modal content
window.onclick = function (event) {
  if (event.target.classList.contains('modal')) {
    closeModal();
  }
}
