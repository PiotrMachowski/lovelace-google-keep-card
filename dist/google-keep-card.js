var LitElement = LitElement || Object.getPrototypeOf(customElements.get("home-assistant-main"));
var html = LitElement.prototype.html;

const themes = ['light', 'dark', 'auto'];

class GoogleKeepCard extends LitElement {
    constructor() {
        super();
    }

    static get properties() {
        return {
            _hass: {},
            _config: {},
        };
    }

    set hass(hass) {
        this._hass = hass;
    }
    get hass() {
        return this._hass;
    }

    setConfig(config) {
        if (!config.entity) {
            throw new Error("Missing configuration: entity");
        }
        if (config.theme && !themes.includes(config.theme)) {
            throw new Error("Invalid theme");
        }
        if (config.alpha && (config.alpha > 1 || config.alpha < 0)) {
            throw new Error("Invalid alpha value");
        }
        if (!config.show) {
            throw new Error("Missing configuration: show");
        }
        const {show} = config;
        if (!Array.isArray(show) || !show.includes('unchecked') && !show.includes('checked')) {
            throw new Error("Missing configuration values for key: show");
        }
        this._theme = config.theme || 'auto';
        this._alpha = config.alpha || 1;
        this._systemBox = !!config.system_box;
        this._forceBackground = !!config.force_background;
        this._smallTitleMargin = !!config.small_title_margin;
        this._config = config;
    }

    shouldUpdate(changedProps) {
        if (changedProps.has("_config")) {
            return true;
        }
        const oldHass = changedProps.get("_hass");
        if (oldHass) {
            const {entity} = this._config;
            return (
                oldHass.states[entity] !== this._hass.states[entity]
                || oldHass.states[entity].attributes !== this._hass.states[entity].attributes
            );
        }
        return true;
    }

