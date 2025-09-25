import Insolida from "./Insolida.ts";

const app = new Insolida({
    cat: "gaspar",
    age: 1,
}, "test");

app.getApi().cat = "chatran";
app.getApi().age = 8;
