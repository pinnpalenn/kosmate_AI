// Realistic Utility Bill Data for Students (in IDR)
const tagihanDasar = {
    listrikAC: "75.000",
    listrikNonAC: "40.000",
    air: "35.000",
    wifi: "50.000"
};

// Dummy Data for 12 Rooms with Financial Breakdown
const roomsData = [
    { id: '01', name: 'Budi Santoso', phone: '0812-3456-7890', mac: 'A1:B2:C3:D4:E5:F6', ip: '192.168.1.11', usage: '124.5', status: 'lunas', joinDate: 'Jan 2025', listrik: tagihanDasar.listrikAC, air: tagihanDasar.air, wifi: tagihanDasar.wifi, total: '160.000' },
    { id: '02', name: 'Andi Wijaya', phone: '0821-9876-5432', mac: '11:22:33:44:55:66', ip: '192.168.1.12', usage: '89.2', status: 'lunas', joinDate: 'Feb 2025', listrik: tagihanDasar.listrikNonAC, air: tagihanDasar.air, wifi: tagihanDasar.wifi, total: '125.000' },
    { id: '03', name: 'Dimas Pratama', phone: '0853-1122-3344', mac: 'FF:EE:DD:CC:BB:AA', ip: '192.168.1.13', usage: '210.8', status: 'nunggak', joinDate: 'Mar 2025', listrik: tagihanDasar.listrikAC, air: tagihanDasar.air, wifi: tagihanDasar.wifi, total: '160.000' },
    { id: '04', name: 'Reza Pahlevi', phone: '0811-2233-4455', mac: 'AA:11:BB:22:CC:33', ip: '192.168.1.14', usage: '45.1', status: 'lunas', joinDate: 'Jan 2025', listrik: tagihanDasar.listrikAC, air: tagihanDasar.air, wifi: tagihanDasar.wifi, total: '160.000' },
    { id: '05', name: 'Kevin Julio', phone: '0813-5566-7788', mac: '00:1A:2B:3C:4D:5E', ip: '192.168.1.15', usage: '15.6', status: 'pending', joinDate: 'Apr 2025', listrik: tagihanDasar.listrikNonAC, air: tagihanDasar.air, wifi: tagihanDasar.wifi, total: '125.000' },
    { id: '06', name: 'Arief Muhammad', phone: '0896-1234-5678', mac: '99:88:77:66:55:44', ip: '192.168.1.16', usage: '305.2', status: 'lunas', joinDate: 'Dec 2024', listrik: tagihanDasar.listrikAC, air: tagihanDasar.air, wifi: tagihanDasar.wifi, total: '160.000' },
    { id: '07', name: 'Gilang Dirga', phone: '0852-9988-7766', mac: '1A:2B:3C:4D:5E:6F', ip: '192.168.1.17', usage: '102.4', status: 'lunas', joinDate: 'Feb 2025', listrik: tagihanDasar.listrikAC, air: tagihanDasar.air, wifi: tagihanDasar.wifi, total: '160.000' },
    { id: '08', name: 'Kosong', phone: '-', mac: '-', ip: '-', usage: '0', status: 'empty', joinDate: '-', listrik: '0', air: '0', wifi: '0', total: '0' },
    { id: '09', name: 'Raffi Ahmad', phone: '0878-1122-3344', mac: 'C1:D2:E3:F4:A5:B6', ip: '192.168.1.19', usage: '500.1', status: 'lunas', joinDate: 'Jan 2025', listrik: tagihanDasar.listrikAC, air: tagihanDasar.air, wifi: tagihanDasar.wifi, total: '160.000' },
    { id: '10', name: 'Raditya Dika', phone: '0819-5555-6666', mac: '55:44:33:22:11:00', ip: '192.168.1.20', usage: '65.3', status: 'nunggak', joinDate: 'May 2025', listrik: tagihanDasar.listrikNonAC, air: tagihanDasar.air, wifi: tagihanDasar.wifi, total: '125.000' },
    { id: '11', name: 'Kosong', phone: '-', mac: '-', ip: '-', usage: '0', status: 'empty', joinDate: '-', listrik: '0', air: '0', wifi: '0', total: '0' },
    { id: '12', name: 'Deddy Corbuzier', phone: '0812-9999-0000', mac: '7A:8B:9C:0D:1E:2F', ip: '192.168.1.22', usage: '10.5', status: 'lunas', joinDate: 'Mar 2025', listrik: tagihanDasar.listrikAC, air: tagihanDasar.air, wifi: tagihanDasar.wifi, total: '160.000' },
];

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', () => {
    renderRooms();
    renderTenantsTable();
    setupTabs();
    initChart();
    
    // Start main HUD clock
    setInterval(updateMainHudTime, 500);
    
    // Auto motion simulation every 30s
    setInterval(() => triggerMotionAlert(), 30000);
    
    // Test Notification
    setTimeout(() => {
        showToastNotification("Kamar 05 (Kevin Julio)", "Rp 125.000");
    }, 4000);
});

