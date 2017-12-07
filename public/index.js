function showLoginModal() {
	var modalBackdrop = document.getElementById('modal-backdrop');
	var loginModal = document.getElementById('login-modal');

	modalBackdrop.classList.remove('hidden');
	loginModal.classList.remove('hidden');
}

function clearInputs() {
	document.getElementById('login-text-input').value = "";
	document.getElementById('login-password-input').value = "";
}

function hideLoginModal() {
	var modalBackdrop = document.getElementById('modal-backdrop');
	var loginModal = document.getElementById('login-modal');
	
	modalBackdrop.classList.add('hidden');
	loginModal.classList.add('hidden');

	clearInputs();
}

var loginButton = document.getElementById('login');
if (loginButton) {
		loginButton.addEventListener('click',showLoginModal);
}

var loginHide = document.getElementById('modal-close');
if (loginHide) {
		loginHide.addEventListener('click',hideLoginModal);
}

var loginCancel = document.getElementById('modal-cancel');
if (loginCancel) {
		loginCancel.addEventListener('click',hideLoginModal);
}
