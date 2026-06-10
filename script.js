class Nodo {

    constructor(clave, nombre) {
        this.clave = clave;
        this.nombre = nombre;
        this.izq = null;
        this.der = null;
        this.altura = 1;
    }
}

class AVL {

    altura(nodo) {
        return nodo ? nodo.altura : 0;
    }

    rotacionDerecha(y) {

        let x = y.izq;
        let t2 = x.der;

        x.der = y;
        y.izq = t2;

        y.altura =
            Math.max(
                this.altura(y.izq),
                this.altura(y.der)
            ) + 1;

        x.altura =
            Math.max(
                this.altura(x.izq),
                this.altura(x.der)
            ) + 1;

        return x;
    }

    rotacionIzquierda(x) {

        let y = x.der;
        let t2 = y.izq;

        y.izq = x;
        x.der = t2;

        x.altura =
            Math.max(
                this.altura(x.izq),
                this.altura(x.der)
            ) + 1;

        y.altura =
            Math.max(
                this.altura(y.izq),
                this.altura(y.der)
            ) + 1;

        return y;
    }

    balance(nodo) {

        if (!nodo) return 0;

        return this.altura(nodo.izq) -
               this.altura(nodo.der);
    }

    insertar(nodo, clave, nombre) {

        if (!nodo)
            return new Nodo(clave, nombre);

        if (clave < nodo.clave) {

            nodo.izq =
                this.insertar(
                    nodo.izq,
                    clave,
                    nombre
                );

        } else if (clave > nodo.clave) {

            nodo.der =
                this.insertar(
                    nodo.der,
                    clave,
                    nombre
                );

        } else {
            return nodo;
        }

        nodo.altura =
            1 +
            Math.max(
                this.altura(nodo.izq),
                this.altura(nodo.der)
            );

        let b = this.balance(nodo);

        if (b > 1 && clave < nodo.izq.clave)
            return this.rotacionDerecha(nodo);

        if (b < -1 && clave > nodo.der.clave)
            return this.rotacionIzquierda(nodo);

        return nodo;
    }

    buscar(nodo, clave) {

        if (!nodo)
            return null;

        if (clave === nodo.clave)
            return nodo.nombre;

        if (clave < nodo.clave)
            return this.buscar(
                nodo.izq,
                clave
            );

        return this.buscar(
            nodo.der,
            clave
        );
    }
}

/* =====================
   CREAR AVL
===================== */

const avl = new AVL();

let raiz = null;

raiz = avl.insertar(raiz, 50, "Mario");
raiz = avl.insertar(raiz, 30, "Batman");
raiz = avl.insertar(raiz, 70, "Goku");
raiz = avl.insertar(raiz, 20, "Pikachu");
raiz = avl.insertar(raiz, 40, "Iron Man");
raiz = avl.insertar(raiz, 10, "Luigi");
raiz = avl.insertar(raiz, 60, "Superman");
raiz = avl.insertar(raiz, 80, "Naruto");
raiz = avl.insertar(raiz, 90, "Sonic");
raiz = avl.insertar(raiz, 25, "Hulk");

/* =====================
   PREGUNTAS
===================== */

let preguntas = [

    "¿Es un héroe?",
    "¿Tiene poderes?",
    "¿Es de anime?",
    "¿Es humano?",
    "¿Usa tecnología?",
    "¿Es de videojuegos?"

];

/* =====================
   IA
===================== */

const personajesIA = [

    { nombre: "Batman", puntaje: 3, imagen: "batman.png" },
    { nombre: "Iron Man", puntaje: 4, imagen: "ironman.png" },
    { nombre: "Goku", puntaje: 6, imagen: "goku.png" },
    { nombre: "Naruto", puntaje: 5, imagen: "naruto.png" },
    { nombre: "Mario", puntaje: 2, imagen: "mario.png" },
    { nombre: "Luigi", puntaje: 2, imagen: "luigi.png" },
    { nombre: "Sonic", puntaje: 3, imagen: "sonic.png" },
    { nombre: "Pikachu", puntaje: 4, imagen: "pikachu.png" },
    { nombre: "Superman", puntaje: 5, imagen: "superman.png" },
    { nombre: "Hulk", puntaje: 4, imagen: "hulk.png" }

];

/* =====================
   VARIABLES
===================== */

let respuestas = [];
let paso = 0;
let puntos = 0;
let historial = [];

/* =====================
   INICIAR
===================== */

function iniciarJuego() {

    paso = 0;
    respuestas = [];

    document.getElementById("resultado").innerHTML = "";

    document.getElementById("pregunta").innerHTML =
        preguntas[0];
}

/* =====================
   RESPONDER
===================== */

function responder(r) {

    if (paso >= preguntas.length)
        return;

    respuestas.push(r);

    paso++;

    if (paso < preguntas.length) {

        document.getElementById("pregunta").innerHTML =
            preguntas[paso];

    } else {

        let totalSi = 0;

        for (let respuesta of respuestas) {

            if (respuesta === "si") {
                totalSi++;
            }
        }

        let personajeEncontrado = null;
        let diferencia = 999;

        for (let p of personajesIA) {

            let actual =
                Math.abs(totalSi - p.puntaje);

            if (actual < diferencia) {

                diferencia = actual;
                personajeEncontrado = p;
            }
        }

        puntos += 10;

        document.getElementById("puntos").innerHTML =
            "⭐ Puntos: " + puntos;

        document.getElementById("pregunta").innerHTML = "";

        document.getElementById("resultado").innerHTML =

        `
        <h2>🤖 Creo que es: ${personajeEncontrado.nombre}</h2>

        <img
            src="${personajeEncontrado.imagen}"
            alt="${personajeEncontrado.nombre}"
            class="personaje-img">
        `;

        historial.push(personajeEncontrado.nombre);

        let lista = "";

        for (let p of historial) {

            lista += `<li>${p}</li>`;
        }

        document.getElementById("historial").innerHTML =
            lista;
    }
}

/* =====================
   MOSTRAR AVL
===================== */

function mostrarAVL() {

document.getElementById("arbol").innerHTML =

`
                 ⭐ Mario (50)
                ╱           ╲
       🦇 Batman(30)      🐉 Goku(70)
         ╱      ╲         ╱       ╲
  🍄 Luigi(10) 🤖 IronMan(40) 🦸 Superman(60) 🍥 Naruto(80)
        ╲                                ╲
      💚 Hulk(25)                     ⚡ Sonic(90)

               ⚡ Pikachu(20)
`;
}

mostrarAVL();
