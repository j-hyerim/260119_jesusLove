// script.js
const chatBox = document.getElementById('chat-box');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');

function sendMessage() {
    const text = chatInput.value.trim();
    if (text === "") return;

    // 현재 날짜 및 시간 생성
    const now = new Date();
    const dateString = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 메시지 요소 만들기
    const messageWrapper = document.createElement('div');
    messageWrapper.className = 'message-wrapper';

    messageWrapper.innerHTML = `
        <div class="message-bubble">${text}</div>
        <div class="message-info">${dateString} | ${timeString}</div>
    `;

    // 채팅창에 추가 및 스크롤 조절
    chatBox.appendChild(messageWrapper);
    chatInput.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
}

// 이벤트 리스너: 버튼 클릭 및 엔터키 지원
sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

// 키워드 설정
const shortcuts = {
    "감사일기": "오늘의 감사한 일을 기록하는 페이지로 이동할까요?",
    "기도제목": "기도 목록을 정리하는 페이지로 이동할까요?",
    "감사 일기": "오늘의 감사한 일을 기록하는 페이지로 이동할까요?",
    "기도 제목": "기도 목록을 정리하는 페이지로 이동할까요?"
};

function sendMessage() {
    const text = chatInput.value.trim();
    if (text === "") return;

    const now = new Date();
    const dateString = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1. 일반 메시지 추가
    const messageWrapper = document.createElement('div');
    messageWrapper.className = 'message-wrapper';
    messageWrapper.innerHTML = `
        <div class="message-bubble">${text}</div>
        <div class="message-info">${dateString} | ${timeString}</div>
    `;
    chatBox.appendChild(messageWrapper);

    // 2. 키워드 체크 및 바로가기 상자 생성
    checkKeywords(text);

    chatInput.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
}

function checkKeywords(text) {
    for (let key in shortcuts) {
        if (text.includes(key)) {
            createShortcutElement(key, shortcuts[key]);
        }
    }
}

function createShortcutElement(title, description) {
    const box = document.createElement('div');
    box.className = 'shortcut-box';
    box.innerHTML = `
        <div class="shortcut-text">
        오늘의 <strong>[${title}]</strong> 적으셨나요?
        </div>
        <button class="shortcut-btn"><a href="../../cale.html">이동하기</a></button>
    `;
    chatBox.appendChild(box);
}
function sendSystemMessage(title, description) {
    const box = document.createElement('div');
    box.className = 'shortcut-box';
    box.innerHTML = `
        <div class="shortcut-text">
            <h3> 안녕하세요 <strong>지져스러브 채팅방입니다</strong></h3>
            <br>
            <p>이 채팅방은 일상을 하나님께 공유하기 위해 존재합니다</p>
            <p>우리가 자주 사용하는 스마트폰으로 하나님과 더욱 가까워 지면 얼마나 좋을까요? <br>부모님께 일상을 공유하듯, 하나님께 일상을 알리며 하나님을 습관처럼 찾길 바라며..</p>
            <br>
            <ins>
            “ 너희가 내 안에 거하고 내 말이 너희 안에 거하면 무엇이든지 원하는 대로 구하라 그리하면 이루리라 "
            <br>
            요한복음 15장 7절</ins>
            <br>
            <br>
        </div>
        
    `;
    chatBox.appendChild(box);
}
function sendSystemMessage2() {
    const box = document.createElement('div');
    box.className = 'shortcut-box';
    box.innerHTML = `
        <div class="shortcut-text">
        <h3>기도제목 또는 감사일기를 적어보시겠어요?</h3>
        </div>
    `;
    chatBox.appendChild(box);
}

window.onload = () => {
    sendSystemMessage()
    sendSystemMessage2()
};
