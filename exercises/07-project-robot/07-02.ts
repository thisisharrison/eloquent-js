import { VillageState } from "./07-village";
import { findRoute, Robot } from "./07-robot";

// TODO: review
export default function moreEfficientRobot(state: VillageState, route: string[]) {
    let { robotPosition, parcels, graph } = state;
    if (route.length === 0) {
        let routes = parcels.map(({ place, address }) => {
            if (place !== robotPosition) {
                return {
                    // find route to pick up this parcel
                    route: findRoute(robotPosition, place),
                    pickUp: true,
                };
            } else {
                return {
                    // find route to deliver this parcel
                    route: findRoute(place, address),
                    pickUp: false,
                };
            }
        });

        // This determines the precedence a route gets when choosing.
        // Route length counts negatively, routes that pick up a package
        // get a small bonus.
        // @ts-ignore
        function score({ route, pickUp }: { route: string[]; pickUp: boolean }) {
            return (pickUp ? 0.5 : 0) - route.length;
        }

        // @ts-ignore
        route = routes.reduce((prev, cur) => (score(prev) > score(cur) ? prev : cur)).route;
    }

    return { direction: route[0], memory: route.slice(1) };
}
