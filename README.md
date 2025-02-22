# Prueba técnica

## Contexto y requerimientos:

Estamos desarrollando software para academias. Para estas la gestión de usuarios es primordial.
Las listas de usuarios son grandes y contienen muchísimos datos sobre el usuario,
por lo que deben ser muy performantes. En la prueba técnica deberás implementar la interfaz proporcionada y
usar los datos del JSON como base de datos, este JSON esta situado en la raíz del repositorio (DB.json)

Proporcionamos en este repositorio un boilerplate con un stack similar al utilizado en Ucademy, NestJS para el backend y React para
el frontend.

`git clone git@github.com:UcademyTech/tech-assessment.git`

`npm install`

`npm run start:backend`

`npm run start:fronted`

## Enlaces:

[Interfaz de usuario](https://www.figma.com/file/r1zwsMJU7IAsBJVuFLZHPK/Technical-Assessment?type=design&node-id=0%3A1&mode=design&t=tubwoMUyG8Lc4z9F-1)

- El uso de Styled components será valorado positivamente.

PD: El objetivo de la prueba es simplemente valorar las desiciones que toma el candidato a la hora de realizar la implementación. Hay muchas soluciones válidas a lo que aquí se plantea.

## Entrega:

Una vez finalizada la prueba se deberá entregar en un archivo comprimido (zip, tar.gz, etc) con el nombre del candidato.

## Solución

### Frontend

1) Haciendo la prueba renderizando 5000 elementos de la lista, es casi instantáneo, pero a medida que se aumenta el número de usuarios a renderizar, el "lag" va aumentando. Como Ucademy está en pleno crecimiento, esa cifra va a aumentar.

Se ha hecho una prueba con 50000 usuarios y la página tarda casi 4 segundos, por tanto hay que optimizar a nivel de cliente.

Tras investigar, he descubierto la técnica de renderización virtualizada, que consiste básicamente en renderizar los elementos visibles en el viewport, aquí una explicación mas detallada:

https://www.patterns.dev/vanilla/virtual-lists#:~:text=Rather%20than%20rendering%201000s%20of%20elements%20from%20a,list%20rendering%20fast%20on%20mid%20to%20low-end%20devices.

como en Ucademy se prioriza la entrega de valor a la absoluta perfección, decido que usaré una librería externa donde delegar la virtualización de la lista. Tras investigar alguna de populares como son react-virtualized, react-window y virtuoso, opto por usar esta última ya que tiene la comunidad mas activa y me mola mas la dev experience.

2) Ya no tenemos problemas de performance en el cliente, pero no es muy usual cargar 5000 usuarios del tirón, para ello se va implementar la paginación de la lista de usuarios y que nuestra api se encargue de servirlos, además de usar un loader de mientras se están cargando los datos.

3) Se va a usar styledComponents para dejar fina la UI

### Backend

1) El principal problema de performance es que hay que cargar en memoria muchos elementos, leyendo de un archivo muy grande, vamos a ver lo que nos ofrece node js para poder mitigar impactos negativos sobre nuestra RAM.



