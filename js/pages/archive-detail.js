import { getItemById } from '../utils/manifest.js';
import { loadMarkdown } from '../utils/markdown.js';

const CATEGORY_NAMES = {
    fields: '필드',
    weapons: '총기',
    vehicles: '탈것'
};

export async function renderArchiveDetailPage(container, id) {
    try {
        const item = await getItemById(id);
        if (!item) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">&#x2753;</div>
                    <p class="empty-state-text">항목을 찾을 수 없습니다.</p>
                    <a href="#/archive" class="back-btn">아카이브로 돌아가기</a>
                </div>
            `;
            return;
        }

        const { html } = await loadMarkdown(item.file);
        const categoryName = CATEGORY_NAMES[item.category] || item.category;

        container.innerHTML = `
            <div class="page-enter">
                <div class="detail-header">
                    <div class="breadcrumb">
                        <a href="#/archive">아카이브</a>
                        <span class="breadcrumb-sep">/</span>
                        <a href="#/archive?category=${item.category}">${escapeHtml(categoryName)}</a>
                        <span class="breadcrumb-sep">/</span>
                        <span>${escapeHtml(item.name)}</span>
                    </div>
                    <h1 class="detail-title">${escapeHtml(item.name)}</h1>
                    <div class="detail-meta">
                        <span class="detail-category-badge">${escapeHtml(categoryName)}</span>
                        <div class="detail-tags">
                            ${(item.tags || []).map(tag =>
                                `<span class="detail-tag">${escapeHtml(tag)}</span>`
                            ).join('')}
                        </div>
                    </div>
                </div>
                ${item.thumbnail ? `
                <div class="detail-hero-image">
                    <img src="${escapeHtml(item.thumbnail)}" alt="${escapeHtml(item.name)}">
                </div>
                ` : ''}
                <div class="markdown-body">${html}</div>
                <a href="#/archive?category=${item.category}" class="back-btn">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                    목록으로 돌아가기
                </a>
            </div>
        `;
    } catch (err) {
        console.error('Archive detail error:', err);
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">&#x26A0;</div>
                <p class="empty-state-text">데이터를 불러오는 중 오류가 발생했습니다.</p>
                <p class="empty-state-text" style="font-size:0.8rem;margin-top:8px;color:var(--text-muted);">${escapeHtml(err.message)}</p>
                <a href="#/archive" class="back-btn">아카이브로 돌아가기</a>
            </div>
        `;
    }
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;').replace(/'/g, '&#x27;');
}
