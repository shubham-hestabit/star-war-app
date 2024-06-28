'use client';
import { useParams } from "next/navigation";
import { useQuery, useQueries } from "@tanstack/react-query";
import { getCharacter, getFilm, getPlanet, getSpecies, getStarship, getVehicle } from "@/app/api/swapi";
import {
  Box,
  Text,
  Heading,
  VStack,
  HStack,
  List,
  ListItem,
  ListIcon,
  Flex,
  Tooltip,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import styles from "@/app/page.module.css";
import { Suspense } from "react";
import { CheckCircleIcon, InfoOutlineIcon } from '@chakra-ui/icons';
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
    return url.match(/(\d+)/)[0];
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
    <div className={styles.main}>
      <Suspense fallback={<Loader />}>
        {isLoading && <Loader />}
        {error && <p>Error: {error.message}</p>}
        {data && (
          <MotionBox p={5} shadow="lg" borderWidth="1px" borderRadius="lg" bg="gray.700" color="white" whileHover={{ scale: 1.05 }}>
            <VStack spacing={4}>
              <div style={{ display: 'flex' }}>
                <Heading as="h1" size="2xl" color="yellow.300" _hover={{ color: 'orange' }}>
                  {data.name}
                </Heading>
                <div title="Add to Favorite" style={{ marginLeft: "50px" }}>
                  <AddToFavorite id={id} iconSize={45} />
                </div>
              </div>
              <HStack spacing={10} style={{ fontWeight: "bold", marginTop: "15px" }}>
                <VStack align="start">
                  <Text>Height: {data.height} cm</Text>
                  <Text>Mass: {data.mass} kg</Text>
                </VStack>
                <VStack align="start">
                  <Text>Hair Color: {data.hair_color}</Text>
                  <Text>Skin Color: {data.skin_color}</Text>
                </VStack>
                <VStack align="start">
                  <Text>Eye Color: {data.eye_color}</Text>
                  <Text>Birth Year: {data.birth_year}</Text>
                </VStack>
                <VStack align="start">
                  <Text>Gender: {data.gender}</Text>
                  <Text>Homeworld: {homeworld[0]?.data?.name}</Text>
                </VStack>
              </HStack>

              <Flex marginTop={8} wrap="wrap" justify="center">
                {data.films.length > 0 && (
                  <VStack align="start" spacing={4} p={4} bg="gray.800" borderRadius="md" m={2} shadow="md">
                    <Heading as="h3" size="lg" color="yellow.300">Films</Heading>
                    <List spacing={2}>
                      {films.map((film, index) => (
                        <MotionListItem key={index} whileHover={{ scale: 1.1 }}>
                          <ListIcon as={CheckCircleIcon} color="green.500" />
                          {film?.data?.title}
                        </MotionListItem>
                      ))}
                    </List>
                  </VStack>
                )}
                {data.species.length > 0 && (
                  <VStack align="start" spacing={4} p={4} bg="gray.800" borderRadius="md" m={2} shadow="md">
                    <Heading as="h3" size="lg" color="yellow.300">Species</Heading>
                    <List spacing={2}>
                      {species.map((specie, index) => (
                        <MotionListItem key={index} whileHover={{ scale: 1.1 }}>
                          <ListIcon as={CheckCircleIcon} color="green.500" />
                          {specie?.data?.name}
                        </MotionListItem>
                      ))}
                    </List>
                  </VStack>
                )}
                {data.vehicles.length > 0 && (
                  <VStack align="start" spacing={4} p={4} bg="gray.800" borderRadius="md" m={2} shadow="md">
                    <Heading as="h3" size="lg" color="yellow.300">Vehicles</Heading>
                    <List spacing={2}>
                      {vehicles.map((vehicle, index) => (
                        <MotionListItem key={index} whileHover={{ scale: 1.1 }}>
                          <ListIcon as={CheckCircleIcon} color="green.500" />
                          {vehicle?.data?.name}
                        </MotionListItem>
                      ))}
                    </List>
                  </VStack>
                )}
                {data.starships.length > 0 && (
                  <VStack align="start" spacing={4} p={4} bg="gray.800" borderRadius="md" m={2} shadow="md">
                    <Heading as="h3" size="lg" color="yellow.300">Starships</Heading>
                    <List spacing={2}>
                      {starships.map((starship, index) => (
                        <MotionListItem key={index} whileHover={{ scale: 1.1 }}>
                          <ListIcon as={CheckCircleIcon} color="green.500" />
                          {starship?.data?.name}
                        </MotionListItem>
                      ))}
                    </List>
                  </VStack>
                )}
              </Flex>
            </VStack>
          </MotionBox>
        )}
      </Suspense>
    </div>
  );
}
