import type { BindingsT, DataT } from "./types.d.ts";

export default class Insolida {
    private bindings: BindingsT;
    private api: DataT;
    private readonly BINDING_MARK = "data-bind";

    constructor(extData: DataT, parentId: string) {
        this.bindings = {};
        this.api = extData;
        this.tokenize(parentId);
        this.fillBindings();
        this.link();
    }

    private link() {
        Object.keys(this.bindings).forEach((bindingAttribute) => {
            Object.defineProperty(this.api, bindingAttribute, {
                // bindings["user"].element
                set: (value: string) => {
                    // Edito en memoria
                    this.bindings[bindingAttribute].value = value;
                    // Edito en el DOM
                    this.bindings[bindingAttribute].element.textContent = value;
                },
                get: () => this.bindings[bindingAttribute].value,
            });
        });
    }

    private tokenize(id: string) {
        const parent = document.getElementById(id);
        if (parent === null) throw new Error(`${parent} does not exist`);
        const exp = /\{(\w+)\}/g;

        const tokens = parent.innerHTML.replace(
            exp,
            (_match, value) => `<span ${this.BINDING_MARK}="${value}"></span>`,
        );

        parent.innerHTML = tokens;
    }

    private fillBindings() {
        // Recorrer los <span> para guardar los atributos en un objeto bindings.
        const spans = document.querySelectorAll("[" + this.BINDING_MARK + "]");
        spans.forEach((el) => {
            const key = el.getAttribute(this.BINDING_MARK)!; // ejemplo: key = "msg"
            this.bindings[key] = {
                element: el, // Siempre va a haber <span data-bind="var"></span>
                value: key || "",
            };
        });
    }

    public getApi(): DataT {
        return this.api;
    }
}
