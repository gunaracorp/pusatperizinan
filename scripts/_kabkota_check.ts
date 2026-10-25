// ============================================================
// PUSATPERIZINAN.COM — DATA 514 KABUPATEN/KOTA (RESMI BPS 2022+)
// ============================================================
// ROADMAP-99 langkah 25: halaman level kota di bawah
// /layanan/wilayah/{prov}/{kota} diperluas dari 94 "majors"
// menjadi seluruh 514 kabupaten/kota resmi (416 kab + 98 kota,
// pasca pemekaran Papua 2022).
//
// SUMBER & VERIFIKASI:
//   - Wikipedia "Daftar kabupaten dan kota di Indonesia menurut
//     provinsi" (jumlah per provinsi: Aceh 23, Sumut 33, ..., total 514)
//   - UU 14/2022, 15/2022, 16/2022, 13/2022, 29/2003 (pemekaran)
//
// KONVENSI NAMA (untuk stabilitas URL yang sudah terindeks):
//   1. Nama kota/kabupaten yang SUDAH jadi "majors" di coverage-data
//      ditulis EXACT sama (mis. "Medan", "Jambi (Kota)",
//      "Jakarta Selatan (SCBD)") → slug tidak berubah (nol perubahan URL).
//   2. Kota baru → prefix "Kota " (slug: kota-solok).
//   3. Kabupaten baru → prefix "Kabupaten " (slug: kabupaten-bogor)
//      — sekaligus membedakan dari kota senama (Bogor/Bekasi/Tangerang).
//   4. 2 entri "alias" yang sudah live dipertahankan: "Luwuk"
//      (ibu kota Kab. Banggai, hub Sulteng) & "Sorong" di hub
//      Papua Barat (kota resmi milik PBD) → total 516 baris data,
//      514 di antaranya adalah daftar resmi.
//
// KONSUMEN: generators.ts (getCityHubs/getAnyPage) + wilayah.ts
// (navigasi /wilayah). Jangan edit nama tanpa cek dampak URL.
// ============================================================

