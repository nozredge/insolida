export default class Insolida {
    bindings;
    api;
    BINDING_MARK = "data-bind";
    constructor(extData, parentId) {
        this.bindings = {};
        this.api = extData;
        this.tokenize(parentId);
        this.fillBindings();
        this.link();
    }
    link() {
        Object.keys(this.bindings).forEach((bindingAttribute) => {
            Object.defineProperty(this.api, bindingAttribute, {
                // bindings["user"].element
                set: (value) => {
                    if (!this.bindings[bindingAttribute]) {
                        this.bindings[bindingAttribute] = [];
                    }
                    for (let i = 0; i < this.bindings[bindingAttribute].length; i++) {
                        // Edito en memoria
                        this.bindings[bindingAttribute][i].value = value;
                        // Edito en el DOM
                        this.bindings[bindingAttribute][i].element.textContent =
                            value;
                    }
                },
                get: () => this.bindings[bindingAttribute],
            });
        });
    }
    tokenize(id) {
        const parent = document.getElementById(id);
        if (parent === null)
            throw new Error(`${parent} does not exist`);
        const exp = /\{(\w+)\}/g;
        const tokens = parent.innerHTML.replace(exp, (_match, value) => `<span ${this.BINDING_MARK}="${value}"></span>`);
        parent.innerHTML = tokens;
    }
    fillBindings() {
        // Recorrer los <span> para guardar los atributos en un objeto bindings.
        const spans = document.querySelectorAll("[" + this.BINDING_MARK + "]");
        spans.forEach((el) => {
            const key = el.getAttribute(this.BINDING_MARK); // ejemplo: key = "msg"
            if (!this.bindings[key]) {
                this.bindings[key] = [];
            }
            this.bindings[key].push({
                element: el, // Siempre va a haber <span data-bind="var"></span>
                value: key || "",
            });
        });
    }
    getApi() {
        return this.api;
    }
}
