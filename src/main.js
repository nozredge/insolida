import Insolida from "./Insolida.ts";
const app = new Insolida({
    dog: "simba",
}, "test");
app.getApi().insolida = "insolida";
app.getApi().robot = "robot";
