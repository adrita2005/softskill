document.addEventListener('DOMContentLoaded', function() {
    // Enhanced state management with all scenarios
    const quizState = {
        currentScenario: 'teamwork',
        currentQuestionIndex: 0,
        score: 0,
        timer: null,
        timeRemaining: 30,
        completedDomains: [],
        scenarios: {
            teamwork: [
                {
                    question: "Your teammate keeps missing deadlines. What do you do?",
                    options: [
                        "Do their work for them",
                        "Publicly call them out",
                        "Have a private conversation",
                        "Ignore the issue"
                    ],
                    correctAnswer: 2,
                    feedback: "Private conversations maintain trust while addressing issues."
                },
                {
                    question: "A team member disagrees with your approach. How do you respond?",
                    options: [
                        "Insist on your way",
                        "Ignore their input",
                        "Discuss alternatives together",
                        "Complain to other teammates"
                    ],
                    correctAnswer: 2,
                    feedback: "Collaborative discussion often yields the best solutions."
                },
                {
                    question: "How do you handle credit for team success?",
                    options: [
                        "Take most credit as the leader",
                        "Evenly distribute credit",
                        "Let others decide",
                        "Don't mention it"
                    ],
                    correctAnswer: 1,
                    feedback: "Fair recognition motivates the whole team."
                },
                {
                    question: "A teammate is struggling with their task. What's your move?",
                    options: [
                        "Let them figure it out",
                        "Take over their task",
                        "Offer guidance and support",
                        "Report them to mentors"
                    ],
                    correctAnswer: 2,
                    feedback: "Supportive teams create the best results."
                }
            ],
            communication: [
                {
                    question: "How would you present a complex idea to non-technical judges?",
                    options: [
                        "Use all the technical jargon",
                        "Explain using simple analogies",
                        "Skip explanation, just show demo",
                        "Let a teammate present"
                    ],
                    correctAnswer: 1,
                    feedback: "Analogies bridge technical and non-technical understanding."
                },
                {
                    question: "A teammate isn't understanding your idea. What do you do?",
                    options: [
                        "Repeat louder",
                        "Explain differently",
                        "Do it your way",
                        "Ask someone else to explain"
                    ],
                    correctAnswer: 1,
                    feedback: "Adapting communication improves team understanding."
                },
                {
                    question: "How do you give constructive feedback?",
                    options: [
                        "Point out every flaw",
                        "Focus only on positives",
                        "Use the 'sandwich' method",
                        "Write it anonymously"
                    ],
                    correctAnswer: 2,
                    feedback: "Positive-negative-positive structure is most effective."
                },
                {
                    question: "Your team is discussing loudly. How do you facilitate?",
                    options: [
                        "Let everyone talk at once",
                        "Take over the conversation",
                        "Establish speaking turns",
                        "End the discussion"
                    ],
                    correctAnswer: 2,
                    feedback: "Structured discussions ensure all voices are heard."
                }
            ],
            leadership: [
                {
                    question: "Your team is losing motivation. What do you do?",
                    options: [
                        "Push them harder",
                        "Ignore it",
                        "Recognize efforts and suggest a break",
                        "Threaten to remove them"
                    ],
                    correctAnswer: 2,
                    feedback: "Positive reinforcement and breaks boost productivity."
                },
                {
                    question: "How do you delegate tasks effectively?",
                    options: [
                        "Assign all hard tasks to your strongest member",
                        "Let people choose",
                        "Assign based on skills with check-ins",
                        "Do all important tasks yourself"
                    ],
                    correctAnswer: 2,
                    feedback: "Skill-based delegation with follow-ups works best."
                },
                {
                    question: "How do you handle a dominant team member?",
                    options: [
                        "Let them take over",
                        "Publicly confront them",
                        "Privately discuss team balance",
                        "Work around them"
                    ],
                    correctAnswer: 2,
                    feedback: "Private discussions maintain harmony while addressing issues."
                },
                {
                    question: "The team is stuck on a decision. Your approach?",
                    options: [
                        "Dictate the solution",
                        "Keep debating endlessly",
                        "Facilitate a vote",
                        "Flip a coin"
                    ],
                    correctAnswer: 2,
                    feedback: "Democratic decisions create team buy-in."
                }
            ],
            "time-management": [
                {
                    question: "You're falling behind schedule. First step?",
                    options: [
                        "Panic and work faster",
                        "Remove non-essential features",
                        "Pull an all-nighter",
                        "Ask for extension"
                    ],
                    correctAnswer: 1,
                    feedback: "Scope reduction is most effective for tight deadlines."
                },
                {
                    question: "How do you prioritize hackathon tasks?",
                    options: [
                        "Work on most fun first",
                        "Do everything at once",
                        "Create MVP first, then add features",
                        "Wait for teammates to decide"
                    ],
                    correctAnswer: 2,
                    feedback: "Minimum Viable Product ensures you have something working."
                },
                {
                    question: "How do you handle unexpected problems?",
                    options: [
                        "Ignore them",
                        "Drop everything to fix",
                        "Assess impact first",
                        "Blame teammates"
                    ],
                    correctAnswer: 2,
                    feedback: "Impact assessment prevents overreacting to small issues."
                },
                {
                    question: "Best way to track progress?",
                    options: [
                        "Keep it all in your head",
                        "Regular team check-ins",
                        "Detailed Gantt chart",
                        "Wait until the end"
                    ],
                    correctAnswer: 1,
                    feedback: "Regular syncs keep everyone aligned without overhead."
                }
            ],
            "conflict-resolution": [
                {
                    question: "Two teammates are arguing. How do you intervene?",
                    options: [
                        "Take sides with the more experienced member",
                        "Let them work it out",
                        "Facilitate a calm discussion",
                        "Tell them to stop or you'll quit"
                    ],
                    correctAnswer: 2,
                    feedback: "Mediation resolves conflicts while maintaining harmony."
                },
                {
                    question: "Your idea was rejected by the team. How do you react?",
                    options: [
                        "Passively-aggressively sabotage",
                        "Keep bringing it up",
                        "Accept and support the team's choice",
                        "Threaten to leave"
                    ],
                    correctAnswer: 2,
                    feedback: "Being a team player means accepting group decisions."
                },
                {
                    question: "A teammate takes credit for your work. Response?",
                    options: [
                        "Publicly call them out",
                        "Let it go completely",
                        "Privately discuss it",
                        "Retaliate by taking their credit"
                    ],
                    correctAnswer: 2,
                    feedback: "Private discussions resolve attribution issues best."
                },
                {
                    question: "How handle cultural differences in team?",
                    options: [
                        "Ignore them",
                        "Force your way",
                        "Discuss and accommodate",
                        "Complain to organizers"
                    ],
                    correctAnswer: 2,
                    feedback: "Open discussion builds inclusive teams."
                }
            ]
        },
        badges: {
            teamwork: {
                name: "Team Synergy Badge",
                description: "Mastered teamwork scenarios",
                icon: "👥"
            },
            communication: {
                name: "Eloquent Communicator Badge",
                description: "Aced communication challenges",
                icon: "💬"
            },
            leadership: {
                name: "Visionary Leader Badge",
                description: "Demonstrated leadership skills",
                icon: "🌟"
            },
            "time-management": {
                name: "Time Ninja Badge",
                description: "Excelled in time management",
                icon: "⏱️"
            },
            "conflict-resolution": {
                name: "Peacekeeper Badge",
                description: "Resolved conflicts effectively",
                icon: "🕊️"
            }
        }
    };

    // DOM elements
    const startBtn = document.getElementById('start-btn');
    const nextBtn = document.getElementById('next-btn');
    const restartBtn = document.getElementById('restart-btn');
    const countdownElement = document.getElementById('countdown');
    const welcomeScreen = document.getElementById('welcome-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const progressScreen = document.getElementById('progress-screen');
    const scenarioTitle = document.getElementById('scenario-title');
    const scenarioDescription = document.getElementById('scenario-description');
    const optionsContainer = document.getElementById('options-container');
    const feedbackElement = document.getElementById('feedback');
    const feedbackText = document.getElementById('feedback-text');
    const completedCount = document.getElementById('completed-count');
    const averageScore = document.getElementById('average-score');
    const badgesGrid = document.getElementById('badges-grid');
    const tabButtons = document.querySelectorAll('.tab-btn');

    // Set up tab click handlers
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active tab styling
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Set the new scenario
            quizState.currentScenario = button.dataset.tab;
            startQuiz();
        });
    });

    // Event listeners
    startBtn?.addEventListener('click', startQuiz);
    nextBtn?.addEventListener('click', loadNextQuestion);
    restartBtn?.addEventListener('click', resetTraining);

    function startQuiz() {
        quizState.currentQuestionIndex = 0;
        quizState.score = 0;
        welcomeScreen.classList.add('hidden');
        quizScreen.classList.remove('hidden');
        progressScreen.classList.add('hidden');
        nextBtn.textContent = 'Continue';
        loadQuestion();
        startCountdown();
    }

    function loadQuestion() {
        const scenario = quizState.scenarios[quizState.currentScenario];
        const question = scenario[quizState.currentQuestionIndex];
        
        // Update UI with formatted scenario name
        scenarioTitle.textContent = `${quizState.currentScenario.replace('-', ' ')
            .split(' ').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')} Scenario`;
        scenarioDescription.textContent = question.question;
        optionsContainer.innerHTML = '';
        
        // Create option buttons
        question.options.forEach((option, index) => {
            const optionBtn = document.createElement('button');
            optionBtn.className = 'option-btn';
            optionBtn.textContent = option;
            optionBtn.addEventListener('click', () => selectAnswer(index, question.correctAnswer));
            optionsContainer.appendChild(optionBtn);
        });
        
        // Reset feedback and timer
        feedbackElement.classList.add('hidden');
        quizState.timeRemaining = 30;
        updateCountdownDisplay();
    }

    function selectAnswer(selectedIndex, correctIndex) {
        clearInterval(quizState.timer);
        const options = document.querySelectorAll('.option-btn');
        let isCorrect = selectedIndex === correctIndex;
        
        if (isCorrect) {
            quizState.score++;
        }
        
        options.forEach((option, index) => {
            option.disabled = true;
            if (index === correctIndex) option.classList.add('correct');
            else if (index === selectedIndex) option.classList.add('incorrect');
        });
        
        feedbackText.textContent = quizState.scenarios[quizState.currentScenario][quizState.currentQuestionIndex].feedback;
        feedbackElement.classList.remove('hidden');
        
        // Change Continue button text if last question
        if (quizState.currentQuestionIndex >= 1) { // Changed to show after 2 questions
            nextBtn.textContent = 'View Results';
        }
    }

    function loadNextQuestion() {
        quizState.currentQuestionIndex++;
        
        // After 2 questions, show results
        if (quizState.currentQuestionIndex >= 2) {
            showResults();
        } else {
            loadQuestion();
            startCountdown();
        }
    }

    function showResults() {
        clearInterval(quizState.timer);
        quizScreen.classList.add('hidden');
        progressScreen.classList.remove('hidden');
        
        const percentage = Math.round((quizState.score / 2) * 100);
        
        completedCount.textContent = '2';
        averageScore.textContent = `${percentage}%`;
        
        // Award badge if not already earned
        if (!quizState.completedDomains.includes(quizState.currentScenario)) {
            quizState.completedDomains.push(quizState.currentScenario);
            awardBadge(quizState.currentScenario);
        }
    }

    function awardBadge(domain) {
        const badge = quizState.badges[domain];
        const badgeElement = document.createElement('div');
        badgeElement.className = 'badge-card';
        badgeElement.innerHTML = `
            <div class="badge-icon">${badge.icon}</div>
            <h4>${badge.name}</h4>
            <p>${badge.description}</p>
        `;
        badgesGrid.appendChild(badgeElement);
        
        // Animation for new badge
        badgeElement.style.animation = 'badgeEarned 0.5s ease-out';
        setTimeout(() => {
            badgeElement.style.animation = '';
        }, 500);
    }

    // Timer functions
    function startCountdown() {
        if (quizState.timer) clearInterval(quizState.timer);
        quizState.timeRemaining = 30;
        updateCountdownDisplay();
        quizState.timer = setInterval(() => {
            quizState.timeRemaining--;
            updateCountdownDisplay();
            if (quizState.timeRemaining <= 0) endQuestion();
        }, 1000);
    }

    function updateCountdownDisplay() {
        if (!countdownElement) return;
        const minutes = Math.floor(quizState.timeRemaining / 60);
        const seconds = quizState.timeRemaining % 60;
        countdownElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (quizState.timeRemaining <= 10) {
            countdownElement.classList.add('warning');
        } else {
            countdownElement.classList.remove('warning');
        }
    }

    function endQuestion() {
        clearInterval(quizState.timer);
        document.querySelectorAll('.option-btn').forEach(btn => btn.disabled = true);
        feedbackText.textContent = "Time ran out! The correct answer has been highlighted.";
        feedbackElement.classList.remove('hidden');
        
        // Highlight correct answer
        const correctIndex = quizState.scenarios[quizState.currentScenario][quizState.currentQuestionIndex].correctAnswer;
        document.querySelectorAll('.option-btn')[correctIndex].classList.add('correct');
        
        // Auto-progress after 3 seconds
        setTimeout(() => {
            if (feedbackElement.classList.contains('hidden')) return;
            loadNextQuestion();
        }, 3000);
    }

    function resetTraining() {
        clearInterval(quizState.timer);
        quizState.timer = null;
        quizScreen.classList.add('hidden');
        progressScreen.classList.add('hidden');
        welcomeScreen.classList.remove('hidden');
        if (countdownElement) {
            countdownElement.textContent = "00:30";
            countdownElement.classList.remove('warning');
        }
    }
});