# Product Catalog

Catálogo de productos desarrollado como prueba técnica con Next.js, TypeScript y Tailwind CSS. La aplicación consume [Fake Store API](https://fakestoreapi.com/) y permite consultar productos, buscarlos por nombre, filtrarlos por categoría y acceder a una vista de detalle mediante rutas dinámicas.

## Enlaces

- **Demo en Vercel:** [Demo en vivo](https://product-catalog-mu-seven.vercel.app/)
- **Diseño y guía de estilos en Figma:** [Prototipo en Figma](https://www.figma.com/design/XI0sh5J2BtFy3tYDXvCNmz/Prueba-Tecnica-FullStack?node-id=0-1&t=5sClZeAsg1dlmGvd-1)
- **API:** [Fake Store API](https://fakestoreapi.com/)

## Funcionalidades

- Listado completo de productos en cards.
- Respaldo local de productos ante indisponibilidad temporal de la API externa.
- Búsqueda local por nombre de producto.
- Filtro dinámico por categoría.
- Opción `All` para restablecer el filtro de categoría.
- Combinación simultánea de búsqueda y categoría.
- Navegación a la ruta dinámica `/producto/[id]`.
- Vista de detalle con imagen, categoría, título, precio, descripción y rating.
- Representación proporcional de ratings decimales mediante estrellas.
- Skeletons para los estados de carga del catálogo y del detalle.
- Estados personalizados de error, resultados vacíos y página no encontrada.
- Diseño mobile first adaptable a móvil, tablet y escritorio.
- Metadata general y metadata dinámica para cada producto.

## Tecnologías

| Tecnología                                                |   Versión | Uso principal                                                                   |
| --------------------------------------------------------- | --------: | ------------------------------------------------------------------------------- |
| [Next.js](https://nextjs.org/)                            |    16.3.3 | App Router, Server Components, rutas dinámicas, metadata e imágenes optimizadas |
| [React](https://react.dev/)                               |    19.2.8 | Componentes e interacción del catálogo                                          |
| [TypeScript](https://www.typescriptlang.org/)             |         5 | Tipado estricto e interfaces del dominio                                        |
| [Tailwind CSS](https://tailwindcss.com/)                  |         4 | Estilos y diseño responsivo mobile first                                        |
| [React Icons](https://react-icons.github.io/react-icons/) |     5.7.0 | Iconografía de la interfaz                                                      |
| [pnpm](https://pnpm.io/)                                  |    11.2.2 | Instalación y administración de dependencias                                    |
| ESLint + Prettier                                         | 9 / 3.9.6 | Calidad y formato consistente del código                                        |

## Decisiones técnicas

### App Router y componentes de servidor

Se utilizó App Router para organizar las páginas mediante convenciones de archivos como `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx` y `not-found.tsx`.

La obtención inicial de productos y del detalle se realiza desde Server Components. Esto evita solicitar los mismos datos mediante `useEffect` después de montar la interfaz y permite que Next.js entregue contenido desde el servidor.

### Tolerancia a fallos de la API

Fake Store API se mantiene como la fuente principal de datos y las peticiones iniciales se realizan desde Server Components. Sin embargo, el servicio presenta incidencias documentadas al recibir solicitudes provenientes de clientes externos e infraestructura cloud.

Para mantener disponible la demostración, se incorporó una copia local de los 20 productos en `src/data/fallback-products.json`. Los servicios utilizan estos datos únicamente cuando la API responde con los estados `401`, `403`, `408`, `429` o algún error `5xx`, o cuando ocurre un error recuperable de red o de procesamiento de la respuesta.

El fallback conserva la misma interfaz `Product`, por lo que las páginas y componentes no dependen del origen de los datos. Un `404` en la consulta individual no activa el respaldo: se retorna `null` para que Next.js muestre la página `not-found.tsx`. Los errores inesperados continúan propagándose al error boundary definido en `error.tsx`.

Esta estrategia permite conservar la integración con la API solicitada y, al mismo tiempo, evita que una dependencia externa inestable deje inutilizable la aplicación desplegada.

Referencia: [incidencia de acceso desde clientes externos en Fake Store API](https://github.com/keikaavousi/fake-store-api/issues/165).

### Límite entre servidor y cliente

`ProductCatalog` es el límite cliente porque conserva el estado de la búsqueda y de la categoría seleccionada. Los productos se obtienen en `page.tsx` desde el servidor y se entregan al catálogo mediante props serializables.

La lista filtrada no se guarda como un estado adicional: se calcula a partir de los productos, el texto de búsqueda y la categoría activa. De esta forma se evita duplicar información y mantener estados que podrían desincronizarse.

### Tipado

El producto se modela mediante una interfaz de TypeScript, según lo solicitado en la prueba. Los componentes reciben únicamente la información que necesitan; por ejemplo, `ProductCard` deriva sus propiedades desde `Product`, mientras que `ProductDetail` recibe el producto completo.

### Categorías dinámicas

Las categorías se construyen a partir de los productos recibidos. Se utiliza `Set` para eliminar valores repetidos y se agrega `All` como única opción fija. Esto evita mantener manualmente una lista que podría dejar de coincidir con la API.

### Navegación y rutas dinámicas

Cada card utiliza `next/link` y dirige a `/producto/[id]`. La página dinámica valida que el identificador sea un entero positivo y utiliza `notFound()` cuando el producto no existe. Los errores recuperables de la API activan el respaldo local, mientras que los errores inesperados se propagan al error boundary de Next.js.

### Imágenes

Se utiliza `next/image` con `remotePatterns` para autorizar las imágenes de Fake Store API. Las cards y el detalle emplean `object-contain` para mostrar el producto completo sin recortarlo y `sizes` para solicitar una imagen adecuada al espacio disponible.

### Estados de carga y experiencia de usuario

Los archivos `loading.tsx` muestran skeletons con las mismas proporciones que el contenido final. Esto comunica que la solicitud continúa en progreso y reduce los cambios bruscos de layout cuando llegan los datos.

También se incorporaron estilos de foco, etiquetas semánticas, estados mediante `aria-pressed`, mensajes accesibles con `sr-only` y soporte para la preferencia `prefers-reduced-motion`.

### Diseño y estilos

Tailwind CSS se configuró con tokens semánticos para reutilizar la paleta en todos los componentes:

- Background: `#F8FAFC`
- Primary: `#2563EB`
- Secondary: `#0F766E`
- Accent: `#F59E0B`
- Foreground: `#0F172A`
- Text on dark backgrounds: `#F8FAFC`

Las fuentes se cargan mediante `next/font`: Poppins se utiliza para encabezados e Inter para el texto general.

### Elección de pnpm

pnpm fue utilizado como gestor principal por su instalación eficiente, su almacén direccionado por contenido, el aislamiento más estricto de dependencias y la reproducibilidad proporcionada por `pnpm-lock.yaml`.

La decisión también considera los incidentes recientes de cadena de suministro en el ecosistema npm. En 2025, GitHub documentó el ataque Shai-Hulud, que comprometió cuentas de mantenedores e introdujo scripts maliciosos de postinstalación en paquetes publicados. Como respuesta, se retiraron más de 500 paquetes comprometidos del registro. pnpm 11 incorpora protecciones predeterminadas adicionales, entre ellas retrasar la instalación de versiones recién publicadas mediante `minimumReleaseAge` y restringir determinadas dependencias o scripts de construcción.

Estas medidas reducen parte de la superficie de riesgo, pero pnpm continúa consumiendo paquetes del registro npm y no elimina por sí mismo los ataques de cadena de suministro. Por ello se conserva y revisa el lockfile, se evitan dependencias innecesarias y se recomienda ejecutar auditorías periódicas.

Referencias:

- [Plan de GitHub para una cadena de suministro npm más segura](https://github.blog/security/supply-chain-security/our-plan-for-a-more-secure-npm-supply-chain/)
- [Protección de la cadena de suministro con pnpm](https://pnpm.io/supply-chain-security)
- [Cambios de seguridad en pnpm 11](https://pnpm.io/blog/releases/11.0)

## Estructura del proyecto

```text
src/
├── app/
│   ├── producto/
│   │   └── [id]/
│   │       ├── loading.tsx
│   │       └── page.tsx
│   ├── error.tsx
│   ├── favicon.ico
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── not-found.tsx
│   └── page.tsx
├── components/
│   ├── layout/
│   │   └── Header.tsx
│   ├── product/
│   │   ├── ProductCard.tsx
│   │   ├── ProductCardSkeleton.tsx
│   │   ├── ProductCatalog.tsx
│   │   ├── ProductDetail.tsx
│   │   ├── ProductDetailSkeleton.tsx
│   │   └── ProductFilters.tsx
│   └── ui/
│       └── RatingStars/
│           └── RatingStars.tsx
├── data/
│   └── fallback-products.json
├── lib/
│   └── api/
│       └── products.ts
├── lib/
│   └── api/
│       └── products.ts
├── styles/
│   └── globals.css
├── types/
│   └── product.ts
└── utils/
    └── formatCurrency.ts
```

## Rutas

| Ruta             | Descripción                     |
| ---------------- | ------------------------------- |
| `/`              | Catálogo, búsqueda y filtros    |
| `/producto/[id]` | Detalle dinámico de un producto |

## Requisitos previos

- Node.js 22 o superior para utilizar el flujo recomendado con pnpm 11.2.2. Next.js 16 requiere como mínimo Node.js 20.9.
- pnpm 11.2.2 recomendado.
- Git.

No se necesitan variables de entorno para ejecutar el proyecto.

## Instalación

Clona el repositorio y entra en su directorio:

```bash
git clone https://github.com/Calderon2307/Prueba_Tecnica-Fullstack.git
cd Prueba_Tecnica-Fullstack
```

### pnpm — recomendado

El proyecto fue desarrollado y bloqueado con pnpm 11.2.2:

```bash
pnpm install --frozen-lockfile
```

### npm — alternativa compatible

Para cumplir con las instrucciones de ejecución de la prueba, los scripts también pueden utilizarse con npm:

```bash
npm install
```

> Utiliza un solo gestor de paquetes por copia local. El repositorio mantiene `pnpm-lock.yaml` como lockfile oficial; no se debe versionar un `package-lock.json` generado localmente ni alternar entre npm y pnpm en la misma instalación.

## Ejecución en desarrollo

Con pnpm:

```bash
pnpm dev
```

Con npm:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador.

## Build de producción

```bash
pnpm build
pnpm start
```

Con npm:

```bash
npm run build
npm run start
```

## Comandos disponibles

| Comando             | Descripción                                 |
| ------------------- | ------------------------------------------- |
| `pnpm dev`          | Inicia el servidor de desarrollo            |
| `pnpm build`        | Genera el build optimizado de producción    |
| `pnpm start`        | Ejecuta el build de producción              |
| `pnpm lint`         | Ejecuta ESLint                              |
| `pnpm typecheck`    | Comprueba los tipos sin generar archivos    |
| `pnpm format`       | Formatea el proyecto con Prettier           |
| `pnpm format:check` | Comprueba el formato sin modificar archivos |

Antes de entregar o desplegar el proyecto se recomienda ejecutar:

```bash
pnpm typecheck
pnpm lint
pnpm format:check
pnpm build
```

## Estado

Proyecto desarrollado como prueba técnica. La aplicación cubre los requerimientos funcionales, de tipado, carga de datos, navegación y diseño responsivo solicitados.
