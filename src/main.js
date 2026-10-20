import './style.css';
import { siteConfig } from './config.js';

const $ = (selector) => document.querySelector(selector);
const menuButton = $('.menu-toggle');
const navigation = $('#navigation');
const quoteForm = $('#quote-form');
const quoteResult = $('#quote-result');
const resultTitle = $('#result-title');
let preparedSummary = '';

function closeMenu({ restoreFocus = false } = {}) {
  navigation.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Buka menu navigasi');
  if (restoreFocus) menuButton.focus();
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  navigation.classList.toggle('is-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Tutup menu navigasi' : 'Buka menu navigasi');
});
navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') closeMenu({ restoreFocus: true });
});
document.addEventListener('click', (event) => {
  if (!event.target.closest('.site-header')) closeMenu();
});
window.matchMedia('(min-width: 721px)').addEventListener('change', (event) => {
  if (event.matches) closeMenu();
});

for (const selector of ['#quick-service', '#service']) {
  for (const service of siteConfig.services) {
    const option = document.createElement('option');
    option.value = service.value;
    option.textContent = service.label;
    $(selector).append(option);
  }
}
document.querySelectorAll('[data-route-note]').forEach((element) => { element.textContent = siteConfig.routeNote; });
const whatsappNumber = siteConfig.whatsappNumber.replace(/\D/g, '');
const hasBusinessContact = /^[1-9]\d{7,14}$/.test(whatsappNumber);
const businessEmail = siteConfig.contacts.email;
document.querySelectorAll('[data-contact]').forEach((link) => {
  const platform = link.dataset.contact;
  const contact = siteConfig.contacts[platform];
  if (!contact) return;
  link.href = platform === 'email' ? `mailto:${businessEmail}` : contact.url;
  const handle = link.querySelector('.contact-handle');
  if (handle) handle.textContent = platform === 'email' ? businessEmail : `@${contact.username}`;
});
const contactNotice = $('[data-contact-notice]');
contactNotice.textContent = hasBusinessContact
  ? 'Siapkan ringkasan, lalu lanjutkan konsultasi melalui email bisnis atau WhatsApp resmi kami.'
  : siteConfig.contactMessage;
$('#copyright-year').textContent = new Date().getFullYear();

function getLocalDate() {
  // Use a local calendar date instead of UTC, which can differ around midnight.
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}
$('#shipping-date').min = getLocalDate();

function showEditableForm() {
  quoteResult.hidden = true;
  quoteForm.hidden = false;
  $('#form-error').hidden = true;
}
function focusQuoteField(field) {
  requestAnimationFrame(() => {
    field.focus({ preventScroll: true });
    $('#penawaran').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
  });
}
$('#route-planner').addEventListener('submit', (event) => {
  event.preventDefault();
  showEditableForm();
  const origin = $('#quick-origin').value.trim();
  const destination = $('#quick-destination').value.trim();
  if (origin) {
    $('#origin').value = origin;
    $('#origin').setCustomValidity('');
  }
  if (destination) {
    $('#destination').value = destination;
    $('#destination').setCustomValidity('');
  }
  $('#service').value = $('#quick-service').value;
  focusQuoteField($('#full-name'));
});
document.querySelectorAll('[data-service]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    showEditableForm();
    $('#service').value = link.dataset.service;
    $('#quick-service').value = link.dataset.service;
    focusQuoteField($('#full-name'));
  });
});

