export function renderFooter() {
    const footer = document.getElementById('site-footer');
    footer.innerHTML = `
        <div class="footer-inner">
            <div class="footer-grid">
                <div class="footer-section">
                    <h3 class="footer-title">서버 정보</h3>
                    <ul class="footer-list">
                        <li>
                            <span class="footer-label">서버 주소</span>
                            <span class="footer-value copyable" data-copy="mineofduty.mcv.kr" title="클릭하여 복사">
                                mineofduty.mcv.kr
                                <svg class="icon-copy" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path>
                                </svg>
                            </span>
                        </li>
                        <li>
                            <span class="footer-label">버전</span>
                            <span class="footer-value">1.21.11</span>
                        </li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h3 class="footer-title">커뮤니티</h3>
                    <ul class="footer-list">
                        <li>
                            <a href="https://discord.gg/yXQgmUMa3b" target="_blank" rel="noopener noreferrer" class="footer-link">
                                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z"/>
                                </svg>
                                Discord
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h3 class="footer-title">바로가기</h3>
                    <ul class="footer-list">
                        <li><a href="#/" class="footer-link">메인</a></li>
                        <li><a href="#/contents" class="footer-link">콘텐츠</a></li>
                        <li><a href="#/archive" class="footer-link">아카이브</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2025 MineOfDuty Wiki. All rights reserved.</p>
            </div>
        </div>
    `;

    footer.querySelectorAll('.copyable').forEach(el => {
        el.addEventListener('click', () => {
            const text = el.dataset.copy;
            navigator.clipboard.writeText(text).then(() => {
                el.classList.add('copied');
                setTimeout(() => el.classList.remove('copied'), 1500);
            });
        });
    });
}
