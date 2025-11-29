// =========================
// Life RPG Stat Tracker
// Created by Nick, November 2025
// =========================

// --- Constants ---
const STORAGE_KEY = 'rpgStats';
const LOG_STORAGE_KEY = 'dailyLog';
const HISTORY_STORAGE_KEY = 'logHistory';

const MAX_XP = 100;
const MAX_STRENGTH = 20;
const MAX_DISCIPLINE = 20;
const MAX_INTELLECT = 20;
const MAX_EXERCISE = 30;
const MAX_MEDITATION = 30;
const MAX_WAKEUP_EARLY = 30;
const MAX_STAYUP_LATE = 30;
const MAX_NEGATIVE_SELF_TALK = 30;
const MAX_JUNKFOOD = 30;
const MAX_IMPULSE_SPENDING = 30;

// --- State ---
let xp = 0;
let level = 1;
let strength = 0;
let discipline = 0;
let intellect = 0;
let exercise = 0;
let meditation = 0;
let wakeUpEarly = 0;
let stayUpLate = 0;
let negativeSelfTalk = 0;
let junkFood = 0;
let impulseSpending = 0;

// --- DOM Elements ---
function getElementOrWarn(id) {
  const element = document.getElementById(id);
  if (!element) console.warn(`Element with id '${id}' not found.`);
  return element;
}

const xpDisplay = getElementOrWarn('xpDisplay');
const levelDisplay = getElementOrWarn('levelDisplay');
const strengthDisplay = getElementOrWarn('strengthDisplay');
const disciplineDisplay = getElementOrWarn('disciplineDisplay'); 
const intellectDisplay = getElementOrWarn('intellectDisplay');
const exerciseDisplay = getElementOrWarn('exerciseDisplay');
const meditationDisplay = getElementOrWarn('meditationDisplay');
const wakeUpEarlyDisplay = getElementOrWarn('wakeUpEarlyDisplay');
const stayUpLateDisplay = getElementOrWarn('stayUpLateDisplay');
const negativeSelfTalkDisplay = getElementOrWarn('negativeSelfTalkDisplay');
const junkFoodDisplay = getElementOrWarn('junkFoodDisplay');
const impulseSpendingDisplay = getElementOrWarn('impulseSpendingDisplay');
const dailyLog = getElementOrWarn('dailyLog');
const logHistory = getElementOrWarn('logHistory');
const currentLogMessage = getElementOrWarn('currentLogMessage');
const recentLogList = getElementOrWarn('recentLogList');

const actionBtn = getElementOrWarn('actionBtn');
const readBtn = getElementOrWarn('readBtn');
// Removed unused badHabitBtn
const resetBtn = getElementOrWarn('resetBtn');
const clearLogBtn = getElementOrWarn('clearLogBtn');
const exerciseBtn = getElementOrWarn('exerciseBtn');
const meditationBtn = getElementOrWarn('meditationBtn');
const wakeUpEarlyBtn = getElementOrWarn('wakeUpEarlyBtn');
const stayUpLateBtn = getElementOrWarn('stayUpLateBtn');
const negativeSelfTalkBtn = getElementOrWarn('negativeSelfTalkBtn');
const junkFoodBtn = getElementOrWarn('junkFoodBtn');
const impulseSpendingBtn = getElementOrWarn('impulseSpendingBtn');
const saveLogEntryBtn = getElementOrWarn('saveLogEntryBtn');
const resetHistoryBtn = getElementOrWarn('resetHistoryBtn');

// Daily and history log function
function dailyAndHistoryLog(actionType, message) {
  switch(actionType) {
    case 'daily':
      // Append to daily log textarea and save
      if (dailyLog && typeof message === 'string') {
        dailyLog.value += message;
        localStorage.setItem(LOG_STORAGE_KEY, dailyLog.value);
      }
      break;
    case 'history':
      // Append to history log and save
      if (logHistory && typeof message === 'string') {
        // Prevent duplicate history messages
        const currentHistory = logHistory.textContent;
        if (!currentHistory.includes(message.trim())) {
          logHistory.textContent += message;
          localStorage.setItem(HISTORY_STORAGE_KEY, logHistory.textContent);
        }
      }
      break;
    default:
      // Warn if unknown action type
      console.warn('Unknown log action type:', actionType);
  }
  if (intellect === MAX_INTELLECT) {
    dailyAndHistoryLog('history', `\n[${new Date().toLocaleString()}] Achievement: Max Intellect!`);
    alert('Achievement unlocked: Max Intellect!');
  }
  if(xp === MAX_XP) {
    dailyAndHistoryLog('history', `\n[${new Date().toLocaleString()}] Achievement: Max XP!`);
    alert('Achievement unlocked: Max XP!');
  }
}

