/** Public website configuration. Never put credentials or secrets in this file. */
export const siteConfig = {
  brand: 'Pahala Salma Expedition',
  tagline: 'Menghubungkan Jarak, Mengantarkan Kepercayaan.',
  // Set only after the owner confirms the official number. International digits,
  // e.g. 62..., without + or spaces. Empty keeps email, copy, and download.
  whatsappNumber: '',
  // Owner-confirmed public contacts. Mirror updates in index.html's static
  // data-contact anchors so contact access also works without JavaScript.
  contacts: {
    email: 'pahalasalmaexpedition@gmail.com',
    instagram: {
      username: 'pahalasalmaexpedition',
      url: 'https://www.instagram.com/pahalasalmaexpedition/',
    },
    tiktok: {
      username: 'pahala.salma.expe',
      url: 'https://www.tiktok.com/@pahala.salma.expe',
    },
  },
  services: [
    { value: 'cargo', label: 'Cargo darat' },
    { value: 'truck', label: 'Sewa truk' },
    { value: 'business', label: 'Logistik bisnis' },
  ],
  // Do not imply nationwide or live route availability. Confirm each inquiry.
  routeNote: 'Ketersediaan layanan dan rute dikonfirmasi saat konsultasi.',
  contactMessage: 'Siapkan ringkasan, lalu lanjutkan konsultasi melalui email bisnis kami. Pesan dikirim dari aplikasi email Anda.',
};
