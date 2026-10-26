// ==========================================
// FISIKA INTI LAB - SCRIPT LOGIKA UTAMA (LIGHT THEME)
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  // Inisialisasi KaTeX Auto-Render pertama kali
  triggerMathRender();

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Inisialisasi Seluruh Modul
  initNucleusViewer();
  initBindingEnergyCalc();
  initDecaySimulation();
  initRadiationLab();
  initChainReactionSimulation();
  updateC14Calc();
  initQuiz();
});

// Helper untuk Render Math KaTeX ke elemen tertentu atau seluruh dokumen
function triggerMathRender(container = document.body) {
  if (window.renderMathInElement) {
    window.renderMathInElement(container, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false },
        { left: '\\[', right: '\\]', display: true },
        { left: '\\(', right: '\\)', display: false }
      ],
      throwOnError: false
    });
  }
}

// ==========================================
// MODUL 1: STRUKTUR & MODEL INTI ATOM (CANVAS)
// ==========================================
const elementsMap = {
  1: 'H', 2: 'He', 3: 'Li', 4: 'Be', 5: 'B', 6: 'C', 7: 'N', 8: 'O',
  9: 'F', 10: 'Ne', 11: 'Na', 12: 'Mg', 13: 'Al', 14: 'Si', 15: 'P',
  16: 'S', 17: 'Cl', 18: 'Ar', 19: 'K', 20: 'Ca', 26: 'Fe', 28: 'Ni',
  29: 'Cu', 30: 'Zn'
};

let protonCount = 2;
let neutronCount = 2;

function initNucleusViewer() {
  const pSlider = document.getElementById('protonSlider');
  const nSlider = document.getElementById('neutronSlider');

  if (pSlider && nSlider) {
    pSlider.addEventListener('input', (e) => {
      protonCount = parseInt(e.target.value);
      updateNucleusDisplay();
    });

    nSlider.addEventListener('input', (e) => {
      neutronCount = parseInt(e.target.value);
      updateNucleusDisplay();
    });
  }

  updateNucleusDisplay();
}

function setNucleusPreset(z, n, sym) {
  const pSlider = document.getElementById('protonSlider');
  const nSlider = document.getElementById('neutronSlider');
  if (pSlider && nSlider) {
    pSlider.value = z;
    nSlider.value = n;
    protonCount = z;
    neutronCount = n;
    updateNucleusDisplay();
  }
}

function updateNucleusDisplay() {
  const aVal = protonCount + neutronCount;
  const sym = elementsMap[protonCount] || 'X';

  document.getElementById('protonVal').textContent = protonCount;
  document.getElementById('neutronVal').textContent = neutronCount;
  document.getElementById('displayA').textContent = aVal;
  document.getElementById('displayZ').textContent = protonCount;
  document.getElementById('displaySym').textContent = sym;
  document.getElementById('calcA').textContent = aVal;
  document.getElementById('calcZ').textContent = protonCount;
  document.getElementById('calcN').textContent = neutronCount;

  // Analisis rasio N/Z kestabilan
  const ratio = protonCount > 0 ? (neutronCount / protonCount) : 0;
  const badge = document.getElementById('stabilityBadge');
  const desc = document.getElementById('stabilityDesc');

  if (protonCount === 1 && neutronCount === 0) {
    badge.className = "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold bg-emerald-50 text-emerald-800 border border-emerald-300";
    badge.textContent = `✅ Inti Hidrogen Stabil (Proton Tunggal)`;
    desc.textContent = "Hidrogen-1 (^1_1H) adalah satu-satunya inti stabil tanpa neutron di alam semesta.";
  } else if (ratio >= 0.95 && ratio <= 1.55 && aVal <= 80) {
    badge.className = "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold bg-emerald-50 text-emerald-800 border border-emerald-300";
    badge.textContent = `✅ Berada di Pita Kestabilan (N/Z = ${ratio.toFixed(2)})`;
    desc.textContent = "Komposisi nukleon seimbang. Gaya tarik nuklir kuat mampu menahan tolakan elektrostatis antar-proton.";
  } else if (ratio < 0.95) {
    badge.className = "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold bg-rose-50 text-rose-800 border border-rose-300";
    badge.textContent = `⚠️ Kurang Neutron / Kelebihan Proton (N/Z = ${ratio.toFixed(2)})`;
    desc.textContent = "Tolakan Coulomb antar-proton terlalu kuat. Inti cenderung meluruh melalui pemancaran positron (β+) atau penangkapan elektron.";
  } else {
    badge.className = "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold bg-amber-50 text-amber-800 border border-amber-300";
    badge.textContent = `⚠️ Kelebihan Neutron (N/Z = ${ratio.toFixed(2)})`;
    desc.textContent = "Inti berada di atas pita kestabilan, cenderung meluruh dengan memancarkan partikel beta-minus (β-) untuk mengubah neutron berlebih menjadi proton.";
  }

  drawNucleusCanvas();
}

