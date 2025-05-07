const knowledgeBase = {
    teamwork: `
        <section class="knowledge-module">
            <h3>Teamwork Foundations</h3>
            <p>Hackathon teamwork requires rapid trust-building and clear role definition under extreme time pressure.</p>
            
            <h4>Key Strategies:</h4>
            <ul>
                <li><strong>15-Minute Team Charter:</strong> Document contact info, communication channels, and decision protocols</li>
                <li><strong>Skills Inventory:</strong> Map each member's technical and soft skills</li>
                <li><strong>Visual Task Board:</strong> Use color-coded sticky notes or digital tools like Trello</li>
            </ul>
            
            <div class="case-study">
                <h4>HealthTech 2022 Winners</h4>
                <p>Implemented:</p>
                <ol>
                    <li>Daily "Temperature Checks" - quick morale assessments</li>
                    <li>Rotating leadership roles every 4 hours</li>
                    <li>Explicit "No Blame" culture for technical mistakes</li>
                </ol>
            </div>
        </section>
    `,
    
    communication: `
        <section class="knowledge-module">
            <h3>Effective Hackathon Communication</h3>
            <p>Clear communication is critical when working under pressure with new teammates.</p>
            
            <h4>Presentation Framework:</h4>
            <ol>
                <li><strong>Problem Hook (30 sec):</strong> "1 in 3 hospitals face X issue..."</li>
                <li><strong>Solution (1 min):</strong> "We built Y that reduces this by 40%"</li>
                <li><strong>Demo (2 min):</strong> Live walkthrough of key features</li>
                <li><strong>Differentiation (1 min):</strong> "Unlike existing solutions, we..."</li>
            </ol>
            
            <div class="expert-tip">
                <p>"Practice your pitch 3 times: for technical judges, business judges, and a 10-year-old. This prepares you for any audience."</p>
                <p>- Mark Chen, Hackathon Judge</p>
            </div>
        </section>
    `,
    
    leadership: `
        <section class="knowledge-module">
            <h3>Adaptive Leadership</h3>
            <p>Hackathon leadership evolves through different phases:</p>
            
            <table class="decision-matrix">
                <tr>
                    <th>Phase</th>
                    <th>Leadership Style</th>
                    <th>Key Actions</th>
                </tr>
                <tr>
                    <td>First 2 Hours</td>
                    <td>Directive</td>
                    <td>Set vision, assign roles</td>
                </tr>
                <tr>
                    <td>Development</td>
                    <td>Collaborative</td>
                    <td>Facilitate decisions, resolve conflicts</td>
                </tr>
                <tr>
                    <td>Final Hours</td>
                    <td>Servant</td>
                    <td>Remove obstacles, support tired members</td>
                </tr>
            </table>
        </section>
    `,
    
    'time-management': `
        <section class="knowledge-module">
            <h3>Time Management Strategies</h3>
            <p>Effective time management separates winning teams from those that run out of time.</p>
            
            <h4>The Pomodoro Plus Method:</h4>
            <ol>
                <li><strong>45 minutes:</strong> Focused work with no interruptions</li>
                <li><strong>10 minutes:</strong> Feature review and progress assessment</li>
                <li><strong>5 minutes:</strong> Team synchronization and realignment</li>
            </ol>
            
            <div class="case-study">
                <h4>FinTech Challenge Results</h4>
                <p>Teams using structured time management:</p>
                <ul>
                    <li>Completed 22% more core features</li>
                    <li>Had 35% less last-minute crunch time</li>
                    <li>Scored 15% higher in final presentations</li>
                </ul>
            </div>
            
            <div class="expert-tip">
                <p>"Timebox every discussion - if you're debating for more than 15 minutes, take a vote and move on."</p>
                <p>- Sarah Johnson, Hackathon Organizer</p>
            </div>
        </section>
    `,
    
    'conflict-resolution': `
        <section class="knowledge-module">
            <h3>Conflict Resolution Framework</h3>
            <p>Healthy conflict resolution maintains team productivity during high-pressure situations.</p>
            
            <h4>The DESC Method:</h4>
            <ul>
                <li><strong>Describe:</strong> State the situation objectively ("When we disagree on implementation...")</li>
                <li><strong>Express:</strong> Share your feelings ("I feel frustrated when...")</li>
                <li><strong>Specify:</strong> Request changes ("Could we try...")</li>
                <li><strong>Consequences:</strong> Explain outcomes ("This would help us...")</li>
            </ul>
            
            <table class="decision-matrix">
                <tr>
                    <th>Conflict Type</th>
                    <th>Resolution Strategy</th>
                </tr>
                <tr>
                    <td>Technical Disagreements</td>
                    <td>Quick prototype both options</td>
                </tr>
                <tr>
                    <td>Workload Imbalance</td>
                    <td>Reassign specific deliverables</td>
                </tr>
                <tr>
                    <td>Creative Differences</td>
                    <td>Combine best elements of both ideas</td>
                </tr>
            </table>
            
            <div class="expert-tip">
                <p>"Designate a mediator role before conflicts arise. This prevents power struggles during heated debates."</p>
                <p>- Dr. Emma Rodriguez, Team Dynamics Expert</p>
            </div>
        </section>
    `
};

function loadKnowledgeContent() {
    try {
        // First ensure all content divs exist
        const requiredIds = [
            'teamwork-content',
            'communication-content',
            'leadership-content',
            'time-management-content',
            'conflict-resolution-content'
        ];
        
        requiredIds.forEach(id => {
            if (!document.getElementById(id)) {
                console.error(`Missing content div: ${id}`);
            }
        });

        // Load content
        for (const [skill, content] of Object.entries(knowledgeBase)) {
            const elementId = `${skill}-content`;
            const contentElement = document.getElementById(elementId);
            
            if (!contentElement) {
                console.error(`Element with ID '${elementId}' not found`);
                continue;
            }
            
            contentElement.innerHTML = content;
        }
    } catch (error) {
        console.error('Error loading knowledge content:', error);
    }
}

function setupKnowledgeTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    
    if (!tabs || tabs.length === 0) {
        console.error('No tab buttons found');
        return;
    }
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            try {
                // Remove active class from all tabs and contents
                document.querySelectorAll('.tab-btn').forEach(t => {
                    t.classList.remove('active');
                });
                
                document.querySelectorAll('.tab-content').forEach(c => {
                    c.classList.remove('active');
                });
                
                // Add active class to clicked tab
                tab.classList.add('active');
                
                // Get tab ID and ensure it matches your HTML structure
                const tabId = tab.dataset.tab;
                if (!tabId) {
                    console.error('Tab button missing data-tab attribute');
                    return;
                }
                
                const contentId = `${tabId}-content`;
                const contentElement = document.getElementById(contentId);
                
                if (!contentElement) {
                    console.error(`Content element with ID '${contentId}' not found`);
                    return;
                }
                
                contentElement.classList.add('active');
                
            } catch (error) {
                console.error('Error handling tab click:', error);
            }
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadKnowledgeContent();
    setupKnowledgeTabs();
});