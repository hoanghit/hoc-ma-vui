const $ = s => document.querySelector(s),
    $$ = s => [...document.querySelectorAll(s)];
let toastTimer;

function toast(t) {
    $('#toast').textContent = t;
    $('#toast').classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => $('#toast').classList.remove('show'), 2400)
}
const levels = {
    'spark-1': ['IC3 SPARK GS6 - Level 1', '🌱', '#f3ad10'],
    'spark-2': ['IC3 SPARK GS6 - Level 2', '🌿', '#f07800'],
    'spark-3': ['IC3 SPARK GS6 - Level 3', '🌳', '#e94e2d'],
    'gs-1': ['IC3 GS6 - Level 1', '🥇', '#159c9d'],
    'gs-2': ['IC3 GS6 - Level 2', '🥈', '#079d87'],
    'gs-3': ['IC3 GS6 - Level 3', '🥉', '#159476']
};
const topics = [{
    title: 'Chủ đề 1: Cơ bản về công nghệ',
    modules: [
        ['1, 2', 'Phần cứng máy tính'],
        ['3', 'Phần mềm và các loại phần mềm'],
        ['4', 'Hệ điều hành và chương trình ứng dụng'],
        ['5, 6', 'Tập tin và thư mục'],
        ['7', 'Thiết bị di động'],
        ['8', 'Mạng và Internet'],
        ['📝', 'Ôn tập Chủ đề 1', 'review']
    ]
}, {
    title: 'Chủ đề 2: An toàn và bảo mật',
    modules: [
        ['9', 'An toàn khi sử dụng máy tính'],
        ['10', 'Bảo mật thông tin cá nhân'],
        ['📝', 'Ôn tập Chủ đề 2', 'review']
    ]
}, {
    title: 'Chủ đề 3: Ứng dụng và kỹ năng số',
    modules: [
        ['11', 'Làm quen với ứng dụng số'],
        ['12', 'Kỹ năng làm việc với nội dung số'],
        ['📝', 'Ôn tập Chủ đề 3', 'review']
    ]
}];

function showPage(id) {
    ['homeView', 'detailView', 'gameView'].forEach(x => $('#' + x).classList.toggle('hidden', x !== id));
    window.scrollTo(0, 0)
}
$$('.level').forEach(b => b.onclick = () => {
    let d = levels[b.dataset.level];
    $('#detailTitle').textContent = d[0];
    $('#detailEmoji').textContent = d[1];
    $('#banner').style.background = `linear-gradient(120deg,${d[2]},${d[2]}cc)`;
    let wrap = $('#topics');
    wrap.innerHTML = '';
    if (b.dataset.level === 'spark-1') {
        topics.forEach(t => {
            let sec = document.createElement('section');
            sec.className = 'topic';
            let h = document.createElement('h2');
            h.textContent = t.title;
            sec.append(h);
            t.modules.forEach(m => {
                let row = document.createElement('div');
                row.className = 'module';
                let num = document.createElement('b');
                num.className = 'num';
                num.textContent = m[0];
                let name = document.createElement('span');
                name.className = 'module-name';
                name.textContent = m[1];
                let actions = document.createElement('div');
                actions.className = 'actions';
                if (m[2] === 'review') {
                    actions.append(action('Ôn tập', 'review', () => toast('Bài ôn tập chủ đề sẽ được bổ sung.')), action('Kiểm tra', 'test', () => toast('Hãy thêm bộ câu hỏi kiểm tra.')))
                } else {
                    actions.append(action('Bài học', 'lesson', () => toast('Hãy thêm liên kết bài học.')), action('Ôn tập', 'review', () => m[1] === 'Phần cứng máy tính' ? openGame() : toast('Bài ôn tập này sẽ được bổ sung.')))
                }
                row.append(num, name, actions);
                sec.append(row)
            });
            wrap.append(sec)
        })
    } else {
        wrap.innerHTML = '<p class="module">Nội dung học phần của Level này đang được cập nhật.</p>'
    }
    showPage('detailView')
});

