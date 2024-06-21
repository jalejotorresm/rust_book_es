# 3 - Conceptos comunes de programación

Vamos a aprender sobre variables, tipos básicos, funciones, comentarios y control de flujo.

## 3.1 - Variables y mutabilidad

Las variables se declaran con la palabra clave `let`. Las variables son inmutables por defecto, a menos que se incluya la palabra clave `mut`. El siguiente código fallará en su compilación con el error `` cannot assign twice to immutable variable `x` `` (la variable inmutable 'x' no puede recibir asignaciones múltiples):

```rust
fn main() {
    let x = 5;
    x = 6; // ¡Esto dará un error!

    let mut y = 5;
    y = 6; // Esto está permitido.
}
```

La inmutabilidad en Rust es similar al concepto de `const` en JavaScript, o al de `final` en Java. El valor al que apunta la referencia no puede ser modificado (en su mayoría - revisa el cuadro de información más adelante):

```rust
fn main() {
    let foo = String::from("foo");
    foo.clear(); // ¡Esto dará un error!
}
```

En el código de arriba, `clear` intentará vaciar el string, pero fallará con el error `` cannot borrow `foo` as mutable, as it is not declared as mutable `` (no se puede pasar a 'foo' como mutable, ya que no está declarado como tal). Si revisas el código fuente del método `clear`, encontrarás que `self` está configurado como un parámetro de referencia mutable (en Rust, `self` es similar al `this` de otros lenguajes).

