document.addEventListener('DOMContentLoaded', () => {
    const chatToggleButton = document.getElementById('oc-chat-toggle-button');
    const onlineConsultant = document.getElementById('oc-online-consultant');
    const closeChatButton = document.getElementById('oc-close-chat-button');
    const consultantBody = document.querySelector('.oc-online-consultant-body');

    // Функция для открытия чата
    function openChat() {
        // Проверяем, не открыт ли чат уже
        if (!onlineConsultant.classList.contains('open')) {
            onlineConsultant.classList.add('open');
            chatToggleButton.style.opacity = '0'; // Скрываем кнопку, когда чат открыт
            chatToggleButton.style.pointerEvents = 'none'; // Отключаем события кликов
            consultantBody.scrollTop = consultantBody.scrollHeight; // Прокрутка к низу
        }
    }

    // Функция для закрытия чата
    function closeChat() {
        onlineConsultant.classList.remove('open');
        chatToggleButton.style.opacity = '1'; // Показываем кнопку, когда чат закрыт
        chatToggleButton.style.pointerEvents = 'auto'; // Включаем события кликов

        // Очищаем таймер, если он еще активен (на случай, если пользователь закрыл чат до автооткрытия)
        clearTimeout(autoOpenTimeout);
    }

    // Обработчики событий (остаются без изменений, но вызывают новые функции)
    chatToggleButton.addEventListener('click', openChat);
    closeChatButton.addEventListener('click', closeChat);

    // --- Добавление автоматического открытия через 30 секунд ---
    const AUTO_OPEN_DELAY = 30000; // 30 секунд в миллисекундах
    let autoOpenTimeout; // Переменная для хранения ID таймера, чтобы его можно было отменить

    // Устанавливаем таймер на автоматическое открытие чата
    // Мы хотим, чтобы он открылся, ЕСЛИ пользователь не взаимодействовал с кнопкой
    // в течение этого времени И не закрыл чат, если он уже был открыт.
    autoOpenTimeout = setTimeout(() => {
        // Проверяем, если чат все еще закрыт, тогда открываем его
        if (!onlineConsultant.classList.contains('open')) {
            openChat();
        }
    }, AUTO_OPEN_DELAY);


    // Опционально: Если пользователь кликает на кнопку ДО истечения 30 секунд,
    // мы можем отменить автоматическое открытие.
    chatToggleButton.addEventListener('click', () => {
        clearTimeout(autoOpenTimeout); // Отменить запланированное автооткрытие
        openChat(); // И открыть чат немедленно
    });

    // Опционально: Если чат был открыт (например, автоматически) и пользователь его закрыл,
    // возможно, не стоит открывать его снова через какое-то время,
    // или можно сбросить таймер и запустить его заново, если это нужно.
    // В данном случае, при закрытии чата (closeChat), таймер autoOpenTimeout
    // очищается, что предотвращает его повторное срабатывание.
});