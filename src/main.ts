// Antes
// const msg: HTMLElement | null = document.getElementById("msg")!;
// const count: HTMLElement | null = document.getElementById("count")!

// Actualización 1
// const bindings: Record<string, HTMLElement> = {
//     msg: document.getElementById("msg")!,
//     count: document.getElementById("count")!,
// };

// Usar el diccionario para escribir en el DOM
// bindings["msg"].textContent = "Óscar";
// bindings["count"].textContent = "3";

// console.log(bindings);

// Actualización 2
const spans = document.querySelectorAll("[data-bind]");
const bindings: Record<string, Element> = {};

spans.forEach((el) => {
    const key = el.getAttribute("data-bind")!;
    bindings[key] = el;
});

console.log(bindings);
console.log(bindings["count"].textContent);
