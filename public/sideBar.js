function insertNewCharacter(name) {
    var characterTempletArgs = {
        name: name
    };

    var characterButtonHTML = Handlebars.templates.newCharacterButton(characterTempletArgs);
    var characterButtonContainer = document.getElementById('character-button-container');

    characterButtonContainer.insertAdjacentHTML('beforeend', characterButtonHTML);
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
