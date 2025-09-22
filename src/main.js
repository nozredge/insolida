var BINDING_MARK = "data-bind";
var bindings = {};
// API externa para manipulación de los atributos encontrados
var api = {};
function link() {
    Object.keys(bindings).forEach(function (bindingAttribute) {
        Object.defineProperty(api, bindingAttribute, {
            // bindings["user"].element
            set: function (value) {
                // Edito en memoria
                bindings[bindingAttribute].value = value;
                // Edito en el DOM
                bindings[bindingAttribute].element.textContent = value;
            },
            get: function () { return bindings[bindingAttribute].value; },
        });
    });
}
function tokenize(id) {
    var parent = document.getElementById(id);
    if (parent === null)
        throw new Error("".concat(parent, " does not exist"));
    var exp = /\{(\w+)\}/g;
    var tokens = parent.innerHTML.replace(exp, function (_match, value) { return "<span ".concat(BINDING_MARK, "=\"").concat(value, "\"></span>"); });
    parent.innerHTML = tokens;
    // Recorrer los <span> para guardar los atributos en un objeto bindings.
    var spans = document.querySelectorAll("[" + BINDING_MARK + "]");
    spans.forEach(function (el) {
        var key = el.getAttribute(BINDING_MARK); // ejemplo: key = "msg"
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