function drawNucleusCanvas() {
  const canvas = document.getElementById('nucleusCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;

  ctx.clearRect(0, 0, width, height);

  const total = protonCount + neutronCount;
  const centerX = width / 2;
  const centerY = height / 2;

  // Soft glow lingkaran batas medan nuklir
  const maxR = Math.max(38, Math.sqrt(total) * 17);
  const grad = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, maxR + 10);
  grad.addColorStop(0, 'rgba(13, 148, 136, 0.12)');
  grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(centerX, centerY, maxR + 10, 0, Math.PI * 2);
  ctx.fill();

  // Susun koordinat partikel dengan Fermat's spiral
  const particles = [];
  let pLeft = protonCount;
  let nLeft = neutronCount;

  for (let i = 0; i < total; i++) {
    let type = 'p';
    if (pLeft > 0 && nLeft > 0) {
      type = (i % 2 === 0) ? 'p' : 'n';
      if (type === 'p') pLeft--; else nLeft--;
    } else if (pLeft > 0) {
      type = 'p'; pLeft--;
    } else {
      type = 'n'; nLeft--;
    }

    const angle = i * 2.39996;
    const radius = Math.sqrt(i) * 13 + (i > 0 ? 2 : 0);
    const px = centerX + Math.cos(angle) * radius;
    const py = centerY + Math.sin(angle) * radius;
    particles.push({ x: px, y: py, type: type });
  }

  // Gambar setiap partikel di kanvas terang
  particles.forEach(pt => {
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, 8.5, 0, Math.PI * 2);
    if (pt.type === 'p') {
      // Proton: Merah terang dengan border halus
      ctx.fillStyle = '#ef4444';
      ctx.strokeStyle = '#b91c1c';
    } else {
      // Neutron: Biru cerah dengan border halus
      ctx.fillStyle = '#0ea5e9';
      ctx.strokeStyle = '#0369a1';
    }
    ctx.lineWidth = 1.5;
    ctx.fill();
    ctx.stroke();

    // Label muatan +/-
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 9px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(pt.type === 'p' ? '+' : '0', pt.x, pt.y);
  });
}

// ==========================================
// MODUL 2: KALKULATOR DEFEK MASSA & ENERGI IKAT
// ==========================================
const MP = 1.007825; // sma
const MN = 1.008665; // sma
const C2_MEV = 931.5; // MeV/sma

const calcPresets = {
  he4: { z: 2, a: 4, m: 4.0015 },
  c12: { z: 6, a: 12, m: 12.0000 },
  o16: { z: 8, a: 16, m: 15.9949 },
  fe56: { z: 26, a: 56, m: 55.9349 },
  u235: { z: 92, a: 235, m: 235.0439 }
};

function initBindingEnergyCalc() {
  calculateBindingEnergy();
}

function applyCalcPreset() {
  const sel = document.getElementById('calcPreset').value;
  if (sel === 'custom') return;

  const data = calcPresets[sel];
  if (data) {
    document.getElementById('inputZ').value = data.z;
    document.getElementById('inputA').value = data.a;
    document.getElementById('inputM').value = data.m;
    calculateBindingEnergy();
  }
}

