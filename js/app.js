import { Router } from './router.js';
import { renderHeader } from './components/header.js';
import { renderFooter } from './components/footer.js';
import { renderMainPage, updateStats } from './pages/main.js';
import { renderContentsPage } from './pages/contents.js';
import { renderArchivePage } from './pages/archive.js';
import { renderArchiveDetailPage } from './pages/archive-detail.js';

const app = document.getElementById('app');
const router = new Router();

function renderPage(html) {
    app.innerHTML = html;
    app.classList.remove('page-enter');
    void app.offsetWidth;
    app.classList.add('page-enter');
}

router
    .on('/', () => {
        renderPage(renderMainPage());
        initMainPage();
        updateStats();
    })
    .on('/contents', () => {
        renderPage(renderContentsPage());
    })
    .on('/archive', ({ query }) => {
        renderPage('<div class="loading"><div class="loading-spinner"></div></div>');
        renderArchivePage(app, query);
    })
    .on('/archive/:id', ({ params }) => {
        renderPage('<div class="loading"><div class="loading-spinner"></div></div>');
        renderArchiveDetailPage(app, params.id);
    })
    .notFound(() => {
        renderPage(`
            <div class="empty-state">
                <div class="empty-state-icon">404</div>
                <p class="empty-state-text">페이지를 찾을 수 없습니다.</p>
                <a href="#/" class="back-btn">메인으로 돌아가기</a>
            </div>
        `);
    });

function initMainPage() {
    const ipBtn = document.querySelector('.hero-ip');
    if (ipBtn) {
        ipBtn.addEventListener('click', () => {
            navigator.clipboard.writeText('mineofduty.mcv.kr').then(() => {
                ipBtn.classList.add('copied');
                ipBtn.querySelector('.ip-text').textContent = '복사 완료!';
                setTimeout(() => {
                    ipBtn.classList.remove('copied');
                    ipBtn.querySelector('.ip-text').textContent = 'mineofduty.mcv.kr';
                }, 1500);
            });
        });
    }
}

// Initialize
renderHeader();
renderFooter();
router.resolve();
