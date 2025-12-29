document.addEventListener('DOMContentLoaded', function() {
    
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(function(item) {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isOpen = item.classList.contains('open');
            
            faqItems.forEach(function(faqItem) {
                faqItem.classList.remove('open');
                faqItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });
            
            if (!isOpen) {
                item.classList.add('open');
                question.setAttribute('aria-expanded', 'true');
            }
        });
    });
    
    const chatWidget = document.getElementById('chatWidget');
    const chatToggle = document.getElementById('chatToggle');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');

    const responses = [
        "Ah, eine Aufgabe! Lass mich kurz überlegen... Hast du schon alle YouTube-Videos von heute gesehen? Das ist definitiv wichtiger. 📺",
        "Interessant! Aber bevor du das machst, solltest du vielleicht erstmal einen Kaffee holen. Produktivität braucht Koffein! ☕",
        "Diese Aufgabe klingt wichtig. Zu wichtig, um sie jetzt zu erledigen. Schlaf lieber nochmal drüber! 😴",
        "Meine KI-Analyse sagt: Der perfekte Zeitpunkt für diese Aufgabe ist... später. Viel später. 🕐",
        "Hast du schon den Kühlschrank aufgeräumt? Das ist auch eine Art von Produktivität! 🍕",
        "Laut meinen Berechnungen ist Prokrastinieren in 128% der Fälle die richtige Entscheidung. Trust the science! 🔬",
        "Bevor du anfängst, solltest du erstmal 3 Stunden recherchieren, wie man Aufgaben am besten erledigt. 📚",
        "Diese Aufgabe verdient deine volle Aufmerksamkeit. Und dafür brauchst du Energie. Netflix-Pause? 🎬",
        "Fun Fact: Die besten Ideen kommen beim Nichtstun. Also... mach weiter so! 💡",
        "Ich würde ja helfen, aber meine Algorithmen sagen, dass Montag ein besserer Tag dafür ist. 📅",
        "Hast du heute schon deine Pflanzen gegossen? Prioritäten! 🌱",
        "Eine weise KI hat mal gesagt: 'Was du heute kannst besorgen, das verschiebe ruhig auf morgen.' Das war ich. 🧠"
    ];

    let isTyping = false;

    chatToggle.addEventListener('click', function() {
        chatWidget.classList.toggle('open');
        if (chatWidget.classList.contains('open')) {
            chatInput.focus();
        }
    });

    function sendMessage() {
        const message = chatInput.value.trim();
        if (message === '' || isTyping) return;

        addMessage(message, 'user');
        chatInput.value = '';

        isTyping = true;
        showTypingIndicator();

        const delay = 1000 + Math.random() * 2000;
        setTimeout(function() {
            hideTypingIndicator();
            const response = responses[Math.floor(Math.random() * responses.length)];
            addMessage(response, 'bot');
            isTyping = false;
        }, delay);
    }

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}`;
        
        const avatar = sender === 'bot' ? '🛋️' : '👤';
        
        messageDiv.innerHTML = `
            <span class="message-avatar">${avatar}</span>
            <div class="message-content">
                <p>${escapeHtml(text)}</p>
            </div>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-message bot';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = `
            <span class="message-avatar">🛋️</span>
            <div class="message-content">
                <p class="thinking-text">Denkt nach...</p>
            </div>
        `;
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    chatSend.addEventListener('click', sendMessage);
    
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});

