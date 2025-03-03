import {Button, useColorMode} from "@chakra-ui/react";
import {SunIcon, MoonIcon} from "@chakra-ui/icons"


export const ToggleDarkMode = () => {
    const { colorMode, toggleColorMode } = useColorMode()

    return(
        <Button onClick={toggleColorMode} pos="absolute" top={0} right={0} m="1rem">
            {colorMode === "dark" ? <SunIcon/> : <MoonIcon/>}
        </Button>
    )
}