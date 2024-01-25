// index.js
const moralejas = [
    "Más vale tarde que nunca, pero nunca es un buen momento para llegar tarde a una fiesta de piñatas.",
    "Si la vida te da limones, probablemente alguien más te dará sal y tequila, ¡y ahí está la verdadera fiesta!",
    "La paciencia es una virtud, pero esperar a que las palomitas se calienten en el microondas pone a prueba hasta al más paciente.",
    "Nunca digas nunca, a menos que estés negando que te quedaste dormido durante una reunión importante.",
    "Más vale ser cabeza de ratón que cola de león, a menos que seas el ratón en una película de Disney.",
    "El que mucho come, mucho duerme, pero también mucho ronca, y eso puede causar problemas en una fiesta de pijamas.",
    "Más vale prevenir que lamentar, pero si lamentar implica pedir pizza, entonces vale la pena correr el riesgo.",
    "Nunca dejes para mañana lo que puedes hacer hoy, a menos que mañana sea día de pizza con descuento.",
    "Quien mucho abarca, poco aprieta, pero quien mucho abraza, probablemente tiene un abrazo muy apretado.",
    "Más vale prevenir que tener que explicar por qué decidiste aprender a hacer malabares con tijeras.",
    "El que ríe último, probablemente no entendió el chiste porque estaba ocupado riéndose del chiste anterior.",
    "Nunca digas siempre, a menos que estés enseñando a un robot a decir siempre 'siempre'.",
    "Más vale pájaro en mano, especialmente si es un pájaro parlante que cuenta chistes.",
    "La práctica hace al maestro, pero si practicas ser un ninja, probablemente te expulsen del gimnasio.",
    "Más vale maña que sueño, pero si tienes sueño, es probable que ni siquiera sepas lo que significa 'maña'.",
    "No hay mal que por bien no venga, a menos que el mal involucre perder el control remoto de la televisión.",
    "Más vale tarde que en una fila del DMV, porque ahí el tiempo se congela.",
    "La vida es como un juego de mesa, siempre hay alguien que voltea el tablero cuando las cosas no van como quieren.",
    "Más vale ser un caballo de Troya que un unicornio, al menos en términos de sorpresa.",
    "No dejes para mañana lo que puedes hacer hoy, a menos que sea una dieta, porque siempre puedes empezar mañana.",
    "El que mucho mira Netflix, poco realiza ejercicio, pero mucho desarrolla habilidades avanzadas de maratón de series.",
    "Más vale ser el último mono que el primer león en una competición de lanzamiento de plátanos.",
    "La calma antes de la tormenta es un buen momento para practicar tus habilidades de interpretación meteorológica.",
    "Nunca digas siempre, a menos que estés dando instrucciones sobre cómo armar muebles de IKEA.",
    "Más vale tarde que embarazada, pero si llegas tarde a la fiesta, probablemente no te embaraces de chismes.",
    "No hay mal que por bien no venga, excepto cuando tu pastel favorito se quema en el horno.",
    "El que mucho escoge, mucho se equivoca, especialmente en la pista de baile.",
    "Más vale ser el último en salir, porque ahí es cuando encuentras las sobras del buffet.",
    "No dejes para mañana lo que puedes hacer hoy, a menos que sea una siesta, porque las siestas siempre pueden esperar.",
    "Quien mucho apura, se queda sin helado antes de llegar a casa.",
    "Más vale tarde que en una reunión de murciélagos, porque allí todos son nocturnos.",
    "No hay mal que por bien no venga, excepto cuando tu despertador no suena y llegas tarde a tu cita.",
    "El que mucho mira memes, poco realiza tareas, pero mucho se divierte.",
    "Más vale ser el último en comprender un chiste, porque al menos eres el último en reír.",
    "No dejes para mañana lo que puedes hacer hoy, a menos que sea doblar la ropa, porque eso siempre puede esperar.",
    "Quien mucho come, mucho gasta en pantalones más grandes.",
    "Más vale ser la excepción que la regla, especialmente si la regla es no comer pasteles antes de la cena.",
    "Nunca digas nunca, a menos que te estén preguntando si alguna vez dijiste nunca.",
    "Más vale ser un pez en el agua que un pez en la sartén.",
    "La vida es como un espejo, sonríele y te devolverá una sonrisa, pero no intentes hacer muecas extrañas, podría ser incómodo.",
    "Más vale ser un ave temprana que un búho cansado que no consigue café.",
    "No hay mal que por bien no venga, excepto cuando tu helado se derrite antes de llegar a casa.",
    "El que mucho abarca, poco abraza, pero mucho abrazo puede ser molesto si no te has duchado.",
    "Más vale prevenir que lamentar, pero a veces lamentar es más divertido.",
    "Nunca digas siempre, a menos que estés dando consejos sobre cómo mantener limpio tu escritorio.",
    "Más vale ser el último en enterarse, porque entonces puedes actuar sorprendido.",
    "La práctica hace al maestro, pero si practicas ser un detective, podrías terminar en una situación incómoda.",
    "Más vale maña que sueño, pero si tienes sueño, probablemente no te importe tener poca maña.",
    "No dejes para mañana lo que puedes hacer hoy, a menos que sea estudiar para un examen, porque procrastinar es un arte.",
    "Quien mucho duerme, poco ve la televisión, pero al menos está descansado.",
    "Más vale ser el último en rendirse, pero si estás jugando al escondite, no siempre es una buena estrategia.",
    "La vida es como un rollo de papel higiénico, nunca sabes cuánto queda hasta que llegas al final.",
    "Más vale tarde que en una fila del cine, porque las palomitas siempre valen la espera.",
    "No hay mal que por bien no venga, excepto cuando ese mal implica perder el último episodio de tu serie favorita.",
    "El que mucho mira al sol, probablemente necesite anteojos de sol.",
    "Más vale ser el último en la pista de baile, porque así todos están ocupados mirando a otro lado.",
    "Nunca digas siempre, a menos que estés describiendo el tiempo que pasas buscando las llaves del coche.",
    "Más vale pájaro en mano, a menos que sea un pingüino, entonces es mejor en el Polo Sur.",
    "Quien mucho come, mucho gasta en dentista.",
    "La paciencia es una virtud, pero esperar a que la pizza se enfríe pone a prueba a los más virtuosos.",
    "Más vale prevenir que lamentar, pero si lamentas no haber comprado más helado, es comprensible.",
    "Nunca dejes para mañana lo que puedes hacer hoy, a menos que mañana sea día de inventar excusas.",
    "El que mucho apura, generalmente es el que está en la cola del baño.",
    "Más vale ser el último en enterarse de un chisme, porque entonces puedes actuar sorprendido cuando todos te cuenten.",
    "No hay mal que por bien no venga, excepto cuando ese mal involucra perder el control remoto en la final del campeonato.",
    "Más vale ser cabeza de ratón que cola de elefante, porque en las fiestas de disfraces, menos es más.",
    "Quien mucho habla, mucho escucha, especialmente cuando está en problemas.",
    "Más vale ser el último en subir al tren, porque así te aseguras de que nadie te robe el asiento.",
    "No dejes para mañana lo que puedes hacer hoy, a menos que mañana sea el día mundial de la procrastinación.",
    "La vida es como una película, a veces te quedas dormido en medio y te pierdes lo mejor.",
    "Más vale ser el último mono que el primer orangután en una competición de monos.",
    "Nunca digas siempre, a menos que estés describiendo el tiempo que pasas buscando tus anteojos.",
    "Más vale ser el último en reír, porque entonces todos se preguntarán qué sabes que ellos no.",
    "El que mucho come, mucho se lamenta de no haber dejado espacio para el postre.",
    "Más vale tarde que en una fila para comprar el último modelo de teléfono, porque siempre hay una fila.",
    "No hay mal que por bien no venga, excepto cuando ese mal implica quedarse sin batería en el teléfono en medio de la nada.",
    "Más vale ser el último en la fila del cine, porque ahí es donde siempre encuentras las mejores palomitas.",
    "Quien mucho come, mucho ronca, especialmente si la comida fue exquisita.",
    "Más vale ser el último en comprender un chiste, porque al menos eres el último en sentirse incómodo.",
    "La práctica hace al maestro, pero si practicas ser un detective, es posible que te tomen por un espía.",
    "Más vale maña que sueño, a menos que estés soñando con ser un maestro de la maña.",
    "Nunca digas nunca, a menos que estés haciendo una promesa de no volver a ver la serie que todos te recomiendan.",
    "Más vale ser el último en llegar, porque así puedes elegir el mejor lugar.",
    "No dejes para mañana lo que puedes hacer hoy, a menos que sea hacer ejercicio, porque siempre puedes empezar mañana.",
    "Quien mucho duerme, mucho sueña, pero a veces también se le olvida la alarma.",
    "Más vale ser el último mono que el primer pingüino en aprender a volar.",
    "La vida es como un juego de cartas, a veces necesitas una buena mano para ganar.",
    "Más vale ser el último en entender una broma, porque al menos te ríes más tiempo.",
    "No hay mal que por bien no venga, excepto cuando ese mal involucra perder las llaves del coche en un día lluvioso.",
    "El que mucho mira al sol, probablemente también piensa que puede vencerlo en una competición de resistencia visual.",
    "Más vale ser el último en subir al autobús, porque así puedes elegir el asiento trasero.",
    "Nunca digas siempre, a menos que estés dando instrucciones sobre cómo doblar una sábana correctamente.",
    "Más vale pájaro en mano, a menos que sea un águila con garras afiladas.",
    "Quien mucho habla por teléfono, mucho recarga la batería.",
    "La paciencia es una virtud, pero esperar el pastel en el horno sin encenderlo es simplemente hambre.",
    "Más vale prevenir que lamentar, pero si lamentar implica perder el último episodio de tu serie favorita, entonces es cuestionable.",
    "Nunca dejes para mañana lo que puedes hacer hoy, a menos que mañana sea día de hacer absolutamente nada.",
    "El que mucho apura, termina comprando cosas que no necesita.",
    "Más vale ser el último en salir, porque así puedes apagar las luces.",
    "No hay mal que por bien no venga, excepto cuando ese mal involucra perder el último asiento en el cine.",
    "Más vale ser el último mono que el primer chimpancé en aprender trucos nuevos.",
    "Quien mucho escoge, mucho gasta en la tienda de donas.",
    "Más vale ser el último en comprender una tecnología nueva, porque así todos te preguntarán cómo funciona.",
    "No dejes para mañana lo que puedes hacer hoy, a menos que mañana sea el día internacional de no hacer nada.",
    "La vida es como una taza de café, a veces necesitas azúcar para que sea más llevadera.",
    "Más vale ser el último en llegar al picnic, porque así todos te saludan y te ofrecen la mejor comida.",
    "Nunca digas siempre, a menos que estés dando indicaciones para recordar siempre poner la tapa al vaso antes de agitarlo.",
    "Más vale ser el último en enterarse de un rumor, porque entonces puedes actuar sorprendido cuando todos te lo cuenten.",
    "El que mucho mira al sol, probablemente necesite anteojos de sol.",
    "Más vale ser el último mono que el primer koala en una competición de abrazos.",
    "No hay mal que por bien no venga, excepto cuando ese mal involucra perder el último tren para llegar a casa."
]


