import { RouterProvider, createRouter, createRootRoute, createRoute, Outlet } from '@tanstack/react-router';
import LabLayout from './components/LabLayout';
import Landing from './pages/Landing';
import ReactionLibrary from './pages/ReactionLibrary';
import ExperimentSimulator from './pages/ExperimentSimulator';

const rootRoute = createRootRoute({
  component: () => (
    <LabLayout>
      <Outlet />
    </LabLayout>
  ),
});

const landingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Landing,
});

const libraryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/library',
  component: ReactionLibrary,
});

const simulatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/simulator',
  component: ExperimentSimulator,
});

const routeTree = rootRoute.addChildren([landingRoute, libraryRoute, simulatorRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
