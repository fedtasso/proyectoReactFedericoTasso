# 🛒 E-commerce React – Talento Tech

Este proyecto consiste en la implementación de un e-commerce del lado del frontend utilizando **React** como framework principal. Fue desarrollado como parte del curso de React en **Talento Tech**.

---

## Deploy
    https://fedtasso-ecommerce.netlify.app/

## Objetivos

- Implementar un e-commerce utilizando React.
- Enfocar el desarrollo en el **flujo de datos** y la **arquitectura del proyecto**, más que en el diseño visual.
- Aplicar los conceptos trabajados en el curso de Talento Tech:
  - Props
  - Componentes reutilizables
  - Context API
  - Rutas protegidas con React Router
  - Hooks personalizados

---

## Arquitectura del Proyecto

El proyecto fue estructurado pensando en la **escalabilidad** y **mantenibilidad**, como si se tratara de un proyecto mediano.

Estructura general:
/components → Componentes reutilizables
/context → Contextos globales (Auth, Cart)
/hooks → Hooks personalizados
/pages → Páginas principales de la app
/services → Para lógica externa
/config → Configuraciones globales

- Se utilizó **Mokapi** como mock server para la persistencia de datos y pruebas de integración.

---

## Diseño

- Estilo visual **minimalista** basado en componentes de **Bootstrap**.
- Foco en la experiencia funcional antes que en el diseño gráfico.

---

## Funcionalidades

- CRUD de usuarios (alta, edición, eliminación, login)
- CRUD de productos (admin)
- Carrito de compras con persistencia
- Filtro de productos

---

##  Instalación

1. Clonar el repositorio:
   
    git clone https://github.com/fedtasso/proyectoReactFedericoTasso/tree/main

2. Instalar dependencias:

    npm install

3. Ejecutar la app:

    npm run dev



##  Tecnologías utilizadas
- React
- React Router
- Context API
- Bootstrap
- Mokapi
- react-toastify

