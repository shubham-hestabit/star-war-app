'use client';
import { Suspense, useState } from "react";
import styles from "@/app/page.module.css";
import { useQuery } from "@tanstack/react-query";
import { getPaginatedCharacters } from "@/app/api/swapi";
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';
import Link from "next/link";
import AddToFavorite from "@/components/AddToFavorite";
import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";

export default function Home() {
  const [page, setPage] = useState(1);

  const { data, error, isLoading } = useQuery({
    queryKey: ["characters", page],
    queryFn: () => getPaginatedCharacters(page),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 60 * 24,
    keepPreviousData: true,
  });

  function getIdOfCharacter(url) {
    return url.match(/(\d+)/)[0];
  }

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Suspense fallback={<Loader />}>
          <h1 className={styles.heading}>
            Star War Characters
          </h1>
          {isLoading && <Loader />}
          {error && <p>Error: {error.message}</p>}
          {data && (
            <>
              <div className={styles.characterList}>
                {data.results.map((character) =>
                (
                  <Card key={character.url} className={styles.card}>
                    <CardHeader className={styles.cardHeader}>
                      <strong>
                        {character.name}
                      </strong>
                      <div title="Add to Favorite">
                        <AddToFavorite id={getIdOfCharacter(character.url)} iconSize={23} />
                      </div>
                    </CardHeader>
                    <CardBody className={styles.cardBody}>
                      <p>Height: {character.height}</p>
                      <p>Mass: {character.mass}</p>
                      <p>Birth Year: {character.birth_year}</p>
                      <p>Gender: {character.gender}</p>
                    </CardBody>
                    <CardFooter className={styles.cardFooter}>
                      <Link className={styles.showDetails} href={`/${getIdOfCharacter(character.url)}`}>Show more details</Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              <Pagination page={page} setPage={setPage} total={data.count} />
            </>
          )}
        </Suspense>
      </div>
    </main>
  );
}
