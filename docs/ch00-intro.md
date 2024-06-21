---
sidebar_position: 1
slug: /
title: Introducción
hide_title: true
---

<div align="center">
    <h1>Introducción</h1>
    <p>v0.3.0 - Borrador</p>
    <p>Autor: Jason Walton</p>
    <p>Basado en <a href="https://doc.rust-lang.org/stable/book/">"The Rust Programming Language"</a>, de Steve Klabnik y Carol Nichols.</p>
</div>

Puedes encontrar una versión PDF de este libro en inglés [aquí](https://github.com/jwalton/rust-book-abridged/releases/latest/download/rust-book-abridged.pdf).

## ¿De qué se trata este libro?

Esta es una versión reducida, o más bien compacta, de ["The Rust Programming Language"](https://doc.rust-lang.org/stable/book/title-page.html) ([Versión en Español](https://book.rustlang-es.org/)), también conocido como "el libro de Rust". Como tal, este no es un trabajo original. Todos los títulos de los capítulos y los ejemplos de este libro fueron tomados directamente del libro original. Sin embargo, lo demás se ha reescrito desde cero, dejando de lado cualquier información que no sea sobre el aprendizaje de Rust. A pesar que este libro es la mitad de extenso en comparación al libro fuente, no considero que falte nada que un desarrollador experimentado ya sepa de antemano.

El libro de Rust es un gran recurso para aprender el lenguaje, en especial si eres nuevo en la programación. Si ese es tu caso, es muy recomendable que dejes este libro en pausa y te dirijas al libro original. Ahora bien, el libro de Rust es un poco locuaz. Si ya tienes experiencia con uno o varios lenguajes de programación, es probable que ya estés familiarizado con varios de los conceptos que se abordan en el libro, lo que te permite sacar mucho más provecho de esta versión acortada. Si ya estás familiarizado con conceptos como el stack y el heap, el desarrollo basado en tests ("test driven development" en inglés) o el [principio DRY](https://es.wikipedia.org/wiki/No_te_repitas), entonces este libro es una buena opción para ti.

Lo anterior no se debe tomar como una crítica al libro de Rust. Es un recurso excelente, y está muy bien escrito, motivos por los cuales es bastante recomendado. El punto que quiero abordar no es el libro original en sí; sino la sinergia en términos del publico objetivo.

## ¿En qué se diferencia este libro?

Como se mencionó anteriormente, los títulos de los capítulos son iguales a los del libro original, y en muchos casos las secciones de cada capítulo son las mismas. En la mayoría de los casos, los ejemplos han sido copiados directamente del libro original. Se espera que, al mantener la estructura y los ejemplos originales, se facilite la transición entre el libro original y esta versión en momentos de confusión o cuando se aborden conceptos con los que todavía no estés familiarizado.

En la mayoría de los casos donde el libro original construya un ejemplo de código por partes, esta versión presentará el código completo para facilitar su lectura, a la vez que se señalarán algunas partes interesantes. En la medida de lo posible, he incluido material que considero que un lector avanzado hallará interesante. En algunas partes, esta versión aborda una explicación diferente a la del libro original. ¡Incluso se ha incluido un capítulo extra sobre programación asíncrona!

Tengo bastante experiencia en TypeScript, Java, C/C++, Go y otros lenguajes. La elaboración de este libro, la lectura y simplificación del libro original, y la investigación de las partes confusas tomaron alrededor de dos semanas, por lo que espero que esta información sea util para ustedes. Dado que soy nuevo en Rust, si encuentras alguna parte que no tenga sentido, no dudes en hacérmelo saber a traves de un [issue de GitHub](https://github.com/jwalton/rust-book-abridged) (También válido a traves de un [issue de GitHub](https://github.com/jalejotorresm/rust_book_es) del repositorio de esta traducción).

Este libro fue escrito en su totalidad por un humano. No se generó ningún contenido a traves de inteligencia artificial.

Si este contenido es de tu agrado, considera [darle una estrella en GitHub](https://github.com/jwalton/rust-book-abridged).

## Tabla de Contenidos

- [Capítulo 1: Empezando][chap1]
- [Capítulo 2: Juego de adivinanzas][chap2]
- [Capítulo 3: Conceptos comunes de programación][chap3]
- [Capítulo 4: Ownership, referencias y slices][chap4]
- [Capítulo 5: Usando structs para estructurar datos relacionados][chap5]
- [Capítulo 6: Enums y pattern matching][chap6]
- [Capítulo 7: Administrando proyectos en crecimiento con paquetes, crates y módulos][chap7]
- [Capítulo 8: Colecciones comunes][chap8]
- [Capítulo 9: Manejo de errores][chap9]
- [Capítulo 10: Tipos genéricos, traits y lifetimes][chap10]
- [Capítulo 11: Escribiendo tests automatizados][chap11]
- [Capítulo 12: Un proyecto de I/O: Construyendo un programa de línea de comandos][chap12]
- [Capítulo 13: Características de lenguajes funcionales: Iteradores y closures][chap13]
- [Capítulo 14: Más sobre Cargo y Crates.io][chap14]
- [Capítulo 15: Smart Pointers][chap15]
- [Capítulo 16: Concurrencia sin miedo][chap16]
- [Capítulo 17: Rust como un lenguaje de programación orientado a objetos][chap17]
- [Capítulo 18: Patterns y matching][chap18]
- [Capítulo 19: Características avanzadas][chap19]
- [Capítulo 20: Servidor web multithread][chap20]
- [Capítulo 21: Capítulo extra: Programación asíncrona][chap21]

[chap1]: ./ch01-getting-started.md "Capítulo 1: Empezando"
[chap2]: ./ch02-guessing-game.md "Capítulo 2: Juego de adivinanzas"
[chap3]: ./ch03-common-programming-concepts.md "Capítulo 3: Conceptos comunes de programación"
[chap4]: ./ch04-ownership.md "Capítulo 4: Ownership, referencias y slices"
[chap5]: ./ch05-structs.md "Capítulo 5: Usando structs para estructurar datos relacionados"
[chap6]: ./ch06-enums-and-pattern-matching.md "Capítulo 6: Enums y pattern matching"
[chap7]: ./ch07-packages-crates-modules.md "Capítulo 7: Administrando proyectos en crecimiento con paquetes, crates y módulos"
[chap8]: ./ch08-common-collections.md "Capítulo 8: Colecciones comunes"
[chap9]: ./ch09-error-handling.md "Capítulo 9: Manejo de errores"
[chap10]: ./ch10/ch10-01-generic-data-types.md "Capítulo 10: Tipos genéricos, traits y lifetimes"
[chap11]: ./ch11-automated-tests.md "Capítulo 11: Escribiendo tests automatizados"
[chap12]: ./ch12-io-project-cli.md "Capítulo 12: Un proyecto de I/O: Construyendo un programa de línea de comandos"
[chap13]: ./ch13-functional-language-features.md "Capítulo 13: Características de lenguajes funcionales: Iteradores y closures"
[chap14]: ./ch14-more-about-cargo.md "Capítulo 14: Más sobre Cargo y Crates.io"
[chap15]: ./ch15-smart-pointers.md "Capítulo 15: Smart Pointers"
[chap16]: ./ch16-fearless-concurrency.md "Capítulo 16: Concurrencia sin miedo"
[chap17]: ./ch17-object-oriented-features.md "Capítulo 17: Rust como un lenguaje de programación orientado a objetos"
[chap18]: ./ch18-patterns-and-matching.md "Capítulo 18: Patterns y matching"
[chap19]: ./ch19/ch19-01-unsafe.md "Capítulo 19: Características avanzadas"
[chap20]: ./ch20/ch20-01-single-threaded-web-server.md "Capítulo 20: Servidor web multithread"
[chap21]: ./ch21-async.md "Capítulo 21: Capítulo extra: Programación asíncrona"

(Esta versión del libro se basa en el [commit c06006](https://github.com/rust-lang/book/commit/c06006157b14b3d47b5c716fc392b77f3b2e21ce) del libro original).
