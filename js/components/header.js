export function renderHeader() {
    const header = document.getElementById('site-header');
    header.innerHTML = `
        <div class="header-inner">
            <a href="#/" class="logo">
                <span class="logo-text">MineOfDuty</span>
                <span class="logo-sub">WIKI</span>
            </a>
            <nav class="nav" id="main-nav">
                <a href="#/" class="nav-link" data-page="/">메인</a>
                <a href="#/contents" class="nav-link" data-page="/contents">콘텐츠</a>
                <a href="#/archive" class="nav-link" data-page="/archive">아카이브</a>
            </nav>
            <button class="menu-toggle" id="menu-toggle" aria-label="메뉴">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    `;

    const toggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('main-nav');

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        nav.classList.toggle('open');
    });

    nav.addEventListener('click', () => {
        toggle.classList.remove('active');
        nav.classList.remove('open');
    });

    updateActiveNav();
    window.addEventListener('hashchange', updateActiveNav);
}

function updateActiveNav() {
    const path = window.location.hash.slice(1) || '/';
    document.querySelectorAll('.nav-link').forEach(link => {
        const page = link.dataset.page;
        if (page === '/' && path === '/') {
            link.classList.add('active');
        } else if (page !== '/' && path.startsWith(page)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}
