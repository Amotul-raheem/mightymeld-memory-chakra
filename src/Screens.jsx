import {useState} from "react";
import confetti from "canvas-confetti";
import * as icons from "react-icons/gi";
import {Box, Button, Text, useColorModeValue} from "@chakra-ui/react";
import {Tile} from "./Tile";
import {ToggleDarkMode} from "./ToggleDarkMode.jsx";

export const possibleTileContents = [
    icons.GiHearts,
    icons.GiWaterDrop,
    icons.GiDiceSixFacesFive,
    icons.GiUmbrella,
    icons.GiCube,
    icons.GiBeachBall,
    icons.GiDragonfly,
    icons.GiHummingbird,
    icons.GiFlowerEmblem,
    icons.GiOpenBook,
];

export function StartScreen({start}) {
    const bg = useColorModeValue("#E6fffa", "#B2f5EA")
    return (
        <Box
            h="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
            px="4"
        >
            <ToggleDarkMode/>
            <Box
                h="400px"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                w={{base:"100%", md:"400px", lg:"400px"}}
                bg={bg}
                borderRadius="xl"
            >
                <Text fontSize="48px" color="#319795" fontWeight="black">Memory</Text>
                <Text my="6" color="#319795">Flip over tiles looking for pairs</Text>
                <Button
                    px="12"
                    py="6"
                    borderRadius="full"
                    fontWeight="bold"
                    color="white"
                    bgGradient="linear(to-b, #29c9c6, #319795)"
                    _hover={{
                        bgGradient: "linear(to-b, #38b2ac, #319795)"
                    }}
                    onClick={start}
                    my="6"
                    boxShadow="2xl"
                >
                    Play
                </Button>
            </Box>
        </Box>
    );
}

export function PlayScreen({end}) {
    const [tiles, setTiles] = useState(null);
    const [tryCount, setTryCount] = useState(0);

    const bg = useColorModeValue("#f0fff4", "#1A365D")
    const triesBg = useColorModeValue("#9ae6b4", "#38b2ac")
    const triesColor = useColorModeValue("#2f855a", "#f0fff4")
    const color = useColorModeValue("#2f855a", "#234e52")



    const getTiles = (tileCount) => {
        // Throw error if count is not even.
        if (tileCount % 2 !== 0) {
            throw new Error("The number of tiles must be even.");
        }

        // Use the existing list if it exists.
        if (tiles) return tiles;

        const pairCount = tileCount / 2;

        // Take only the items we need from the list of possibilities.
        const usedTileContents = possibleTileContents.slice(0, pairCount);

        // Double the array and shuffle it.
        const shuffledContents = usedTileContents
            .concat(usedTileContents)
            .sort(() => Math.random() - 0.5)
            .map((content) => ({content, state: "start"}));

        setTiles(shuffledContents);
        return shuffledContents;
    };

    const flip = (i) => {
        // Is the tile already flipped? We don’t allow flipping it back.
        if (tiles[i].state === "flipped") return;

        // How many tiles are currently flipped?
        const flippedTiles = tiles.filter((tile) => tile.state === "flipped");
        const flippedCount = flippedTiles.length;

        // Don't allow more than 2 tiles to be flipped at once.
        if (flippedCount === 2) return;

        // On the second flip, check if the tiles match.
        if (flippedCount === 1) {
            setTryCount((c) => c + 1);

            const alreadyFlippedTile = flippedTiles[0];
            const justFlippedTile = tiles[i];

            let newState = "start";

            if (alreadyFlippedTile.content === justFlippedTile.content) {
                confetti();
                newState = "matched";
            }

            // After a delay, either flip the tiles back or mark them as matched.
            setTimeout(() => {
                setTiles((prevTiles) => {
                    const newTiles = prevTiles.map((tile) => ({
                        ...tile,
                        state: tile.state === "flipped" ? newState : tile.state,
                    }));

                    // If all tiles are matched, the game is over.
                    if (newTiles.every((tile) => tile.state === "matched")) {
                        setTimeout(end, 0);
                    }

                    return newTiles;
                });
            }, 1000);
        }

        setTiles((prevTiles) => {
            return prevTiles.map((tile, index) => ({
                ...tile,
                state: i === index ? "flipped" : tile.state,
            }));
        });
    };

    return (
        <>
            <Box h="100vh" display="flex" alignItems="center" justifyContent="center" flexDirection="column" px="4">
                <ToggleDarkMode/>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Text color={color}>Tries</Text>
                    <Box mx="4" px="2" bg={triesBg} borderRadius="lg" color={triesColor}>{tryCount}</Box>
                </Box>
                <Box h="400px"
                     w={{base:"100%", md:"400px", lg:"400px"}}
                     display="flex" justifyContent="center" alignItems="center" my="8"
                     flexWrap="wrap" gap="3" bg={bg} borderRadius="xl">
                    {getTiles(16).map((tile, i) => (
                        <Tile key={i} flip={() => flip(i)} {...tile} />
                    ))}
                </Box>

            </Box>

        </>
    );
}
