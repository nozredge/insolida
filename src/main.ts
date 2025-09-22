const BINDING_MARK = "data-bind";
type E = {
    element: Element;
    value: string;
};
const bindings: Record<string, E> = {};

// API externa para manipulación de los atributos encontrados
const api: Record<string, string> = {};

function link() {
    Object.keys(bindings).forEach((bindingAttribute) => {
        Object.defineProperty(api, bindingAttribute, {
            // bindings["user"].element
            set: (value: string) => {
                // Edito en memoria
                bindings[bindingAttribute].value = value;
                // Edito en el DOM
                bindings[bindingAttribute].element.textContent = value;
            },
            get: () => bindings[bindingAttribute].value,
        });
    });
}

function tokenize(id: string) {
    const parent = document.getElementById(id);
    if (parent === null) throw new Error(`${parent} does not exist`);
    const exp = /\{(\w+)\}/g;

    const tokens = parent.innerHTML.replace(
        exp,
        (_match, value) => `<span ${BINDING_MARK}="${value}"></span>`,
    );

    parent.innerHTML = tokens;

    // Recorrer los <span> para guardar los atributos en un objeto bindings.
    const spans = document.querySelectorAll("[" + BINDING_MARK + "]");
    spans.forEach((el) => {
        const key = el.getAttribute(BINDING_MARK)!; // ejemplo: key = "msg"
        bindings[key] = {
            element: el,
            value: el.textContent || "",
        };
    });
}

// Primero se convierten los {var} a <span data-bind="var"></span>
tokenize("test");

// Para crear la API externa con atributos setter y getter
link();

api.cat = "chatran";
api.age = "8";