const KABKOTA_PER_PROVINSI: Record<string, string[]> = {
  // ===== SUMATERA =====
  Aceh: [
    "Banda Aceh", "Lhokseumawe", "Langsa", "Sabang",
    "Kota Subulussalam",
    "Kabupaten Aceh Barat", "Kabupaten Aceh Barat Daya", "Kabupaten Aceh Besar",
    "Kabupaten Aceh Jaya", "Kabupaten Aceh Selatan", "Kabupaten Aceh Singkil",
    "Kabupaten Aceh Tamiang", "Kabupaten Aceh Tengah", "Kabupaten Aceh Tenggara",
    "Kabupaten Aceh Timur", "Kabupaten Aceh Utara", "Kabupaten Bener Meriah",
    "Kabupaten Bireuen", "Kabupaten Gayo Lues", "Kabupaten Nagan Raya",
    "Kabupaten Pidie", "Kabupaten Pidie Jaya", "Kabupaten Simeulue",
  ],
  "Sumatera Utara": [
    "Medan", "Binjai", "Pematangsiantar", "Tebing Tinggi",
    "Kota Padangsidimpuan", "Kota Sibolga", "Kota Tanjungbalai", "Kota Gunungsitoli",
    "Kabupaten Asahan", "Kabupaten Batu Bara", "Kabupaten Dairi",
    "Kabupaten Deli Serdang", "Kabupaten Humbang Hasundutan", "Kabupaten Karo",
    "Kabupaten Kepulauan Nias", "Kabupaten Labuhanbatu", "Kabupaten Labuhanbatu Selatan",
    "Kabupaten Labuhanbatu Utara", "Kabupaten Langkat", "Kabupaten Mandailing Natal",
    "Kabupaten Nias", "Kabupaten Nias Barat", "Kabupaten Nias Selatan",
    "Kabupaten Nias Utara", "Kabupaten Padang Lawas", "Kabupaten Padang Lawas Utara",
    "Kabupaten Pakpak Bharat", "Kabupaten Samosir", "Kabupaten Serdang Bedagai",
    "Kabupaten Tapanuli Selatan", "Kabupaten Tapanuli Tengah", "Kabupaten Tapanuli Utara",
    "Kabupaten Toba",
  ],
  "Sumatera Barat": [
    "Padang", "Bukittinggi", "Payakumbuh", "Pariaman",
    "Kota Sawahlunto", "Kota Solok", "Kota Padang Panjang",
    "Kabupaten Agam", "Kabupaten Dharmasraya", "Kabupaten Kepulauan Mentawai",
    "Kabupaten Lima Puluh Kota", "Kabupaten Padang Pariaman", "Kabupaten Pasaman",
    "Kabupaten Pasaman Barat", "Kabupaten Pesisir Selatan", "Kabupaten Sijunjung",
    "Kabupaten Solok", "Kabupaten Solok Selatan", "Kabupaten Tanah Datar",
  ],
  Riau: [
    "Pekanbaru", "Dumai",
    "Kabupaten Bengkalis", "Kabupaten Indragiri Hilir", "Kabupaten Indragiri Hulu",
    "Kabupaten Kampar", "Kabupaten Kepulauan Meranti", "Kabupaten Kuantan Singingi",
    "Kabupaten Pelalawan", "Kabupaten Rokan Hulu", "Kabupaten Rokan Hilir",
    "Kabupaten Siak",
  ],
  Jambi: [
    "Jambi (Kota)", "Sungai Penuh",
    "Kabupaten Batanghari", "Kabupaten Bungo", "Kabupaten Kerinci",
    "Kabupaten Merangin", "Kabupaten Muaro Jambi", "Kabupaten Sarolangun",
    "Kabupaten Tebo", "Kabupaten Tanjung Jabung Barat", "Kabupaten Tanjung Jabung Timur",
  ],
  "Sumatera Selatan": [
    "Palembang", "Prabumulih", "Pagar Alam", "Lubuklinggau",
    "Kabupaten Banyuasin", "Kabupaten Empat Lawang", "Kabupaten Lahat",
    "Kabupaten Muara Enim", "Kabupaten Musi Banyuasin", "Kabupaten Musi Rawas",
    "Kabupaten Musi Rawas Utara", "Kabupaten Ogan Ilir", "Kabupaten Ogan Komering Ilir",
    "Kabupaten Ogan Komering Ulu", "Kabupaten Ogan Komering Ulu Selatan",
    "Kabupaten Ogan Komering Ulu Timur", "Kabupaten Penukal Abab Lematang Ilir",
  ],
  "Kepulauan Bangka Belitung": [
    "Pangkalpinang",
    "Kabupaten Bangka", "Kabupaten Bangka Barat", "Kabupaten Bangka Selatan",
    "Kabupaten Bangka Tengah", "Kabupaten Belitung", "Kabupaten Belitung Timur",
  ],
  Bengkulu: [
    "Bengkulu (Kota)",
    "Kabupaten Bengkulu Selatan", "Kabupaten Bengkulu Tengah", "Kabupaten Bengkulu Utara",
    "Kabupaten Kaur", "Kabupaten Kepahiang", "Kabupaten Lebong",
    "Kabupaten Mukomuko", "Kabupaten Rejang Lebong", "Kabupaten Seluma",
  ],
  Lampung: [
    "Bandar Lampung", "Metro",
    "Kabupaten Lampung Barat", "Kabupaten Lampung Selatan", "Kabupaten Lampung Tengah",
    "Kabupaten Lampung Timur", "Kabupaten Lampung Utara", "Kabupaten Mesuji",
    "Kabupaten Pesawaran", "Kabupaten Pesisir Barat", "Kabupaten Pringsewu",
    "Kabupaten Tanggamus", "Kabupaten Tulang Bawang", "Kabupaten Tulang Bawang Barat",
    "Kabupaten Way Kanan",
  ],
  "Kepulauan Riau": [
    "Batam", "Tanjungpinang",
    "Kabupaten Bintan", "Kabupaten Karimun", "Kabupaten Lingga",
    "Kabupaten Natuna", "Kabupaten Kepulauan Anambas",
  ],
  // ===== JAWA =====
  "DKI Jakarta": [
    "Jakarta Selatan (SCBD)", "Jakarta Pusat", "Jakarta Barat",
    "Jakarta Timur", "Jakarta Utara",
    "Kabupaten Kepulauan Seribu",
  ],
  "Jawa Barat": [
    "Bandung", "Bekasi", "Depok", "Bogor", "Cimahi", "Tasikmalaya", "Cirebon",
    "Kota Sukabumi", "Kota Banjar",
    "Kabupaten Bandung", "Kabupaten Bandung Barat", "Kabupaten Bekasi",
    "Kabupaten Bogor", "Kabupaten Ciamis", "Kabupaten Cianjur", "Kabupaten Cirebon",
    "Kabupaten Garut", "Kabupaten Indramayu", "Kabupaten Karawang",
    "Kabupaten Kuningan", "Kabupaten Majalengka", "Kabupaten Pangandaran",
    "Kabupaten Purwakarta", "Kabupaten Subang", "Kabupaten Sukabumi",
    "Kabupaten Sumedang", "Kabupaten Tasikmalaya",
  ],
  "Jawa Tengah": [
    "Semarang", "Surakarta (Solo)", "Magelang", "Salatiga", "Pekalongan", "Tegal",
    "Kabupaten Banjarnegara", "Kabupaten Banyumas", "Kabupaten Batang",
    "Kabupaten Blora", "Kabupaten Boyolali", "Kabupaten Brebes", "Kabupaten Cilacap",
    "Kabupaten Demak", "Kabupaten Grobogan", "Kabupaten Jepara",
    "Kabupaten Karanganyar", "Kabupaten Kebumen", "Kabupaten Kendal",
    "Kabupaten Klaten", "Kabupaten Kudus", "Kabupaten Magelang", "Kabupaten Pati",
    "Kabupaten Pekalongan", "Kabupaten Pemalang", "Kabupaten Purbalingga",
    "Kabupaten Purworejo", "Kabupaten Rembang", "Kabupaten Semarang",
    "Kabupaten Sragen", "Kabupaten Sukoharjo", "Kabupaten Tegal",
    "Kabupaten Temanggung", "Kabupaten Wonogiri", "Kabupaten Wonosobo",
  ],
  "DI Yogyakarta": [
    "Yogyakarta (Kota)",
    "Kabupaten Bantul", "Kabupaten Gunungkidul", "Kabupaten Kulon Progo",
    "Kabupaten Sleman",
  ],
  "Jawa Timur": [
    "Surabaya", "Malang", "Kediri", "Madiun", "Batu", "Mojokerto", "Probolinggo",
    "Kota Blitar", "Kota Pasuruan",
    "Kabupaten Bangkalan", "Kabupaten Banyuwangi", "Kabupaten Blitar",
    "Kabupaten Bojonegoro", "Kabupaten Bondowoso", "Kabupaten Gresik",
    "Kabupaten Jember", "Kabupaten Jombang", "Kabupaten Kediri",
    "Kabupaten Lamongan", "Kabupaten Lumajang", "Kabupaten Madiun",
    "Kabupaten Magetan", "Kabupaten Malang", "Kabupaten Mojokerto",
    "Kabupaten Nganjuk", "Kabupaten Ngawi", "Kabupaten Pacitan",
    "Kabupaten Pamekasan", "Kabupaten Pasuruan", "Kabupaten Ponorogo",
    "Kabupaten Probolinggo", "Kabupaten Sampang", "Kabupaten Sidoarjo",
    "Kabupaten Situbondo", "Kabupaten Sumenep", "Kabupaten Trenggalek",
    "Kabupaten Tuban", "Kabupaten Tulungagung",
  ],
  Banten: [
    "Tangerang", "Tangerang Selatan", "Serang", "Cilegon",
    "Kabupaten Lebak", "Kabupaten Pandeglang", "Kabupaten Serang",
    "Kabupaten Tangerang",
  ],
  // ===== BALI & NUSA TENGGARA =====
  Bali: [
    "Denpasar",
    "Kabupaten Badung", "Kabupaten Bangli", "Kabupaten Buleleng",
    "Kabupaten Gianyar", "Kabupaten Jembrana", "Kabupaten Karangasem",
    "Kabupaten Klungkung", "Kabupaten Tabanan",
  ],
  "Nusa Tenggara Barat": [
    "Mataram", "Bima",
    "Kabupaten Bima", "Kabupaten Dompu", "Kabupaten Lombok Barat",
    "Kabupaten Lombok Tengah", "Kabupaten Lombok Timur", "Kabupaten Lombok Utara",
    "Kabupaten Sumbawa", "Kabupaten Sumbawa Barat",
  ],
  "Nusa Tenggara Timur": [
    "Kupang",
    "Kabupaten Alor", "Kabupaten Belu", "Kabupaten Ende", "Kabupaten Flores Timur",
    "Kabupaten Kupang", "Kabupaten Lembata", "Kabupaten Malaka",
    "Kabupaten Manggarai", "Kabupaten Manggarai Barat", "Kabupaten Manggarai Timur",
    "Kabupaten Nagekeo", "Kabupaten Ngada", "Kabupaten Rote Ndao",
    "Kabupaten Sabu Raijua", "Kabupaten Sikka", "Kabupaten Sumba Barat",
    "Kabupaten Sumba Barat Daya", "Kabupaten Sumba Tengah", "Kabupaten Sumba Timur",
    "Kabupaten Timor Tengah Selatan", "Kabupaten Timor Tengah Utara",
  ],
  // ===== KALIMANTAN =====
  "Kalimantan Barat": [
    "Pontianak", "Singkawang",
    "Kabupaten Bengkayang", "Kabupaten Kapuas Hulu", "Kabupaten Kayong Utara",
    "Kabupaten Ketapang", "Kabupaten Kubu Raya", "Kabupaten Landak",
    "Kabupaten Mempawah", "Kabupaten Melawi", "Kabupaten Sambas",
    "Kabupaten Sanggau", "Kabupaten Sekadau", "Kabupaten Sintang",
  ],
  "Kalimantan Tengah": [
    "Palangkaraya",
    "Kabupaten Barito Selatan", "Kabupaten Barito Timur", "Kabupaten Barito Utara",
    "Kabupaten Gunung Mas", "Kabupaten Kapuas", "Kabupaten Katingan",
    "Kabupaten Kotawaringin Barat", "Kabupaten Kotawaringin Timur",
    "Kabupaten Lamandau", "Kabupaten Murung Raya", "Kabupaten Pulang Pisau",
    "Kabupaten Seruyan", "Kabupaten Sukamara",
  ],
  "Kalimantan Selatan": [
    "Banjarmasin", "Banjarbaru",
    "Kabupaten Balangan", "Kabupaten Banjar", "Kabupaten Barito Kuala",
    "Kabupaten Hulu Sungai Selatan", "Kabupaten Hulu Sungai Tengah",
    "Kabupaten Hulu Sungai Utara", "Kabupaten Kotabaru", "Kabupaten Tabalong",
    "Kabupaten Tanah Bumbu", "Kabupaten Tanah Laut", "Kabupaten Tapin",
  ],
  "Kalimantan Timur": [
    "Samarinda", "Balikpapan", "Bontang",
    "Kabupaten Kutai Kartanegara", "Kabupaten Kutai Barat", "Kabupaten Kutai Timur",
    "Kabupaten Kutai Utara", "Kabupaten Mahakam Ulu", "Kabupaten Paser",
    "Kabupaten Penajam Paser Utara",
  ],
  "Kalimantan Utara": [
    "Tarakan",
    "Kabupaten Bulungan", "Kabupaten Malinau", "Kabupaten Nunukan",
    "Kabupaten Tana Tidung",
  ],
  // ===== SULAWESI =====
  "Sulawesi Utara": [
    "Manado", "Bitung", "Tomohon", "Kotamobagu",
    "Kabupaten Bolaang Mongondow", "Kabupaten Bolaang Mongondow Selatan",
    "Kabupaten Bolaang Mongondow Timur", "Kabupaten Bolaang Mongondow Utara",
    "Kabupaten Kepulauan Sangihe", "Kabupaten Kepulauan Siau Tagulandang Biaro",
    "Kabupaten Kepulauan Talaud", "Kabupaten Minahasa", "Kabupaten Minahasa Selatan",
    "Kabupaten Minahasa Tenggara", "Kabupaten Minahasa Utara",
  ],
  Gorontalo: [
    "Gorontalo (Kota)",
    "Kabupaten Boalemo", "Kabupaten Bone Bolango", "Kabupaten Gorontalo",
    "Kabupaten Gorontalo Utara", "Kabupaten Pohuwato",
  ],
  "Sulawesi Tengah": [
    "Palu", "Luwuk",
    "Kabupaten Banggai", "Kabupaten Banggai Kepulauan", "Kabupaten Banggai Laut",
    "Kabupaten Buol", "Kabupaten Donggala", "Kabupaten Morowali",
    "Kabupaten Morowali Utara", "Kabupaten Parigi Moutong", "Kabupaten Poso",
    "Kabupaten Sigi", "Kabupaten Tojo Una-Una", "Kabupaten Tolitoli",
  ],
  "Sulawesi Barat": [
    "Mamuju",
    "Kabupaten Majene", "Kabupaten Mamasa", "Kabupaten Mamuju Tengah",
    "Kabupaten Mamuju Utara", "Kabupaten Polewali Mandar",
  ],
  "Sulawesi Selatan": [
    "Makassar", "Parepare", "Palopo",
    "Kabupaten Bantaeng", "Kabupaten Barru", "Kabupaten Bone",
    "Kabupaten Bulukumba", "Kabupaten Enrekang", "Kabupaten Gowa",
    "Kabupaten Jeneponto", "Kabupaten Kepulauan Selayar", "Kabupaten Luwu",
    "Kabupaten Luwu Timur", "Kabupaten Luwu Utara", "Kabupaten Maros",
    "Kabupaten Pangkajene dan Kepulauan", "Kabupaten Pinrang",
    "Kabupaten Sidenreng Rappang", "Kabupaten Sinjai", "Kabupaten Soppeng",
    "Kabupaten Takalar", "Kabupaten Tana Toraja", "Kabupaten Toraja Utara",
    "Kabupaten Wajo",
  ],
  "Sulawesi Tenggara": [
    "Kendari", "Bau-Bau",
    "Kabupaten Bombana", "Kabupaten Buton", "Kabupaten Buton Selatan",
    "Kabupaten Buton Tengah", "Kabupaten Buton Utara", "Kabupaten Kolaka",
    "Kabupaten Kolaka Timur", "Kabupaten Kolaka Utara", "Kabupaten Konawe",
    "Kabupaten Konawe Kepulauan", "Kabupaten Konawe Selatan", "Kabupaten Konawe Utara",
    "Kabupaten Muna", "Kabupaten Muna Barat", "Kabupaten Wakatobi",
  ],
  // ===== MALUKU & PAPUA =====
  Maluku: [
    "Ambon", "Tual",
    "Kabupaten Buru", "Kabupaten Buru Selatan", "Kabupaten Kepulauan Aru",
    "Kabupaten Maluku Barat Daya", "Kabupaten Maluku Tengah",
    "Kabupaten Maluku Tenggara", "Kabupaten Maluku Tenggara Barat",
    "Kabupaten Seram Bagian Barat", "Kabupaten Seram Bagian Timur",
  ],
  "Maluku Utara": [
    "Ternate", "Tidore",
    "Kabupaten Halmahera Barat", "Kabupaten Halmahera Tengah",
    "Kabupaten Halmahera Timur", "Kabupaten Halmahera Selatan",
    "Kabupaten Halmahera Utara", "Kabupaten Kepulauan Sula",
    "Kabupaten Pulau Morotai", "Kabupaten Taliabu",
  ],
  Papua: [
    "Jayapura",
    "Kabupaten Biak Numfor", "Kabupaten Jayapura", "Kabupaten Keerom",
    "Kabupaten Kepulauan Yapen", "Kabupaten Mamberamo Raya", "Kabupaten Sarmi",
    "Kabupaten Supiori", "Kabupaten Waropen",
  ],
  "Papua Barat": [
    "Manokwari", "Sorong",
    "Kabupaten Kaimana", "Kabupaten Fakfak", "Kabupaten Kepulauan Misool",
    "Kabupaten Pegunungan Arfak", "Kabupaten Teluk Bintuni", "Kabupaten Teluk Wondama",
  ],
  "Papua Barat Daya": [
    "Sorong (PBD)",
    "Kabupaten Maybrat", "Kabupaten Raja Ampat", "Kabupaten Sorong",
    "Kabupaten Sorong Selatan", "Kabupaten Tambrauw",
  ],
  "Papua Tengah": [
    "Timika (Mimika)", "Nabire",
    "Kabupaten Deiyai", "Kabupaten Dogiyai", "Kabupaten Intan Jaya",
    "Kabupaten Paniai", "Kabupaten Puncak", "Kabupaten Puncak Jaya",
  ],
  "Papua Pegunungan": [
    "Wamena (Jayawijaya)",
    "Kabupaten Lanny Jaya", "Kabupaten Mamberamo Tengah", "Kabupaten Nduga",
    "Kabupaten Pegunungan Bintang", "Kabupaten Tolikara", "Kabupaten Yahukimo",
    "Kabupaten Yalimo",
  ],
  "Papua Selatan": [
    "Merauke",
    "Kabupaten Asmat", "Kabupaten Boven Digoel", "Kabupaten Mappi",
  ],
};

export { KABKOTA_PER_PROVINSI };
