let currentScenario = null;
let currentSkill = '';
let scenariosData = {};

function setupContinueButton() {
    const nextBtn = document.getElementById('next-btn');
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            console.log('Continue button clicked');
            
            // Hide feedback
            const feedback = document.getElementById('feedback');
            if (feedback) feedback.classList.add('hidden');
            
            // Check if we should show progress
            if (userProgress.completed % 3 === 0) {
                console.log('Showing progress screen');
                document.getElementById('quiz-screen').classList.add('hidden');
                const progressScreen = document.getElementById('progress-screen');
                if (progressScreen) progressScreen.classList.remove('hidden');
                updateProgressUI();
            } else {
                console.log('Loading next scenario');
                loadRandomScenario();
            }
        });
    } else {
        console.error('Continue button not found in DOM');
    }
}

function initQuizEngine() {
    scenariosData = {
        teamwork: teamworkScenarios,
        communication: communicationScenarios,
        leadership: leadershipScenarios,
        'time-management': timeManagementScenarios,
        'conflict-resolution': conflictResolutionScenarios
    };
    
    document.getElementById('options-container').addEventListener('click', function(e) {
        if (e.target.classList.contains('option-btn') && currentScenario && !currentScenario.answered) {
            const selectedIndex = parseInt(e.target.getAttribute('data-index'));
            evaluateAnswer(selectedIndex);
        }
    });
}

function loadScenario(skill) {
    currentSkill = skill;
    loadRandomScenario();
    highlightRelevantKnowledge(skill);
}

function highlightRelevantKnowledge(skill) {
    const tab = document.querySelector(`.tab-btn[data-tab="${skill}"]`);
    if (tab) {
        document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        const contentId = `${skill}-content`;
        const contentElement = document.getElementById(contentId);
        if (contentElement) {
            contentElement.classList.add('active');
        }
    }
}

function loadRandomScenario() {
    if (!scenariosData[currentSkill]) {
        console.error(`No scenarios found for skill: ${currentSkill}`);
        return;
    }
    
    if (scenariosData[currentSkill].length === 0) {
        console.error(`No scenarios available for ${currentSkill}`);
        return;
    }

    const feedbackElement = document.getElementById('feedback');
    feedbackElement.classList.add('hidden');
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    const randomIndex = Math.floor(Math.random() * scenariosData[currentSkill].length);
    currentScenario = scenariosData[currentSkill][randomIndex];
    currentScenario.answered = false;
    
    document.getElementById('scenario-title').textContent = currentScenario.title;
    document.getElementById('scenario-description').textContent = currentScenario.description;
    
    currentScenario.options.forEach((option, index) => {
        const optionBtn = document.createElement('button');
        optionBtn.className = 'option-btn';
        optionBtn.setAttribute('data-index', index);
        optionBtn.textContent = option.text;
        optionBtn.style.animationDelay = `${index * 0.1}s`;
        optionsContainer.appendChild(optionBtn);
    });
    
    updateProgressBar();
}

function evaluateAnswer(selectedIndex) {
    if (!currentScenario || currentScenario.answered) return;
    
    currentScenario.answered = true;
    const options = document.querySelectorAll('.option-btn');
    const feedbackElement = document.getElementById('feedback');
    const feedbackText = document.getElementById('feedback-text');
    
    options[selectedIndex].classList.add('selected');
    feedbackText.textContent = currentScenario.options[selectedIndex].feedback;
    feedbackElement.classList.remove('hidden');
    
    const score = currentScenario.options[selectedIndex].score;
    updateUserProgress(currentSkill, score);
    
    let maxScore = 0;
    let correctIndex = 0;
    
    currentScenario.options.forEach((option, index) => {
        if (option.score > maxScore) {
            maxScore = option.score;
            correctIndex = index;
        }
    });
    
    options[correctIndex].classList.add('correct');
    if (selectedIndex !== correctIndex) {
        options[selectedIndex].classList.add('incorrect');
    }

    // Show progress screen after every 3 scenarios
    if (userProgress.completed % 3 === 0) {
        setTimeout(() => {
            document.getElementById('quiz-screen').classList.add('hidden');
            document.getElementById('progress-screen').classList.remove('hidden');
            updateProgressUI();
        }, 1500);
    }
}

function updateProgressBar() {
    const progress = calculateOverallProgress();
    const progressFill = document.getElementById('progress-fill');
    if (progressFill) {
        progressFill.style.width = `${progress}%`;
    }
}

function calculateOverallProgress() {
    const totalScenarios = Object.values(scenariosData).reduce((sum, arr) => sum + arr.length, 0);
    return totalScenarios > 0 
        ? Math.min(100, (userProgress.completed / totalScenarios) * 100)
        : 0;
}