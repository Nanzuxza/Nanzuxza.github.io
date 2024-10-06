document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!emailRegex.test(emailInput.value)) {
        emailError.classList.remove('hidden');
        return;
    } else {
        emailError.classList.add('hidden');
    }

    const formData = new FormData(this);

    Swal.fire({
        title: 'Mengirim pesan...',
        text: 'Mohon tunggu sebentar',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        willOpen: () => {
            Swal.showLoading();
        }
    });

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil!',
                    text: 'Pesan Anda telah berhasil dikirim.',
                    confirmButtonColor: '#10B981'
                });
                this.reset();
            } else {
                throw new Error('Respons server tidak sukses');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Terjadi kesalahan saat mengirim pesan Anda. Silakan coba lagi.',
                confirmButtonColor: '#EF4444'
            });
        });
});

document.getElementById('email').addEventListener('input', function () {
    const emailError = document.getElementById('emailError');
    if (this.validity.valid) {
        emailError.classList.add('hidden');
    } else {
        emailError.classList.remove('hidden');
    }
});

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const navbar = document.getElementById('navbar');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('hamburger-active');
    if (mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.remove('hidden');
        setTimeout(() => {
            mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
        }, 10);
    } else {
        mobileMenu.style.maxHeight = '0px';
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
        }, 300);
    }
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});



document.addEventListener('DOMContentLoaded', function () {
    const slogans = [
        "Tempat di mana kopi bertemu kreativitas",
        "Nikmati momen berharga dengan secangkir kopi",
        "Rasakan kehangatan dalam setiap tegukan",
        "LO KONTOL"
    ];
    const sloganElement = document.getElementById('slogan');
    let currentSloganIndex = 0;

    function changeSlogan() {
        sloganElement.style.opacity = 0;
        setTimeout(() => {
            sloganElement.textContent = slogans[currentSloganIndex];
            sloganElement.style.opacity = 1;
            currentSloganIndex = (currentSloganIndex + 1) % slogans.length;
        }, 500);
    }

    changeSlogan(); // Set slogan awal
    setInterval(changeSlogan, 4000); // Ganti slogan setiap 4 detik
});