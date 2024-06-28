'use client';
import { useParams } from "next/navigation";
import { useQuery, useQueries } from "@tanstack/react-query";
import { getCharacter, getFilm, getImageById, getPlanet, getSpecies, getStarship, getVehicle } from "@/app/api/swapi";
import {
  Box,
  Text,
  Heading,
  VStack,
  HStack,
  List,
  ListItem,
  Flex,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Suspense } from "react";
import AddToFavorite from "@/components/AddToFavorite";
import Loader from "@/components/Loader";

const MotionBox = motion(Box);
const MotionListItem = motion(ListItem);

export default function Page() {
  const { id } = useParams();

  const { data, error, isLoading } = useQuery({
    queryKey: ["character", id],
    queryFn: () => getCharacter(id),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 60 * 24,
    keepPreviousData: true,
  });

  function getIdFromUrl(url) {
    if (url) {
      return url.match(/(\d+)/)[0];
    }
  }

  const homeworld = useQueries({
    queries: data?.homeworld ? [{
      queryKey: ["planet", getIdFromUrl(data.homeworld)],
      queryFn: () => getPlanet(getIdFromUrl(data.homeworld)),
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 60 * 24,
    }] : [],
  });

  const films = useQueries({
    queries: data?.films?.length > 0 ? data.films.map(film => ({
      queryKey: ["film", getIdFromUrl(film)],
      queryFn: () => getFilm(getIdFromUrl(film)),
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 60 * 24,
    })) : [],
  });

  const starships = useQueries({
    queries: data?.starships?.length > 0 ? data.starships.map(starship => ({
      queryKey: ["starship", getIdFromUrl(starship)],
      queryFn: () => getStarship(getIdFromUrl(starship)),
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 60 * 24,
    })) : [],
  });

  const vehicles = useQueries({
    queries: data?.vehicles?.length > 0 ? data.vehicles.map(vehicle => ({
      queryKey: ["vehicle", getIdFromUrl(vehicle)],
      queryFn: () => getVehicle(getIdFromUrl(vehicle)),
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 60 * 24,
    })) : [],
  });

  const species = useQueries({
    queries: data?.species?.length > 0 ? data.species.map(specie => ({
      queryKey: ["specie", getIdFromUrl(specie)],
      queryFn: () => getSpecies(getIdFromUrl(specie)),
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 60 * 24,
    })) : [],
  });

  return (
    <Suspense fallback={<Loader />}>
      {isLoading && <Loader />}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <MotionBox p={5} bg="gray.700" color="white">
          <VStack spacing={4}>
            <HStack spacing={10} style={{ fontWeight: "bold", marginTop: "15px" }}>
              <VStack align="start">
                <img src={getImageById(id, 'characters')} alt='characters' width={250} style={{ borderRadius: "20px" }} />
              </VStack>
              <VStack align="start">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Heading as="h1" size="xl" color="yellow.300" _hover={{ color: 'orange' }}>
                    {data.name}
                  </Heading>
                  <div style={{ marginLeft: '20px' }}>
                    <AddToFavorite id={id} iconSize={42} />
                  </div>
                </div>
                <Text>Height: {data.height} cm</Text>
                <Text>Mass: {data.mass} kg</Text>
                <Text>Hair Color: {data.hair_color}</Text>
                <Text>Skin Color: {data.skin_color}</Text>
                <Text>Eye Color: {data.eye_color}</Text>
                <Text>Birth Year: {data.birth_year}</Text>
                <Text>Gender: {data.gender}</Text>
                <Text>Homeworld: {homeworld[0]?.data?.name}</Text>
              </VStack>
            </HStack>
          </VStack>
          <div style={{ margin: "auto", width: '50%' }}>
            {data.films.length > 0 && (
              <VStack align="start" spacing={5} p={5} bg="gray.800" borderRadius="md" m={2} shadow="md">
                <Heading as="h3" size="lg" color="yellow.300" m={'auto'}>Films</Heading>
                <List spacing={2}>
                  <Flex wrap="wrap" justify="center" gap={5}>
                    {films.map((film, index) => (
                      <MotionListItem
                        key={index}
                        whileHover={{ scale: 1.1 }}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          margin: '10px',
                          flex: '0 0 calc(20% - 50px)'
                        }}
                      >
                        <img src={getImageById(getIdFromUrl(film?.data?.url), 'films')} alt='films' width={100} style={{ borderRadius: "20px" }} />
                        <span style={{ width: '100px', textAlign: 'center', marginTop: '5px' }}>{film?.data?.title}</span>
                      </MotionListItem>
                    ))}
                  </Flex>
                </List>
              </VStack>
            )}

            {data.species.length > 0 && (
              <VStack align="start" spacing={5} p={5} bg="gray.800" borderRadius="md" m={2} shadow="md">
                <Heading as="h3" size="lg" color="yellow.300" m={'auto'}>Species</Heading>
                <List spacing={2}>
                  <Flex wrap="wrap" justify="center" gap={5}>
                    {species.map((specie, index) => (
                      <MotionListItem
                        key={index}
                        whileHover={{ scale: 1.1 }}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          margin: '10px',
                          flex: '0 0 calc(20% - 50px)'
                        }}
                      >
                        <img src={getImageById(getIdFromUrl(specie?.data?.url), 'species')} alt='species' width={100} style={{ borderRadius: "20px" }} />
                        <span style={{ width: '100px', textAlign: 'center', marginTop: '5px' }}>{specie?.data?.name}</span>
                      </MotionListItem>
                    ))}
                  </Flex>
                </List>
              </VStack>
            )}

            {data.vehicles.length > 0 && (
              <VStack align="start" spacing={5} p={5} bg="gray.800" borderRadius="md" m={2} shadow="md">
                <Heading as="h3" size="lg" color="yellow.300" m={'auto'}>Vehicles</Heading>
                <List spacing={2}>
                  <Flex wrap="wrap" justify="center" gap={5}>
                    {vehicles.map((vehicle, index) => (
                      <MotionListItem
                        key={index}
                        whileHover={{ scale: 1.1 }}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          margin: '10px',
                          flex: '0 0 calc(20% - 50px)'
                        }}
                      >
                        <img src={getImageById(getIdFromUrl(vehicle?.data?.url), 'vehicles')} alt='vehicles' width={100} style={{ borderRadius: "20px" }} />
                        <span style={{ width: '110px', textAlign: 'center', marginTop: '5px' }}>{vehicle?.data?.name}</span>
                      </MotionListItem>
                    ))}
                  </Flex>
                </List>
              </VStack>
            )}

            {data.starships.length > 0 && (
              <VStack align="start" spacing={5} p={5} bg="gray.800" borderRadius="md" m={2} shadow="md">
                <Heading as="h3" size="lg" color="yellow.300" m={'auto'}>Starships</Heading>
                <List spacing={2}>
                  <Flex wrap="wrap" justify="center" gap={5}>
                    {starships.map((starship, index) => (
                      <MotionListItem
                        key={index}
                        whileHover={{ scale: 1.1 }}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          margin: '10px',
                          flex: '0 0 calc(20% - 50px)'
                        }}
                      >
                        <img src={getImageById(getIdFromUrl(starship?.data?.url), 'starships')} alt='starships' width={100} style={{ borderRadius: "20px" }} />
                        <span style={{ width: '100px', textAlign: 'center', marginTop: '5px' }}>{starship?.data?.name}</span>
                      </MotionListItem>
                    ))}
                  </Flex>
                </List>
              </VStack>
            )}
          </div>
        </MotionBox>
      )}
    </Suspense>
  );
}