function calculateBindingEnergy() {
  const z = parseInt(document.getElementById('inputZ').value) || 1;
  const a = parseInt(document.getElementById('inputA').value) || 1;
  const mInti = parseFloat(document.getElementById('inputM').value) || 1.0;

  const n = Math.max(0, a - z);
  const totalMassConstituents = (z * MP) + (n * MN);
  const deltaM = Math.max(0, totalMassConstituents - mInti);
  const eb = deltaM * C2_MEV;
  const ebPerA = a > 0 ? (eb / a) : 0;

  // Tampilkan hasil
  document.getElementById('resDeltaM').textContent = deltaM.toFixed(5) + " sma";
  document.getElementById('resEb').textContent = eb.toFixed(2) + " MeV";
  document.getElementById('resEbPerA').textContent = ebPerA.toFixed(3) + " MeV/nukleon";

  // Badge kestabilan
  const ebBadge = document.getElementById('ebPerNucleonBadge');
  if (ebPerA >= 8.5) {
    ebBadge.className = "text-xs px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 font-bold border border-emerald-300";
    ebBadge.textContent = "Puncak Kestabilan (Sangat Kuat)";
  } else if (ebPerA >= 7.0) {
    ebBadge.className = "text-xs px-2.5 py-1 rounded-md bg-teal-100 text-teal-800 font-bold border border-teal-300";
    ebBadge.textContent = "Stabil";
  } else {
    ebBadge.className = "text-xs px-2.5 py-1 rounded-md bg-amber-100 text-amber-800 font-bold border border-amber-300";
    ebBadge.textContent = "Kestabilan Rendah";
  }

  // Update langkah matematis rinci
  document.getElementById('step1').textContent = 
    `1. Massa penyusun = (${z} × ${MP}) + (${n} × ${MN}) = ${totalMassConstituents.toFixed(5)} sma`;
  document.getElementById('step2').textContent = 
    `2. Defek massa Δm = ${totalMassConstituents.toFixed(5)} - ${mInti.toFixed(5)} = ${deltaM.toFixed(5)} sma`;
  document.getElementById('step3').textContent = 
    `3. Eb = ${deltaM.toFixed(5)} × 931.5 = ${eb.toFixed(3)} MeV`;
  document.getElementById('step4').textContent = 
    `4. Eb/A = ${eb.toFixed(3)} / ${a} = ${ebPerA.toFixed(3)} MeV/nukleon`;
}

// ==========================================
// MODUL 3: PELURUHAN RADIOAKTIF & SIMULASI WAKTU PARUH
// ==========================================
const TOTAL_ATOMS = 200;
const HALF_LIFE = 5.0; // detik
const LAMBDA = Math.LN2 / HALF_LIFE;

let atomParticles = [];
let simRunning = false;
let simTime = 0.0;
let lastTimestamp = 0;
let decayChartInstance = null;

function initDecaySimulation() {
  createAtoms();
  initDecayChart();
  drawDecayCanvas();
}

function createAtoms() {
  atomParticles = [];
  for (let i = 0; i < TOTAL_ATOMS; i++) {
    atomParticles.push({
      x: Math.random() * 410 + 20,
      y: Math.random() * 216 + 20,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      decayed: false
    });
  }
}

function initDecayChart() {
  const ctx = document.getElementById('decayChart').getContext('2d');
  
  const theoreticalLabels = [];
  const theoreticalData = [];
  for (let t = 0; t <= 25; t += 1) {
    theoreticalLabels.push(t + 's');
    theoreticalData.push(TOTAL_ATOMS * Math.pow(0.5, t / HALF_LIFE));
  }

  decayChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: theoreticalLabels,
      datasets: [
        {
          label: 'Kurva Teori N(t)',
          data: theoreticalData,
          borderColor: 'rgba(13, 148, 136, 0.4)',
          borderWidth: 2,
          borderDash: [4, 4],
          pointRadius: 0,
          fill: false,
          tension: 0.3
        },
        {
          label: 'Sampel Nyata Simulasi',
          data: [{ x: '0s', y: TOTAL_ATOMS }],
          borderColor: '#0f766e',
          backgroundColor: '#0d9488',
          borderWidth: 2.5,
          pointRadius: 4,
          pointBackgroundColor: '#0f766e',
          showLine: true,
          tension: 0.2
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: { color: 'rgba(226, 232, 240, 0.8)' },
          ticks: { color: '#475569', font: { size: 10 } }
        },
        y: {
          min: 0,
          max: TOTAL_ATOMS,
          grid: { color: 'rgba(226, 232, 240, 0.8)' },
          ticks: { color: '#475569', font: { size: 10 } }
        }
      },
      plugins: {
        legend: {
          labels: { color: '#334155', font: { size: 11, weight: 'bold' } }
        }
      }
    }
  });
}

function toggleSim() {
  simRunning = !simRunning;
  const btn = document.getElementById('btnPlaySim');
  const icon = document.getElementById('playIcon');
  const text = document.getElementById('playText');

  if (simRunning) {
    icon.textContent = '⏸';
    text.textContent = 'Jeda';
    btn.className = "px-4 py-2.5 rounded-xl bg-amber-600 text-white font-bold text-sm hover:bg-amber-700 transition flex items-center gap-2 shadow-sm";
    lastTimestamp = performance.now();
    requestAnimationFrame(simulationLoop);
  } else {
    icon.textContent = '▶';
    text.textContent = 'Lanjutkan';
    btn.className = "px-4 py-2.5 rounded-xl bg-teal-600 text-white font-bold text-sm hover:bg-teal-700 transition flex items-center gap-2 shadow-sm";
  }
}

