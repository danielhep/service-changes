/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AggregatedStopPairTrips = {
  __typename?: 'AggregatedStopPairTrips';
  firstStop: Stop;
  frequencyRegularityScore?: Maybe<Scalars['Float']['output']>;
  geoJson: Scalars['String']['output'];
  headwayCoefficientOfVariation?: Maybe<Scalars['Float']['output']>;
  headwayStandardDeviationMinutes?: Maybe<Scalars['Float']['output']>;
  maxHeadwayMinutes?: Maybe<Scalars['Float']['output']>;
  /**  Frequency analysis statistics */
  meanHeadwayMinutes?: Maybe<Scalars['Float']['output']>;
  minHeadwayMinutes?: Maybe<Scalars['Float']['output']>;
  routes: Array<Route>;
  secondStop: Stop;
  stopTripPairs: Array<StopPairTrip>;
  totalTripCount: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  aggregatedStopPairTrips: Array<AggregatedStopPairTrips>;
  allRoutes: Array<Route>;
  allStops: Array<Stop>;
  routeById?: Maybe<Route>;
  stopById?: Maybe<Stop>;
  stopPairTrips: Array<StopPairTrip>;
  stopPairTripsWithShapes: Array<StopPairTrip>;
  stopsNearLocation: Array<Stop>;
  tripsForDate: Array<Trip>;
  validServiceIdsForDate: Array<Scalars['String']['output']>;
};


export type QueryAggregatedStopPairTripsArgs = {
  date: Scalars['String']['input'];
  endTime: Scalars['String']['input'];
  startTime: Scalars['String']['input'];
};


export type QueryRouteByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryStopByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryStopPairTripsArgs = {
  date: Scalars['String']['input'];
  endTime: Scalars['String']['input'];
  startTime: Scalars['String']['input'];
};


export type QueryStopPairTripsWithShapesArgs = {
  date: Scalars['String']['input'];
  endTime: Scalars['String']['input'];
  startTime: Scalars['String']['input'];
};


export type QueryStopsNearLocationArgs = {
  lat: Scalars['Float']['input'];
  lon: Scalars['Float']['input'];
  radiusKm?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryTripsForDateArgs = {
  date: Scalars['String']['input'];
};


export type QueryValidServiceIdsForDateArgs = {
  date: Scalars['String']['input'];
};

export type Route = {
  __typename?: 'Route';
  agencyId: Scalars['String']['output'];
  color?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  longName?: Maybe<Scalars['String']['output']>;
  shortName?: Maybe<Scalars['String']['output']>;
  textColor?: Maybe<Scalars['String']['output']>;
  type: Scalars['Int']['output'];
  url?: Maybe<Scalars['String']['output']>;
};

export type ShapePoint = {
  __typename?: 'ShapePoint';
  distTraveled?: Maybe<Scalars['Float']['output']>;
  lat: Scalars['Float']['output'];
  lon: Scalars['Float']['output'];
  sequence: Scalars['Int']['output'];
  shapeId?: Maybe<Scalars['String']['output']>;
};

export type Stop = {
  __typename?: 'Stop';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  lat?: Maybe<Scalars['Float']['output']>;
  locationType?: Maybe<Scalars['Int']['output']>;
  lon?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  parentStation?: Maybe<Scalars['String']['output']>;
  timezone?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  wheelchairBoarding?: Maybe<Scalars['Int']['output']>;
  zoneId?: Maybe<Scalars['String']['output']>;
};

export type StopPairTrip = {
  __typename?: 'StopPairTrip';
  firstStop: Stop;
  geoJson: Scalars['String']['output'];
  secondStop: Stop;
  shapePoints: Array<ShapePoint>;
  trip: Trip;
};

export type Trip = {
  __typename?: 'Trip';
  bikesAllowed?: Maybe<Scalars['Int']['output']>;
  blockId?: Maybe<Scalars['String']['output']>;
  directionId?: Maybe<Scalars['Int']['output']>;
  headsign?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  routeId?: Maybe<Scalars['String']['output']>;
  serviceId?: Maybe<Scalars['String']['output']>;
  shapeId?: Maybe<Scalars['String']['output']>;
  shortName?: Maybe<Scalars['String']['output']>;
  wheelchairAccessible?: Maybe<Scalars['Int']['output']>;
};
