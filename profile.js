document.addEventListener('DOMContentLoaded', () => {
    // === DOM Elements ===
    const profileLinkContainer = document.getElementById('profileLinkContainer');
    const userNameDisplay = document.getElementById('userNameDisplay');
    const profileAvatar = document.getElementById('profileAvatar');
    const userNameInput = document.getElementById('userName');
    const userEmailInput = document.getElementById('userEmail');
    const hairTypeInput = document.getElementById('hairType');
    const editProfileBtn = document.getElementById('editProfileBtn');
    const saveProfileBtn = document.getElementById('saveProfileBtn');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const avatarUploadInput = document.getElementById('avatarUpload');
    const quizHistoryList = document.getElementById('quizHistoryList');

    // === User Data (Simulated - in real app, this comes from backend/session) ===
    let currentUser = JSON.parse(localStorage.getItem('loggedInUser')) || null;
    let isEditingProfile = false;

    // --- Function to update the UI based on user login status ---
    function updateHeaderProfileLink() {
        if (currentUser) {
            // If logged in, show profile icon and name
            profileLinkContainer.innerHTML = `
                <li><a href="profile.html" class="nav-profile-link">
                    <i class="fas fa-user-circle"></i> Olá, ${currentUser.name.split(' ')[0]}
                </a></li>
            `;
        } else {
            // If not logged in, show login button
            profileLinkContainer.innerHTML = `<li><a href="login.html" class="btn btn-login">Fazer Login</a></li>`;
        }
    }

    // --- Function to load profile data ---
    function loadProfileData() {
        if (currentUser) {
            userNameDisplay.textContent = currentUser.name;
            userNameInput.value = currentUser.name;
            userEmailInput.value = currentUser.email;

            // Load saved hair type (example)
            const savedHairType = localStorage.getItem('userHairType');
            if (savedHairType) {
                hairTypeInput.value = savedHairType;
            } else {
                hairTypeInput.value = "Não identificado"; // Default if no quiz taken
            }

            // Load profile picture from localStorage if available
            const savedAvatar = localStorage.getItem('userAvatar');
            if (savedAvatar) {
                profileAvatar.src = savedAvatar;
            } else {
                profileAvatar.src = 'https://via.placeholder.com/100/A0522D/FFFFFF?text=User'; // Default placeholder
            }

            // Populate Quiz History (simulated data)
            const simulatedQuizHistory = JSON.parse(localStorage.getItem('quizHistory')) || [];
            if (simulatedQuizHistory.length > 0) {
                quizHistoryList.innerHTML = ''; // Clear "no history" message
                simulatedQuizHistory.forEach(quiz => {
                    const listItem = document.createElement('li');
                    listItem.innerHTML = `
                        <div>
                            <span class="quiz-title">${quiz.title}</span>
                            <span class="quiz-date">(${quiz.date})</span>
                        </div>
                        <a href="${quiz.resultLink}" target="_blank">Ver Resultado</a>
                    `;
                    quizHistoryList.appendChild(listItem);
                });
            } else {
                quizHistoryList.innerHTML = `<li class="no-history-message">Nenhum quiz realizado ainda. <a href="quizzes.html">Comece agora!</a></li>`;
            }

        } else {
            // If not logged in, redirect to login page
            window.location.href = 'login.html';
        }
    }

    // --- Enable/Disable Profile Editing ---
    function setEditingMode(isEditing) {
        isEditingProfile = isEditing;
        userNameInput.disabled = !isEditing;
        // You can add more fields here if they become editable in the future

        editProfileBtn.style.display = isEditing ? 'none' : 'inline-block';
        saveProfileBtn.style.display = isEditing ? 'inline-block' : 'none';
        cancelEditBtn.style.display = isEditing ? 'inline-block' : 'none';

        // Add/remove class for styling editable state
        if (isEditing) {
            userNameInput.focus();
            userNameInput.classList.add('editable-field');
        } else {
            userNameInput.classList.remove('editable-field');
        }
    }

    // --- Event Listeners ---
    editProfileBtn.addEventListener('click', () => setEditingMode(true));

    cancelEditBtn.addEventListener('click', () => {
        userNameInput.value = currentUser.name; // Revert changes
        setEditingMode(false);
    });

    saveProfileBtn.addEventListener('click', () => {
        const newName = userNameInput.value.trim();
        if (newName && newName !== currentUser.name) {
            currentUser.name = newName;
            localStorage.setItem('loggedInUser', JSON.stringify(currentUser)); // Save to Local Storage
            alert('Nome de usuário atualizado com sucesso!');
            userNameDisplay.textContent = newName; // Update header display immediately
            updateHeaderProfileLink(); // Update header link text as well
        }
        setEditingMode(false);
    });

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('loggedInUser'); // Clear login state
        localStorage.removeItem('userHairType'); // Clear user-specific data
        localStorage.removeItem('quizHistory'); // Clear quiz history
        localStorage.removeItem('userAvatar'); // Clear user avatar
        alert('Você foi desconectado(a).');
        window.location.href = 'index.html'; // Redirect to home or login page
    });

    // Handle avatar upload
    avatarUploadInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                profileAvatar.src = e.target.result;
                localStorage.setItem('userAvatar', e.target.result); // Save Base64 to Local Storage
                alert('Foto de perfil atualizada!');
            };
            reader.readAsDataURL(file); // Convert image to Base64 string
        }
    });


    // === Initial Load ===
    updateHeaderProfileLink(); // Update header on any page load
    // Only load profile data if on the profile page itself
    if (window.location.pathname.includes('profile.html')) {
        loadProfileData();
    }
});