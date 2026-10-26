# NUCLEAR LAB - Media Pembelajaran Digital Fisika Inti

Platform media pembelajaran interaktif fisika inti atom yang dirancang khusus mengikuti wireframe UI/UX **NUCLEAR LAB** (Sesuai Kurikulum Merdeka Fase F / SMA Kelas XII).

---

## 🎨 Halaman Utama & Struktur Navigasi (Sesuai Wireframe Desain)

### 1. Halaman Beranda (`index.html`)
* Hero banner bertema biru modern cerah: **"NUCLEAR LAB - Misi Menjelajahi Inti Atom"**.
* Ilustrasi atom 3D dengan nukleon mengorbit dan kutipan *"Small particles, Big impact"*.
* Tombol CTA: **Mulai Eksplorasi →** dan **Lihat Panduan**.
* 4 Kartu Fitur: *Materi Interaktif*, *Simulasi PhET*, *Kuis & Tantangan*, dan *Sertifikat*.
* Bar Sasaran Pembelajaran: *Siswa SMA Kelas XII | Fase F (Kurikulum Merdeka)*.

### 2. Navigasi Materi (`materi.html`) & 6 Sub-Halaman Materi
Halaman hub 6 kartu topik materi pembelajaran yang masing-masing memiliki halaman modul sendiri:
1. [**`materi-1.html`**](file:///C:/Users/tiery/.gemini/antigravity/scratch/fisika-inti-web/materi-1.html) — **Mengenal Inti Atom** (Proton, neutron, elektron, nomor atom $Z$, nomor massa $A$, lambang nuklida $^A_Z\text{X}$, isotop/isobar/isoton).
2. [**`materi-2.html`**](file:///C:/Users/tiery/.gemini/antigravity/scratch/fisika-inti-web/materi-2.html) — **Kestabilan Inti** (Gaya nuklir kuat vs gaya Coulomb, pita kestabilan $N/Z$, defek massa $\Delta m$, kalkulator energi ikat $E_b$).
3. [**`materi-3.html`**](file:///C:/Users/tiery/.gemini/antigravity/scratch/fisika-inti-web/materi-3.html) — **Radioaktivitas** (Peluruhan alfa $\alpha$, beta $\beta$, gamma $\gamma$, persamaan reaksi peluruhan, tabel sifat fisik radiasi).
4. [**`materi-4.html`**](file:///C:/Users/tiery/.gemini/antigravity/scratch/fisika-inti-web/materi-4.html) — **Waktu Paruh** (Konsep $T_{1/2}$, rumus $N(t) = N_0(1/2)^{t/T_{1/2}}$, aktivitas radiasi Becquerel, contoh soal hitungan).
5. [**`materi-5.html`**](file:///C:/Users/tiery/.gemini/antigravity/scratch/fisika-inti-web/materi-5.html) — **Reaksi Inti** (Fisi vs Fusi, reaksi berantai $^{235}\text{U}$, nilai energi reaksi $Q$, penanggalan Karbon-14).
6. [**`materi-6.html`**](file:///C:/Users/tiery/.gemini/antigravity/scratch/fisika-inti-web/materi-6.html) — **Pemanfaatan & Keselamatan** (Aplikasi kedokteran nuklir, PLTN, industri, dan prinsip proteksi keselamatan ALARA).

### 3. Halaman Simulasi (`simulasi.html`)
* **Build a Nucleus (PhET / Interaktif)**: Kanvas gelap ala PhET untuk menyusun jumlah proton dan neutron dengan tombol $+/-$, indikator simbol unsur real-time, dan status kestabilan.
* Dilengkapi tab *Daya Tembus Radiasi*, *Decay Simulation Chart*, dan *Reaksi Berantai Fisi*.
* Tombol eksternal langsung menuju simulasi resmi PhET University of Colorado.

### 4. Halaman Kuis (`kuis.html`)
* Format stepper per soal dengan *Progress Bar* (misal: "Soal 3 / 5").
* Opsi pilihan ganda berumus KaTeX dengan feedback seketika.
* Widget kanan:
  - **💡 Ingat!** (Tip konsep penting terkait soal).
  - **❓ Butuh bantuan?** (Maskot toga nuklir dengan link "Buka Materi").

### 5. Panduan & Glosarium (`panduan.html`)
* Rangkuman alur navigasi 5 langkah.
* Daftar fitur tambahan platform dan glosarium istilah fisika inti.

---

## 🛠️ Berkas Pendukung

* `app.js`: Logika interaktif semua simulator, kuis stepper, dan KaTeX auto-polling.
* `.nojekyll`: Kompatibilitas GitHub Pages agar rumus matematika tidak terganggu oleh Jekyll.
