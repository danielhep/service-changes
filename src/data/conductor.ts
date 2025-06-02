"use client";
import { graphql } from "../gql/gql";
import { useQuery } from '@tanstack/react-query'
import request from 'graphql-request'

const stopsQuery = graphql(`
  query Stops {
    allStops {
      id
      name
      lat
      lon
    }
  }
`);

const useStops = () => {
  const { data } = useQuery({
    queryKey: ['stops'],
    queryFn: async () =>
      request(
        'http://localhost:8080/graphql',
        stopsQuery,
      ),
  });

  return data?.allStops;
};

export { useStops };