// Load daily log from localStorage and save on input
function renderRecentLogs() {
  if (!recentLogList) return;
  const logs = JSON.parse(localStorage.getItem('recentLogs') || '[]');
  recentLogList.innerHTML = '';
  if (logs.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'No recent logs yet.';
    recentLogList.appendChild(li);
    return;
  }
  logs.forEach(msg => {
    const li = document.createElement('li');
    li.textContent = msg;
    recentLogList.appendChild(li);
  });
}

if (dailyLog) {
  const savedLog = localStorage.getItem(LOG_STORAGE_KEY);
  if (savedLog !== null) dailyLog.value = savedLog;
  renderRecentLogs();
  dailyLog.addEventListener('input', () => {
    localStorage.setItem(LOG_STORAGE_KEY, dailyLog.value);
  });
}

// Load history log from localStorage
if (logHistory) {
  const savedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);
  if (savedHistory !== null) logHistory.textContent = savedHistory;
}

if(xpDisplay) xpDisplay.textContent = `XP: ${xp}`;

function logAction(actionName) {
    if(logHistory) {
    const now = new Date();
    logHistory.textContent += `\n[${now.toLocaleString()}] ${actionName}.`;
    localStorage.setItem(LOG_STORAGE_KEY, dailyLog.value);
  };
};

function animateStat(element, prefix, start, end, decimals = 0, duration = 500) {
  if (!element) return;
  const startTime = performance.now();
  function animate(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const value = start + (end - start) * progress;
    element.textContent = `${prefix}: ${value.toFixed(decimals)}`;
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }
  requestAnimationFrame(animate);
}

function updateDisplay() {
  animateStat(xpDisplay, 'XP', parseFloat(xpDisplay.textContent.split(': ')[1]) || 0, xp, 0);
  animateStat(levelDisplay, 'Level', parseFloat(levelDisplay.textContent.split(': ')[1]) || 1, level, 0);
  animateStat(strengthDisplay, 'Strength', parseFloat(strengthDisplay.textContent.split(': ')[1]) || 0, strength, 2);
  animateStat(disciplineDisplay, 'Discipline (Marine)', parseFloat(disciplineDisplay.textContent.split(': ')[1]) || 0, discipline, 2);
  animateStat(intellectDisplay, 'Intellect (Coding)', parseFloat(intellectDisplay.textContent.split(': ')[1]) || 0, intellect, 2);
  animateStat(exerciseDisplay, 'Physical Fitness', parseFloat(exerciseDisplay.textContent.split(': ')[1]) || 0, exercise, 2);
  animateStat(meditationDisplay, 'Mindfulness', parseFloat(meditationDisplay.textContent.split(': ')[1]) || 0, meditation, 2);
  animateStat(wakeUpEarlyDisplay, 'Early Riser', parseFloat(wakeUpEarlyDisplay.textContent.split(': ')[1]) || 0, wakeUpEarly, 2);
  animateStat(stayUpLateDisplay, 'Late Nights', parseFloat(stayUpLateDisplay.textContent.split(': ')[1]) || 0, stayUpLate, 2);
  animateStat(negativeSelfTalkDisplay, 'Self-Talk', parseFloat(negativeSelfTalkDisplay.textContent.split(': ')[1]) || 0, negativeSelfTalk, 2);
  animateStat(junkFoodDisplay, 'Nutrition', parseFloat(junkFoodDisplay.textContent.split(': ')[1]) || 0, junkFood, 2);
  animateStat(impulseSpendingDisplay, 'Financial Discipline', parseFloat(impulseSpendingDisplay.textContent.split(': ')[1]) || 0, impulseSpending, 2);
}

