const philosophers = [
    {
        name: "Friedrich Nietzsche (프리드리히 니체)",
        quote: "나를 죽이지 않는 것은 나를 더 강하게 만든다.",
        advice: "지금 마주한 불안과 고통은 당신을 더 단단한 존재로 빚어내는 필수적인 연단 과정입니다. 타인의 기준에서 벗어나 온전히 당신만의 가치를 개척하십시오."
    },
    {
        name: "Marcus Aurelius (마르쿠스 아우렐리우스)",
        quote: "너의 생각 질서가 너의 마음을 지배한다. 마음이 모든 것을 만든다.",
        advice: "우리를 괴롭히는 것은 객관적 사건이 아니라, 그 사건을 바라보는 우리의 편협한 시선입니다. 통제할 수 없는 미래 대신 지금 이 순간 당신이 통제할 수 있는 행동에 집중하세요."
    },
    {
        name: "Seneca (세네카)",
        quote: "우리는 실제로 부족한 것보다 상상 속에서 더 많이 고통받는다.",
        advice: "아직 오지 않은 불행이나 막연한 두려움으로 소중한 에너지를 소모하지 마세요. 현재의 명료함 속에서 문제를 바라보면 해답은 의외로 가까이에 있습니다."
    },
    {
        name: "Socrates (소크라테스)",
        quote: "성찰하지 않는 삶은 살 가치가 없다.",
        advice: "내가 무엇을 모르고 있는지 정확히 아는 것에서부터 진정한 지혜가 시작됩니다. 지금의 깊은 고민은 스스로에 대한 성찰의 문을 열어주는 훌륭한 계기입니다."
    }
];

const loadingPhrases = [
    "현자가 마음의 결을 더듬는 중입니다...",
    "고통 속에 숨겨진 지혜를 건져 올리는 중입니다...",
    "오래된 사유의 기록을 펼치는 중입니다...",
    "당신의 고민에 온전히 귀를 기울이고 있습니다..."
];

function startContemplation() {
    const inputVal = document.getElementById('worry-input').value.trim();
    if (!inputVal) {
        alert("마음속에 담아둔 고민을 가볍게라도 적어주세요.");
        return;
    }

    document.getElementById('result-user-worry').textContent = `"${inputVal}"`;

    document.getElementById('input-step').classList.add('hidden');
    document.getElementById('loading-step').classList.remove('hidden');
    document.getElementById('loading-step').classList.add('flex');

    let idx = 0;
    const loadingEl = document.getElementById('loading-text');
    const timer = setInterval(() => {
        idx = (idx + 1) % loadingPhrases.length;
        loadingEl.textContent = loadingPhrases[idx];
    }, 900);

    setTimeout(() => {
        clearInterval(timer);

        const data = philosophers[Math.floor(Math.random() * philosophers.length)];
        document.getElementById('philosopher-name').textContent = data.name;
        document.getElementById('philosopher-advice').textContent = data.advice;

        document.getElementById('loading-step').classList.remove('flex');
        document.getElementById('loading-step').classList.add('hidden');
        document.getElementById('result-step').classList.remove('hidden');

        typeWriterEffect(`"${data.quote}"`, document.getElementById('philosopher-quote'));

    }, 2600);
}

function typeWriterEffect(text, element) {
    element.textContent = "";
    let i = 0;
    function typing() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typing, 35);
        }
    }
    typing();
}

function copyQuote() {
    const quoteText = document.getElementById('philosopher-quote').textContent;
    const adviceText = document.getElementById('philosopher-advice').textContent;
    const philName = document.getElementById('philosopher-name').textContent;
    const userWorry = document.getElementById('result-user-worry').textContent;
    
    navigator.clipboard.writeText(`[나의 고민]\n${userWorry}\n\n${quoteText}\n- ${philName}\n\n[해설] ${adviceText}`).then(() => {
        const copyTextSpan = document.getElementById('copy-text');
        copyTextSpan.textContent = "복사 완료!";
        setTimeout(() => {
            copyTextSpan.textContent = "문장 복사하기";
        }, 2000);
    });
}

function resetApp() {
    document.getElementById('worry-input').value = '';
    document.getElementById('result-step').classList.add('hidden');
    document.getElementById('input-step').classList.remove('hidden');
}