function action(text, cls, fn) {
    let b = document.createElement('button');
    b.textContent = text;
    b.className = cls;
    b.onclick = fn;
    return b
}
$('#back').onclick = () => showPage('homeView');
$('#homeLink').onclick = e => {
    e.preventDefault();
    showPage('homeView')
};
$('#materials').onclick = () => toast('Hãy thêm đường dẫn tài liệu.');
$('#copyPass').onclick = () => navigator.clipboard?.writeText('Viettel2025@').then(() => toast('Đã sao chép mật khẩu')).catch(() => toast('Mật khẩu: Viettel2025@'));
const qs = [
    ['Bộ phận nào được xem là “bộ não” của máy tính?', ['CPU (bộ xử lý trung tâm)', 'Màn hình', 'Bàn phím', 'Loa'], 0, 'CPU xử lý lệnh và điều khiển hoạt động của máy tính.'],
    ['Thiết bị nào dùng để nhập văn bản?', ['Màn hình', 'Bàn phím', 'Máy in', 'Loa'], 1, 'Bàn phím là thiết bị nhập.'],
    ['Thiết bị nào hiển thị hình ảnh?', ['Chuột', 'Micro', 'Màn hình', 'Máy quét'], 2, 'Màn hình là thiết bị xuất.'],
    ['Thiết bị nào điều khiển con trỏ?', ['Loa', 'Máy in', 'Webcam', 'Chuột'], 3, 'Chuột giúp di chuyển con trỏ.'],
    ['RAM có chức năng chính nào?', ['Lưu dữ liệu tạm thời', 'In tài liệu', 'Phát âm thanh', 'Hiển thị hình ảnh'], 0, 'RAM lưu tạm dữ liệu khi máy đang hoạt động.'],
    ['Thiết bị nào in tài liệu ra giấy?', ['Bàn phím', 'Máy in', 'Micro', 'Chuột'], 1, 'Máy in xuất thông tin ra giấy.'],
    ['Đâu là thiết bị lưu trữ dữ liệu?', ['Loa', 'Màn hình', 'Ổ cứng', 'Bàn phím'], 2, 'Ổ cứng hoặc SSD lưu dữ liệu lâu dài.'],
    ['Loa máy tính thuộc nhóm nào?', ['Thiết bị nhập', 'Lưu trữ', 'Xử lý', 'Thiết bị xuất'], 3, 'Loa xuất âm thanh.'],
    ['Webcam dùng để làm gì?', ['Thu hình ảnh/video', 'In giấy', 'Lưu điện', 'Gõ văn bản'], 0, 'Webcam thu hình ảnh và video.'],
    ['Bộ phận nào kết nối các linh kiện?', ['Loa', 'Bo mạch chủ', 'Chuột', 'Máy in'], 1, 'Bo mạch chủ kết nối các thành phần chính.'],
    ['Thiết bị nào thu giọng nói?', ['Màn hình', 'Máy in', 'Micro', 'Loa'], 2, 'Micro là thiết bị nhập âm thanh.'],
    ['SSD khác RAM ở điểm nào?', ['Hiển thị ảnh', 'Nhập chữ', 'Phát âm thanh', 'Lưu dữ liệu lâu dài'], 3, 'SSD lưu dữ liệu kể cả khi tắt máy.'],
    ['Máy quét dùng để làm gì?', ['Số hóa tài liệu giấy', 'Phát nhạc', 'Điều khiển con trỏ', 'Làm mát CPU'], 0, 'Máy quét chuyển tài liệu giấy thành dữ liệu số.'],
    ['Đâu là thiết bị xuất?', ['Bàn phím', 'Máy chiếu', 'Chuột', 'Micro'], 1, 'Máy chiếu xuất hình ảnh lên màn chiếu.']
];
const configs = [
    ['Mê cung mạch đồng', 10, 30],
    ['Mê cung xoắn ốc', 12, 25],
    ['Mê cung nhánh rẽ', 14, 20]
];
let maze = 0,
    idx = 0,
    score = 0,
    lives = 3,
    streak = 0,
    time = 30,
    questions = [],
    locked = false,
    timerId = null,
    scores = [];

function openGame() {
    showPage('gameView');
    showGame('intro');
    updateScores()
}

function showGame(which) {
    ['intro', 'play', 'result', 'scoreboard'].forEach(x => $('#' + x).classList.toggle('hidden', x !== which))
}
$('#gameHome').onclick = () => showPage('homeView');
$('#quit').onclick = () => {
    clearInterval(timerId);
    showGame('intro')
};
$('#chooseAgain').onclick = () => showGame('intro');
$('#scoresButton').onclick = () => {
    updateScores();
    showGame('scoreboard')
};
$('#closeScores').onclick = () => showGame('intro');
$('#sound').onclick = e => {
    e.currentTarget.textContent = e.currentTarget.textContent === '🔊' ? '🔇' : '🔊'
};
$$('.maze').forEach(b => b.onclick = () => startGame(+b.dataset.maze));
$('#retry').onclick = () => startGame(maze);

function startGame(n) {
    maze = n;
    idx = score = streak = 0;
    lives = 3;
    questions = [...qs].sort(() => Math.random() - .5).slice(0, configs[n][1]);
    while (questions.length < configs[n][1]) questions.push(qs[questions.length % qs.length]);
    $('#levelLabel').textContent = `LEVEL ${n+1} · ${configs[n][0]}`;
    $('#score').textContent = score;
    $('#lives').textContent = lives;
    $('#play').dataset.player = $('#playerName').value.trim() || 'Học sinh';
    showGame('play');
    renderQ()
}

