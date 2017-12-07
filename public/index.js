function showLoginModal() {
	var modalBackdrop = document.getElementById('modal-backdrop');
	var loginModal = document.getElementById('login-modal');

	modalBackdrop.classList.remove('hidden');
	loginModal.classList.remove('hidden');
}

function hideLoginModal() {
	var modalBackdrop = document.getElementById('modal-backdrop');
	var loginModal = document.getElementById('login-modal');
	
	modalBackdrop.classList.add('hidden');
	loginModal.classList.add('hidden');

}

var loginButton = document.getElementById('login');
if (loginButton) {
		loginButton.addEventListener('click',showLoginModal);
}

var loginHide = document.getElementById('modal-close');
if (loginHide) {
		loginHide.addEventListener('click',hideLoginModal);
}
