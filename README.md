# FisikaInti.Lab - Media Pembelajaran Digital Fisika Inti (Light Theme)

Media pembelajaran interaktif berbasis web untuk konsep **Fisika Inti** (SMA / Perguruan Tinggi Dasar) dengan tampilan **Clean White / Light Mode**, tipografi profesional, dan rumus matematika berstandar LaTeX (KaTeX).

---

## 🚀 Fitur Utama & Modul Pembelajaran

1. **Modul 1: Struktur & Model Inti Atom**
   - Notasi nuklida matematis: $^A_Z\text{X}$ dengan persamaan $A = Z + N$.
   - Slider interaktif jumlah Proton ($Z$) dan Neutron ($N$).
   - Visualisasi model inti 2D di Canvas dengan partikel proton (merah $+$) dan neutron (biru $0$).
   - Evaluasi otomatis rasio pita kestabilan ($N/Z$).

2. **Modul 2: Defek Massa & Energi Ikat Inti**
   - Penulisan rumus formal KaTeX:
     $$\Delta m = [Z \cdot m_p + (A - Z) \cdot m_n] - m_{\text{inti}}$$
     $$E_b = \Delta m \times 931.5 \text{ MeV}$$
   - Kalkulator otomatis energi ikat total ($E_b$) dan energi ikat per nukleon ($E_b / A$).
   - Preset nuklida: $^{4}_{2}\text{He}$, $^{12}_{6}\text{C}$, $^{16}_{8}\text{O}$, $^{56}_{26}\text{Fe}$, $^{235}_{92}\text{U}$, dan input kustom manual.
   - Penjabaran matematis langkah demi langkah yang transparan.

3. **Modul 3: Radioaktivitas & Simulasi Waktu Paruh (*Half-Life*)**
   - Rumus hukum peluruhan radioaktif:
     $$N(t) = N_0 \left(\frac{1}{2}\right)^{\frac{t}{T_{1/2}}}$$
   - Wadah Canvas 200 partikel radioaktif yang meluruh secara stokastik (acak) real-time.
   - Grafik interaktif kurva eksponensial **Chart.js** (Light theme) membandingkan kurva teori dengan sampel nyata.

4. **Modul 4: Lab Visual Daya Tembus Radiasi**
   - Simulasi animasi penembakan berkas sinar **Alfa ($\alpha$)**, **Beta ($\beta$)**, dan **Gamma ($\gamma$)**.
   - Pengujian material perisai: Kertas ($0.1\text{ mm}$), Aluminium ($3\text{ mm}$), dan Balok Timbal ($50\text{ mm}$).
   - Tabel komparasi daya ionisasi, daya tembus, dan muatan/massa.

5. **Modul 5: Reaksi Inti & Simulasi Fisi Berantai**
   - Komparasi persamaan reaksi Fisi ($^{235}_{92}\text{U}$) vs Fusi ($^2_1\text{H} + ^3_1\text{H}$).
   - **Simulasi Reaksi Berantai Fisi Nuklir**: Tembakkan satu neutron lambat untuk membelah inti $^{235}\text{U}$ dan memicu reaksi berantai multiplikasi neutron.

6. **Modul 6: Kalkulator Penanggalan Radiokarbon ($^{14}\text{C}$)**
   - Menghitung perkiraan umur artefak purbakala berdasarkan sisa persentase $^{14}\text{C}$ ($T_{1/2} = 5730\text{ tahun}$).

7. **Modul 7: Kuis Evaluasi Pemahaman**
   - 5 Soal pilihan ganda konsep dan hitungan.
   - Feedback seketika (indikator benar/salah), skor terhitung otomatis, dan kotak pembahasan ilmiah dengan rumus KaTeX.

---

## 🛠️ Pustaka & Teknologi yang Digunakan

- **HTML5 & CSS3**
- **Tailwind CSS (CDN)** (Clean Light Mode Theme)
- **KaTeX (CDN)** (Render rumus fisika dan matematika berkualitas cetak)
- **Chart.js (CDN)** (Grafik eksponensial real-time)
- **HTML5 Canvas API** (Simulasi model inti, peluruhan acak, uji penetrasi radiasi, dan reaksi berantai fisi)

---

## 💻 Cara Menjalankan

Buka file [**`index.html`**](file:///C:/Users/tiery/.gemini/antigravity/scratch/fisika-inti-web/index.html) langsung di peramban web (*Google Chrome, Microsoft Edge, Mozilla Firefox, dll*).
