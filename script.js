// script.js - Fungsi-fungsi interaktif dan logika navigasi

// Fungsi untuk menampilkan notifikasi toast
function showToast(message, type = 'info') {
    const toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;

    toastContainer.appendChild(toast);

    // Tampilkan toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 10); // Delay kecil agar animasi bekerja

    // Hapus toast setelah 3 detik
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toastContainer.removeChild(toast);
            if (toastContainer.children.length === 0) {
                document.body.removeChild(toastContainer);
            }
        }, 300); // Tunggu animasi selesai
    }, 3000);
}

// Fungsi untuk menampilkan loader di tombol
function showLoader(buttonElement, originalText) {
    buttonElement.innerHTML = `<span class="loader"></span>Loading...`;
    buttonElement.disabled = true;
    // Simpan teks asli untuk dikembalikan nanti
    buttonElement.dataset.originalText = originalText;
}

// Fungsi untuk mengembalikan tombol ke kondisi semula
function hideLoader(buttonElement) {
    const originalText = buttonElement.dataset.originalText || 'Submit';
    buttonElement.innerHTML = originalText;
    buttonElement.disabled = false;
}

// Fungsi untuk toggle dark mode
function toggleDarkMode() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Fungsi untuk menerapkan tema saat halaman dimuat
function applyTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
        // Jika tidak ada tema tersimpan, gunakan tema sistem
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-theme', systemPrefersDark ? 'dark' : 'light');
    }
}

// Fungsi untuk memeriksa status login admin
function requireAdminAuth() {
    if (!localStorage.getItem('adminToken')) {
        window.location.href = 'index.html';
    }
}

// Fungsi untuk memeriksa status logout (jika di halaman login saat sudah login)
function requireNoAuth() {
    if (localStorage.getItem('adminToken')) {
        window.location.href = 'controlpanel.html';
    }
}

// Fungsi login admin (simulasi)
async function adminLogin(username, password) {
    // Simulasi permintaan ke backend
    // const response = await fetch('/api/login.php', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ username, password })
    // });
    // const data = await response.json();
    // return data.success;

    // Simulasi login
    if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('adminToken', 'valid_token');
        return true;
    }
    return false;
}

// Fungsi logout admin
function adminLogout() {
    localStorage.removeItem('adminToken');
    window.location.href = 'index.html';
}

// Fungsi untuk memeriksa password user (simulasi)
async function checkUserPassword(password) {
    // Simulasi permintaan ke backend
    // const response = await fetch('/api/check_password.php', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ password })
    // });
    // const data = await response.json();
    // return data.valid;

    // Simulasi validasi berdasarkan waktu
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = currentHour * 60 + currentMinute; // Menit sejak 00:00

    // Misalnya password pagi berlaku 00:00 - 11:59 (719 menit), sore 12:00 - 23:59 (1439 menit)
    const morningPassword = 'morning123';
    const afternoonPassword = 'afternoon456';

    if ((currentTime >= 0 && currentTime < 12 * 60) && password === morningPassword) {
        return true;
    } else if ((currentTime >= 12 * 60 && currentTime <= 23 * 60 + 59) && password === afternoonPassword) {
        return true;
    }
    return false;
}

// Fungsi untuk menyorot navigasi aktif
function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage || (currentPage === '' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Inisialisasi tema dan navigasi aktif saat DOM siap
document.addEventListener('DOMContentLoaded', function() {
    applyTheme();
    setActiveNav();
});
