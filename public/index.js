
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

var loginAccept = document.getElementById('modal-accept');
if (loginAccept) {
    loginAccept.addEventListener('click', function() {
        var username = document.getElementById('login-text-input').value;
        var password = document.getElementById('login-password-input').value;
        var test = false;

        if (username && password) {
            window.location.replace('/' + username +'/' + password);
            hideLoginModal();
        }
        else {
            alert("You must fill out all fields");
        }
    });
}

// **************Character roster stuff goes here*******************
function insertNewCharacter(name) {
    var characterTempletArgs = {
        name: name
    };

    var characterButtonHTML = Handlebars.templates.newCharacterButton(characterTempletArgs);
    var characterButtonContainer = document.getElementById('character-button-container');

    characterButtonContainer.insertAdjacentHTML('beforeend', characterButtonHTML);
}

function insertCharacterSheet (name, classtype, experience, race, strength, dexterity, constitution, intelegence, wisdom, charisma, strengthMod, dexterityMod, constitutionMod, intelegenceMod, wisdomMod, charismaMod, strengthSave, dexteritySave, constitutionSave, intelegenceSave, wisdomSave, charismaSave) {
    var characterSheetTemplateArgs = {
        name: name,
        classtype: classtype,
        experience: experience,
        race: race,
        strength: strength,
        dexterity: dexterity,
        constitution: constitution,
        intelegence: intelegence,
        charisma: charisma,
        strengthMod: strengthMod,
        dexterityMod: dexterityMod,
        constitutionMod: constitutionMod,
        intelegenceMod: intelegenceMod,
        wisdomMod: wisdomMod,
        charismaMod: charismaMod,
        strengthSave: strengthSave,
        dexteritySave: dexteritySave,
        constitutionSave: constitutionSave,
        intelegenceSave: intelegenceSave,
        wisdomSave: wisdomSave,
        charismaSave: charismaSave
    };

    var characterSheetHTML = Handlebars.templates.post(characterSheetTemplateArgs);
    var characterSheetContainer = document.getElementById('characterSheetContainer');
    postContainer.insertAdjacentHTML('beforeend', characterSheetHTML);
}

//Display the new character Modal
function showNewCharacterModal() {
    var newCharacterModal = document.getElementById('new-character-modal');
    var modalBackdrop = document.getElementById('modal-backdrop');

    newCharacterModal.classList.remove('hidden');
    modalBackdrop.classList.remove('hidden');
}

//Sets all modals to be hidden
function hideNewCharacterModal() {
    var newCharacterModal = document.getElementById('new-character-modal');
    var modalBackdrop = document.getElementById('modal-backdrop');

    newCharacterModal.classList.add('hidden');
    modalBackdrop.classList.add('hidden');
    clearNewCharacterModal();
}

function clearNewCharacterModal() {
    document.getElementById('character-name-input').value = "";
}

var newCharacterButton = document.getElementById('new-character-button');
newCharacterButton.addEventListener('click', showNewCharacterModal);

var newCharacterCloseButton = document.getElementById('modal-close');
newCharacterCloseButton.addEventListener('click', hideNewCharacterModal);

var newCharacterCancelButton = document.getElementById('modal-cancel');
newCharacterCancelButton.addEventListener('click', hideNewCharacterModal);

var newCharacterAcceptButton = document.getElementById('modal-accept');
newCharacterAcceptButton.addEventListener('click', function() {
    var characterName = document.getElementById('character-name-input').value.trim();
    if(!characterName){
        alert("You must give a name");
    }
    else {
        insertNewCharacter(characterName);
        hideNewCharacterModal();
    }
});
//*****************End of character roster stuff********************
