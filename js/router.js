export class Router {
    constructor() {
        this.routes = [];
        this.notFoundHandler = null;
        window.addEventListener('hashchange', () => this.resolve());
    }

    on(pattern, handler) {
        const paramNames = [];
        const regexStr = pattern.replace(/:([^/]+)/g, (_, name) => {
            paramNames.push(name);
            return '([^/]+)';
        });
        const regex = new RegExp(`^${regexStr}$`);
        this.routes.push({ pattern, regex, paramNames, handler });
        return this;
    }

    notFound(handler) {
        this.notFoundHandler = handler;
        return this;
    }

    resolve() {
        const hash = window.location.hash.slice(1) || '/';
        const [path, queryString] = hash.split('?');

        const query = {};
        if (queryString) {
            new URLSearchParams(queryString).forEach((value, key) => {
                query[key] = value;
            });
        }

        for (const route of this.routes) {
            const match = path.match(route.regex);
            if (match) {
                const params = {};
                route.paramNames.forEach((name, i) => {
                    params[name] = decodeURIComponent(match[i + 1]);
                });
                route.handler({ params, query });
                window.scrollTo(0, 0);
                return;
            }
        }

        if (this.notFoundHandler) {
            this.notFoundHandler();
        } else {
            this.navigate('/');
        }
    }

    navigate(path) {
        window.location.hash = path;
    }

    getCurrentPath() {
        return window.location.hash.slice(1) || '/';
    }
}
