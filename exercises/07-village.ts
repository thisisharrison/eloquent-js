// Project task: Robot to deliver parcels
// Village's State: Robot's location, Parcels' location
// Don't change state when robot is moving

// There are parcels in various places, each addressed to some other place.
// The robot picks up parcels when it comes to them
// and delivers them when it arrives at their destinations

import { buildGraph, ROADS } from "./07-graph";
import { randomPick } from "./07-robot";
import type { Graph, Place } from "./07-graph";

export interface Parcel {
    place: string;
    address: string;
}

export class VillageState {
    robotPosition: string;
    parcels: Parcel[];
    graph: Graph;

    static initializeVillage(parcelCount = 5) {
        let parcels: Parcel[] = [];
        for (let i = 0; i < parcelCount; i++) {
            let graph = buildGraph(ROADS);
            let address = randomPick(Object.keys(graph));
            // create fake parcels
            let place = address;
            while (place === address) {
                place = randomPick(Object.keys(graph));
            }
            parcels.push({ place, address });
        }
        return new VillageState("Post Office", parcels);
    }

    constructor(robotPosition: string, parcels: Parcel[] | []) {
        this.robotPosition = robotPosition;
        this.parcels = parcels;
        this.graph = buildGraph(ROADS);
    }

    move(position: string) {
        if (!this.isValidMove(position)) {
            // return old state
            return this;
        } else {
            this.pickUpNewParcels(position);
            this.deliverParcel(position);
            // move robot to new position
            return new VillageState(position, this.parcels);
        }
    }

    // Check if destination is in the map
    isValidMove(position: string) {
        return position in this.graph;
    }

    // parcels that the robot is carrying
    // (that are at the robot’s current place)
    // need to be moved along to the new place
    pickUpNewParcels(position: string) {
        this.parcels = this.parcels.map((p) => {
            // if robot is not carrying the parcel already, return p
            if (p.place !== this.robotPosition) return p;
            // add new parcel by updating the place to robot's position
            return { place: position, address: p.address };
        });
    }

    // parcels that are addressed to the new place
    // need to be delivered,
    // removed from the set of undelivered parcels
    deliverParcel(position: string) {
        this.parcels = this.parcels.filter((p) => p.address !== position);
    }

    get jobFinished() {
        return this.parcels.length === 0;
    }
}
