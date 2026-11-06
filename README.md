E-commerce full-stack serverless en AWS

Tienda online para un negocio que vende **al por menor y al por mayor**. Cada producto puede venderse por unidad, por caja o con precio por mayor a partir de cierta cantidad de unidades. Incluye catálogo público, carrito, checkout en 4 pasos, historial de pedidos y panel de administración.

> Este repositorio es el **frontend**. El proyecto completo se compone de tres repositorios:

| Repositorio | Contenido |
|---|---|
| [santa-maria-ecommerce](https://github.com/javierPerez900/santa-maria-ecommerce) (este) | Frontend en Next.js |
| [santaMaria](https://github.com/javierPerez900/santaMaria) | API REST en Go (Lambda + API Gateway) |
| [santaMariaUser](https://github.com/javierPerez900/santaMariaUser) | Lambda en Go que guarda en la base de datos a cada usuario que confirma su cuenta en Cognito |

**Demo:** [URL de Netlify]

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