// Render Room Grid
function renderRooms() {
    const container = document.getElementById('rooms-container');
    container.innerHTML = '';

    roomsData.forEach(room => {
        if(room.status === 'empty') return;

        let badgeStr = '';
        let wifiClass = 'on';
        if (room.status === 'lunas') badgeStr = 'Lunas';
        else if (room.status === 'nunggak') { badgeStr = 'Nunggak'; wifiClass = 'off'; }
        else if (room.status === 'pending') badgeStr = 'Pending';
        else badgeStr = 'Kosong';

        const html = `
            <div class="room-card glass ${room.status}" onclick="openModal('${room.id}')" id="card-room-${room.id}">
                <div class="rc-header">
                    <h3>Kamar ${room.id}</h3>
                    <i class="fa-solid fa-wifi wifi-indicator ${wifiClass}" id="wifi-icon-${room.id}"></i>
                </div>
                <div class="rc-tenant">
                    <div class="ava"><i class="fa-solid fa-user"></i></div>
                    <p>${room.name}</p>
                </div>
                <span class="status-badge ${room.status}" id="badge-room-${room.id}">${badgeStr}</span>
            </div>
        `;
        container.innerHTML += html;
    });
}

// Render Tenants Table
function renderTenantsTable() {
    const tbody = document.getElementById('tenants-tbody');
    tbody.innerHTML = '';
    
    roomsData.forEach(r => {
        if(r.status === 'empty') return;
        
        let badgeStr = r.status === 'lunas' ? 'Lunas' : (r.status === 'nunggak' ? 'Nunggak' : 'Pending');
        tbody.innerHTML += `
            <tr>
                <td><strong>${r.id}</strong></td>
                <td>${r.name}</td>
                <td>${r.phone}</td>
                <td>${r.joinDate}</td>
                <td><span class="status-badge ${r.status}">${badgeStr}</span></td>
                <td>
                    <i class="fa-solid fa-pen action-icon text-blue"></i>
                    <i class="fa-solid fa-trash action-icon text-red"></i>
                </td>
            </tr>
        `;
    });
}

// Tab Switching Logic with Animation Trigger
function setupTabs() {
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page-view');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('data-target');
            
            navItems.forEach(nav => nav.classList.remove('active'));
            pages.forEach(page => {
                page.classList.remove('active');
                // Force reflow for animation
                void page.offsetWidth; 
            });
            
            item.classList.add('active');
            document.getElementById(targetId).classList.add('active');
        });
    });
}

// Financial Chart initialization
function initChart() {
    const ctx = document.getElementById('financeChart').getContext('2d');
    
    // Gradient fill for chart
    let gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.8)');
    gradient.addColorStop(1, 'rgba(139, 92, 246, 0.8)');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [{
                label: 'Total Patungan (Juta Rp)',
                data: [1.4, 1.45, 1.5, 1.55, 1.6, 1.65],
                backgroundColor: gradient,
                borderRadius: 8,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: { backgroundColor: 'rgba(15, 23, 42, 0.9)', padding: 10, cornerRadius: 8 }
            },
            scales: {
                y: { beginAtZero: true, grid: { display: true, color: 'rgba(0,0,0,0.05)' }, border: { display: false } },
                x: { grid: { display: false }, border: { display: false } }
            }
        }
    });
}

// ==========================================
// CCTV PRO FUNCTIONS
// ==========================================

