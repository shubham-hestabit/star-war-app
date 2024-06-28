import { Flex, Spinner } from "@chakra-ui/react";

export default function Loader() {
    return (
        <Flex justifyContent="center" alignItems="center" height="75vh" width="75vw">
            <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
            />
        </Flex>
    )
}