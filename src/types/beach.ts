
export interface BeachLocation {
  latitude: number;
  longitude: number;
}

export interface Beach {
  beach_name: string;
  city: string;
  Shadow: "Full" | "Partial" | "None";
  accessibility_parking: boolean;
  Access_road_to_beach: boolean;
  Distance_parking_to_beach: number;
  beach_accessible_chairs: number;
  israel_region: "North" | "Center" | "South";
  wheelchair_accessible: boolean;
  location: BeachLocation;
}
