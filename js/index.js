// 1. 초기 데이터 불러오기 (로컬스토리지 우선, 없으면 기본값)
let savedData = JSON.parse(localStorage.getItem('myDiary')) || {
    '2026-01-15': ['🙏🏻'] // 기본 예시 데이터
};

// 2. 숫자 패딩 메서드
Number.prototype.pad = function() {
    return this > 9 ? this : '0' + this;
}

let date = new Date();

// 3. 메모 추가 및 저장 함수
const addMemo = (dateStr) => {
    // 기존 메모 가져오기 (배열 형태 유지)
    const currentMemos = savedData[dateStr] || [];
    const oldMemo = currentMemos.join(', '); // 입력창에 보여줄 기존 내용

    // const newMemo = prompt(`${dateStr}에 기록할 메모나 이모지를 입력하세요:`, oldMemo);

    if (newMemo !== null) {
        if (newMemo.trim() === "") {
            delete savedData[dateStr]; // 빈 칸이면 삭제
        } else {
            // 쉼표로 구분해서 배열로 저장하거나, 통째로 저장
            savedData[dateStr] = [newMemo.trim()];
        }
        
        // 로컬스토리지에 물리적 저장 (기기별 개별 저장의 핵심)
        localStorage.setItem('myDiary', JSON.stringify(savedData));
        
        // 화면 다시 그리기
        renderCal(date);
    }
};

const renderCal = (targetDate) => {
    const viewYear = targetDate.getFullYear();
    const viewMonth = targetDate.getMonth();

    document.querySelector('.date-now').textContent = `${viewYear}년 ${viewMonth + 1}월`;

    // 날짜 계산 수정 (1일의 요일 구하기)
    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const lastDay = new Date(viewYear, viewMonth + 1, 0).getDate();

    let htmlDummy = '';

    for (let i = 0; i < firstDay; i++) {
        htmlDummy += `<div class="noColor"></div>`;
    }

    for (let i = 1; i <= lastDay; i++) {
        const dateStr = `${viewYear}-${(viewMonth + 1).pad()}-${i.pad()}`;
        
        // 1. 해당 날짜에 저장된 데이터가 있는지 확인
        const contents = savedData[dateStr] || [];
        
        // 2. 데이터가 있으면 표시할 이모지 설정, 없으면 빈 문자열
        // 텍스트 내용은 변수에 담지 않고 이모지만 출력합니다.
        const hasMemoEmoji = contents.length > 0 ? '🙏🏻' : ''; 
    
        htmlDummy += `
            <div class="date-cell" onclick="openModal('${dateStr}')">
                <span class="day-num">${i}</span>
                <div class="content-area">
                    <span class="status-emoji">${hasMemoEmoji}</span>
                </div>
            </div>`;
    }
    const limitDay = firstDay + lastDay;
    const nextDay = Math.ceil(limitDay / 7) * 7;
    for (let i = limitDay; i < nextDay; i++) {
        htmlDummy += `<div class="noColor"></div>`;
    }

    document.querySelector('.date-board').innerHTML = htmlDummy;
};

// --- 초기 실행 및 버튼/슬라이드 이벤트 ---
renderCal(date);

document.querySelector('.date-last').onclick = () => {
    date.setMonth(date.getMonth() - 1);
    renderCal(date);
};
document.querySelector('.date-next').onclick = () => {
    date.setMonth(date.getMonth() + 1);
    renderCal(date);
};

// 가로 슬라이드(스와이프)
let touchStartX = 0;
document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const distance = touchEndX - touchStartX;
    const threshold = 100;

    if (distance < -threshold) { 
        date.setMonth(date.getMonth() + 1);
        renderCal(date);
    } else if (distance > threshold) {
        date.setMonth(date.getMonth() - 1);
        renderCal(date);
    }
}, { passive: true });


// 모달
// 전역 변수로 현재 선택된 날짜 관리
let currentSelectedDate = "";

// 모달 제어 함수
const openModal = (dateStr) => {
    currentSelectedDate = dateStr;
    const modal = document.getElementById('modal-overlay');
    const input = document.getElementById('modal-input');
    const title = document.getElementById('modal-title');

    title.textContent = `${dateStr}`;
    
    // 기존 데이터 불러와서 입력창에 넣어주기
    const contents = savedData[dateStr] || [];
    input.value = contents.join(', ');

    modal.classList.remove('hidden');
};

const closeModal = () => {
    document.getElementById('modal-overlay').classList.add('hidden');
};

// 저장 버튼 클릭 시
document.getElementById('modal-save').onclick = () => {
    const text = document.getElementById('modal-input').value;
    
    if (text.trim() === "") {
        delete savedData[currentSelectedDate];
    } else {
        savedData[currentSelectedDate] = [text.trim()];
    }

    localStorage.setItem('myDiary', JSON.stringify(savedData));
    renderCal(date);
    closeModal();
};

// 취소 버튼 클릭 시
document.getElementById('modal-close').onclick = closeModal;