const camData = [
    { name: 'CAM 01 — LORONG UTAMA', img: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=900&q=80' },
    { name: 'CAM 02 — PARKIRAN DEPAN', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80' },
    { name: 'CAM 03 — AREA DAPUR', img: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=900&q=80' },
    { name: 'CAM 04 — GERBANG MASUK', img: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=900&q=80' },
];

let motionCount = 0;

function updateMainHudTime() {
    const el = document.getElementById('main-time');
    if (el) el.innerText = new Date().toLocaleTimeString('id-ID', { hour12: false });
}

function focusCam(idx) {
    document.getElementById('main-img').src = camData[idx].img;
    document.getElementById('main-cam-name').innerText = camData[idx].name;
    document.querySelectorAll('.cctv-thumb').forEach((t, i) => {
        t.classList.toggle('active', i === idx);
    });
}

function triggerMotionAlert() {
    const randomCam = Math.floor(Math.random() * 4);
    const camNames = ['Lorong Utama', 'Parkiran Depan', 'Area Dapur', 'Gerbang Masuk'];
    motionCount++;
    document.getElementById('motion-counter').innerText = `${motionCount} Motion Terdeteksi`;

    // Show motion badge on thumb
    const mb = document.getElementById(`mb-${randomCam}`);
    if (mb) mb.style.display = 'flex';
    const thumb = document.getElementById(`thumb-${randomCam}`);
    if (thumb) thumb.classList.add('motion-active');

    // If that cam is currently active in main view, show banner
    const mainName = document.getElementById('main-cam-name').innerText;
    if (mainName === camData[randomCam].name) {
        const alert = document.getElementById('main-motion-alert');
        alert.classList.add('show');
        setTimeout(() => alert.classList.remove('show'), 5000);
    }

    // Add to event log
    const log = document.getElementById('cctv-event-log');
    const time = new Date().toLocaleTimeString('id-ID', { hour12: false });
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.innerHTML = `<span class="log-time">${time}</span><span class="log-cam text-red">CAM 0${randomCam+1}</span><span class="log-msg">⚠ Pergerakan terdeteksi di area <strong>${camNames[randomCam]}</strong>!</span>`;
    log.prepend(entry);

    // Toast notification
    showToastMotion(`CAM 0${randomCam+1} — ${camNames[randomCam]}`);

    // Auto clear after 6 seconds
    setTimeout(() => {
        if (mb) mb.style.display = 'none';
        if (thumb) thumb.classList.remove('motion-active');
    }, 6000);
}

function showToastMotion(camLabel) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.borderLeftColor = 'var(--red-main)';
    toast.innerHTML = `
        <div class="toast-icon" style="color:var(--red-main)"><i class="fa-solid fa-shield-exclamation"></i></div>
        <div class="toast-content">
            <h4>🚨 Motion Detected!</h4>
            <p>Pergerakan terdeteksi di <strong>${camLabel}</strong></p>
        </div>
    `;
    container.appendChild(toast);
    setTimeout(() => { toast.classList.add('fade-out'); setTimeout(() => container.removeChild(toast), 400); }, 5000);
}

function showToastCctv() {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.borderLeftColor = 'var(--blue-main)';
    toast.innerHTML = `
        <div class="toast-icon" style="color:var(--blue-main)"><i class="fa-solid fa-camera"></i></div>
        <div class="toast-content">
            <h4>Snapshot Disimpan</h4>
            <p>Screenshot kamera berhasil disimpan ke storage.</p>
        </div>
    `;
    container.appendChild(toast);
    setTimeout(() => { toast.classList.add('fade-out'); setTimeout(() => container.removeChild(toast), 400); }, 3000);
}

function openCctvFullscreen() {
    const img = document.getElementById('main-img').src;
    window.open(img, '_blank');
}

// Modal Logic
function openModal(roomId) {
    const room = roomsData.find(r => r.id === roomId);
    if(!room) return;

    document.getElementById('modal-title').innerText = `Kamar ${room.id}`;
    document.getElementById('modal-name').innerText = room.name;
    document.getElementById('modal-phone').innerText = room.phone;
    document.getElementById('modal-mac').innerText = room.mac;
    document.getElementById('modal-usage').innerText = `${room.usage} GB`;
    
    // Financial Breakdown & Denda (Late Fee)
    document.getElementById('modal-listrik').innerText = `Rp ${room.listrik}`;
    document.getElementById('modal-air').innerText = `Rp ${room.air}`;
    document.getElementById('modal-wifi').innerText = `Rp ${room.wifi}`;
    
    let denda = 0;
    const dendaContainer = document.getElementById('denda-container');
    if (room.status === 'nunggak') {
        denda = 25000;
        document.getElementById('modal-denda').innerText = `+ Rp 25.000`;
        dendaContainer.style.display = 'flex';
    } else {
        document.getElementById('modal-denda').innerText = `Rp 0`;
        dendaContainer.style.display = 'none'; // Hide denda row if not late
    }

    // Calculate final total (Base + Denda)
    let baseTotal = parseInt(room.total.replace('.', ''));
    let finalTotal = baseTotal + denda;
    
    // Format back to IDR format (e.g. 185.000)
    let formattedTotal = finalTotal.toLocaleString('id-ID').replace(',', '.');
    document.getElementById('modal-total').innerText = `Rp ${formattedTotal}`;
    
    // IoT Energy Monitoring Logic - Unique per room based on ID
    const seed = parseInt(room.id);
    const isAC = room.listrik === tagihanDasar.listrikAC;
    
    const lampuKwh = 5 + (seed % 7); 
    const hpKwh = 10 + (seed % 12); 
    const magicComKwh = 15 + ((seed * 3) % 18); 
    const acKwh = isAC ? (40 + ((seed * 5) % 25)) : (12 + (seed % 10)); 
    
    const acPct = isAC ? Math.min((acKwh / 70 * 100), 100) : Math.min((acKwh / 25 * 100), 100);
    const lampuPct = Math.min((lampuKwh / 15 * 100), 100);
    const hpPct = Math.min((hpKwh / 25 * 100), 100);
    const magicComPct = Math.min((magicComKwh / 40 * 100), 100);

    let appliancesHtml = `
        <div class="appliance-item">
            <div class="app-name"><i class="fa-solid ${isAC ? 'fa-snowflake' : 'fa-fan'}"></i> ${isAC ? 'AC 1/2 PK' : 'Kipas Angin'}</div>
            <div class="app-bar-bg"><div class="app-bar-fill" style="width: ${acPct}%; background: var(--primary-gradient);"></div></div>
            <div class="app-value">${acKwh} kWh</div>
        </div>
        <div class="appliance-item">
            <div class="app-name"><i class="fa-solid fa-lightbulb text-yellow"></i> Lampu Kamar</div>
            <div class="app-bar-bg"><div class="app-bar-fill" style="width: ${lampuPct}%; background: var(--yellow-main);"></div></div>
            <div class="app-value">${lampuKwh} kWh</div>
        </div>
        <div class="appliance-item">
            <div class="app-name"><i class="fa-solid fa-plug text-green"></i> Ngecas HP/Laptop</div>
            <div class="app-bar-bg"><div class="app-bar-fill" style="width: ${hpPct}%; background: var(--green-main);"></div></div>
            <div class="app-value">${hpKwh} kWh</div>
        </div>
        <div class="appliance-item">
            <div class="app-name"><i class="fa-solid fa-mug-hot text-red"></i> Masak Air / Magic Com</div>
            <div class="app-bar-bg"><div class="app-bar-fill" style="width: ${magicComPct}%; background: var(--red-main);"></div></div>
            <div class="app-value">${magicComKwh} kWh</div>
        </div>
    `;
    document.getElementById('modal-appliances').innerHTML = appliancesHtml;

    const badge = document.getElementById('modal-badge');
    badge.className = `status-badge ${room.status}`;
    badge.innerText = room.status.toUpperCase();

    const toggle = document.getElementById('modal-wifi-toggle');
    toggle.checked = room.status !== 'nunggak';

    document.getElementById('roomModal').classList.add('active');
}

function closeModal() {
    document.getElementById('roomModal').classList.remove('active');
}

document.getElementById('roomModal').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
});

// Toast Notification System
function showToastNotification(name, amount) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    
    toast.innerHTML = `
        <div class="toast-icon"><i class="fa-solid fa-circle-check"></i></div>
        <div class="toast-content">
            <h4>Payment Received</h4>
            <p>${name} telah membayar <strong>${amount}</strong></p>
        </div>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => { container.removeChild(toast); }, 400);
    }, 4000);
}

window.triggerTestNotification = function() {
    showToastNotification("Kamar 05 (Kevin Julio)", "Rp 125.000");
    const card = document.getElementById('card-room-05');
    if(card) {
        card.className = 'room-card glass lunas';
        document.getElementById('badge-room-05').className = 'status-badge lunas';
        document.getElementById('badge-room-05').innerText = 'LUNAS';
    }
}

window.blastWhatsapp = function() {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.borderLeftColor = '#25D366';
    toast.innerHTML = `
        <div class="toast-icon" style="color:#25D366"><i class="fa-brands fa-whatsapp"></i></div>
        <div class="toast-content">
            <h4>Invoice Terkirim!</h4>
            <p>Invoice tagihan Juli berhasil di-blast ke <strong>10 penghuni kos</strong> via WhatsApp.</p>
        </div>
    `;
    container.appendChild(toast);
    setTimeout(() => { toast.classList.add('fade-out'); setTimeout(() => container.removeChild(toast), 400); }, 4000);
}

// ==========================================
// AI CHATBOT COMMAND CENTER LOGIC
// ==========================================

let chatStep = 0;

function toggleChatbot() {
    const panel = document.getElementById('chatbot-panel');
    panel.classList.toggle('active');
}

function handleChatKey(e) {
    if(e.key === 'Enter') handleSendBtn();
}

function handleSendBtn() {
    const input = document.getElementById('cb-input');
    const text = input.value.trim();
    if(!text) return;
    
    sendUserMsg(text);
    input.value = '';
}

function sendUserMsg(text) {
    const body = document.getElementById('cb-body');
    body.innerHTML += `<div class="cb-msg user">${text}</div>`;
    body.scrollTop = body.scrollHeight;

    setTimeout(() => {
        let response = "Maaf, saya tidak mengerti perintah tersebut. Coba ketik 'Siapa yang nunggak?' atau 'Cek Kamera'";
        let isExecution = false;
        let isCCTV = false;
        
        const lowerText = text.toLowerCase();
        
        if(lowerText.includes("nunggak") || lowerText.includes("siapa")) {
            response = "Saya menemukan 2 kamar yang telah melewati tenggat waktu pembayaran (Kamar 03 dan Kamar 10). Apakah Anda ingin saya mengeksekusi limitasi Wi-Fi sekarang?";
            chatStep = 1;
        } 
        else if(lowerText.includes("cctv") || lowerText.includes("kamera")) {
            response = "Membuka modul pengawasan CCTV Lorong Kos sekarang...";
            isCCTV = true;
        }
        else if(lowerText.includes("pln") || lowerText.includes("listrik") || lowerText.includes("token")) {
            response = "Token PLN saat ini tersisa 25.4 kWh (Status: Kritis). Berdasarkan pola pemakaian, token akan habis dalam waktu 8 jam. Apakah ingin saya belikan token via BCA API sekarang?";
        }
        else if((lowerText.includes("ya") || lowerText.includes("gas") || lowerText.includes("eksekusi")) && chatStep === 1) {
            response = "Melaksanakan perintah. Mengakses RouterOS 192.168.88.1 via SSH dan memotong bandwidth Kamar 03 & 10...";
            isExecution = true;
            chatStep = 0;
        }

        body.innerHTML += `<div class="cb-msg ai">${response}</div>`;
        body.scrollTop = body.scrollHeight;

        if(isExecution) {
            setTimeout(triggerAgenticThrottling, 2000);
        } else if (isCCTV) {
            setTimeout(() => {
                document.querySelector('[data-target="cctv"]').click();
                toggleChatbot();
            }, 1500);
        }

    }, 800);
}

function triggerAgenticThrottling() {
    document.querySelector('[data-target="mikrotik"]').click();
    toggleChatbot();

    const terminal = document.getElementById('master-terminal');
    const time = new Date().toLocaleTimeString();

    terminal.innerHTML += `<br><p class="act">[${time}] Menerima perintah dari AI Command Center...</p>`;
    terminal.innerHTML += `<p class="act">[${time}] Menjalankan skrip SSH Throttling ke RouterOS 192.168.88.1...</p>`;
    
    setTimeout(() => {
        terminal.innerHTML += `<p class="sys">[${time}] > /queue simple add name="Limit_Kamar03" target="192.168.1.13" max-limit=128k/128k</p>`;
        terminal.innerHTML += `<p class="sys">[${time}] > /queue simple add name="Limit_Kamar10" target="192.168.1.20" max-limit=128k/128k</p>`;
    }, 1500);

    setTimeout(() => {
        terminal.innerHTML += `<p class="err">[${time}] ACTION COMPLETED: Bandwidth Kamar 03 & 10 berhasil dipotong.</p>`;
        terminal.scrollTop = terminal.scrollHeight;
        
        showToastNotification("AI Agent", "Limitasi Wi-Fi berhasil dieksekusi!");
    }, 3000);
}
