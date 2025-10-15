// script.js - Fungsi-fungsi utama untuk interaktivitas dan logika aplikasi

// Fungsi untuk menampilkan loader di tombol
function showLoader(buttonElement, text) {
    buttonElement.innerHTML = `<i class="loader"></i> ${text}`;
    buttonElement.disabled = true;
}

// Fungsi untuk menampilkan notifikasi toast
function showToast(message, type) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Fungsi untuk login admin
async function adminLogin(username, password) {
    // Simulasi login ke backend
    // const response = await fetch('/api/login.php', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ username, password })
    // });
    // const data = await response.json();
    // if (data.success) {
    //     localStorage.setItem('adminToken', data.token);
    //     return true;
    // }
    // return false;

    // Simulasi login
    if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('adminToken', 'valid_token');
        return true;
    }
    return false;
}

// Fungsi untuk logout admin
function adminLogout() {
    localStorage.removeItem('adminToken');
    window.location.href = 'index.html';
}

// Fungsi untuk memeriksa password user
async function checkUserPassword(password) {
    // Simulasi validasi password ke backend
    // const response = await fetch('/api/check_password.php', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ password })
    // });
    // const data = await response.json();
    // return data.valid;

    // Simulasi validasi password berdasarkan waktu
    const currentHour = new Date().getHours();
    let correctPassword = 'default';
    if (currentHour < 12) {
        correctPassword = 'morning123';
    } else {
        correctPassword = 'afternoon456';
    }
    return password === correctPassword;
}

// Fungsi untuk mengambil daftar password dari backend
async function getPasswords() {
    // Simulasi data
    return [
        { id: 1, start_time: '00:00', end_time: '11:59', value: 'morning123' },
        { id: 2, start_time: '12:00', end_time: '23:59', value: 'afternoon456' }
    ];
}

// Fungsi untuk menambah atau memperbarui password
async function updatePassword(startTime, endTime, passwordValue) {
    // Simulasi
    console.log(`Update password: ${startTime} - ${endTime} = ${passwordValue}`);
    return true;
}

// Fungsi untuk menghapus password
async function deletePassword(id) {
    // Simulasi
    console.log(`Delete password ID: ${id}`);
    return true;
}

// Fungsi untuk memvalidasi akses ke halaman kontrol
function requireAdminAuth() {
    if (!localStorage.getItem('adminToken')) {
        window.location.href = 'index.html';
    }
}

// Inisialisasi fungsi umum jika diperlukan
document.addEventListener('DOMContentLoaded', function() {
    // Panggil fungsi inisialisasi jika ada
});
