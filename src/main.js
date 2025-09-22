var BINDING_MARK = "data-bind";
var spans = document.querySelectorAll("[" + BINDING_MARK + "]");
var bindings = {};
/**
 * Ejemplo:
 *  key =
 *      {
 *          msg: <span data-bind="msg">,
 *          count: <span data-bind="count">
 *      }
 */
// Recorrer los <span> para guardar los atributos en un objeto bindings.
spans.forEach(function (el) {
    var key = el.getAttribute(BINDING_MARK); // ejemplo: key = "msg"
    bindings[key] = {
        element: el,
        value: el.textContent || "",
    };
});
// API externa para manipulación de los atributos "msg" y "count"
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
link();
api.user = "chatran";
api.count = "2";
console.log(api.user);
