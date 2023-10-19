import { RouteMap } from "@/utils/types";

export default function useRouteMap(path: string, routeMap: RouteMap[]) {
  const arrRoute = path.split("/").filter((element) => element);

  let mappedRoutes: RouteMap[] = [];
  arrRoute.map((el) => {
    const e = routeMap.find((e) => e.route == el);
    if (e) {
      mappedRoutes.push(e);
    }
  });

  return mappedRoutes;
}