function renderQ() {
    if (idx >= questions.length || lives <= 0) return finish();
    locked = false;
    time = configs[maze][2];
    $('#timer').textContent = time;
    $('#qCount').textContent = `CÂU ${idx+1}/${questions.length}`;
    $('#streak').textContent = `🔥 Chuỗi đúng: ${streak}`;
    $('#question').textContent = questions[idx][0];
    $('#feedback').textContent = 'Chọn một đáp án để Ong Vàng bay tiếp!';
    $('#feedback').className = '';
    $('#next').disabled = true;
    $('#next').textContent = idx === questions.length - 1 ? 'Xem kết quả →' : 'Tiếp theo →';
    $('#answers').innerHTML = '';
    questions[idx][1].forEach((a, i) => {
        let b = document.createElement('button');
        b.className = 'answer';
        b.innerHTML = `<span>${'ABCD'[i]}</span>`;
        let txt = document.createElement('b');
        txt.textContent = a;
        b.append(txt);
        b.onclick = () => answer(i);
        $('#answers').append(b)
    });
    $('#trackNodes').innerHTML = '';
    for (let i = 0; i < questions.length; i++) {
        let node = document.createElement('i');
        node.className = 'node' + (i < idx ? ' done' : '');
        $('#trackNodes').append(node)
    }
    $('#bee').style.left = `${5+idx/questions.length*83}%`;
    clearInterval(timerId);
    timerId = setInterval(() => {
        time--;
        $('#timer').textContent = time;
        if (time <= 0) answer(-1, true)
    }, 1000)
}

function answer(n, timeout = false) {
    if (locked) return;
    locked = true;
    clearInterval(timerId);
    let q = questions[idx],
        ok = n === q[2];
    $$('.answer').forEach((b, i) => {
        b.disabled = true;
        if (i === q[2]) b.classList.add('correct');
        if (i === n && !ok) b.classList.add('wrong')
    });
    if (ok) {
        streak++;
        score += 100 + time * 3 + (streak >= 3 ? 50 : 0);
        $('#feedback').textContent = 'Chính xác! ' + q[3];
        $('#feedback').className = 'good'
    } else {
        streak = 0;
        lives--;
        $('#feedback').textContent = (timeout ? 'Hết giờ! ' : 'Chưa đúng. ') + q[3];
        $('#feedback').className = 'bad'
    }
    $('#score').textContent = score;
    $('#lives').textContent = lives;
    $('#streak').textContent = `🔥 Chuỗi đúng: ${streak}`;
    $('#next').disabled = false;
    $('#next').textContent = idx === questions.length - 1 || lives <= 0 ? 'Xem kết quả →' : 'Tiếp theo →'
}
$('#next').onclick = () => {
    if (locked) {
        idx++;
        renderQ()
    }
};

function finish() {
    clearInterval(timerId);
    showGame('result');
    let player = $('#play').dataset.player;
    $('#resultTitle').textContent = idx >= questions.length && lives > 0 ? '🎉 Ong Vàng tìm thấy kho báu!' : '🐝 Cố gắng thêm lần nữa nhé!';
    $('#resultText').textContent = `${player} · ${configs[maze][0]} · Hoàn thành ${Math.min(idx,questions.length)} câu.`;
    $('#resultScore').textContent = score;
    scores.push({
        player,
        maze,
        score
    });
    scores.sort((a, b) => b.score - a.score);
    scores = scores.slice(0, 10);
    updateScores()
}

function updateScores() {
    $('#scoreCount').textContent = scores.length;
    $$('[data-record]').forEach(el => {
        let s = scores.find(x => x.maze === +el.dataset.record);
        el.textContent = s ? `Kỷ lục: ${s.score} điểm` : 'Chưa có kỷ lục'
    });
    $('#scoreRows').innerHTML = scores.length ? scores.map((s, i) => `<div class="score-row"><b>${i+1}. ${escapeHtml(s.player)}</b><span>${configs[s.maze][0]} · ${s.score} điểm</span></div>`).join('') : '<p>Chưa có thành tích. Hãy chơi một mê cung nhé!</p>'
}

function escapeHtml(s) {
    return s.replace(/[&<>"']/g, c => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    } [c]))
}
document.addEventListener('keydown', e => {
    if ($('#gameView').classList.contains('hidden') || $('#play').classList.contains('hidden')) return;
    if (/^[a-d]$/i.test(e.key)) answer(e.key.toUpperCase().charCodeAt(0) - 65);
    if (e.key === 'Enter' && !$('#next').disabled) $('#next').click()
});