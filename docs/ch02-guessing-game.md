# 2 - Programando un Juego de Adivinanzas

En éste capítulo vas a crear un programa básico tipo "juego de adivinanzas". Este programa toma un número aleatorio, intentas adivinar el número secreto, y el programa te informa si tu intento es muy alto o muy bajo. ¡Diversión total! Vamos a introducir muchos conceptos, pero no abordaremos todos los detalles en éste capítulo.

Crea el proyecto de la siguiente manera:

```sh
$ cargo new juego_adivinanzas
$ cd juego_adivinanzas
```

Para empezar, nos enfocaremos únicamente en obtener información del lado del usuario. Abre _src/main.rs_ en tu editor de texto favorito, y luego copia y pega lo siguiente:

```rust title="src/main.rs"
use std::io;

fn main() {
    println!("¡Adivina el número!");

    println!("Por favor ingresa tu número.");

    let mut guess = String::new();

    io::stdin()
        .read_line(&mut guess)
        .expect("No se pudo leer la información");

    println!("Ingresaste el número: {guess}");
}
```

Puedes ejecutar este programa con `cargo run`, y debería pedirte que ingreses un valor para luego imprimir dicha información en la consola.

Para leer la información del usuario, usa la librería `io` la cual pertenece a la librería standard; y para hacer referencia a `io` de forma más conveniente, la traemos al _scope_. Eso lo haces con la primera línea, `use std::io`. Esta línea es similar a la declaración import de Python o Java, sin embargo no es obligatorio hacer la declaración de importación para usar `io`. Puedes remover la línea de `use` y reemplazar la parte de `io::stdin()` con `std::io::stdin()`. Hay un número de símbolos de la librería standard los cuales Rust te trae al scope de forma automática, elementos que se utilizan en casi cualquier programa que vayas a crear. Este conjunto de elementos recibe el nombre de [_prelude_](https://doc.rust-lang.org/stable/std/prelude/index.html).

## Guardar valores a través de variables

```rust
    let mut guess = String::new();
```

El código de arriba crea un String nuevo y lo asocia a una variable mutable llamada `guess`. En Rust, las variables son inmutables por defecto. Obviamente, si esta variable fuera un string inmutable, entonces la función `read_line` habría tenido problemas para guardar valores allí; por lo tanto, al usar la palabra clave `mut`, la variable se convierte en una mutable. En la ejecución `String::new()`, la parte del `::` nos indica que `new` es una _función asociada_, implementada dentro del tipo String. Muchos tipos de datos en Rust implementan un constructor `new` similar al del String.

```rust
    io::stdin()
        .read_line(&mut guess)
        .expect("No se pudo leer la información");
```

`read_line` lee información que ingresa desde stdin, y lo guarda en `guess`. Recuerda que el argumento que pasas a la función es `&mut guess`, y no simplemente `guess`. `&` significa que el argumento de la función es una referencia al objeto al que la variable `guess` está apuntando, y `mut` significa que la función `read_line` tiene permitido modificar dicho argumento.

En Rust, el paso por referencia funciona de forma similar al paso por puntero en Go o C, o al paso de un objeto en Java o JavaScript, en donde la función o el método que se ejecuta puede modificar al objeto, y esos cambios serán visibles dentro del scope del código que ejecute dicha función. Al mismo tiempo, las referencias conllevan muchas implicaciones en términos de ownership. Entraremos en detalles sobre las referencias en el [capítulo 4][chap4].

:::info

Si vienes del mundo del desarrollo con C/C++, puedes pensar un poco en las referencias de Rust como las referencias de C++, o los punteros de C. Entraremos en detalle sobre éste tema en el capítulo 4. También podrías asumir erróneamente que sin el `&` Rust pasaría una copia de `guess`, pero lo que en realidad se hace en Rust cuando le pasamos a una función un valor sin la referencia es transferir el ownership del valor a la función ejecutada. Sin embargo, nos estamos adelantando bastante, así que volveremos a tratar éste tema en el [capítulo 4][chap4].

:::

## Manejo de errores potenciales con `Result`

En Rust, una función que puede fallar retorna un `Result` (ve al [capítulo 9][chap9]). En teoría, `read_line` puede fallar. Como en éste proyecto se leen datos desde stdin probablemente no hallan fallos, pero el caso cambia si se lee información desde un archivo o desde una red.

`Result` es un enum (ve al [capítulo 6][chap6]) el cual puede retornar una variante `Ok` en el caso de éxito, o un `Err` para indicar que ocurrió un error. Los enums en Rust son un poco particulares en términos de poder traer información adicional dentro de sus variantes. Si el `Result` es un `Err`, traerá consigo información respecto a la razón por la cual la operación falló. Si el `Result` es un `Ok`, puede traer consigo otra información adicional (aunque en éste proyecto no lo hace).

En nuestro proyecto, el manejo de errores se procesa ejecutando el método `expect` dentro del `Result`, el cual causa un _panic_ si hay un error. Si remueves la ejecución de `expect`, el programa va a compilar, pero obtendrás una advertencia sobre la posibilidad de tener un caso de error que quizás no hayas manejado correctamente.

## Imprimiendo valores con marcadores de posición `println!`

La última línea de código es la siguiente:

```rust
    println!("Ingresaste el número: {guess}");
```

`println!` es una macro que escribe un string al stdout. Es muy similar al `printf` de C o Go. En éstos lenguajes podríamos reescribir el código de arriba así: `printf("Ingresaste el número: %s", guess)`.

El `{}` es un marcador de posición. Puedes introducir una variable directamente en el marcador, pero si usas una expresión tendrías que usar `{}` como el marcador de posición y pasar la expresión como segundo parámetro después:

```rust
    println!("1 + 2 = {}", 1 + 2);
```

## Generando un número secreto

Ahora tienes un programa que te pide adivinar un número, pero aun no se está generando un número secreto para adivinar. Dado que Rust no tiene un generador de números aleatorios en su librería standard, utilizaremos el _crate_ "rand" desde [crates.io](https://crates.io). Para incluir `rand` en nuestro proyecto podemos ejecutar el siguiente comando:

```sh
$ cargo add rand
```

Una vez hagas esto, si abres _Cargo.toml_, verás a rand como un elemento de la lista de dependencias:

```toml
[dependencies]
rand = "0.8.5"
```

De la misma manera que las dependencias de node.js, las dependencias de Cargo usan el [versionado semántico](https://semver.org/). "0.8.5" es una versión acortada de "^0.8.5", lo que significa que Cargo instalará una version `>= 0.8.5` y `< 0.9.0`. Cuando ejecutes `cargo build` o `cargo run`, Cargo automáticamente descargará ésta dependencia (y las dependencias que ésta necesite) y las incluirá en el _Cargo.lock_. Si se lanza un parche de actualización de `rand` y lo quieres actualizar, puedes actualizar el archivo de bloqueo con el comando `cargo update`. Si se lanza una versión menor o mayor de la dependencia, debes actualizar el archivo `Cargo.toml`.

Puedes ejecutar el comando `cargo doc --open` para generar una página de documentación en HTML para todos los crates que estés usando (y sus dependencias), así como para tu código fuente (ve al [capítulo 14][chap14]).

Ahora que ya tienes el crate "rand", puedes actualizar el archivo _src/main.rs_:

```rust title="src/main.rs"
use std::io;
use rand::Rng;

fn main() {
    println!("¡Adivina el número!");

    let secret_number = rand::thread_rng()
        .gen_range(1..=100);

    println!("El número secreto es: {secret_number}");

    println!("Por favor ingresa tu número.");

    let mut guess = String::new();

    io::stdin()
        .read_line(&mut guess)
        .expect("No se pudo leer la información");

    println!("Ingresaste el número: {guess}");
}
```

La siguiente línea es la encargada de generar el número aleatorio:

```rust
    let secret_number = rand::thread_rng()
        .gen_range(1..=100);
```

`rand::thread_rng()` retorna un objeto que implementa el _trait_ `Rng` (ve al [capítulo 10][chap10]). Un trait es muy similar a lo que en otros lenguajes se denomina "interfaz". Se ejecuta el método `gen_range` (desde el trait `Rng`), y se pasa una _expresión de rango_ inclusiva como argumento para generar un número aleatorio entre 1 y 100 (si la expresión de rango hubiera sido `1..100` se habría seleccionado un número entre 1 y 99).

Habrás notado que se incluye la declaración `use rand::Rng` para traer a `Rng` dentro del scope. Ya que dentro del código no se usa `Rng` de forma directa, lo anterior puede verse extraño. Sin embargo, en Rust, para ejecutar el método `gen_range` en un objeto que posee el trait `Rng`, es necesario tener al trait `Rng` en el scope.

## Comparando el número ingresado con el número secreto

Ahora que tienes un número ingresado por el usuario y un número aleatorio con `rand`, puedes compararlos. Agrega la línea `use std::cmp::Ordering` al inicio del archivo, y luego lo siguiente:

```rust
    println!("Ingresaste el número: {guess}");

    let guess: u32 = guess.trim().parse().expect("¡Ingresa un número, por favor!");
    match guess.cmp(&secret_number) {
        Ordering::Less => println!("¡Muy pequeño!"),
        Ordering::Greater => println!("¡Muy grande!"),
        Ordering::Equal => println!("¡Ganaste!"),
    }
```

`comp` compara dos elementos que puedan compararse y retorna un `Ordering`, el cual es otro enum (parecido al `Result` de más arriba). Se utiliza una declaración `match` para decidir qué hacer con el `Ordering`. Una declaración `match` es muy similar a la declaración `switch/case` de otros lenguajes. Una expresión `match` en Rust se compone de _arms_, o ramas, las cuales consisten cada una de un patrón de coincidencia, y el código que debe ejecutarse si el valor se ajusta al patrón de una rama, con un `=>` en el medio. Los patterns y matches, o patrones y coincidencias, se abordarán con más detalle en el [capítulo 6][chap6] y en el [capítulo 18][chap18].

Presta atención a la línea del bloque de arriba en la que ejecutamos el método `parse`. Se crea una nueva variable llamada `guess` de tipo `u32`, pero ya teníamos una variable llamada `guess` de tipo `String`. Sin embargo, esto es permitido en Rust, ya que la variable nueva hace un _shadow_ a la variable antigua.

La variable `guess` recibe una anotación de tipo con `: u32`. Esa anotación hace de guess un entero de 32 bits sin signo. Si vienes de otro lenguaje, puedes sentirte sorprendido por la necesidad del anotar el tipo de una variable. ¿No debería Rust ser capaz de inferir automáticamente el tipo en base a lo que retorna el método `parse`? En realidad, aquí ocurre lo contrario. `parse` es una función genérica que puede retornar diferentes tipos dependiendo de lo que quieras que retorne, y el compilador de Rust infiere del hecho que se asignó un u32 que debería ejecutar la versión de `parse` que retorna un u32. De hecho, la anotación de tipo de `guess` cambia el tipo de `secret_number`. `secret_number` es un i32 (entero de 32 bits con signo) por defecto, ya que este es el tipo que Rust asigna de forma automática a los números, a menos que le des un motivo para no hacerlo. Sin embargo, dado que estamos ejecutando a `cmp` para comparar `secret_number` con `guess`, el motor de inferencia de tipos de Rust también convierte a `secret_number` en un u32, y de esta manera no comparas tipos incompatibles. ¡El motor de inferencia de tipos en Rust es mágico!

## Permitiendo intentos múltiples con bucles

La palabra clave `loop` crea un bucle infinito, y la palabra clave `break` se puede usar para salir de dicho bucle:

```rust
    loop {
        println!("Por favor ingresa tu número.");

        // --snip--

        match guess.cmp(&secret_number) {
            Ordering::Less => println!("¡Muy pequeño!"),
            Ordering::Greater => println!("¡Muy grande!"),
            Ordering::Equal => {
                println!("¡Ganaste!");
                break; // Línea que permite salir del bucle.
            }
        }
    }
```

## Manejo de información inválida

Si se ingresa un dato que no es un número al momento de pedir la información en el juego, tal como un "hola", el programa se bloquea. Esto sucede porque `parse` no puede procesar el número, lo que retorna un `Result` de tipo `Err`, y la ejecución de `expect` causará un panic. Puedes usar una declaración `match` parecida a la que se hizo con `cmp` para manejar el Result del `parse` de una manera más elegante:

```rust
        let guess: u32 = match guess.trim().parse() {
            Ok(num) => num,
            Err(_) => continue,
        };
```

En este caso se utiliza al `match` como una expresión en vez de una herramienta de control de flujo directa. Si el usuario ingresa un número válido, `parse` retornará un `Ok` el cual coincide con la primera rama del `match`. Esto causará que la expresión `match` se evalúe a `num` en su totalidad, el cual se asigna de vuelta a `guess`. Si la información es inválida, se ejecuta `continue` para reiniciar el bucle y volver a pedir el número.

El Err puede contener información, pero en éste caso se asigna la variable especial `_`, ya que el tipo de error para este caso es irrelevante.

Y con eso, aquí tienes el programa final:

```rust title="src/main.rs"
use rand::Rng;
use std::cmp::Ordering;
use std::io;

fn main() {
    println!("¡Adivina el número!");

    let secret_number = rand::thread_rng().gen_range(1..=100);

    loop {
        println!("Por favor ingresa tu número.");

        let mut guess = String::new();

        io::stdin()
            .read_line(&mut guess)
            .expect("No se pudo leer la información");

        let guess: u32 = match guess.trim().parse() {
            Ok(num) => num,
            Err(_) => continue,
        };

        println!("Ingresaste el número: {guess}");

        match guess.cmp(&secret_number) {
            Ordering::Less => println!("¡Muy pequeño!"),
            Ordering::Greater => println!("¡Muy grande!"),
            Ordering::Equal => {
                println!("¡Ganaste!");
                break;
            }
        }
    }
}
```

Ahora que tienes una idea básica de cómo se ve un programa en Rust, además de conocer algunos términos, podemos empezar a ver algunos elementos de [la sintaxis básica de Rust con más detalle][chap3].

[chap3]: ./ch03-common-programming-concepts.md "Capítulo 3: Conceptos comunes de programación"
[chap4]: ./ch04-ownership.md "Capítulo 4: Ownership, referencias y slices"
[chap6]: ./ch06-enums-and-pattern-matching.md "Capítulo 6: Enums y pattern matching"
[chap9]: ./ch09-error-handling.md "Capítulo 9: Manejo de errores"
[chap10]: ./ch10/ch10-01-generic-data-types.md "Capítulo 10: Tipos genéricos, traits y lifetimes"
[chap14]: ./ch14-more-about-cargo.md "Capítulo 14: Más sobre Cargo y Crates.io"
[chap18]: ./ch18-patterns-and-matching.md "Capítulo 18: Patterns y matching"
