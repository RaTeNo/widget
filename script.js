document.addEventListener('DOMContentLoaded', () => {
    // Изменены ID элементов на уникальные
    const chatToggleButton = document.getElementById('oc-chat-toggle-button');
    const onlineConsultant = document.getElementById('oc-online-consultant');
    const closeChatButton = document.getElementById('oc-close-chat-button');

    // Изменен селектор для тела чата
    const consultantBody = document.querySelector('.oc-online-consultant-body'); // Для возможности скролла

    // Открытие чата
    chatToggleButton.addEventListener('click', () => {
        onlineConsultant.classList.add('open');
        chatToggleButton.style.opacity = '0'; // Скрываем кнопку, когда чат открыт
        chatToggleButton.style.pointerEvents = 'none'; // Отключаем события кликов

        // В простейшем случае, можно прокручивать до низа при открытии
        consultantBody.scrollTop = consultantBody.scrollHeight;
    });

    // Закрытие чата
    closeChatButton.addEventListener('click', () => {
        onlineConsultant.classList.remove('open');
        chatToggleButton.style.opacity = '1'; // Показываем кнопку, когда чат закрыт
        chatToggleButton.style.pointerEvents = 'auto'; // Включаем события кликов
    }); 
    
});