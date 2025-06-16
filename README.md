# Stats Explorer Hundred

Stats Explorer Hundred is a React + TypeScript single‑page application created with Vite. It presents one hundred statistics and data‑science concepts. Each concept page contains a short explanation along with an interactive simulation built using Recharts and shadcn‑ui components.

## Getting Started

1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the development server:
   ```sh
   npm run dev
   ```
   The site will be available at `http://localhost:5173` by default.
3. Run the test suite:
   ```sh
   npm test
   ```

To create a production build run `npm run build` and serve the contents of the `dist` directory with any static file server.

## Repository Structure

- `src/data/statistical-concepts.ts` – metadata describing each concept
- `src/components` – React components that implement the interactive simulations
- `src/pages` – application pages such as the concept list and individual concept view
- `src/components/ConceptSimulationWrapper.tsx` – maps concept IDs to their simulation components

## Known Issues

- **Support Vector Machines (SVM)** – the concept entry uses the ID `support-vector-machines` while the component mapping expected `support-vector-machine`. This mismatch prevented the simulation from loading. The mapping has been fixed, but the simulation may still require further tuning.
- **Overfitting & Underfitting** – this simulation occasionally renders without any data points. Click **New Data Sample** to regenerate the dataset if this occurs.

## Original Project URL

This project was bootstrapped using [Lovable](https://lovable.dev/projects/a7d8effa-e17c-4d8c-869c-0eed85657545) and can also be edited there.
