/** Public website configuration. Never put credentials or secrets in this file. */
export const siteConfig = {
  brand: 'Pahala Salma Expedition',
  tagline: 'Menghubungkan Jarak, Mengantarkan Kepercayaan.',
  // Set only after the owner confirms the official number. International digits,
  // e.g. 62..., without + or spaces. Empty keeps the copy/download workflow.
  whatsappNumber: '',
  services: [
    { value: 'cargo', label: 'Cargo darat' },
    { value: 'truck', label: 'Sewa truk' },
    { value: 'business', label: 'Logistik bisnis' },
  ],
  // Do not imply nationwide or live route availability. Confirm each inquiry.
  routeNote: 'Ketersediaan layanan dan rute dikonfirmasi saat konsultasi.',
  contactPendingMessage: 'Kontak resmi sedang disiapkan. Simpan ringkasan kebutuhan Anda terlebih dahulu.',
};
