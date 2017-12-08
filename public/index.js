
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
// function insertNewCharacter(name) {
//     var characterTempletArgs = {
//         name: name
//     };

//     var characterButtonHTML = Handlebars.templates.newCharacterButton(characterTempletArgs);
//     var characterButtonContainer = document.getElementById('character-button-container');

//     characterButtonContainer.insertAdjacentHTML('beforeend', characterButtonHTML);
// }

function insertNewCharacter(characerObj) {
    var characterButtonHTML = Handlebars.templates.newCharacterButton(characerObj);
    var characterButtonContainer = document.getElementById('character-button-container');

    characterButtonContainer.insertAdjacentHTML('beforeend', characterButtonHTML);
}

function handleNewCharacter(characterName) {
    var postRequest = new XMLHttpRequest();
    var postURL = "/gamer/addCharacter";
    postRequest.open('POST', postURL);

    var  newCharacter= {
        name: characterName
    };
    var requestBody = JSON.stringify(newCharacter);
    postRequest.setRequestHeader('Content-Type', 'application/json');

    postRequest.addEventListener('load', function (event) {
        if (event.target.status !== 200) {
            alert("Error storing character in database:\n\n\n" + event.target.response);
        } else {
            insertNewCharacter(newCharacter);
            insertCharacterSheet(newCharacter);
        }
    });

    postRequest.send(requestBody);
    hideNewCharacterModal();
}

function insertCharacterSheet (characterObj) {
    var characterSheetHTML = Handlebars.templates.characterSheet(characterObj);
    var characterSheetContainer = document.getElementById('character-container');
    characterSheetContainer.insertAdjacentHTML('beforeend', characterSheetHTML);
}

// function insertCharacterSheet (name) {
//     var characterSheetTemplateArgs = {
//         name: name,
//         classtype: "",
//         experience: "",
//         race: "",
//         strength: "",
//         dexterity: "",
//         constitution: "",
//         intelegence: "",
//         charisma: "",
//         strengthMod: "",
//         dexterityMod: "",
//         constitutionMod: "",
//         intelegenceMod: "",
//         wisdomMod: "",
//         charismaMod: "",
//         strengthSave: "",
//         dexteritySave: "",
//         constitutionSave: "",
//         intelegenceSave: "",
//         wisdomSave: "",
//         charismaSave: ""
//     };

//     var characterSheetHTML = Handlebars.templates.post(characterSheetTemplateArgs);
//     var characterSheetContainer = document.getElementById('characterSheetContainer');
//     postContainer.insertAdjacentHTML('beforeend', characterSheetHTML);
// }

// function insertCharacterSheet (name, classtype, experience, race, strength, dexterity, constitution, intelegence, wisdom, charisma, strengthMod, dexterityMod, constitutionMod, intelegenceMod, wisdomMod, charismaMod, strengthSave, dexteritySave, constitutionSave, intelegenceSave, wisdomSave, charismaSave) {
//     var characterSheetTemplateArgs = {
//         name: name,
//         classtype: classtype,
//         experience: experience,
//         race: race,
//         strength: strength,
//         dexterity: dexterity,
//         constitution: constitution,
//         intelegence: intelegence,
//         charisma: charisma,
//         strengthMod: strengthMod,
//         dexterityMod: dexterityMod,
//         constitutionMod: constitutionMod,
//         intelegenceMod: intelegenceMod,
//         wisdomMod: wisdomMod,
//         charismaMod: charismaMod,
//         strengthSave: strengthSave,
//         dexteritySave: dexteritySave,
//         constitutionSave: constitutionSave,
//         intelegenceSave: intelegenceSave,
//         wisdomSave: wisdomSave,
//         charismaSave: charismaSave
//     };

//     var characterSheetHTML = Handlebars.templates.post(characterSheetTemplateArgs);
//     var characterSheetContainer = document.getElementById('characterSheetContainer');
//     postContainer.insertAdjacentHTML('beforeend', characterSheetHTML);
// }

function removeCharacterSheet() {
    var characterContainer = document.getElementById('character-container');
    characterContainer.removeChild('character-sheet');
}

function getCharacterInfo () {

}

function saveCharacter (){
    
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
        handleNewCharacter(characterName);
        hideNewCharacterModal();
    }
});
// ************************Get This Working********************************
// var saveCharacterButton = document.getElementById('save-accept');
// saveCharacterButton.addEventListener('click', function() {
//     var characterInfo; 
//     function getCharacterInfo () {
//         characterInfo = {
//             name: document.getElementById('character-name'),
//             classtype: document.getElementById('class-name').value,
//             experience: document.getElementById('experience').value,
//             race: document.getElementById('race').value,
//             strength: document.getElementById('str').value,
//             dexterity: document.getElementById('dex').value,
//             constitution: document.getElementById('con').value,
//             intelegence: document.getElementById('int').value,
//             charisma: document.getElementById('cha').value,
//             strengthMod: document.getElementById('str-mod').value,
//             dexterityMod: document.getElementById('dex-mod').value,
//             constitutionMod: document.getElementById('con-mod').value,
//             intelegenceMod: document.getElementById('int-mod').value,
//             wisdomMod: document.getElementById('wis-mod').value,
//             charismaMod: document.getElementById('cha-mod').value,
//             strengthSave: document.getElementById('str-save').value,
//             dexteritySave: document.getElementById('dex-save').value,
//             constitutionSave: document.getElementById('con-save').value,
//             intelegenceSave: document.getElementById('int-save').value,
//             wisdomSave: document.getElementById('wis-save').value,
//             charismaSave: document.getElementById('cha-save').value
//         };
//     }
//     getCharacterInfo();
//     saveCharacter(characterInfo);
// });

//*****************End of character roster stuff********************