Las variables no pueden ser declaradas en el scope global [a menos que sean `static`](#variables-estáticas).

:::info

Habrás notado que, al hablar de las variables inmutables, indicamos que no se pueden modificar "en su mayoría". La inmutabilidad nos previene, por ejemplo, de modificar directamente lo componentes básicos de un struct, sin embargo, en el [capítulo 15][chap15] vamos a ver que en algunos casos puedes modificar valores individuales a través del concepto conocido como _mutabilidad interior_. Un mutex es un ejemplo de un objeto que es inmutable, pero al que le puedes cambiar el valor que contiene si eres quien posee el acceso.

:::

### Constantes

Rust también maneja el concepto de _constante_, el cual en un inicio se ve similar a una variable inmutable:

```rust
const TRES_HORAS_EN_SEGUNDOS: u32 = 60 * 60 * 3;
```

Las constantes son sutilmente diferentes a las variables inmutables. Dado que son guardadas directamente en el binario del programa, no pueden ser mutables en absoluto, y su valor debe ser algo que pueda determinarse en tiempo de compilación. La referencia de Rust contiene una [sección sobre evaluación de constantes](https://doc.rust-lang.org/stable/reference/const_eval.html) en las que se establecen todas las reglas sobre cuáles operadores pueden o no usarse, y para el código de arriba el compilador puede ayudarnos a convertir `60 * 60 * 3` en `10800` y guardar esa información en el ejecutable.

Las constantes deben llevar anotación de tipo, y pueden ser declaradas en el scope global.

### Variables estáticas

Las _variables estáticas_, o variables globales se declaran con la palabra clave static y se usa el `SCREAMING_SNAKE_CASE` para nombrarlas:

```rust
static HOLA_MUNDO: &str = "¡Hola Mundo!";

fn main() {
    println!("el nombre es: {}", HOLA_MUNDO);
}
```

Las variables estáticas pueden ser mutables, pero para acceder a ellas o modificarlas tendríamos que hablar de código `unsafe`, [lo cual abordaremos más adelante](./ch19/ch19-01-unsafe.md#accediendo-o-modificando-una-variable-estática-mutable).

### Shadowing

Tal como vimos en el [capítulo 2][chap2], una declaración de variable puede sobreponerse, o hacerle shadow/sombra, a otra:

```rust
fn main() {
    let x = 5;

    let x = x + 1;

    {
        let x = x * 2;
        println!("El valor de x en el scope interno es: {x}");
    }

    println!("El valor de x es: {x}");
}
```

En la función de arriba hay un total de 3 variables, todas con el nombre de "x". Las variables solo existen dentro del bloque en el que fueron declaradas, por lo que esta función imprime lo siguiente:

```txt
El valor de x en el scope interno es: 12
El valor de x es: 6
```

Cuando se le aplica shadowing a una variable, la nueva variable no necesita tener el mismo tipo de la antigua.

## 3.2 - Tipos de datos

Ten presente que Rust es un lenguaje de tipado estático, por lo que el tipo de cada variable (así como la cantidad de espacio que ocupa en memoria, para el caso de las que se alojan en el stack) debe saberse en tiempo de compilación. La inferencia de tipos en Rust es sorprendente, a tal punto que no necesitamos indicarle constantemente a Rust el tipo de una variable, pero en algunas ocasiones el tipo de una variable puede ser ambiguo, por lo cual su _anotación_ es necesaria (ej: `let guess: 32 = ...`).

Un "tipo escalar" representa a un valor único. Rust posee cuatro formas de tipos escalares: enteros, números de punto flotante, booleanos y caracteres.

### Tipos de enteros

Estos son los tipos de números enteros:

| Tamaño (bits) | Con signo | Sin Signo |
| ------------- | --------- | --------- |
| 8             | i8        | u8        |
| 16            | i16       | u16       |
| 32            | i32       | u32       |
| 64            | i64       | u64       |
| 128           | i128      | u128      |
| arch          | isize     | usize     |

Los enteros con signo se guardan a traves del [complemento a dos](https://es.wikipedia.org/wiki/Complemento_a_dos). `isize` y `usize` dependen de la arquitectura del equipo que compile el código, por lo que serán números de 32 bits en un equipo con arquitectura de 32 bits, y números de 64 bits en uno con arquitectura de 64 bits.

Los literales enteros se pueden escribir a través de cualquiera de los métodos descritos adelante. Ellos pueden usar un `_` como un separador visual (así como usamos el punto para escribir números como "1.000", en Rust podemos escribir "1_000").

| Literales numéricos | Ejemplo     |
| ------------------- | ----------- |
| Decimal             | 98_222      |
| Hexadecimal         | 0xff        |
| Octal               | Oo77        |
| Binario             | 0b1111_0000 |
| Byte (u8)           | b'A'        |

Si intentas sobrecargar un entero (por ejemplo, asignando un 256 a un u8), el comportamiento por defecto depende si compilaste el programa con `--release` o no. En el modo debug Rust incluye verificaciones en tiempo de ejecución para asegurarse que no sobrecargues un valor, por lo cual tu programa generará un panic y se bloqueará (ve al [capítulo 9][chap9] para más información sobre los panics). Con el marcador --release el valor se sobrecargará de la misma manera como lo haría en lenguajes como C o Java (como el valor máximo de un u8 es 255, con 256 el u8 retornaría a ser 0).

:::tip

Podemos cambiar la forma en la que los overflows (o sobrecargas) se procesan en tiempo de ejecución para el desarrollo o lanzamiento a través de [perfiles de lanzamiento](./ch14-more-about-cargo.md#141---personalizando-builds-con-perfiles-de-lanzamiento).

:::

### Tipos de punto flotante

Hay dos tipos de punto flotante: `f64` (el tipo por defecto) y `f32`. Los números de punto flotante se guardan siguiendo el estándar IEEE-754.

### Operadores numéricos

Rust maneja los cuatro operadores aritméticos básicos: `+`, `-`, `*`, `/`, y `%` para el módulo. Revisa el [apéndice B del Libro de Rust][appb] para una lista completa de todos los operadores disponibles en Rust.

### El tipo booleano

Los booleanos son de tipo `bool`, y puede ser `true` o `false`:

```rust
let t = true;
let f: bool = false;
```

### El tipo carácter

En Rust, un `char` es un valor escalar unicode de cuatro bytes.

```rust
let c = 'z';
let z: char = 'ℤ';
let gato_con_corazones = '😻';
let astronauta_zwj = '👩🏻‍🚀'; // <== ¡Esto no va a funcionar!
```

El último ejemplo no funciona. Nuestra amiga astronauta puede verse de un solo carácter, pero en realidad son dos emojis unidos por un zero-width-joiner (ZWJ). Abordaremos el tema de UTF-8 y Unicode en el [capítulo 8][chap8],

### `&str` y `String`

En Rust, vas a encontrar dos tipos de string diferentes: `str` y `String`. `String` es similar a un `Vector`, ya que es un tipo de dato que guarda una lista de caracteres en un espacio de memoria de tamaño variable dentro del heap. Cada vez que recibes input de un usuario o lees un string desde un archivo, el dato va a guardarse en un `String`.

El tipo `&str` (casi siempre se usa en su forma de referencia o "préstamo") es también conocido como un _string slice_ (tema el cual abordaremos en [el siguiente capítulo][chap4]), y actúa como un puntero tanto a los datos del string como a la longitud del string en sí. Cualquier literal de string en Rust es un `&str`, ya que el string en sí se guarda en un espacio del ejecutable y solo quedamos con una referencia inmutable a él. Un string slice puede usarse como una vista de un `String`.

## Tipos compuestos

Los tipos compuestos agrupan varios valores dentro de un tipo. Rust maneja dos tipos compuestos primitivos: la _tupla_ y el _arreglo_.

### El tipo tupla

```rust
let tup: (i32, f64, u8) = (800, 6.4, 1);

// Asignación por destructuring
let (x, y, z) = tup;

// Acceso a elementos individuales
let a = tup.0;
let b = tup.1;
let c = tup.2;
```

Una tupla vacía se escribe con `()`, y se le llama un "unit". Esto representa a un valor vacío o un tipo de retorno vacío. Las funciones sin un valor de retorno asumen al unit como su retorno implícito.

### El tipo arreglo

Cada elemento dentro de un arreglo debe ser del mismo tipo, y los arreglos deben tener un tamaño fijo. Si buscas un arreglo de tamaño variable, tu opción es un vector de la librería standard (ve al [capítulo 8][chap8]). Si declaras una variable como un arreglo dentro de una función, los contenidos de dicha variable terminarán en el stack, mientras que los contenidos de un vector terminarán en el heap. (Sin embargo, puedes ubicar los contenidos de un array en el heap a través de un smart pointer como `Box<T>`. Este tema se aborda en el [capítulo 15][chap15]).

```rust
let a = [1, 2, 3, 4, 5];

// Asignación por destructuring. Se deben usar todos los elementos.
let [x, y, z, _, _] = a;

// Acceso a elementos individuales
let primero = a[0];
let segundo = a[1];

// Creando un arreglo de 5 elementos de tipo i32.
let b: [i32; 5] = [1, 2, 3, 4, 5];

// Creando un arreglo de cinco ceros.
let c = [0; 5]
```

Los accesos a un array se verifican en tiempo de ejecución. Intentar acceder a un índice que esté fuera de los límites de un arreglo causará un panic.

Si vienes desde el desarrollo con JavaScript, es importante mencionar que los "arreglos" en JavaScript no son iguales a los arreglos en cualquier otro lenguaje de programación. En su lugar, el tipo `Vec` de Rust, o el _vector_, es un tipo de dato más parecido al arreglo de JavaScript que el mismo arreglo de Rust. El tema de los vectores se abordará en el [capítulo 8][chap8].

### El tipo `struct`

Puedes definir tus propios tipos compuestos a través de la palabra clave `struct`:

```rust
struct Usuario {
    nombre: String,
    edad: u32,
}
```

## 3.3 - Funciones

Las funciones se definen con la palabra clave `fn`. Los parámetros deben tener una anotación de tipo, los cuales se anotan con el `: type`, de la misma forma que las variables (y de la misma forma que en TypeScript).

```rust
fn otra_funcion(x: i32, y: i32) {
    println!("El punto está en: {x}, {y}");
}
```

Si una función termina con una expresión en vez de una declaración, el valor de retorno de la función será el valor de dicha expresión. Los tipos de retorno deben ser declarados explícitamente con una flecha (`->`).

```rust
// Retorna 1
fn retorno_implicito() -> i32 {
    1
}

// También retorna 1, pero el uso de `return` no es
// propio, o idiomático, en Rust a menos que quieras hacer el retorno
// desde la mitad de la función.
fn retorno_explicito() -> i32 {
    return 1;
}

// El punto y coma lo convierte en una declaración en vez
// de una expresión, por lo que retorna un `()`.
fn no_return() {
    1;
}
```

Las asignaciones siempre son declaraciones (por ejemplo, `let x = 6` no evalúa a 6), así como las definiciones de una función (por ejemplo, no puedes escribir `let x = fn foo() {}`). Las funciones pueden ejecutarse antes de definirse. En el [capítulo 10][chap10] aprenderemos sobre el uso de genéricos con las funciones.

Rust también maneja closures, los cuales son funciones insertadas que pueden asignarse a variables o pasarse como argumentos. Abordaremos este tema en detalle en el [capítulo 13][chap13], y su sintaxis es la siguiente::

```rust
let mi_closure = |param1, param2| { /* aquí va el cuerpo de la función */ };
```

## 3.4 - Comentarios

```rust
// Éste es un comentario. Los comentarios de líneas múltiples
// generalmente se escriben de ésta manera.

/* También puedes utilizar este estilo de comentario */

/// Éste es un comentario doc para el "elemento siguiente", en
/// éste caso para la función foo. Se permite Markdown
/// aquí. Ve al capítulo 14 para más detalles.
fn foo() {}

mod bar {
    //! Éste es un comentario doc para el "elemento padre",
    //! en éste caso el módulo "bar".
}
```

## 3.5 - Flujo de Control

### La expresión if

Las declaraciones `if` no tienen signos alrededor de la condición (similar a Go, y opuesto a Java, JavaScript o C):

```rust
if number < 5 {
    println!("menor que 5");
} else if number > 10 {
    println!("mayor que 10");
} else {
    println!("mayor que 4, menor que 11");
}
```

Ten presente que `if` puede usarse como una expresión. En éste caso cada "rama" del if debe retornar el mismo tipo de dato:

```rust
// Ésto está bien
let number = if condition { 5 } else { 6 };

// ¡Ésto no compilará! `if` y `else` tienen
// tipos incompatibles
let wat = if condition { 5 } else { "seis" };

// Sin embargo, ésto está bien.
loop {
    let wat = if condition { 5 } else { break };
}
```

### Repetición con Bucles

Rust maneja tres tipos de bucles: `loop`, `while` y `for`. Las declaraciones `break` y `continue` funcionan de la misma manera que en otros lenguajes: `break` detendrá el bucle, y `continue` detendrá la ejecución de la iteración actual para iniciar la siguiente. Ten en cuenta que los bucles pueden usarse como expresiones.

```rust
loop {
    println!("¡Bucle infinito!")
}

// Los bucles pueden usarse como expresiones, el `break`
// retorna el valor desde el bloque.
let mut counter = 0;
let x = loop {
    counter += 1;
    if counter == 10 {
        break counter * 2;
    }
};

// Los bucles pueden etiquetarse con una comilla simple
// seguido por el nombre de la etiqueta y dos puntos.
'outer: loop {
    'inner: loop {
        break 'outer;
    }
}

// Un bucle while se parece bastante a un
// bucle while de muchos otros lenguajes.
let mut number = 0;
while number < 10 {
    number++;
}
```

Los bucles for en Rust siempre siguen el formato `for [var] in [iterador] {}`:

```rust
// Bucle for a través de un arreglo
let a = [1, 2, 3, 4, 5];
for element in a {
    println!("el valor es {element}");
}

// Conteo del 1 al 5
for element in (1..6) {
    println!("el valor es {element}");
}
```

Veremos más sobre los iteradores en el [capítulo 13][chap13].

Ahora que tenemos algunos conocimientos básicos, es tiempo de aprender sobre [ownership][chap4].

[chap2]: ./ch02-guessing-game.md "Capítulo 2: Juego de adivinanzas"
[chap4]: ./ch04-ownership.md "Capítulo 4: Ownership, referencias y slices"
[chap8]: ./ch08-common-collections.md "Capítulo 8: Colecciones comunes"
[chap9]: ./ch09-error-handling.md "Capítulo 9: Manejo de errores"
[chap10]: ./ch10/ch10-01-generic-data-types.md "Capítulo 10: Tipos genéricos, traits y lifetimes"
[chap13]: ./ch13-functional-language-features.md "Capítulo 13: Características de lenguajes funcionales: Iteradores y closures"
[chap15]: ./ch15-smart-pointers.md "Capítulo 15: Smart Pointers"
[appb]: ./zz-appendix/appendix-02-operators.md