function saveState() {
  const data = {
    xp,
    level,
    strength,
    discipline,
    intellect,
    exercise,
    meditation,
    wakeUpEarly,
    stayUpLate,
    negativeSelfTalk,
    junkFood,
    impulseSpending
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);

  if(!raw) {
    updateDisplay();
    return;
  };

  try {
    const data = JSON.parse(raw);
    xp = data.xp ?? 0;
    level = data.level ?? 1;
    strength = data.strength ?? 0;
    discipline = data.discipline ?? 0;
    intellect = data.intellect ?? 0;
    exercise = data.exercise ?? 0;
    meditation = data.meditation ?? 0;
    wakeUpEarly = data.wakeUpEarly ?? 0;
    stayUpLate = data.stayUpLate ?? 0;
    negativeSelfTalk = data.negativeSelfTalk ?? 0;
    junkFood = data.junkFood ?? 0;
    impulseSpending = data.impulseSpending ?? 0;
  } catch (e) {
    console.error('Failed to load save', e);
  }
  updateDisplay();
}
  // Show startup info about localStorage
  window.addEventListener('DOMContentLoaded', () => {
    // Create terminal-style modal
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.background = 'rgba(17, 17, 17, 0.98)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = '9999';

    const box = document.createElement('div');
    box.style.background = '#111';
    box.style.border = '2px solid #00ff41';
    box.style.borderRadius = '10px';
    box.style.boxShadow = '0 0 24px #00ff4144';
    box.style.padding = '2rem 2.5rem';
    box.style.color = '#00ff41';
    box.style.fontFamily = "Fira Mono, Menlo, Consolas, monospace";
    box.style.fontSize = '1.15rem';
    box.style.textAlign = 'center';
    box.innerHTML = `<span style='font-size:1.3rem;font-weight:bold;'>Welcome!</span><br><br>This dashboard uses your browser's <span style='color:#fff;'>localStorage</span> only.<br>No data is sent to any server or database.<br><br><button id='closeModalBtn' style='margin-top:1.5rem;background:#111;color:#00ff41;border:1px solid #00ff41;border-radius:6px;padding:0.5rem 1.2rem;font-family:inherit;font-size:1rem;cursor:pointer;'>OK</button>`;

    modal.appendChild(box);
    document.body.appendChild(modal);
    document.getElementById('closeModalBtn').onclick = function() {
      modal.remove();
    };
    loadState();
  });

// Action button event: slow stat progression
actionBtn.addEventListener('click', () => {
  xp = Math.min(xp + 2, MAX_XP);
  level = Math.floor(xp / 10) + 1;
  strength = parseFloat(Math.min(strength + 0.1, MAX_STRENGTH).toFixed(2));
  discipline = parseFloat(Math.min(discipline + 0.1, MAX_DISCIPLINE).toFixed(2));

  logAction('Action performed');
  dailyAndHistoryLog('history', `\n[${new Date().toLocaleString()}] Action performed.`);
  updateDisplay();
  checkAchievements();
  saveState();
});

  // Read button event: slow stat progression
readBtn.addEventListener('click', () => {
  xp = Math.min(xp + 3, MAX_XP);
  level = Math.floor(xp / 100) + 1;
    intellect = parseFloat(Math.min(intellect + 0.2, MAX_INTELLECT).toFixed(2));
    discipline = parseFloat(Math.min(discipline + 0.05, MAX_DISCIPLINE).toFixed(2));

  logAction('Reading performed');
  dailyAndHistoryLog('history', `\n[${new Date().toLocaleString()}] Reading performed.`);
  updateDisplay();
  checkAchievements();
  saveState();
});