    render() {
        const {notes} = this._hass.states[this._config.entity].attributes;
        if (!notes.length && this._config.hide_if_empty) {
            return html``;
        }
        const title = this._config.title && !this._systemBox ? html`<h1 class="card-header${this._smallTitleMargin ? ' smallTitleMargin' : ''}"><div class="name">${this._config.title}</div></div>` : html``;
        const emptyScreen = notes.length ? html`` : html`<p style="text-align: center">No notes found!</p>`;
        return html`
        <ha-card id="googleKeepCard" class="${this._theme === 'auto' ? (this._hass.themes.darkMode ? 'dark' : 'light') : this._theme}${this._systemBox ? ' systemBox' : ''}${this._forceBackground ? ' forceBackground' : ''}">
            <style>
                #googleKeepCard .content {
                    padding: 0 16px 16px;
                }
                #googleKeepCard.systemBox {
                    background-color: transparent !important;
                    border: none;
                    box-shadow: none;
                    margin: 0px;
                    padding: 0px;
                }
                #googleKeepCard .smallTitleMargin {
                    padding-bottom: 4px;
                }   
                #googleKeepCard .card  {
                    margin: 16px 0px;
                    padding: 12px 16px;
                    position: relative;
                    overflow-wrap: break-word;
                }
                #googleKeepCard.systemBox .card  {
                    margin: var(--vertical-stack-card-margin, var(--stack-card-margin, 8px 0) );
                }
                #googleKeepCard.systemBox .card::before  {
                    border-radius: var(--ha-card-border-radius, 4px);
                    box-shadow: var( --ha-card-box-shadow, 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12) );
                }   
                #googleKeepCard .card:first-of-type {
                    margin-top: 0;
                }
                #googleKeepCard .card:last-of-type {
                    margin-bottom: 0;
                }
                #googleKeepCard .card::before{
                    content: '';
                    display: block;
                    position: absolute;
                    border: 1px solid transparent;
                    border-radius: 8px;
                    top: 0;
                    bottom:0;
                    left: 0;
                    right: 0;
                    opacity: ${this._alpha};
                }
                #googleKeepCard .card > * {
                    position: relative;
                }
                #googleKeepCard .noteTitle {
                    font-weight: bold;
                    margin: 0 0 14px 0;
                    font-size: 120%;
                }
                #googleKeepCard .noteLine  {
                    margin-top: 6px;
                    margin-bottom: 6px;
                    min-height: 20px;
                }
                #googleKeepCard hr {
                    margin: 10px 0;
                    border: 1px solid;
                }
                #googleKeepCard.dark hr {
                    border-color: #e8eaed;
                }
                #googleKeepCard.light hr {
                    border-color: #202124;
                }
                #googleKeepCard.forceBackground.dark {
                    background-color: #202124;
                }
                #googleKeepCard.dark .content, #googleKeepCard.dark a, #googleKeepCard.dark a:visited, #googleKeepCard.dark a:link {
                    color: #e8eaed;
                }
                #googleKeepCard.dark .card.White::before {
                    background-color: #202124;
                    border-color: #5f6368;
                }
                #googleKeepCard.dark .card.Red::before {
                    background-color: #5c2b29;
                    border-color: #5c2b29;
                }
                #googleKeepCard.dark .card.Orange::before {
                    background-color: #614a19;
                    border-color: #614a19;
                }
                #googleKeepCard.dark .card.Yellow::before {
                    background-color: #635d19;
                    border-color: #635d19;
                }
                #googleKeepCard.dark .card.Green::before {
                    background-color: #345920;
                    border-color: #345920;
                }
                #googleKeepCard.dark .card.Teal::before {
                    background-color: #16504b;
                    border-color: #16504b;
                }
                #googleKeepCard.dark .card.Blue::before {
                    background-color: #2d555e;
                    border-color: #2d555e;
                }
                #googleKeepCard.dark .card.DarkBlue::before {
                    background-color: #1e3a5f;
                    border-color: #1e3a5f;
                }
                #googleKeepCard.dark .card.Purple::before {
                    background-color: #42275e;
                    border-color: #42275e;
                }
                #googleKeepCard.dark .card.Pink::before {
                    background-color: #5b2245;
                    border-color: #5b2245;
                }
                #googleKeepCard.dark .card.Brown::before {
                    background-color: #442f19;
                    border-color: #442f19;
                }
                #googleKeepCard.dark .card.Gray::before {
                    background-color: #3c3f43;
                    border-color: #3c3f43;
                }
                #googleKeepCard.forceBackground.light {
                    background-color: #fff;
                }
                #googleKeepCard.light .content, #googleKeepCard.light a, #googleKeepCard.light a:visited, #googleKeepCard.light a:link {
                    color: #202124;
                }
                #googleKeepCard.light .card.White::before {
                    background-color: #fff;
                    border-color: #e0e0e0;
                }
                #googleKeepCard.light .card.Red::before {
                    background-color: #f28b82;
                    border-color: #f28b82;
                }
                #googleKeepCard.light .card.Orange::before {
                    background-color: #fbbc04;
                    border-color: #fbbc04;
                }
                #googleKeepCard.light .card.Yellow::before {
                    background-color: #fff475;
                    border-color: #fff475;
                }
                #googleKeepCard.light .card.Green::before {
                    background-color: #ccff90;
                    border-color: #ccff90;
                }
                #googleKeepCard.light .card.Teal::before {
                    background-color: #a7ffeb;
                    border-color: #a7ffeb;
                }
                #googleKeepCard.light .card.Blue::before {
                    background-color: #cbf0f8;
                    border-color: #cbf0f8;
                }
                #googleKeepCard.light .card.DarkBlue::before {
                    background-color: #aecbfa;
                    border-color: #aecbfa;
                }
                #googleKeepCard.light .card.Purple::before {
                    background-color: #d7aefb;
                    border-color: #d7aefb;
                }
                #googleKeepCard.light .card.Pink::before {
                    background-color: #fdcfe8;
                    border-color: #fdcfe8;
                }
                #googleKeepCard.light .card.Brown::before {
                    background-color: #e6c9a8;
                    border-color: #e6c9a8;
                }
                #googleKeepCard.light .card.Gray::before {
                    background-color: #e8eaed;
                    border-color: #e8eaed;
                }
                #googleKeepCard .checked {
                    color: #5f6368;
                }
                #googleKeepCard .crossed {
                    text-decoration: line-through;
                }               
                #googleKeepCard .level-0 {
                    margin-left: 24px;
                }
                #googleKeepCard .level-1 {
                    margin-left: 44px;
                }
                #googleKeepCard .checked,  #googleKeepCard .unchecked {
                    position: relative;
                }
                #googleKeepCard .checked::before,  #googleKeepCard .unchecked::before {
                    content: '';
                    width: 18px;
                    height: 18px;
                    position: absolute;
                    left: -24px;
                    opacity: 0.54;
                    background-size: 18px 18px;
                    background-position: center;
                    background-repeat: no-repeat;   
                }
                #googleKeepCard.dark .checked::before {
                    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjZmZmZmZmIj48cGF0aCBkPSJNMTkgM0g1Yy0xLjEgMC0yIC45LTIgMnYxNGMwIDEuMS45IDIgMiAyaDE0YzEuMSAwIDItLjkgMi0yVjVjMC0xLjEtLjktMi0yLTJ6bTAgMTZINVY1aDE0djE0eiIvPgogIDxwYXRoIGQ9Ik0xOCA5bC0xLjQtMS40LTYuNiA2LjYtMi42LTIuNkw2IDEzbDQgNHoiLz4KPC9zdmc+Cg==);
                }
                #googleKeepCard.dark .unchecked::before {
                    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjZmZmZmZmIj4KICA8cGF0aCBkPSJNMTkgNXYxNEg1VjVoMTRtMC0ySDVjLTEuMSAwLTIgLjktMiAydjE0YzAgMS4xLjkgMiAyIDJoMTRjMS4xIDAgMi0uOSAyLTJWNWMwLTEuMS0uOS0yLTItMnoiLz4KPC9zdmc+Cg==);
                }
                #googleKeepCard.light .checked::before {
                    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjMDAwIj48cGF0aCBkPSJNMTkgM0g1Yy0xLjEgMC0yIC45LTIgMnYxNGMwIDEuMS45IDIgMiAyaDE0YzEuMSAwIDItLjkgMi0yVjVjMC0xLjEtLjktMi0yLTJ6bTAgMTZINVY1aDE0djE0eiIvPgogIDxwYXRoIGQ9Ik0xOCA5bC0xLjQtMS40LTYuNiA2LjYtMi42LTIuNkw2IDEzbDQgNHoiLz4KPC9zdmc+Cg==);
                }
                #googleKeepCard.light .unchecked::before {
                    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjMDAwIj4KICA8cGF0aCBkPSJNMTkgNXYxNEg1VjVoMTRtMC0ySDVjLTEuMSAwLTIgLjktMiAydjE0YzAgMS4xLjkgMiAyIDJoMTRjMS4xIDAgMi0uOSAyLTJWNWMwLTEuMS0uOS0yLTItMnoiLz4KPC9zdmc+Cg==); 
                }
            </style>
            ${title}
            ${emptyScreen}
            <div class="content">
                ${notes.map(note => this.renderNote(note))}
            </div>
        </ha-card>
        `;
    }

