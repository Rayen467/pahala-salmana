# Pahala Salma Expedition

Website profil dan permintaan penawaran untuk Pahala Salma Expedition. Dibangun dari dokumen konsep usaha dan logo yang diberikan pemilik, dengan identitas navy, cyan dan putih.

Nama merek adalah **Pahala Salma Expedition**. Nama repository `pahala-salmana` mengikuti repository yang ditentukan pemilik.

## Menjalankan proyek

Proyek ini telah dibangun dengan Node.js 22.13.0 dan npm 11.5.2. Gunakan Node.js 22 atau versi yang memenuhi persyaratan Vite.

```sh
npm ci
npm run dev
```

Untuk membangun dan meninjau hasil produksi:

```sh
npm run build
npm run preview
```

Hasil produksi berada di `dist/` dan dapat diunggah ke layanan hosting statis. Path aset relatif mendukung pemasangan di root domain maupun subfolder. Push ke GitHub menyimpan source code; repository saja tidak otomatis menerbitkan website ke hosting.

## Fitur

- Halaman responsif dengan logo asli, ilustrasi hero, pengenalan layanan, profil, proses pengiriman dan FAQ.
- Formulir perencanaan rute yang meneruskan asal, tujuan dan layanan ke permintaan penawaran.
- Validasi data kontak, detail barang dan jadwal pengiriman.
- Ringkasan kebutuhan yang dapat ditinjau, disalin dan diunduh sebagai teks.
- Tautan TikTok, Instagram dan email bisnis, serta ringkasan penawaran yang dapat dibuka di aplikasi email.
- Dukungan tautan WhatsApp setelah nomor bisnis resmi dikonfigurasi.
- Navigasi seluler, label formulir, fokus keyboard dan dukungan pengurangan animasi.

## Batas operasional

Dokumen sumber masih berupa konsep awal. Website tidak mengarang harga, alamat, jangkauan, jumlah armada, portofolio, testimoni atau pengalaman perusahaan. Pengunjung diminta mengonfirmasi ketersediaan layanan dan rute.

Formulir menyiapkan ringkasan di perangkat pengunjung. Tombol email membuka aplikasi email dengan penerima, subjek dan isi yang telah disiapkan; pengunjung harus menekan kirim di aplikasi email. Ringkasan **belum terkirim** hanya dengan mengisi formulir. Menyalin atau mengunduh ringkasan tidak membuat pesanan. Tidak ada penyimpanan data pribadi di server atau penyimpanan browser.

Ketika WhatsApp diaktifkan, tautan hanya membuka pesan yang sudah disiapkan; pengunjung tetap perlu mengirimkannya sendiri di WhatsApp. Tidak ada jaminan pesan telah diterima.

Pelacakan resi, tarif otomatis, dashboard admin, database pesanan dan integrasi operasional belum termasuk. Fitur tersebut memerlukan layanan backend dan data usaha yang nyata.

## Konfigurasi kontak dan layanan

Kontak berikut diberikan langsung oleh pemilik:

- TikTok: [@pahala.salma.expe](https://www.tiktok.com/@pahala.salma.expe).
- Instagram: [@pahalasalmaexpedition](https://www.instagram.com/pahalasalmaexpedition/).
- Email bisnis: [pahalasalmaexpedition@gmail.com](mailto:pahalasalmaexpedition@gmail.com).

Tautan profil menggunakan HTTPS agar dapat diarahkan oleh perangkat ke aplikasi terpasang atau dibuka di browser. Email menggunakan `mailto:` untuk membuka aplikasi email pilihan pengguna. Alamat Gmail tidak diasumsikan sebagai URL Google Business Profile atau Google Maps. Pembukaan aplikasi native bergantung pada pengaturan perangkat, browser dan aplikasi yang terpasang.

Nilai kontak dikelola di `src/config.js`; tautan HTML di `index.html` juga tersedia saat JavaScript dimatikan. Jika akun berubah, perbarui keduanya agar fallback tetap sesuai.

Edit `src/config.js` untuk mengisi `whatsappNumber` dengan nomor bisnis yang telah dikonfirmasi pemilik. Gunakan kode negara dan digit saja, misalnya awalan `62` untuk Indonesia, tanpa tanda `+`, spasi atau tanda hubung. Jangan mengisi nomor contoh sebagai kontak publik. Nilai kosong mempertahankan alur email dan salin/unduh.

Daftar `services`, pesan `routeNote` dan `contactMessage` juga berada dalam file tersebut. Jika lingkup layanan berubah, sesuaikan deskripsi layanan di `index.html` agar selaras. Setelah mengubah konfigurasi, jalankan kembali `npm run build` dan unggah hasil build terbaru.

File konfigurasi ini tersedia di browser. Jangan memasukkan token, password atau rahasia ke dalamnya.

## Aset dan konsep

- Logo berasal dari pemilik dan dipertahankan artwork-nya.
- Gambar truk adalah ilustrasi yang dibuat untuk website, bukan foto armada atau dokumentasi operasional perusahaan.
- Font disimpan bersama aplikasi melalui dependensi font, sehingga halaman tidak memerlukan layanan font eksternal saat ditampilkan.
- [Pemahaman bisnis dan bedah logo](docs/brand-and-concept.md).
- [Catatan verifikasi](docs/verification.md).

Sebelum dipakai sebagai saluran bisnis aktif, lengkapi nomor WhatsApp, layanan dan rute yang tersedia, serta informasi operasional lain yang ingin ditampilkan.
