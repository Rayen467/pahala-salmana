# Verifikasi website

Tanggal: 20 Oktober 2026. Lingkungan: Windows, Node.js 22.13.0, npm 11.5.2, Chromium melalui Microsoft Edge headless.

## Pemeriksaan yang telah dilakukan

- Build produksi Vite berhasil. Audit dependensi pada instalasi melaporkan 0 kerentanan.
- Metadata berbahasa Indonesia, satu heading utama, gambar dan tautan bagian halaman diperiksa.
- Panel rute meneruskan kota asal, tujuan dan pilihan layanan ke formulir lengkap.
- Kolom wajib, nomor kontak yang tidak valid, berat negatif dan tanggal lampau ditolak.
- Perubahan rute melalui panel awal menghapus pesan validasi lama yang sudah tidak berlaku.
- Ringkasan menampilkan data pengunjung sebagai teks, termasuk ketika input berisi markup HTML.
- Penyalinan clipboard dan unduhan `.txt` berisi ringkasan lengkap.
- Penolakan izin clipboard menghasilkan kotak teks untuk penyalinan manual.
- Mengubah detail dan memilih layanan mempertahankan data yang sudah diisi.
- Tidak ada data formulir yang tersimpan di localStorage atau sessionStorage.
- Menu seluler, penutupan dengan Escape, penutupan setelah memilih tautan dan FAQ diperiksa.
- Lebar 360, 390, 768, 1024 dan 1440 piksel diperiksa untuk luapan horizontal; review visual juga mencakup 375 piksel.
- Cabang WhatsApp diuji melalui konfigurasi sementara dalam browser. Nomor tujuan dan pengodean pesan benar. Tidak ada pesan yang dikirim; nomor uji tidak dimasukkan ke source publik.
- Saat JavaScript dimatikan, formulir interaktif disembunyikan dan petunjuk ditampilkan, sehingga formulir tidak mengirim data pribadi melalui GET bawaan browser.
- Hasil produksi disajikan pada subfolder `/pahala-salmana/`. Gambar, font, CSS dan JavaScript dimuat tanpa kegagalan resource; alur rute dan pembuatan ringkasan berjalan pada desktop serta seluler.
- Judul ringkasan setelah submit terlihat di bawah header yang menempel di bagian atas layar.
- Tidak ditemukan error JavaScript saat pengujian alur tersebut.

## Cakupan

Pengujian ini memverifikasi website statis dan interaksi di browser. Website belum terhubung ke sistem pesanan, tracking atau tarif operasional. Nomor WhatsApp resmi masih kosong; status ringkasan selalu dibedakan dari permintaan yang sudah dikirim.

Review visual dilakukan secara independen oleh agen evaluator. Pengujian browser menggunakan Chromium; belum dilakukan uji perangkat fisik Safari/iOS.

## Pembaruan kontak bisnis

- Tautan TikTok, Instagram dan email dibandingkan dengan akun yang diberikan pemilik, pada bagian kontak serta footer.
- Tautan sosial memakai HTTPS, membuka target baru dan menyertakan `noopener noreferrer`.
- Tata letak kontak diperiksa pada lebar 360, 390, 768 dan 1440 piksel, tanpa luapan horizontal dan dengan target sentuh minimal 44 piksel.
- Penerima, subjek dan isi `mailto:` pada ringkasan diperiksa, termasuk karakter `&`, `#` dan baris baru. Tidak ada pesan yang dikirim selama pengujian.
- Tautan kontak tetap terlihat dan berfungsi sebagai anchor HTML ketika JavaScript dimatikan.
- Build berhasil dan tidak ada error JavaScript pada alur kontak/ringkasan. Pembukaan aplikasi native di perangkat fisik belum diuji; aplikasi yang terbuka mengikuti pengaturan perangkat.
