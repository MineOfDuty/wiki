import { searchItems, getAllTags, getCategories } from '../utils/manifest.js';

const CATEGORY_NAMES = {
    all: '전체',
    fields: '필드',
    weapons: '총기',
    vehicles: '탈것'
};

const CATEGORY_ICONS = {
    fields: '&#x1F5FA;',
    weapons: '&#x1F52B;',
    vehicles: '&#x1F69B;'
};

let currentCategory = 'all';
let currentTags = [];
let currentQuery = '';
let debounceTimer = null;

export async function renderArchivePage(container, query = {}) {
    currentCategory = query.category || 'all';
    currentTags = query.tags ? query.tags.split(',').map(t => decodeURIComponent(t)) : [];
    currentQuery = query.q ? decodeURIComponent(query.q) : '';

    container.innerHTML = `
        <h1 class="section-title">아카이브</h1>
        <div class="archive-toolbar">
            <div class="category-tabs" id="category-tabs"></div>
            <div class="search-row">
                <div class="search-input-wrap">
                    <svg class="search-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="M21 21l-4.35-4.35"></path>
                    </svg>
                    <input type="text" class="search-input" id="archive-search"
                           placeholder="이름 또는 태그로 검색..."
                           value="${escapeHtml(currentQuery)}">
                </div>
                <span class="result-count" id="result-count"></span>
            </div>
            <div class="tag-filter" id="tag-filter"></div>
        </div>
        <div id="archive-results"></div>
    `;

    renderCategoryTabs();
    await updateTagFilter();
    await updateResults();
    bindEvents(container);
}

function renderCategoryTabs() {
    const tabsEl = document.getElementById('category-tabs');
    tabsEl.innerHTML = Object.entries(CATEGORY_NAMES).map(([key, label]) =>
        `<button class="category-tab${currentCategory === key ? ' active' : ''}"
                 data-category="${key}">${label}</button>`
    ).join('');
}

async function updateTagFilter() {
    const filterEl = document.getElementById('tag-filter');
    try {
        const tags = await getAllTags(currentCategory === 'all' ? undefined : currentCategory);
        filterEl.innerHTML = tags.map(tag =>
            `<button class="tag-pill${currentTags.includes(tag) ? ' active' : ''}"
                     data-tag="${escapeHtml(tag)}">${escapeHtml(tag)}</button>`
        ).join('');
    } catch {
        filterEl.innerHTML = '';
    }
}

async function updateResults() {
    const resultsEl = document.getElementById('archive-results');
    const countEl = document.getElementById('result-count');

    try {
        const items = await searchItems({
            query: currentQuery,
            category: currentCategory,
            tags: currentTags
        });

        countEl.textContent = `${items.length}개 항목`;

        if (items.length === 0) {
            resultsEl.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">&#x1F50D;</div>
                    <p class="empty-state-text">검색 결과가 없습니다.</p>
                </div>
            `;
            return;
        }

        resultsEl.innerHTML = `
            <div class="archive-grid">
                ${items.map(item => renderCard(item)).join('')}
            </div>
        `;
    } catch {
        resultsEl.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">&#x26A0;</div>
                <p class="empty-state-text">데이터를 불러오는 중 오류가 발생했습니다.</p>
            </div>
        `;
        countEl.textContent = '';
    }
}

function renderCard(item) {
    const categoryName = CATEGORY_NAMES[item.category] || item.category;
    const icon = CATEGORY_ICONS[item.category] || '&#x1F4C4;';
    const thumb = item.thumbnail
        ? `<img src="${escapeHtml(item.thumbnail)}" alt="${escapeHtml(item.name)}" loading="lazy">`
        : icon;

    return `
        <a href="#/archive/${encodeURIComponent(item.id)}" class="archive-card">
            <div class="archive-card-thumb">${thumb}</div>
            <div class="archive-card-body">
                <div class="archive-card-category">${escapeHtml(categoryName)}</div>
                <div class="archive-card-name">${escapeHtml(item.name)}</div>
                ${item.summary ? `<div class="archive-card-summary">${escapeHtml(item.summary)}</div>` : ''}
                <div class="archive-card-tags">
                    ${(item.tags || []).map(tag =>
                        `<span class="archive-card-tag">${escapeHtml(tag)}</span>`
                    ).join('')}
                </div>
            </div>
        </a>
    `;
}

function updateUrlState() {
    const params = new URLSearchParams();
    if (currentCategory !== 'all') params.set('category', currentCategory);
    if (currentTags.length) params.set('tags', currentTags.join(','));
    if (currentQuery) params.set('q', currentQuery);

    const qs = params.toString();
    const newHash = `/archive${qs ? '?' + qs : ''}`;
    history.replaceState(null, '', '#' + newHash);
}

function bindEvents(container) {
    // Category tabs
    document.getElementById('category-tabs').addEventListener('click', async (e) => {
        const tab = e.target.closest('.category-tab');
        if (!tab) return;
        currentCategory = tab.dataset.category;
        currentTags = [];
        renderCategoryTabs();
        await updateTagFilter();
        await updateResults();
        updateUrlState();
    });

    // Tag filter
    document.getElementById('tag-filter').addEventListener('click', async (e) => {
        const pill = e.target.closest('.tag-pill');
        if (!pill) return;
        const tag = pill.dataset.tag;
        if (currentTags.includes(tag)) {
            currentTags = currentTags.filter(t => t !== tag);
        } else {
            currentTags.push(tag);
        }
        pill.classList.toggle('active');
        await updateResults();
        updateUrlState();
    });

    // Search
    document.getElementById('archive-search').addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(async () => {
            currentQuery = e.target.value;
            await updateResults();
            updateUrlState();
        }, 300);
    });
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;').replace(/'/g, '&#x27;');
}
