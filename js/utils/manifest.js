let manifestCache = null;

export async function loadManifest() {
    if (manifestCache) return manifestCache;
    const response = await fetch('archive/manifest.json');
    if (!response.ok) throw new Error('Failed to load manifest');
    manifestCache = await response.json();
    return manifestCache;
}

export async function getItemsByCategory(category) {
    const data = await loadManifest();
    if (!category || category === 'all') return data.items;
    return data.items.filter(item => item.category === category);
}

export async function getItemById(id) {
    const data = await loadManifest();
    return data.items.find(item => item.id === id);
}

export async function getAllTags(category) {
    const items = await getItemsByCategory(category);
    const tagSet = new Set();
    items.forEach(item => {
        if (item.tags) item.tags.forEach(tag => tagSet.add(tag));
    });
    return [...tagSet].sort();
}

export async function searchItems({ query = '', category = 'all', tags = [] } = {}) {
    const items = await getItemsByCategory(category);
    const q = query.toLowerCase().trim();

    return items.filter(item => {
        const matchesQuery = !q ||
            item.name.toLowerCase().includes(q) ||
            (item.nameKo && item.nameKo.toLowerCase().includes(q)) ||
            (item.summary && item.summary.toLowerCase().includes(q)) ||
            (item.tags && item.tags.some(t => t.toLowerCase().includes(q)));

        const matchesTags = tags.length === 0 ||
            tags.every(t => item.tags && item.tags.includes(t));

        return matchesQuery && matchesTags;
    });
}

export async function getCategories() {
    const data = await loadManifest();
    return data.categories;
}
