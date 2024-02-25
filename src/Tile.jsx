import {Box} from "@chakra-ui/react";

export function Tile({content: Content, flip, state}) {
    switch (state) {
        case "start":
            return (
                <Box
                    onClick={flip}
                    display="inline-block"
                    width={20}
                    height={20}
                    p={2}
                    borderRadius="lg"
                    textAlign="center"
                    bg="#68d491"
                >

                </Box>
            );
        case "flipped":
            return (
                <Box
                    display="inline-block"
                    width={20}
                    height={20}
                    p={2}
                    borderRadius="lg"
                    textAlign="center"
                    bg="#37a169"
                >
                    <Content
                        style={{
                            display: "inline-block",
                            width: "100%",
                            height: "100%",
                            color: "white",
                            verticalAlign: "top",
                        }}
                    />
                </Box>
            );
        case "matched":
            return (
                <Box
                    display="inline-block"
                    width={20}
                    height={20}
                    p={2}
                    borderRadius="lg"
                    textAlign="center"
                >
                    <Content
                        style={{
                            display: "inline-block",
                            width: "100%",
                            height: "100%",
                            color: "#c6f6d6",
                            verticalAlign: "top",
                        }}
                    />
                </Box>
            );
        default:
            throw new Error("Invalid state " + state);
    }
}
