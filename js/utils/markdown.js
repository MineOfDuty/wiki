const markdownCache = new Map();

export function parseFrontmatter(raw) {
    const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
    if (!match) return { meta: {}, content: raw };
    return {
        meta: jsyaml.load(match[1]),
        content: match[2]
    };
}

export async function loadMarkdown(filePath) {
    if (markdownCache.has(filePath)) {
        return markdownCache.get(filePath);
    }

    const response = await fetch(filePath);
    if (!response.ok) throw new Error(`Failed to load: ${filePath}`);

    const raw = await response.text();
    const { meta, content } = parseFrontmatter(raw);
    const html = marked.parse(content);
    const result = { meta, html, raw: content };

    markdownCache.set(filePath, result);
    return result;
}
