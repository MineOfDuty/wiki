export function renderMainPage() {
    return `
        <div class="hero">
            <h1 class="hero-title">MINEOFDUTY</h1>
            <p class="hero-subtitle">마인크래프트 FPS 서버 위키</p>
            <div class="hero-ip" title="클릭하여 서버 주소 복사">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path>
                </svg>
                <span class="ip-text">mineofduty.mcv.kr</span>
            </div>
        </div>

        <div class="stats-row">
            <a href="#/archive?category=fields" class="stat-card">
                <span class="stat-number">--</span>
                <span class="stat-label">필드</span>
            </a>
            <a href="#/archive?category=weapons" class="stat-card">
                <span class="stat-number">--</span>
                <span class="stat-label">총기</span>
            </a>
            <a href="#/archive?category=vehicles" class="stat-card">
                <span class="stat-number">--</span>
                <span class="stat-label">탈것</span>
            </a>
            <div class="stat-card">
                <span class="stat-number">1.21.11</span>
                <span class="stat-label">서버 버전</span>
            </div>
        </div>

        <h2 class="section-title">바로가기</h2>
        <div class="feature-grid">
            <a href="#/contents" class="feature-card">
                <div class="feature-card-icon">&#x1F3AE;</div>
                <div class="feature-card-title">콘텐츠</div>
                <div class="feature-card-desc">서버의 메인 콘텐츠와 게임 모드를 확인해보세요.</div>
            </a>
            <a href="#/archive" class="feature-card">
                <div class="feature-card-icon">&#x1F4DA;</div>
                <div class="feature-card-title">아카이브</div>
                <div class="feature-card-desc">필드, 총기, 탈것 등 모든 요소를 검색하고 탐색하세요.</div>
            </a>
            <a href="https://discord.gg/yXQgmUMa3b" target="_blank" rel="noopener noreferrer" class="feature-card">
                <div class="feature-card-icon">&#x1F4AC;</div>
                <div class="feature-card-title">디스코드</div>
                <div class="feature-card-desc">커뮤니티에 참여하고 다른 플레이어들과 소통하세요.</div>
            </a>
        </div>
    `;
}

// Update stat numbers from manifest
export async function updateStats() {
    try {
        const { loadManifest } = await import('../utils/manifest.js');
        const manifest = await loadManifest();

        const counts = { fields: 0, weapons: 0, vehicles: 0 };
        manifest.items.forEach(item => {
            if (counts.hasOwnProperty(item.category)) {
                counts[item.category]++;
            }
        });

        const statCards = document.querySelectorAll('.stat-card');
        statCards.forEach(card => {
            const label = card.querySelector('.stat-label')?.textContent;
            const numberEl = card.querySelector('.stat-number');
            if (!numberEl) return;

            if (label === '필드') numberEl.textContent = counts.fields;
            else if (label === '총기') numberEl.textContent = counts.weapons;
            else if (label === '탈것') numberEl.textContent = counts.vehicles;
        });
    } catch (e) {
        // Manifest not available yet, keep defaults
    }
}
