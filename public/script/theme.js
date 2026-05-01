/* ═══════════════════════════════════════════
   THÈME — light / dark
═══════════════════════════════════════════ */
const themes = {
    light: {
        '--bg': '#f7f5f0',
        '--bg2': '#ffffff',
        '--bg3': '#eeeae2',
        '--ink': '#1a1510',
        '--ink2': '#4a3f30',
        '--ink3': '#8a7a65',
        '--accent': '#c8401a',
        '--accent2': '#1a5fc8',
        '--accent3': '#1a8c3a',
        '--rule': 'rgba(26,21,16,0.12)',
        '--rule2': 'rgba(26,21,16,0.06)',
        '--title': '#f0a060',
        '--bghover': 'rgba(211,211,211,0.46)',
        '--code-color': '#2d7a3a',
        '--badge-bg-red': 'rgba(200,64,26,0.1)',
        '--badge-col-red': '#c8401a',
        '--badge-bor-red': 'rgba(200,64,26,0.3)',
        '--badge-bg-blue': 'rgba(88,101,242,0.1)',
        '--badge-col-blue': '#5865F2',
        '--badge-bor-blue': 'rgba(88,101,242,0.3)',
        '--badge-bg-yellow': 'rgba(255,160,0,0.1)',
        '--badge-col-yellow': '#e6900a',
        '--badge-bor-yellow': 'rgba(255,160,0,0.3)',
        '--badge-bg-green': 'rgba(0,180,120,0.1)',
        '--badge-col-green': '#00a870',
        '--badge-bor-green': 'rgba(0,180,120,0.3)',
    },
    dark: {
        '--bg': '#0b0b0b',
        '--bg2': '#0d0e14',
        '--bg3': '#1c1e2e',
        '--ink': '#ededed',
        '--ink2': '#aaabaf',
        '--ink3': '#ececec',
        '--accent': '#7c6fe0',
        '--accent2': '#818cf8',
        '--accent3': '#4caf50',
        '--rule': 'rgba(200,204,224,0.1)',
        '--rule2': 'rgba(209,209,209,0.24)',
        '--title': '#f0a060',
        '--border': 'gray',
        '--bghover': 'rgba(255,255,255,0.4)',
        '--code-color': '#5dd62c',
        '--badge-bg-red': 'rgba(232,64,64,0.15)',
        '--badge-col-red': '#e84040',
        '--badge-bor-red': 'rgba(232,64,64,0.35)',
        '--badge-bg-blue': 'rgba(88,101,242,0.15)',
        '--badge-col-blue': '#818cf8',
        '--badge-bor-blue': 'rgba(88,101,242,0.35)',
        '--badge-bg-yellow': 'rgba(212,134,10,0.15)',
        '--badge-col-yellow': '#d4860a',
        '--badge-bor-yellow': 'rgba(212,134,10,0.35)',
        '--badge-bg-green': 'rgba(76,175,80,0.15)',
        '--badge-col-green': '#4caf50',
        '--badge-bor-green': 'rgba(76,175,80,0.35)',
    }
};

// SVG soleil (light) et lune (dark)
const themeIcons = {
    light: `<img src="../img/light_mode.svg" alt="light" style="width:25px;height:25px;filter:invert(0)">`,
    dark: `<img src="../img/moon-stars.svg"  alt="dark"  style="width:25px;height:25px;filter:invert(1)">`
};

// Labels sidebar
const themeLabels = {
    light: 'Light Mode',
    dark: 'Dark Mode'
};

let currentTheme = localStorage.getItem('theme') ?? 'light';

function applyTheme(theme) {
    const root = document.documentElement;
    Object.entries(themes[theme]).forEach(([k, v]) => root.style.setProperty(k, v));
    currentTheme = theme;
    localStorage.setItem('theme', theme);
    updateThemeBtn();

    // Adapte les icônes de la sidebar (qui peuvent être blanches ou noires)
    const isDark = theme === 'dark';
    document.querySelectorAll('#sidebar .iconmenu img').forEach(img => {
        img.style.filter = isDark ? 'invert(1)' : 'invert(0)';
    });
    document.getElementById('menu').style.filter = isDark ? 'invert(1)' : 'invert(0)';
}

function updateThemeBtn() {
    const btn = document.getElementById('theme-toggle-btn');
    if (!btn) return;
    const icon = btn.querySelector('#light_mode');
    const label = btn.querySelector('.theme-label');
    if (icon) icon.innerHTML = themeIcons[currentTheme];
    if (label) label.textContent = themeLabels[currentTheme];
}

function toggleTheme() {
    applyTheme(currentTheme === 'light' ? 'dark' : 'light');
}