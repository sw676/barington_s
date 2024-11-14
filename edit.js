// About Us Management
const aboutForm = document.getElementById('aboutForm');
const aboutInput = document.getElementById('aboutInput');
const aboutContainer = document.getElementById('aboutContainer');

    // Add event listener for form submission
aboutForm.addEventListener('submit', function(event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Get the value from the textarea
        const aboutText = aboutInput.value.trim();

        // Check if the textarea is not empty
        if (aboutText) {
            // Update the aboutContainer with the new text
            aboutContainer.innerText = aboutText;

            // Clear the textarea
            aboutInput.value = '';
        }
    });

// Link Management
const linkDropArea = document.getElementById('linkDropArea');
const linkImageInput = document.getElementById('linkImageInput');

linkDropArea.addEventListener('click', () => {
    linkImageInput.click();
});

linkDropArea.addEventListener('dragover', (event) => {
    event.preventDefault();
});

linkDropArea.addEventListener('drop', (event) => {
    event.preventDefault();
    handleFileUpload(event, linkDropArea, linkImageInput);
});

document.getElementById('linkForm').addEventListener('submit', function(event) {
    event.preventDefault();
    addLink();
});

const links = []; // Store links here

function addLink() {
    const name = document.getElementById('nameInput').value;
    const url = document.getElementById('linkInput').value;
    const imageData = linkDropArea.dataset.image;

    const linkItem = createLinkItem(name, url, imageData);
    document.getElementById('linksContainer').appendChild(linkItem);
    links.push({ name, url, imageData }); // Save to links array
    clearLinkForm();
}

function createLinkItem(name, url, imageData) {
    const linkItem = document.createElement('div');
    linkItem.classList.add('link-item');

    if (imageData) {
        const img = document.createElement('img');
        img.src = imageData;
        linkItem.appendChild(img);
    }

    const linkText = document.createElement('a');
    linkText.href = url;
    linkText.textContent = name;
    linkText.target = '_blank';
    linkItem.appendChild(linkText);

    const deleteButton = createDeleteButton(linkItem);
    linkItem.appendChild(deleteButton);

    return linkItem;
}

function createDeleteButton(item) {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', function() {
        item.remove();
    });
    return deleteButton;
}

function clearLinkForm() {
    document.getElementById('nameInput').value = '';
    document.getElementById('linkInput').value = '';
    linkDropArea.style.backgroundImage = '';
    linkDropArea.dataset.image = '';
}

// Profile Management
const profileDropArea = document.getElementById('profileDropArea');
const profileImageInput = document.getElementById('profileImageInput');

profileDropArea.addEventListener('click', () => {
    profileImageInput.click();
});

profileDropArea.addEventListener('dragover', (event) => {
    event.preventDefault();
});

profileDropArea.addEventListener('drop', (event) => {
    event.preventDefault();
    handleFileUpload(event, profileDropArea, profileImageInput);
});

const profiles = []; // Store profiles here

document.getElementById('profileForm').addEventListener('submit', function(event) {
    event.preventDefault();
    addProfile();
});

function addProfile() {
    const name = document.getElementById('nameBioInput').value;
    const bio = document.getElementById('bioInput').value;
    const imageData = profileDropArea.dataset.image;

    const profileItem = createProfileItem(name, bio, imageData);
    document.getElementById('profileContainer').appendChild(profileItem);
    profiles.push({ name, bio, imageData }); // Save to profiles array
    clearProfileForm();
}

function createProfileItem(name, bio, imageData) {
    const profileItem = document.createElement('div');
    profileItem.classList.add('profile-item');

    if (imageData) {
        const img = document.createElement('img');
        img.src = imageData;
        profileItem.appendChild(img);
    }

    const nameText = document.createElement('p');
    nameText.textContent = name;
    profileItem.appendChild(nameText);

    const bioText = document.createElement('p');
    bioText.textContent = bio;
    profileItem.appendChild(bioText);

    const editButton = createEditButton(profileItem, nameText, bioText, imageData);
    profileItem.appendChild(editButton);

    const deleteButton = createDeleteButton(profileItem);
    profileItem.appendChild(deleteButton);

    return profileItem;
}

function createEditButton(profileItem, nameText, bioText, imageData) {
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-button');
    editButton.addEventListener('click', function() {
        editProfile(nameText, bioText, imageData);
        profileItem.remove(); // Remove the current profile item
    });
    return editButton;
}

function editProfile(nameText, bioText, imageData) {
    document.getElementById('nameBioInput').value = nameText.textContent;
    document.getElementById('bioInput').value = bioText.textContent;

    if (imageData) {
        profileDropArea.style.backgroundImage = `url(${imageData})`;
        profileDropArea.style.backgroundSize = 'cover';
        profileDropArea.dataset.image = imageData; // Set the image for editing
        profileDropArea.querySelector('p').style.display = 'none'; // Hide text
    }
}

function clearProfileForm() {
    document.getElementById('nameBioInput').value = '';
    document.getElementById('bioInput').value = '';
    profileDropArea.style.backgroundImage = '';
    profileDropArea.dataset.image = '';
}

// Handle file uploads
function handleFileUpload(event, dropArea, input) {
    const files = event.dataTransfer ? event.dataTransfer.files : input.files;
    if (files.length > 0) {
        const file = files[0];
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                dropArea.style.backgroundImage = `url(${e.target.result})`;
                dropArea.style.backgroundSize = 'cover';
                dropArea.dataset.image = e.target.result;
                dropArea.querySelector('p').style.display = 'none'; // Hide text
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please drop an image file.');
        }
    }
}
