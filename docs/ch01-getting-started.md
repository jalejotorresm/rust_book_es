# 1 - Empezando

En este capítulo vamos a instalar Rust, y entenderemos cómo usar ̣`cargo` para crear y construir un proyecto nuevo.

## 1.1 - Instalación

Para Linux o MacOS:

```sh
curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
xcode-select --install
```

Puedes usar `rustup` en Windows, pero debes verificar [la documentación oficial](https://forge.rust-lang.org/infra/other-installation-methods.html) para el ver el proceso a detalle de instalación.

Usa `rustc --version` para verificar si Rust se instaló, y `rustup update` para actualizar el lenguaje.

## 1.2 - Hola Mundo!

La tradición indica que no podemos aprender un nuevo lenguaje de programación sin empezar con un programa que muestre el mensaje "Hola Mundo!". Empecemos por crear un archivo llamado "main.rs":

```rust title="main.rs"
fn main(){
    println!("Hola Mundo!");
}
```

El indentado en Rust se hace con 4 espacios, no con tabulaciones, y las declaraciones terminan con un punto y coma (;). En este codigo estamos invocando la macro `println!`, lo cual sabemos porque termina con un signo de exclamación (!). Puedes ejecutar el codigo de la siguiente manera:

```sh
$ rustc main.rs
$ ./main
Hola Mundo!
```

`rustc` compila el código fuente a un archivo ejecutable llamado `main`, el cual después se ejecuta con `./main`.

## 1.3 - Hola Cargo!

Cargo es el sistema de construcción y el manejador de paquetes de Rust. Es similar a `npm` en JavaScript, o al comando `go` en Go.

### Creando un Proyecto con Cargo

```sh
$ cargo new hola_cargo
$ cd hola_cargo
```

El código de arriba crea un archivo Cargo.toml y un archivo src/main.rs dentro de una nueva carpeta, al tiempo que inicializa la nueva carpeta como un repositorio de git. _Cargo.toml_ es un archivo [toml](https://toml.io/en/) (el cual se parece mucho a un archivo .ini antiguo de Windows). La sección `[package]` del _Cargo.toml_ describe la metadata del paquete actual, y la sección `[dependencies]` enlista las librerías (también conocidas como _crates_) con las que trabaja el proyecto.

Podemos construir y ejecutar el proyecto de la siguiente manera:

```sh
$ cargo build
$ ./target/debug/hola_cargo
```

O también de la siguiente manera, el cual equivale al código de arriba:

```sh
$ cargo run
```

Ten presente que `cargo build` crea un archivo _Cargo.lock_. Este es un archivo de bloqueo de dependencias, lo cual significa que, si compartes este proyecto con un amigo, y se ejecuta el comando `cargo build`, tu amigo obtendrá las mismas dependencias que tú. Se recomienda que incluyas este archivo en los commits de la herramienta de versionado de código que manejes.

Puedes verificar si un proyecto compila, sin producir un archivo ejecutable, con `cargo check`, el cual es mucho más rápido que `cargo build`. Puedes crear una "versión de lanzamiento" de tu código con `cargo build --release`, el cual generará un archivo ejecutable en target/release en vez de target/debug. La versión de lanzamiento no tendrá algunos símbolos ni chequeos de seguridad en tiempo de ejecución, y estará más optimizado.

Continúa al [capítulo 2][chap2].

[chap2]: ./ch02-guessing-game.md "Capítulo 2: Juego de Adivinanzas"
