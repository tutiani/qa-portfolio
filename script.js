document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // 1. Mobile Menu Navigation
  // ==========================================
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // ==========================================
  // 2. Scroll Animation for Skills & Fade-Ins
  // ==========================================
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  
  // Reset fills for animation
  skillBars.forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0';
    bar.setAttribute('data-target-width', width);
  });

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const skillsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fills = entry.target.querySelectorAll('.skill-bar-fill');
        fills.forEach(fill => {
          fill.style.width = fill.getAttribute('data-target-width');
          fill.style.transition = 'width 1.2s cubic-bezier(0.1, 0.76, 0.55, 0.94)';
        });
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const skillsContainer = document.querySelector('.skills-grid-container');
  if (skillsContainer) {
    skillsObserver.observe(skillsContainer);
  }

  // Fade-in sections on scroll
  const sections = document.querySelectorAll('section');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-visible');
      }
    });
  }, { threshold: 0.05 });

  sections.forEach(sec => {
    sec.classList.add('fade-in-section');
    sectionObserver.observe(sec);
  });

  // Add fade-in CSS styles programmatically to avoid style sheet locks
  const style = document.createElement('style');
  style.innerHTML = `
    .fade-in-section {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }
    .fade-in-visible {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

  // ==========================================
  // 3. Interactive QA Terminal
  // ==========================================
  const terminalInput = document.getElementById('terminalInput');
  const terminalLog = document.getElementById('terminalLog');
  const terminalConsole = document.getElementById('terminalConsole');

  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const command = terminalInput.value.trim().toLowerCase();
        terminalInput.value = '';
        
        // Log original input
        logCommand(command);
        
        if (command) {
          executeCommand(command);
        }
      }
    });

    // Keep focus inside terminal if clicked anywhere inside the console
    terminalConsole.addEventListener('click', () => {
      terminalInput.focus();
    });
  }

  function logCommand(cmd) {
    const line = document.createElement('p');
    line.innerHTML = `<span class="prompt">visitor@tutiani-qa:~$</span> <span style="color:#fff;">${cmd}</span>`;
    terminalLog.appendChild(line);
    scrollToBottom();
  }

  function printLine(text, color = '#c9d1d9', delay = 0) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const p = document.createElement('p');
        p.innerHTML = text;
        p.style.color = color;
        terminalLog.appendChild(p);
        scrollToBottom();
        resolve();
      }, delay);
    });
  }

  function scrollToBottom() {
    terminalConsole.scrollTop = terminalConsole.scrollHeight;
  }

  async function executeCommand(cmd) {
    // Disable input while running async commands
    terminalInput.disabled = true;

    const parts = cmd.split(' ');
    const mainCommand = parts[0];

    switch (mainCommand) {
      case 'help':
        await printLine('Available commands:', '#06b6d4', 20);
        await printLine('  <span style="color:#10b981;">run-tests</span>  - Execute simulated Cypress regression tests on this page.', '#fff', 20);
        await printLine('  <span style="color:#10b981;">check-api</span>  - Run integration health checks on mocked endpoints.', '#fff', 20);
        await printLine('  <span style="color:#10b981;">skills</span>     - Query Tutiani\'s primary QA skill matrix.', '#fff', 20);
        await printLine('  <span style="color:#10b981;">version</span>    - Output the current sandbox CLI version.', '#fff', 20);
        await printLine('  <span style="color:#10b981;">clear</span>      - Clear the console window.', '#fff', 20);
        break;

      case 'version':
        await printLine('tutiani-qa-cli version 1.0.0 (stable-production-build)', '#fff', 50);
        break;

      case 'clear':
        terminalLog.innerHTML = '';
        break;

      case 'skills':
        await printLine('+---------------------------------------------+', '#9ca3af', 30);
        await printLine('| QA SKILL PROFILE MATRIX                     |', '#fff', 30);
        await printLine('+---------------------------------------------+', '#9ca3af', 30);
        await printLine('| Cypress Automation       : [█████████-] 90% |', '#34d399', 30);
        await printLine('| Playwright Scripting     : [███████---] 70% |', '#34d399', 30);
        await printLine('| Postman API Validation   : [██████████] 95% |', '#34d399', 30);
        await printLine('| Performance Testing (k6) : [████████--] 80% |', '#34d399', 30);
        await printLine('| Mobile QA Validation     : [█████████-] 85% |', '#34d399', 30);
        await printLine('| PostgreSQL Database      : [████████--] 75% |', '#34d399', 30);
        await printLine('+---------------------------------------------+', '#9ca3af', 30);
        break;

      case 'run-tests':
        await printLine('Initializing Cypress E2E Runner...', '#9ca3af', 100);
        await printLine('Cypress version: 13.6.0 (headless)', '#9ca3af', 100);
        await printLine('Running 4 test files on Chrome 126...', '#fff', 300);
        
        await printLine('<br>=== Running Spec: <span style="color:#06b6d4;">portfolio_structural.cy.js</span> ===', '#fff', 400);
        await printLine('  ✓ <span style="color:#9ca3af;">Verify page structure loads</span> (42ms)', '#10b981', 200);
        await printLine('  ✓ <span style="color:#9ca3af;">Validate logo tag "[TUTIANI_QA.run()]" exists</span> (15ms)', '#10b981', 150);
        
        await printLine('<br>=== Running Spec: <span style="color:#06b6d4;">about_metrics.cy.js</span> ===', '#fff', 300);
        await printLine('  ✓ <span style="color:#9ca3af;">Query DRE (Defect Removal Efficiency) value</span> (34ms)', '#10b981', 200);
        await printLine('  ✓ <span style="color:#9ca3af;">Assert DRE text is precisely "83.33%"</span> (10ms)', '#10b981', 100);
        
        await printLine('<br>=== Running Spec: <span style="color:#06b6d4;">experience_flow.cy.js</span> ===', '#fff', 300);
        await printLine('  ✓ <span style="color:#9ca3af;">Validate OttoDigital timeline elements</span> (50ms)', '#10b981', 200);
        await printLine('  ✓ <span style="color:#9ca3af;">Validate Evermos load testing summary content</span> (20ms)', '#10b981', 150);
        
        await printLine('<br>=== Running Spec: <span style="color:#06b6d4;">social_redirects.cy.js</span> ===', '#fff', 300);
        await printLine('  ✓ <span style="color:#9ca3af;">Verify GitHub link target is "https://github.com/tutiani"</span> (12ms)', '#10b981', 150);
        await printLine('  ✓ <span style="color:#9ca3af;">Verify LinkedIn link matches profile url</span> (8ms)', '#10b981', 100);

        await printLine('<br>---------------------------------------------', '#9ca3af', 200);
        await printLine('<span style="color:#0b0f19; background-color:#10b981; padding: 2px 6px; font-weight:bold; border-radius:3px;">PASS</span> All 8 tests passed! (Total duration: 1.12s)', '#10b981', 300);
        await printLine('No violations or regression errors detected.', '#fff', 100);
        break;

      case 'check-api':
        await printLine('Sending REST calls to sandbox backend api...', '#9ca3af', 150);
        
        await printLine('<br>GET /api/v1/projects', '#fff', 300);
        await printLine('  Status: <span style="color:#10b981;">200 OK</span> | Time: 92ms | Size: 1.4KB', '#9ca3af', 100);
        await printLine('  ✓ <span style="color:#9ca3af;">Assert: Header content-type is application/json</span>', '#10b981', 100);
        await printLine('  ✓ <span style="color:#9ca3af;">Assert: Contains Cypress E2E Regression project record</span>', '#10b981', 150);

        await printLine('<br>POST /api/v1/bug-report', '#fff', 300);
        await printLine('  Status: <span style="color:#10b981;">201 Created</span> | Time: 135ms | Size: 580B', '#9ca3af', 100);
        await printLine('  ✓ <span style="color:#9ca3af;">Assert: Response returns structured tracking ticket ID</span>', '#10b981', 100);
        await printLine('  ✓ <span style="color:#9ca3af;">Assert: DB triggers status queue: "BACKLOG (QA Triaged)"</span>', '#10b981', 150);
        
        await printLine('<br>GET /api/v1/health-check', '#fff', 300);
        await printLine('  Status: <span style="color:#10b981;">200 OK</span> | Time: 45ms', '#9ca3af', 100);
        await printLine('  ✓ <span style="color:#9ca3af;">Assert: System status metric reporting "operational"</span>', '#10b981', 100);

        await printLine('<br>---------------------------------------------', '#9ca3af', 200);
        await printLine('API Checks: <span style="color:#10b981;">5 Passed</span> | <span style="color:#ef4444;">0 Failed</span>', '#fff', 200);
        break;

      default:
        await printLine(`Command not found: <span style="color:#ef4444;">${mainCommand}</span>. Type <span style="color:#06b6d4;">help</span> for instructions.`, '#c9d1d9', 50);
        break;
    }

    // Re-enable input and focus
    terminalInput.disabled = false;
    terminalInput.focus();
    scrollToBottom();
  }

  // ==========================================
  // 4. "Report a Bug" Form Submission & Modal
  // ==========================================
  const bugForm = document.getElementById('bugReportForm');
  const ticketModal = document.getElementById('ticketModal');
  const jsonTicketPayload = document.getElementById('jsonTicketPayload');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const submitBugBtn = document.getElementById('submitBugBtn');

  if (bugForm && ticketModal) {
    bugForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Temporarily change button to "Triaging..." status
      const originalBtnText = submitBugBtn.innerHTML;
      submitBugBtn.disabled = true;
      submitBugBtn.innerHTML = `
        <svg class="animate-spin" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" style="display:inline-block; margin-right:6px; vertical-align:middle;">
          <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.2)"></circle>
          <path d="M4 12a8 8 0 0 1 8-8V0C5.37 0 0 5.37 0 12h4z" fill="currentColor"></path>
        </svg>
        Triaging Bug...
      `;

      // Form values
      const name = document.getElementById('reporterName').value;
      const email = document.getElementById('reporterEmail').value;
      const title = document.getElementById('bugTitle').value;
      const severity = document.getElementById('bugSeverity').value;
      const steps = document.getElementById('bugSteps').value;
      const expected = document.getElementById('bugExpected').value || 'Establish direct contact / arrange technical discussion';

      // Generate simulated JIRA/Github Ticket ID
      const randomIdNum = Math.floor(1000 + Math.random() * 9000);
      const ticketId = `TUT-BUG-2026-${randomIdNum}`;
      
      const payload = {
        ticket_id: ticketId,
        reporter_details: {
          name: name,
          email: email
        },
        issue_type: "Bug Report (Contact)",
        summary: title,
        severity: severity,
        environment: "Production (Tutiani-Portfolio)",
        steps_to_reproduce: steps.split('\n').map((step, idx) => step.trim() ? step.trim() : `${idx + 1}. Message detail`),
        expected_result: expected,
        actual_result: "Highly satisfied visitor submitted a message form.",
        workflow_status: "BACKLOG (QA Triaged)",
        created_at: new Date().toISOString(),
        automatic_assignee: "Tutiani <tiany7597@gmail.com>"
      };

      // Inject loader styling keyframes dynamically to spin
      if (!document.getElementById('spin-keyframes')) {
        const kfStyle = document.createElement('style');
        kfStyle.id = 'spin-keyframes';
        kfStyle.innerHTML = `
          .animate-spin {
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `;
        document.head.appendChild(kfStyle);
      }

      // Simulate network request validation
      setTimeout(() => {
        // Populate modal with JSON
        jsonTicketPayload.textContent = JSON.stringify(payload, null, 2);
        
        // Reset form
        bugForm.reset();
        document.getElementById('bugActual').value = "Highly satisfied, filling bug report to contact.";
        document.getElementById('bugEnv').value = "Production (Tutiani-Portfolio)";
        
        // Show modal
        ticketModal.classList.add('active');

        // Restore button state
        submitBugBtn.disabled = false;
        submitBugBtn.innerHTML = originalBtnText;
      }, 1200);
    });

    closeModalBtn.addEventListener('click', () => {
      ticketModal.classList.remove('active');
    });

    // Close on overlay click
    ticketModal.addEventListener('click', (e) => {
      if (e.target === ticketModal) {
        ticketModal.classList.remove('active');
      }
    });
  }
});
