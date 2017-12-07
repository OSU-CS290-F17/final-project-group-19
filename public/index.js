function showLoginModal() {
	var modalBackdrop = document.getElementById('modal-backdrop');
	var loginModal = document.getElementById('login-modal');

	modalBackdrop.classList.remove('hidden');
	loginModal.classList.remove('hidden');
}

var loginButton = document.getElementById('login');
if (loginButton) {
		loginButton.addEventListener('click',showLoginModal);
}