function resetSim() {
  simRunning = false;
  simTime = 0.0;
  
  const btn = document.getElementById('btnPlaySim');
  document.getElementById('playIcon').textContent = '▶';
  document.getElementById('playText').textContent = 'Mulai Peluruhan';
  btn.className = "px-4 py-2.5 rounded-xl bg-teal-600 text-white font-bold text-sm hover:bg-teal-700 transition flex items-center gap-2 shadow-sm";

  createAtoms();
  updateSimStats();
  drawDecayCanvas();

  if (decayChartInstance) {
    decayChartInstance.data.datasets[1].data = [{ x: '0s', y: TOTAL_ATOMS }];
    decayChartInstance.update();
  }
}

function simulationLoop(timestamp) {
  if (!simRunning) return;

  const dt = (timestamp - lastTimestamp) / 1000;
  lastTimestamp = timestamp;
  simTime += dt;

  const decayProb = 1 - Math.exp(-LAMBDA * dt);

  atomParticles.forEach(atom => {
    atom.x += atom.vx;
    atom.y += atom.vy;
    if (atom.x < 10 || atom.x > 440) atom.vx *= -1;
    if (atom.y < 10 || atom.y > 246) atom.vy *= -1;

    if (!atom.decayed && Math.random() < decayProb) {
      atom.decayed = true;
    }
  });

  updateSimStats();
  drawDecayCanvas();

  if (decayChartInstance) {
    const currentActive = atomParticles.filter(a => !a.decayed).length;
    const roundedT = Math.min(25, Math.floor(simTime)) + 's';
    const currentData = decayChartInstance.data.datasets[1].data;

    if (currentData.length === 0 || currentData[currentData.length - 1].x !== roundedT) {
      if (simTime <= 25.5) {
        currentData.push({ x: roundedT, y: currentActive });
      }
    } else {
      currentData[currentData.length - 1].y = currentActive;
    }
    decayChartInstance.update('none');
  }

  if (simTime >= 25 || atomParticles.every(a => a.decayed)) {
    simRunning = false;
    document.getElementById('playIcon').textContent = '▶';
    document.getElementById('playText').textContent = 'Selesai';
    return;
  }

  requestAnimationFrame(simulationLoop);
}

function updateSimStats() {
  const activeCount = atomParticles.filter(a => !a.decayed).length;
  const decayedCount = TOTAL_ATOMS - activeCount;
  const pct = ((activeCount / TOTAL_ATOMS) * 100).toFixed(1);

  document.getElementById('lblActive').textContent = activeCount;
  document.getElementById('lblDecayed').textContent = decayedCount;
  document.getElementById('lblCurrentTime').textContent = simTime.toFixed(1) + ' s';
  document.getElementById('lblPercentRemaining').textContent = `${pct}% Tersisa`;
}

function drawDecayCanvas() {
  const canvas = document.getElementById('decayCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  atomParticles.forEach(atom => {
    ctx.beginPath();
    ctx.arc(atom.x, atom.y, 5, 0, Math.PI * 2);
    if (!atom.decayed) {
      ctx.fillStyle = '#0d9488'; // Teal untuk atom aktif
      ctx.strokeStyle = '#115e59';
    } else {
      ctx.fillStyle = '#cbd5e1'; // Abu-abu muda untuk inti anak yang meluruh
      ctx.strokeStyle = '#94a3b8';
    }
    ctx.lineWidth = 1;
    ctx.fill();
    ctx.stroke();
  });
}

// ==========================================
// MODUL 4: LAB DAYA TEMBUS RADIASI (INTERAKTIF)
// ==========================================
let currentRay = 'alpha'; // 'alpha' | 'beta' | 'gamma'
let rayParticles = [];
let rayAnimationId = null;

function initRadiationLab() {
  drawRadiationLab();
}

function setRadiationRay(rayType) {
  currentRay = rayType;
  const btnA = document.getElementById('btnRayAlpha');
  const btnB = document.getElementById('btnRayBeta');
  const btnG = document.getElementById('btnRayGamma');

  [btnA, btnB, btnG].forEach(b => {
    b.className = "px-3.5 py-1.5 rounded-lg text-xs font-bold bg-white text-slate-700 border border-slate-300 hover:bg-slate-100 shadow-sm transition";
  });

  if (rayType === 'alpha') {
    btnA.className = "px-3.5 py-1.5 rounded-lg text-xs font-bold bg-teal-600 text-white shadow-sm transition";
    document.getElementById('rayStatusText').textContent = "Sinar Alfa (α) dipilih: Inti Helium (bermuatan +2e).";
  } else if (rayType === 'beta') {
    btnB.className = "px-3.5 py-1.5 rounded-lg text-xs font-bold bg-cyan-600 text-white shadow-sm transition";
    document.getElementById('rayStatusText').textContent = "Sinar Beta (β) dipilih: Elektron berkecepatan tinggi.";
  } else {
    btnG.className = "px-3.5 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 text-white shadow-sm transition";
    document.getElementById('rayStatusText').textContent = "Sinar Gamma (γ) dipilih: Foton elektromagnetik energi tinggi.";
  }

  drawRadiationLab();
}

