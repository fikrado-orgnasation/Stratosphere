import { Suspense, lazy } from 'react';

const FlightCanvas = lazy(() => import('./FlightCanvas'));

export default function FlightCanvasLazy() {
  return (
    <Suspense fallback={null}>
      <FlightCanvas />
    </Suspense>
  );
}
