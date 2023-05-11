import {
  Button,
  GridItem,
  Text,
  VStack,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { downloadInstaller } from "../utils/printUtils";

export const InstallerDownloadButton = (props: any) => {
  const bordersColor = useColorModeValue(
    "var(--chakra-colors-gray-200)",
    "var(--chakra-colors-whiteAlpha-200)"
  );
  const installersDirPath = "../../src/jspm-client-app-installers/";
  return (
    <GridItem colSpan={props.unified && 2}>
      <Flex
        w="100%"
        border={`1px solid ${bordersColor}`}
        textAlign={"center"}
        p={6}
        borderRadius={"md"}
        justifyContent={"center"}
      >
        <VStack w={{ base: "100%", md: props.unified ? "50%" : "100%" }}>
          <Text fontWeight={600}>{props.description}</Text>
          <Button
            w="100%"
            onClick={() => {
              downloadInstaller(installersDirPath + props.path);
            }}
          >
            {props.fileInfo}
          </Button>
        </VStack>
      </Flex>
    </GridItem>
  );
};