function fireRadiation() {
  if (rayAnimationId) cancelAnimationFrame(rayAnimationId);
  rayParticles = [];

  // Generate 25 partikel
  for (let i = 0; i < 25; i++) {
    let speed = 3.5;
    let color = '#0d9488';
    let size = 5;
    let stopX = 850;

    if (currentRay === 'alpha') {
      speed = 3.0;
      color = '#ef4444'; // Merah
      size = 6;
      stopX = 230 + Math.random() * 5; // Terhalang oleh kertas
    } else if (currentRay === 'beta') {
      speed = 4.8;
      color = '#0284c7'; // Biru
      size = 3.5;
      stopX = 450 + Math.random() * 8; // Menembus kertas, terhalang aluminium
    } else {
      speed = 6.0;
      color = '#6366f1'; // Ungu
      size = 3;
      stopX = 675 + (Math.random() < 0.25 ? 150 : Math.random() * 15); // Menembus kertas & aluminium, diredam timbal
    }

    rayParticles.push({
      x: 40,
      y: 70 + Math.random() * 115,
      speed: speed + (Math.random() - 0.5) * 0.4,
      stopX: stopX,
      stopped: false,
      color: color,
      size: size
    });
  }

  animateRadiationLab();
}

function animateRadiationLab() {
  const canvas = document.getElementById('radiationCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  drawRadiationLab();

  let allStopped = true;
  rayParticles.forEach(p => {
    if (!p.stopped) {
      p.x += p.speed;
      if (p.x >= p.stopX) {
        p.stopped = true;
        p.x = p.stopX;
      } else {
        allStopped = false;
      }
    }

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
  });

  if (!allStopped) {
    rayAnimationId = requestAnimationFrame(animateRadiationLab);
  } else {
    if (currentRay === 'alpha') {
      document.getElementById('rayStatusText').innerHTML = "<b class='text-rose-600'>Partikel Alfa Terhalang!</b> Selembar kertas sanggup menghentikan seluruh partikel alfa.";
    } else if (currentRay === 'beta') {
      document.getElementById('rayStatusText').innerHTML = "<b class='text-cyan-700'>Partikel Beta Lolos Kertas</b> namun <b class='text-rose-600'>Berhasil Diredam</b> oleh pelat Aluminium.";
    } else {
      document.getElementById('rayStatusText').innerHTML = "<b class='text-indigo-700'>Sinar Gamma Menembus Kertas & Aluminium</b>, hanya balok Timbal tebal yang sanggup meredamnya.";
    }
  }
}

function drawRadiationLab() {
  const canvas = document.getElementById('radiationCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Sumber Radiasi di kiri
  ctx.fillStyle = '#f1f5f9';
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 2;
  ctx.fillRect(15, 60, 45, 135);
  ctx.strokeRect(15, 60, 45, 135);
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 11px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText("SUMBER", 37, 120);
  ctx.fillText("RADIASI", 37, 135);

  // 1. Material Kertas (x = 230)
  ctx.fillStyle = '#fef08a';
  ctx.strokeStyle = '#ca8a04';
  ctx.fillRect(230, 40, 16, 175);
  ctx.strokeRect(230, 40, 16, 175);
  ctx.fillStyle = '#854d0e';
  ctx.fillText("Kertas", 238, 232);
  ctx.font = '9px sans-serif';
  ctx.fillText("(0.1 mm)", 238, 244);

  // 2. Material Aluminium (x = 450)
  ctx.fillStyle = '#cbd5e1';
  ctx.strokeStyle = '#64748b';
  ctx.fillRect(450, 40, 24, 175);
  ctx.strokeRect(450, 40, 24, 175);
  ctx.fillStyle = '#334155';
  ctx.font = 'bold 11px sans-serif';
  ctx.fillText("Aluminium", 462, 232);
  ctx.font = '9px sans-serif';
  ctx.fillText("(3 mm)", 462, 244);

  // 3. Material Timbal / Lead (x = 670)
  ctx.fillStyle = '#64748b';
  ctx.strokeStyle = '#334155';
  ctx.fillRect(670, 40, 42, 175);
  ctx.strokeRect(670, 40, 42, 175);
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 11px sans-serif';
  ctx.fillText("Timbal (Pb)", 691, 232);
  ctx.font = '9px sans-serif';
  ctx.fillText("(50 mm)", 691, 244);
}

// ==========================================
// MODUL 5: REAKSI BERANTAI FISI (CANVAS)
// ==========================================
let fissionAtoms = [];
let freeNeutrons = [];
let chainAnimId = null;
let fissionCount = 0;

function initChainReactionSimulation() {
  resetChainReaction();
}

function resetChainReaction() {
  if (chainAnimId) cancelAnimationFrame(chainAnimId);
  fissionAtoms = [];
  freeNeutrons = [];
  fissionCount = 0;
  document.getElementById('fissionCountText').textContent = "0";

  // Susun 40 atom U-235
  const cols = 8;
  const rows = 5;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      fissionAtoms.push({
        x: 100 + c * 85 + (Math.random() - 0.5) * 15,
        y: 45 + r * 42 + (Math.random() - 0.5) * 10,
        fissioned: false,
        radius: 12
      });
    }
  }

  drawFissionCanvas();
}