    renderNote(note) {
        return html`
<div class="card ${note.color}">
    <p class="noteTitle">${(typeof note.url != "undefined") ? html`<a target="_blank" href="${note.url}">${note.title}</a>` : html`${note.title}` }</p>
    ${note.note_type === 'NodeType.List' ? this.renderListNote(note) : this.renderTextNote(note)}
</div>`;
    }

    renderTextNote(note) {
        return html`
    <p class="noteBody">${note.lines.map(line => html`<div class="noteLine">${line}</br></div>`)}</p>
`;
    }

    renderListNote(note) {
        const {show} = this._config;
        const showUnchecked = note.unchecked.length && show.includes('unchecked');
        const showChecked = note.checked.length && show.includes('checked');
        return html`
    ${showUnchecked ? this.renderListNoteLines(note.children) : html``}
    ${showUnchecked && showChecked ? html`<hr>` : html``}
    ${showChecked ? this.renderListNoteLines(note.children, true) : html``}
`;
    }

    renderListNoteLine(item, checked = false, level = 0) {
        return html`<p class="noteLine ${checked? 'checked' : 'unchecked'} ${item.checked ? 'crossed' : 'uncrossed'} level-${level}">${item.text}</p>`;
    }

    renderListNoteLines(items, checked = false, level = 0) {
        if (!items || !items.length) {
            return html``;
        }
        return html`${items.filter(
            c => checked ? (c.checked || c.children.some(cc => cc.checked)): !c.checked)
        .map(
            item => html`${this.renderListNoteLine(item, checked, level)}${(item.children && item.children.length ? this.renderListNoteLines(item.children, checked, level + 1) : '')}`
        )}`;
    }
}

customElements.define('google-keep-card', GoogleKeepCard);