// Add button to save daily log entry to log history
if (!document.getElementById('saveLogEntryBtn')) {
  const saveLogEntryBtn = document.createElement('button');
  saveLogEntryBtn.id = 'saveLogEntryBtn';
  saveLogEntryBtn.textContent = 'Add to Log History';
  dailyLog.parentNode.insertBefore(saveLogEntryBtn, dailyLog.nextSibling);
  saveLogEntryBtn.addEventListener('click', () => {
    if (dailyLog && dailyLog.value.trim() !== '') {
      const submittedMsg = dailyLog.value.trim();
      const entry = `\n[${new Date().toLocaleString()}] ${submittedMsg}`;
      dailyAndHistoryLog('history', entry);
      logAction('Log entry saved to history');
      dailyLog.value = '';
      localStorage.setItem(LOG_STORAGE_KEY, dailyLog.value);
      // Store recent logs (max 5)
      let logs = JSON.parse(localStorage.getItem('recentLogs') || '[]');
      logs.unshift(submittedMsg);
      if (logs.length > 5) logs = logs.slice(0, 5);
      localStorage.setItem('recentLogs', JSON.stringify(logs));
      renderRecentLogs();
    } else {
      alert('Daily log is empty. Please enter something before saving.');
    }
  });
}

resetBtn.addEventListener('click', () => {
  showTerminalConfirm('Are you sure you want to reset all stats?', (confirmed) => {
    if (confirmed) {
      xp = 0;
      level = 1;
      strength = 0;
      discipline = 0;
      intellect = 0;
      exercise = 0;
      meditation = 0;
      wakeUpEarly = 0;
      stayUpLate = 0;
      negativeSelfTalk = 0;
      junkFood = 0;
      impulseSpending = 0;
      localStorage.removeItem(STORAGE_KEY);
      updateDisplay();
      saveState();
    }
  });
});

clearLogBtn.addEventListener('click', () => {
  showTerminalConfirm('Clear daily log and recent entries?', (confirmed) => {
    if (confirmed) {
      if (dailyLog) dailyLog.value = '';
      localStorage.removeItem(LOG_STORAGE_KEY);
      localStorage.removeItem('recentLogs');
      if (typeof renderRecentLogs === 'function') renderRecentLogs();
      if (currentLogMessage) currentLogMessage.textContent = 'Your latest log will appear here.';
    }
  });
});

resetHistoryBtn.addEventListener('click', () => {
  showTerminalConfirm('Are you sure you want to reset all log history?', (confirmed) => {
    if (confirmed) {
      localStorage.removeItem(HISTORY_STORAGE_KEY);
      if (logHistory) logHistory.textContent = '';
    }
  });
});


// Unified stat button logic with XP metrics
exerciseBtn.addEventListener('click', () => {
  exercise = Math.min(exercise + 0.2, MAX_EXERCISE);
  xp = Math.min(xp + 1, MAX_XP);
  logAction('Exercised');
  dailyAndHistoryLog('history', `\n[${new Date().toLocaleString()}] Exercised.`);
  updateDisplay();
  saveState();
});
meditationBtn.addEventListener('click', () => {
  meditation = Math.min(meditation + 0.2, MAX_MEDITATION);
  xp = Math.min(xp + 1, MAX_XP);
  logAction('Meditated');
  dailyAndHistoryLog('history', `\n[${new Date().toLocaleString()}] Meditated.`);
  updateDisplay();
  saveState();
});
wakeUpEarlyBtn.addEventListener('click', () => {
  wakeUpEarly = Math.min(wakeUpEarly + 0.2, MAX_WAKEUP_EARLY);
  xp = Math.min(xp + 1, MAX_XP);
  logAction('Woke Up Early');
  dailyAndHistoryLog('history', `\n[${new Date().toLocaleString()}] Woke Up Early.`);
  updateDisplay();
  saveState();
});
stayUpLateBtn.addEventListener('click', () => {
  stayUpLate = Math.max(stayUpLate - 0.2, 0);
  xp = Math.max(xp - 1, 0);
  logAction('Stayed Up Late');
  dailyAndHistoryLog('history', `\n[${new Date().toLocaleString()}] Stayed Up Late.`);
  updateDisplay();
  saveState();
});
negativeSelfTalkBtn.addEventListener('click', () => {
  negativeSelfTalk = Math.max(negativeSelfTalk + 0.2, 0);
  xp = Math.max(xp - 1, 0);
  logAction('Negative Self-Talk');
  dailyAndHistoryLog('history', `\n[${new Date().toLocaleString()}] Negative Self-Talk.`);
  updateDisplay();
  saveState();
});
junkFoodBtn.addEventListener('click', () => {
  junkFood = Math.max(junkFood + 0.2, 0);
  xp = Math.max(xp - 1, 0);
  logAction('Ate Junk Food');
  dailyAndHistoryLog('history', `\n[${new Date().toLocaleString()}] Ate Junk Food.`);
  updateDisplay();
  saveState();
});
impulseSpendingBtn.addEventListener('click', () => {
  impulseSpending = Math.max(impulseSpending + 0.2, 0);
  xp = Math.max(xp - 1, 0);
  logAction('Impulse Spending');
  dailyAndHistoryLog('history', `\n[${new Date().toLocaleString()}] Impulse Spending.`);
  updateDisplay();
  saveState();
});

