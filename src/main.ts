const BINDING_MARK = "data-bind";
const spans = document.querySelectorAll("[" + BINDING_MARK + "]");
type E = {
    element: Element;
    value: string;
};
const bindings: Record<string, E> = {};

/**
 * Ejemplo:
 *  key =
 *      {
 *          msg: <span data-bind="msg">,
 *          count: <span data-bind="count">
 *      }
 */

// Recorrer los <span> para guardar los atributos en un objeto bindings.

spans.forEach((el) => {
    const key = el.getAttribute(BINDING_MARK)!; // ejemplo: key = "msg"
    bindings[key] = {
        element: el,
        value: el.textContent || "",
    };
});

// API externa para manipulación de los atributos "msg" y "count"
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

link();
api.user = "chatran";
api.count = "2";

console.log(api.user);
