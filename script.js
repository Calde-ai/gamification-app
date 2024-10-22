
// Lista delle attività giornaliere
const dailyActivities = [
    { time: "5:30 - 6:00", activity: "Sveglia, bere un bicchiere d’acqua, stretching o yoga" },
    { time: "6:00 - 6:30", activity: "Colazione sana" },
    { time: "6:30 - 7:00", activity: "Leggere/Portare in giro il cane" },
    { time: "7:00 - 7:45", activity: "Esercizio fisico (cardio e pesi)" },
    { time: "7:45 - 8:00", activity: "Doccia fredda e meditazione" },
    { time: "8:00 - 8:30", activity: "Analisi del mercato in pre-apertura sessione" },
    { time: "8:30 - 9:00", activity: "Preparazione per la giornata" },
    { time: "9:00 - 13:00", activity: "Lavoro intenso (trading e altre attività imprenditoriali)" },
    { time: "13:00 - 13:30", activity: "Pausa pranzo" },
    { time: "13:30 - 14:00", activity: "Continuazione del lavoro (trading, analisi, gestione del business)" },
    { time: "14:00 - 14:15", activity: "Pausa breve" },
    { time: "14:15 - 17:00", activity: "Continuazione del lavoro (trading, analisi, gestione del business)" },
    { time: "17:00 - 18:00", activity: "Tempo dedicato alla casa e ai doveri domestici" },
    { time: "18:00 - 19:00", activity: "Tempo di qualità con la tua ragazza" },
    { time: "19:00 - 19:30", activity: "Cena leggera" },
    { time: "19:30 - 20:30", activity: "Attività rilassanti (lettura, musica, passeggiata)" },
    { time: "20:30 - 21:00", activity: "Routine notturna (spegnere gli schermi, riflessione, diario)" },
    { time: "21:00 - 22:00", activity: "Pianificazione della giornata" },
    { time: "23:00", activity: "Andare a letto" }
];

// Variabili per i punteggi
let dailyScore = 0;
let monthlyScore = 0;
let totalScore = 0;
let completedActivities = [];

// Funzione per generare la lista delle attività
function generateDailyActivities() {
    const form = document.getElementById('activity-form');
    dailyActivities.forEach((activity, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <label>${activity.time} - ${activity.activity}</label>
            <input type="number" id="score-${index}" min="-5" max="5" placeholder="Dai un voto">
            <button type="button" onclick="markAsDone(${index})">Completato</button>
        `;
        form.appendChild(listItem);
    });
}

// Funzione per segnare un'attività come completata e assegnare un punteggio
function markAsDone(index) {
    const scoreInput = document.getElementById(`score-${index}`);
    const score = parseInt(scoreInput.value);

    if (!isNaN(score)) {
        dailyScore += score;
        monthlyScore += score;
        totalScore += score;

        // Aggiungi l'attività alla lista delle completate
        completedActivities.push({ activity: dailyActivities[index].activity, score, time: new Date().toLocaleTimeString() });
        updateCompletedList();
        updateScore();
    } else {
        alert('Per favore, assegna un punteggio all'attività.');
    }
}

// Aggiorna i punteggi nella dashboard
function updateScore() {
    document.getElementById('daily-score').innerText = dailyScore;
    document.getElementById('monthly-score').innerText = monthlyScore;
    document.getElementById('total-score').innerText = totalScore;
}

// Funzione per mostrare le attività completate
function updateCompletedList() {
    const completedList = document.getElementById('completed-list');
    completedList.innerHTML = ''; // Resetta la lista
    completedActivities.forEach((activity, index) => {
        const activityItem = document.createElement('div');
        activityItem.classList.add('completed-item');
        activityItem.innerHTML = `
            <p>${activity.activity} - Punteggio: ${activity.score} (Completato alle: ${activity.time})</p>
            <button onclick="removeActivity(${index})">Elimina</button>
        `;
        completedList.appendChild(activityItem);
    });
}

// Funzione per eliminare un'attività completata
function removeActivity(index) {
    const activity = completedActivities[index];
    dailyScore -= activity.score;
    monthlyScore -= activity.score;
    totalScore -= activity.score;
    completedActivities.splice(index, 1); // Rimuove l'attività dall'array
    updateCompletedList();
    updateScore();
}

// Funzione per resettare il punteggio giornaliero a mezzanotte
function resetDailyScore() {
    const now = new Date();
    const timeToMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1) - now;
    
    setTimeout(() => {
        dailyScore = 0;
        updateScore();
        resetDailyScore(); // Pianifica il reset per il giorno successivo
    }, timeToMidnight);
}

// Funzione per mostrare la sezione desiderata nella pagina
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

// Inizializza la pagina e genera le attività
window.onload = function() {
    generateDailyActivities();
    updateScore();
    resetDailyScore();
};