function handleHabit(stat, max, logMsg, isGood = true) {
  switch (stat) {
    case 'exercise':
      exercise = Math.min(exercise + (isGood ? 0.2 : -0.2), max);
      break;
    case 'meditation':
      meditation = Math.min(meditation + (isGood ? 0.2 : -0.2), max);
      break;
    case 'wakeUpEarly':
      wakeUpEarly = Math.min(wakeUpEarly + (isGood ? 0.2 : -0.2), max);
      break;
    case 'stayUpLate':
      stayUpLate = Math.max(stayUpLate + (isGood ? -0.2 : 0.2), 0); // bad habit
      break;
    case 'negativeSelfTalk':
      negativeSelfTalk = Math.max(negativeSelfTalk + (isGood ? -0.2 : 0.2), 0); // bad habit
      break;
    case 'junkFood':
      junkFood = Math.max(junkFood + (isGood ? -0.2 : 0.2), 0); // bad habit
      break;
    case 'impulseSpending':
      impulseSpending = Math.max(impulseSpending + (isGood ? -0.2 : 0.2), 0); // bad habit
      break;
    default:
      return;
  }
  // Format to two decimals
  exercise = +exercise.toFixed(2);
  meditation = +meditation.toFixed(2);
  wakeUpEarly = +wakeUpEarly.toFixed(2);
  stayUpLate = +stayUpLate.toFixed(2);
  negativeSelfTalk = +negativeSelfTalk.toFixed(2);
  junkFood = +junkFood.toFixed(2);
  impulseSpending = +impulseSpending.toFixed(2);
  logAction(logMsg);
  dailyAndHistoryLog('history', `\n[${new Date().toLocaleString()}] ${logMsg}.`);
  updateDisplay();
  saveState();
}

function showTerminalConfirm(message, callback) {
  const modal = document.createElement('div');
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100vw';
  modal.style.height = '100vh';
  modal.style.background = 'rgba(17, 17, 17, 0.98)';
  modal.style.display = 'flex';
  modal.style.alignItems = 'center';
  modal.style.justifyContent = 'center';
  modal.style.zIndex = '9999';

  const box = document.createElement('div');
  box.style.background = '#111';
  box.style.border = '2px solid #00ff41';
  box.style.borderRadius = '10px';
  box.style.boxShadow = '0 0 24px #00ff4144';
  box.style.padding = '2rem 2.5rem';
  box.style.color = '#00ff41';
  box.style.fontFamily = "Fira Mono, Menlo, Consolas, monospace";
  box.style.fontSize = '1.15rem';
  box.style.textAlign = 'center';
  box.innerHTML = `<span style='font-size:1.1rem;font-weight:bold;'>Warning</span><br><br>${message}<br><br><button id='confirmYes' style='margin-right:1rem;background:#111;color:#00ff41;border:1px solid #00ff41;border-radius:6px;padding:0.5rem 1.2rem;font-family:inherit;font-size:1rem;cursor:pointer;'>Yes</button><button id='confirmNo' style='background:#111;color:#00ff41;border:1px solid #00ff41;border-radius:6px;padding:0.5rem 1.2rem;font-family:inherit;font-size:1rem;cursor:pointer;'>No</button>`;

  modal.appendChild(box);
  document.body.appendChild(modal);
  document.getElementById('confirmYes').onclick = function() {
    modal.remove();
    callback(true);
  };
  document.getElementById('confirmNo').onclick = function() {
    modal.remove();
    callback(false);
  };
}
