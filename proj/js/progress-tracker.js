let userProgress = {
    completed: 0,
    totalScore: 0,
    badges: [],
    skills: {
        teamwork: { completed: 0, totalScore: 0 },
        communication: { completed: 0, totalScore: 0 },
        leadership: { completed: 0, totalScore: 0 },
        'time-management': { completed: 0, totalScore: 0 },
        'conflict-resolution': { completed: 0, totalScore: 0 }
    }
};
function setupNewTrainingButton() {
    const restartBtn = document.getElementById('restart-btn');
    if (restartBtn) {
        restartBtn.addEventListener('click', function() {
            // Hide progress screen
            document.getElementById('progress-screen').classList.add('hidden');
            
            // Show welcome screen
            document.getElementById('welcome-screen').classList.remove('hidden');
            
            // Optional: Uncomment if you want to reset progress
            // resetProgress();
        });
    } else {
        console.error('New Training button not found!');
    }
}

function initProgressTracker() {
    const savedProgress = localStorage.getItem('hackathonSoftSkillsProgress');
    if (savedProgress) {
        try {
            userProgress = JSON.parse(savedProgress);
        } catch (e) {
            console.error('Failed to parse saved progress', e);
            resetProgress();
        }
    }
    updateProgressUI();
}

function updateUserProgress(skill, score) {
    if (!userProgress.skills[skill]) {
        console.error(`Invalid skill: ${skill}`);
        return;
    }
    
    userProgress.completed++;
    userProgress.totalScore += score;
    userProgress.skills[skill].completed++;
    userProgress.skills[skill].totalScore += score;
    
    checkForBadges(skill);
    localStorage.setItem('hackathonSoftSkillsProgress', JSON.stringify(userProgress));
}

function checkForBadges(skill) {
    const skillBadges = {
        teamwork: ['Team Player', 'Collaboration Pro', 'Team MVP'],
        communication: ['Orator', 'Storyteller', 'Master Communicator'],
        leadership: ['Leader', 'Visionary', 'Leadership Guru'],
        'time-management': ['Timekeeper', 'Efficiency Expert', 'Time Master'],
        'conflict-resolution': ['Mediator', 'Peacemaker', 'Harmony Master']
    };
    
    const thresholds = [3, 6, 10];
    thresholds.forEach((threshold, i) => {
        if (userProgress.skills[skill].completed >= threshold && 
            !userProgress.badges.includes(skillBadges[skill][i])) {
            userProgress.badges.push(skillBadges[skill][i]);
        }
    });
}

function updateProgressUI() {
    const completedCount = document.getElementById('completed-count');
    const averageScore = document.getElementById('average-score');
    const badgesGrid = document.getElementById('badges-grid');
    
    if (!completedCount || !averageScore || !badgesGrid) return;
    
    completedCount.textContent = userProgress.completed;
    const avg = userProgress.completed > 0 
        ? Math.round(userProgress.totalScore / userProgress.completed)
        : 0;
    averageScore.textContent = `${avg}%`;
    
    badgesGrid.innerHTML = '';
    userProgress.badges.forEach((badge, i) => {
        const badgeElement = document.createElement('div');
        badgeElement.className = 'badge flip-in';
        badgeElement.innerHTML = `<i>🏆</i><span>${badge}</span>`;
        badgeElement.style.animationDelay = `${i * 0.2}s`;
        badgesGrid.appendChild(badgeElement);
    });
}

function resetProgress() {
    userProgress = {
        completed: 0,
        totalScore: 0,
        badges: [],
        skills: {
            teamwork: { completed: 0, totalScore: 0 },
            communication: { completed: 0, totalScore: 0 },
            leadership: { completed: 0, totalScore: 0 },
            'time-management': { completed: 0, totalScore: 0 },
            'conflict-resolution': { completed: 0, totalScore: 0 }
        }
    };
    localStorage.removeItem('hackathonSoftSkillsProgress');
    updateProgressUI();
}