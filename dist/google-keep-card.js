var LitElement = LitElement || Object.getPrototypeOf(customElements.get("home-assistant-main"));
var html = LitElement.prototype.html;

const themeLight = "light";
const themeDark = "dark";
const themes = ['light', 'dark', 'auto'];
const colors = {
    'White': ['#ffffff', '#2d2e30'],
    'Red': ['#f28b82', '#5c2b29'],
    'Orange': ['#fbbc04', '#614a19'],
    'Yellow': ['#fff475', '#635d19'],
    'Green': ['#ccff90', '#345920'],
    'Teal': ['#a7ffeb', '#16504b'],
    'Blue': ['#cbf0f8', '#2d555e'],
    'DarkBlue': ['#aecbfa', '#1e3a5f'],
    'Purple': ['#d7aefb', '#42275e'],
    'Pink': ['#fdcfe8', '#5b2245'],
    'Brown': ['#e6c9a8', '#442f19'],
    'Gray': ['#e8eaed', '#3c3f43'],
};
const textColors = {
    "light": "#000000",
    "dark": "#ffffff"
};
const checkedColors = {
    "light": "rgb(95, 99, 104)",
    "dark": "rgb(154,160,166)"
};

class GoogleKeepCard extends LitElement {

    getColor(colorName) {
        const hex = colors[colorName][themes.indexOf(this._theme)];
        const {r, g, b} = GoogleKeepCard.hexToRgb(hex);
        return `rgba(${r}, ${g}, ${b}, ${this._alpha})`;
    }
    addAlphaToColor(hexColor) {
        const {r, g, b} = GoogleKeepCard.hexToRgb(hexColor);
        return `rgba(${r}, ${g}, ${b}, ${this._alpha})`;
    }

    getTextColor() {
        return textColors[this._theme];
    }