const moraleja = {
    TXT: function () {
        const indiceAleatorio = Math.floor(Math.random() * moralejas.length);
        return moralejas[indiceAleatorio];
    },
    HTML: function (opciones = {}) {
        const indiceAleatorio = Math.floor(Math.random() * moralejas.length);
        const moralejaSeleccionada = moralejas[indiceAleatorio];

        // Establecer los estilos predeterminados
        const estilos = {
            fontFamily: "'Arial', sans-serif",
            border: '2px solid #3498db',
            padding: '20px',
            borderRadius: '8px',
            backgroundColor: '#ecf0f1',
            margin: '20px',
            maxWidth: '600px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            fontSize: '18px',
            color: '#2c3e50',
            ...opciones.styles, // Sobrescribir con las opciones proporcionadas por el usuario
        };

        return `
            <div style="
                font-family: ${estilos.fontFamily};
                border: ${estilos.border};
                padding: ${estilos.padding};
                border-radius: ${estilos.borderRadius};
                background-color: ${estilos.backgroundColor};
                margin: ${estilos.margin};
                max-width: ${estilos.maxWidth};
                box-shadow: ${estilos.boxShadow};
            ">
                <p style="
                    font-size: ${estilos.fontSize};
                    color: ${estilos.color};
                    margin: 0;
                ">${moralejaSeleccionada}</p>
            </div>`;
    }
};

// Ejemplos de uso:
console.log(moraleja.TXT()); // Llama al método TXT
console.log(moraleja.HTML());  // Llama al método HTML

module.exports = moraleja;