function validatePhone() {
  const value = $('#phone').value.trim();
  const digits = value.replace(/\D/g, '');
  const valid = /^[+\d\s()-]+$/.test(value) && digits.length >= 9 && digits.length <= 15;
  $('#phone').setCustomValidity(value && !valid ? 'Masukkan nomor WhatsApp yang valid, berisi 9–15 digit.' : '');
}
function validateDate() {
  const field = $('#shipping-date');
  field.min = getLocalDate();
  field.setCustomValidity(field.value && field.value < field.min ? 'Pilih tanggal hari ini atau setelahnya.' : '');
}
$('#phone').addEventListener('input', validatePhone);
$('#shipping-date').addEventListener('input', validateDate);
for (const field of quoteForm.querySelectorAll('[required]:not(select)')) {
  field.addEventListener('input', () => {
    if (field.id !== 'phone') field.setCustomValidity(field.value && !field.value.trim() ? 'Kolom ini tidak boleh hanya berisi spasi.' : '');
  });
}
function formatDate(value) {
  if (!value) return 'Belum ditentukan';
  return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${value}T12:00:00`));
}
function makeSummary(data) {
  const service = siteConfig.services.find((entry) => entry.value === data.service)?.label || data.service;
  return [
    'RENCANA PENGIRIMAN',
    siteConfig.brand,
    '',
    'INFORMASI KONTAK',
    `Nama: ${data.name}`,
    `Usaha / perusahaan: ${data.company || '—'}`,
    `WhatsApp: ${data.phone}`,
    `Email: ${data.email || '—'}`,
    '',
    'DETAIL KIRIMAN',
    `Asal: ${data.origin}`,
    `Tujuan: ${data.destination}`,
    `Layanan: ${service}`,
    `Jenis barang: ${data.goods}`,
    `Berat total: ${data.weight ? `${data.weight} kg` : 'Belum ditentukan'}`,
    `Volume: ${data.volume ? `${data.volume} m³` : 'Belum ditentukan'}`,
    `Jumlah koli: ${data.quantity || 'Belum ditentukan'}`,
    `Rencana tanggal: ${formatDate(data.date)}`,
    `Catatan: ${data.notes || '—'}`,
    '',
    'Ringkasan kebutuhan, belum merupakan pemesanan.',
    'Layanan, rute, jadwal, dan biaya perlu dikonfirmasi bersama tim.',
  ].join('\n');
}
quoteForm.addEventListener('submit', (event) => {
  event.preventDefault();
  validatePhone();
  validateDate();
  for (const field of quoteForm.querySelectorAll('[required]:not(select)')) {
    if (field.id !== 'phone') field.setCustomValidity(!field.value.trim() ? 'Lengkapi kolom ini terlebih dahulu.' : '');
  }
  if (!quoteForm.reportValidity()) return;
  const data = Object.fromEntries([...new FormData(quoteForm)].map(([key, value]) => [key, String(value).trim()]));
  preparedSummary = makeSummary(data);
  $('#summary-content').textContent = preparedSummary;
  $('#copy-status').textContent = '';
  $('#fallback-label').hidden = true;
  $('#copy-summary').textContent = 'Salin ringkasan ⧉';
  const emailSubject = `Konsultasi pengiriman ${data.origin} ke ${data.destination}`;
  const emailBody = `Halo ${siteConfig.brand},\n\nSaya ingin berkonsultasi mengenai kebutuhan pengiriman berikut.\n\n${preparedSummary}\n\nMohon informasi layanan, rute, jadwal, dan penawarannya. Terima kasih.`;
  $('#email-summary-link').href = `mailto:${businessEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
  if (hasBusinessContact) {
    $('#whatsapp-link').href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Halo ${siteConfig.brand}, saya ingin berkonsultasi tentang pengiriman berikut.\n\n${preparedSummary}`)}`;
    $('#whatsapp-link').hidden = false;
    resultTitle.textContent = 'Ringkasan siap dikonsultasikan';
    $('#result-description').textContent = 'Periksa detail Anda, lalu lanjutkan melalui email atau WhatsApp untuk berkonsultasi. Kirim pesannya dari aplikasi pilihan Anda; ringkasan ini belum dikirim kepada tim.';
  } else {
    resultTitle.textContent = 'Ringkasan siap dikonsultasikan';
    $('#result-description').textContent = 'Periksa detail Anda, lalu pilih “Lanjutkan via email”. Kirim pesannya dari aplikasi email Anda; ringkasan ini belum dikirim kepada tim. Anda juga dapat menyalin atau mengunduh ringkasan.';
  }
  quoteForm.hidden = true;
  quoteResult.hidden = false;
  resultTitle.focus({ preventScroll: true });
  quoteResult.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
});

$('#copy-summary').addEventListener('click', async () => {
  const button = $('#copy-summary');
  button.disabled = true;
  button.textContent = 'Menyalin…';
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(preparedSummary);
    button.textContent = 'Tersalin ✓';
    $('#copy-status').textContent = 'Ringkasan berhasil disalin. Tempelkan saat Anda siap berkonsultasi.';
    $('#fallback-label').hidden = true;
  } catch {
    button.textContent = 'Salin ringkasan ⧉';
    $('#copy-status').textContent = 'Penyalinan otomatis tidak tersedia. Pilih dan salin teks pada kotak berikut, atau unduh ringkasannya.';
    $('#fallback-label').hidden = false;
    $('#fallback-text').value = preparedSummary;
    $('#fallback-text').focus();
    $('#fallback-text').select();
  } finally {
    button.disabled = false;
  }
});
$('#download-summary').addEventListener('click', () => {
  const blob = new Blob(['\uFEFF', preparedSummary], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `rencana-pengiriman-pahala-salma-${getLocalDate()}.txt`;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  $('#copy-status').textContent = 'Unduhan ringkasan telah dimulai. Periksa folder unduhan perangkat Anda.';
});
$('#edit-request').addEventListener('click', () => {
  showEditableForm();
  focusQuoteField($('#full-name'));
});

if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.section-heading, .about-grid, .process-list, .closing-inner').forEach((element) => {
    element.classList.add('reveal');
    observer.observe(element);
  });
}