    getCheckedColor() {
        return checkedColors[this._theme];
    }

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
        const title = this._config.title ? html`<div class="card-header" style="padding: 8px 0 16px 0;"><div class="name">${this._config.title}</div></div>` : html``;
        const emptyScreen = notes.length ? html`` : html`<p style="text-align: center">No notes found!</p>`;
        return html`
        <ha-card id="googleKeepCard" style="padding: 16px" class="${this._theme == 'auto'? (this._hass.themes.darkMode ? 'dark' : 'light') : this._theme}">
            <style>
                #googleKeepCard .card  {
                    border: 1px solid transparent;
                    border-radius: 8px;
                    margin: 16px 0px;
                    padding: 12px 16px;
                }
                
                #googleKeepCard .noteTitle {
                    font-weight: bold;
                    margin: 0 0 14px 0;
                    font-size: 120%;
                }
                
                #googleKeepCard .noteLine  {
                    margin-top: 6px;
                    margin-bottom: 6px;
                }
                
                #googleKeepCard hr {
                    margin: 10px 0;
                    border: 1px solid rgba(0,0,0,0.1);
                }
                
                #googleKeepCard.dark {
                    background-color: #202124;
                }
                #googleKeepCard.dark, #googleKeepCard.dark a, #googleKeepCard.dark a:visited, #googleKeepCard.dark a:link {
                    color: #e8eaed;
                }
                
                #googleKeepCard.dark .card.White {
                    background-color: #202124;
                    border-color: #5f6368;
                }
                #googleKeepCard.dark .card.Red {
                    background-color: #5c2b29;
                    border-color: #5c2b29;
                }
                #googleKeepCard.dark .card.Orange {
                    background-color: #614a19;
                    border-color: #614a19;
                
                }
                #googleKeepCard.dark .card.Yellow {
                    background-color: #635d19;
                    border-color: #635d19;
                }
                #googleKeepCard.dark .card.Green {
                    background-color: #345920;
                    border-color: #345920;
                }
                #googleKeepCard.dark .card.Teal {
                    background-color: #16504b;
                    border-color: #16504b;
                }
                #googleKeepCard.dark .card.Blue {
                    background-color: #2d555e;
                    border-color: #2d555e;
                }
                #googleKeepCard.dark .card.DarkBlue {
                    background-color: #1e3a5f;
                    border-color: #1e3a5f;
                }
                #googleKeepCard.dark .card.Purple {
                    background-color: #42275e;
                    border-color: #42275e;
                }
                #googleKeepCard.dark .card.Pink {
                    background-color: #5b2245;
                    border-color: #5b2245;
                }
                #googleKeepCard.dark .card.Brown {
                    background-color: #442f19;
                    border-color: #442f19;
                
                }
                #googleKeepCard.dark .card.Gray {
                    background-color: #3c3f43;
                    border-color: #3c3f43;
                }
                
                #googleKeepCard.light {
                    background-color: #fff;
                }
                
                #googleKeepCard.light, #googleKeepCard.light a, #googleKeepCard.light a:visited, #googleKeepCard.light a:link {
                    color: #202124;
                }
                #googleKeepCard.light .card.White {
                    background-color: #fff;
                    border-color: #e0e0e0;
                }
                #googleKeepCard.light .card.Red {
                    background-color: #f28b82;
                    border-color: #f28b82;
                }
                #googleKeepCard.light .card.Orange {
                    background-color: #fbbc04;
                    border-color: #fbbc04;
                }
                #googleKeepCard.light .card.Yellow {
                    background-color: #fff475;
                    border-color: #fff475;
                }
                #googleKeepCard.light .card.Green {
                    background-color: #ccff90;
                    border-color: #ccff90;
                }
                #googleKeepCard.light .card.Teal {
                    background-color: #a7ffeb;
                    border-color: #a7ffeb;
                }
                #googleKeepCard.light .card.Blue {
                    background-color: #cbf0f8;
                    border-color: #cbf0f8;
                }
                #googleKeepCard.light .card.DarkBlue {
                    background-color: #aecbfa;
                    border-color: #aecbfa;
                }
                #googleKeepCard.light .card.Purple {
                    background-color: #d7aefb;
                    border-color: #d7aefb;
                }
                #googleKeepCard.light .card.Pink {
                    background-color: #fdcfe8;
                    border-color: #fdcfe8;
                }
                #googleKeepCard.light .card.Brown {
                    background-color: #e6c9a8;
                    border-color: #e6c9a8;
                }
                #googleKeepCard.light .card.Gray {
                    background-color: #e8eaed;
                    border-color: #e8eaed;
                }

                #googleKeepCard .checked {
                    color: #5f6368;
                }
                
                #googleKeepCard .crossed {
                    text-decoration: line-through;
                }
                
                #googleKeepCard .checked.uncrossed {
                    opacity: .35;
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
            ${notes.map(note => this.renderNote(note))}
        </ha-card>
        `;
    }

    renderNote(note) {
        console.log(note.note_type, {note});
        return html`
<div class="card ${note['color']}">
    <p class="noteTitle">${(typeof note['url']!= "undefined") ? html`<a target="_blank" href="${note['url']}">${note['title']}</a>` : html`${note['title']}` }</p>
    ${note.note_type === 'NodeType.List' ? this.renderList(note) : this.renderTextNote(note)}
</div>`
    }

    renderTextNote(note) {
        return html`
    <p class="noteBody">${note['lines'].map(line => this.renderLine(line))}</p>
`
    }

    renderList(note) {
        const {show} = this._config;
        const showUnchecked = note['unchecked'].length && show.includes('unchecked');
        const showChecked = note['checked'].length && show.includes('checked');
        console.log({result: this.renderList2(note), note});
        return html`
    ${showUnchecked ? this.renderList2(note.children) : html``}
    ${showUnchecked && showChecked ? html`<hr>` : html``}
    ${showChecked ? this.renderList2(note.children, true) : html``}
`
    }

    renderLine2(item, checked = false, level = 0) {
        return html`<p class="noteLine ${checked? 'checked' : 'unchecked'} ${item.checked ? 'crossed' : 'uncrossed'} level-${level}">${item.text}</p>`;
    }

    renderList2(items, checked = false, level = 0) {
        console.log(level, {items, checked, level});
        if (!items?.length) {
            return html``;
        }
        return html`${items?.filter(
            c => checked ? (c.checked || c.children.some(cc => cc.checked)): !c.checked)
        .map(
            item => html`${this.renderLine2(item, checked, level)}${(item.children?.length ? this.renderList2(item.children, checked, level +1): '')}`
        )}`;
    }

    renderUncheckedList(note) {
        return html`<p class="noteBody uncheck">${note['unchecked'].map(line => this.renderLine(line))}</p>`;
    }

    renderCheckedList(note) {
        return html`<p class="noteBody checked">${note['children'].map(line => this.renderIfChecked(line))}</p>`;
    }

    renderIfChecked(child) {
        let checkedChildren = child.children.filter(c => c.checked);
        if (child.checked || checkedChildren.length > 0) {
            return html`${this.renderLine('\u2611' + child.text, child.checked)}${checkedChildren.map(c => this.renderLine('  ' + '\u2611' + c.text, true))}`;
        }
        return html``;
    }

    renderLine(line, strikethrough = false) {
        let trimmed = line.replace(/^ +/, '');
        let trimmedLength = trimmed.length;
        if (trimmedLength > 0) {
            let prefix = '\xa0'.repeat((line.length - trimmedLength) * 2);
            let suffix = trimmed.substr(1);
            if (strikethrough) {
                suffix = html`<s>${suffix}</s>`
            }
            if (trimmed[0] === '\u2610') {
                trimmed = html`${prefix}<paper-checkbox>${suffix}</paper-checkbox>`;
            } else if (trimmed[0] === '\u2611') {
                trimmed = html`${prefix}<paper-checkbox checked>${suffix}</paper-checkbox>`;
            }
        }
        return html`<div class="noteLine">${trimmed}</br></div>`;
    }

    static hexToRgb(hex) {
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
}

customElements.define('google-keep-card', GoogleKeepCard);