function startChainReaction() {
  if (freeNeutrons.length > 0) return; // jangan dobel tembak
  // Tembakkan 1 neutron awal dari kiri menuju baris tengah
  freeNeutrons.push({
    x: 20,
    y: 128,
    vx: 5.5,
    vy: (Math.random() - 0.5) * 1.5,
    radius: 3.5
  });

  animateChainReaction();
}

function animateChainReaction() {
  const canvas = document.getElementById('fissionCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // Update neutron bebas
  for (let i = freeNeutrons.length - 1; i >= 0; i--) {
    const n = freeNeutrons[i];
    n.x += n.vx;
    n.y += n.vy;

    // Pantulan dinding
    if (n.y < 10 || n.y > 246) n.vy *= -1;

    // Hapus neutron jika keluar kanvas kanan atau kiri
    if (n.x > 810 || n.x < 10) {
      freeNeutrons.splice(i, 1);
      continue;
    }

    // Deteksi tabrakan dengan inti U-235 utuh
    for (let j = 0; j < fissionAtoms.length; j++) {
      const atom = fissionAtoms[j];
      if (!atom.fissioned) {
        const dist = Math.hypot(n.x - atom.x, n.y - atom.y);
        if (dist <= atom.radius + n.radius) {
          // Inti U-235 membelah!
          atom.fissioned = true;
          fissionCount++;
          document.getElementById('fissionCountText').textContent = fissionCount;

          // Hapus neutron penabrak
          freeNeutrons.splice(i, 1);

          // Hasilkan 2 atau 3 neutron baru dengan arah acak
          const newNeutronCount = Math.random() < 0.6 ? 3 : 2;
          for (let k = 0; k < newNeutronCount; k++) {
            const angle = Math.random() * Math.PI * 2;
            const spd = 4.5 + Math.random() * 1.5;
            freeNeutrons.push({
              x: atom.x,
              y: atom.y,
              vx: Math.cos(angle) * spd,
              vy: Math.sin(angle) * spd,
              radius: 3.5
            });
          }
          break;
        }
      }
    }
  }

  drawFissionCanvas();

  if (freeNeutrons.length > 0) {
    chainAnimId = requestAnimationFrame(animateChainReaction);
  }
}

function drawFissionCanvas() {
  const canvas = document.getElementById('fissionCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Gambar atom U-235
  fissionAtoms.forEach(atom => {
    ctx.beginPath();
    ctx.arc(atom.x, atom.y, atom.radius, 0, Math.PI * 2);
    if (!atom.fissioned) {
      ctx.fillStyle = '#0d9488'; // Hijau/Teal U-235
      ctx.strokeStyle = '#042f2e';
      ctx.lineWidth = 1.5;
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 8px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText("²³⁵U", atom.x, atom.y);
    } else {
      // Fragmen Fisi (Ba & Kr)
      ctx.fillStyle = '#fb923c'; // Fragmen oranye
      ctx.fill();
      ctx.beginPath();
      ctx.arc(atom.x - 7, atom.y + 4, 6, 0, Math.PI * 2);
      ctx.arc(atom.x + 8, atom.y - 4, 7, 0, Math.PI * 2);
      ctx.fillStyle = '#f97316';
      ctx.fill();
    }
  });

  // Gambar neutron bergerak
  freeNeutrons.forEach(n => {
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#38bdf8'; // Biru cerah neutron
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 1;
    ctx.fill();
    ctx.stroke();
  });
}

// ==========================================
// MODUL 6: KALKULATOR PENANGGALAN KARBON-14
// ==========================================
function updateC14Calc() {
  const slider = document.getElementById('c14Slider');
  if (!slider) return;
  const pct = parseFloat(slider.value);
  document.getElementById('c14SliderVal').textContent = `${pct}%`;

  const tHalf = 5730; // tahun
  // t = - (tHalf / ln 2) * ln(pct / 100)
  const age = - (tHalf / Math.LN2) * Math.log(pct / 100);
  const periods = age / tHalf;

  document.getElementById('c14ResultAge').textContent = `${Math.round(age).toLocaleString('id-ID')} Tahun`;
  document.getElementById('c14PeriodText').textContent = `Setara dengan ${periods.toFixed(2)} kali waktu paruh (${tHalf} th)`;
}

// ==========================================
// MODUL 7: KUIS EVALUASI PEMAHAMAN
// ==========================================
const quizQuestions = [
  {
    id: 1,
    question: "Nukleon merupakan istilah untuk partikel-partikel penyusun inti atom, yaitu...",
    options: [
      "Elektron dan Proton",
      "Proton dan Neutron",
      "Neutron dan Foton",
      "Elektron dan Positron"
    ],
    answer: 1,
    explanation: "Inti atom tersusun atas partikel bermuatan positif (proton) dan partikel bermuatan netral (neutron). Keduanya secara bersama-sama disebut nukleon."
  },
  {
    id: 2,
    question: "Berdasarkan prinsip kesetaraan massa-energi Einstein ($E = \\Delta m \\cdot c^2$), selisih antara massa nukleon bebas dan massa inti utuh (defek massa) telah berubah menjadi...",
    options: [
      "Gaya tolak elektrostatis antar-elektron",
      "Energi kinetik rotasi orbital kulit atom",
      "Energi ikat inti ($E_b$) yang merekatkan nukleon",
      "Energi potensial gravitasi antar-partikel subatomik"
    ],
    answer: 2,
    explanation: "Ketika proton dan neutron bergabung membentuk nukleus, sebagian massanya lenyap (defek massa $\\Delta m$) dan dikonversi menjadi energi ikat inti ($E_b = \\Delta m \\cdot 931.5\\text{ MeV}$) yang menjaga keutuhan inti dari gaya tolak Coulomb."
  },
  {
    id: 3,
    question: "Di antara ketiga jenis sinar radioaktif ($\\\\alpha$, $\\\\beta$, $\\\\gamma$), radiasi yang memiliki daya tembus paling tinggi namun daya ionisasinya paling lemah adalah...",
    options: [
      "Sinar Alfa ($\\\\alpha$)",
      "Sinar Beta ($\\\\beta$)",
      "Sinar Gamma ($\\\\gamma$)",
      "Sinar Katoda"
    ],
    answer: 2,
    explanation: "Sinar Gamma ($\\\\gamma$) merupakan gelombang elektromagnetik berenergi sangat tinggi tanpa massa dan muatan, sehingga daya tembusnya paling dahsyat (hanya dapat diredam timbal tebal), namun daya ionisasinya paling lemah dibandingkan partikel bermuatan seperti Alfa."
  },
  {
    id: 4,
    question: "Suatu zat radioaktif memiliki waktu paruh $T_{1/2} = 6\\text{ hari}$. Jika massa awal zat tersebut $N_0 = 120\\text{ gram}$, berapakah massa sisa setelah $18\\text{ hari}$?",
    options: [
      "$60\\text{ gram}$",
      "$30\\text{ gram}$",
      "$15\\text{ gram}$",
      "$7.5\\text{ gram}$"
    ],
    answer: 2,
    explanation: "Waktu berjalan $t = 18\\text{ hari}$ adalah $n = \\frac{18}{6} = 3$ kali waktu paruh. Maka sisa zat: $N(t) = 120 \\times \\left(\\frac{1}{2}\\right)^3 = 120 \\times \\frac{1}{8} = 15\\text{ gram}$."
  },
  {
    id: 5,
    question: "Reaksi penggabungan dua inti ringan menjadi inti yang lebih berat (seperti $^{2}_1\\text{H} + \\,^3_1\\text{H} \\rightarrow \\,^4_2\\text{He} + \\,^1_0n$) yang terjadi pada pusat matahari dinamakan...",
    options: [
      "Reaksi Fisi Nuklir",
      "Reaksi Fusi Nuklir",
      "Peluruhan Alfa Spontan",
      "Transmutasi Buatan Rutherford"
    ],
    answer: 1,
    explanation: "Penggabungan inti ringan menjadi inti yang lebih berat disebut Reaksi Fusi Nuklir. Reaksi ini membutuhkan suhu plasma jutaan derajat Celsius dan menjadi sumber energi utama bintang-bintang di jagat raya."
  }
];

let userScore = 0;
let answeredCount = 0;

function initQuiz() {
  const container = document.getElementById('quizContainer');
  if (!container) return;

  container.innerHTML = '';
  userScore = 0;
  answeredCount = 0;
  document.getElementById('quizScoreText').textContent = `0 / ${quizQuestions.length}`;
  document.getElementById('quizFinalNotice').classList.add('hidden');

  quizQuestions.forEach((q, idx) => {
    const qCard = document.createElement('div');
    qCard.className = "p-5 rounded-xl bg-white border border-slate-200 text-sm shadow-sm";
    qCard.id = `quizCard-${idx}`;

    let optionsHtml = '';
    q.options.forEach((opt, optIdx) => {
      optionsHtml += `
        <button onclick="handleAnswer(${idx}, ${optIdx})" id="btnOpt-${idx}-${optIdx}" class="w-full text-left p-3 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 transition text-xs sm:text-sm flex items-center justify-between shadow-xs">
          <span><b>${String.fromCharCode(65 + optIdx)}.</b> ${opt}</span>
          <span id="badgeOpt-${idx}-${optIdx}" class="hidden text-xs px-2 py-0.5 rounded font-bold"></span>
        </button>
      `;
    });

    qCard.innerHTML = `
      <div class="font-bold text-slate-900 mb-3 flex items-start gap-2.5">
        <span class="w-6 h-6 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center text-xs shrink-0 font-bold border border-teal-200">${idx + 1}</span>
        <span class="pt-0.5 leading-snug">${q.question}</span>
      </div>
      <div class="space-y-2" id="optionsGroup-${idx}">
        ${optionsHtml}
      </div>
      <div id="explanation-${idx}" class="hidden mt-4 p-3.5 rounded-lg bg-teal-50/70 border border-teal-200 text-xs text-slate-700 leading-relaxed">
        <span class="font-bold text-teal-800 block mb-1">💡 Pembahasan Konsep:</span>
        <span id="expText-${idx}">${q.explanation}</span>
      </div>
    `;

    container.appendChild(qCard);
  });

  // Render KaTeX pada konten soal kuis yang baru dibuat
  triggerMathRender(container);
}

function handleAnswer(questionIdx, selectedOptIdx) {
  const q = quizQuestions[questionIdx];
  const group = document.getElementById(`optionsGroup-${questionIdx}`);
  
  const buttons = group.querySelectorAll('button');
  buttons.forEach(btn => {
    btn.disabled = true;
    btn.classList.remove('hover:bg-slate-100');
  });

  const selectedBtn = document.getElementById(`btnOpt-${questionIdx}-${selectedOptIdx}`);
  const selectedBadge = document.getElementById(`badgeOpt-${questionIdx}-${selectedOptIdx}`);
  const correctBtn = document.getElementById(`btnOpt-${questionIdx}-${q.answer}`);
  const correctBadge = document.getElementById(`badgeOpt-${questionIdx}-${q.answer}`);

  if (selectedOptIdx === q.answer) {
    userScore++;
    selectedBtn.classList.remove('bg-slate-50', 'border-slate-200');
    selectedBtn.classList.add('border-emerald-500', 'bg-emerald-50', 'text-emerald-900');
    selectedBadge.classList.remove('hidden');
    selectedBadge.classList.add('bg-emerald-200', 'text-emerald-800');
    selectedBadge.textContent = "Benar ✓";
  } else {
    selectedBtn.classList.remove('bg-slate-50', 'border-slate-200');
    selectedBtn.classList.add('border-rose-400', 'bg-rose-50', 'text-rose-900');
    selectedBadge.classList.remove('hidden');
    selectedBadge.classList.add('bg-rose-200', 'text-rose-800');
    selectedBadge.textContent = "Salah ✕";

    correctBtn.classList.remove('bg-slate-50', 'border-slate-200');
    correctBtn.classList.add('border-emerald-500', 'bg-emerald-50/80', 'text-emerald-900');
    correctBadge.classList.remove('hidden');
    correctBadge.classList.add('bg-emerald-200', 'text-emerald-800');
    correctBadge.textContent = "Kunci Jawaban";
  }

  // Tampilkan kotak penjelasan dan render rumus jika ada
  const expBox = document.getElementById(`explanation-${questionIdx}`);
  expBox.classList.remove('hidden');
  triggerMathRender(expBox);

  answeredCount++;
  document.getElementById('quizScoreText').textContent = `${userScore} / ${quizQuestions.length}`;

  if (answeredCount === quizQuestions.length) {
    document.getElementById('quizFinalNotice').classList.remove('hidden');
  }
}

function resetQuiz() {
  initQuiz();
}
