import { Box, Flex, SimpleGrid, Grid, Text, VStack } from "@chakra-ui/react";
import { useState, createContext } from "react";
import { SiWindows, SiApple } from "react-icons/si";
import { FcLinux } from "react-icons/fc";
import { InstallerDownloadButton } from "./InstallerDownloadButton";
import { InstallerLink } from "./InstallerLink";

interface PrintGetJSPMInstallerContext {
  group: number;
  handleGroupChange: (group: number) => void;
}

const initialPrintGetJSPNInstallerState: PrintGetJSPMInstallerContext = {
  group: 0,
  handleGroupChange: (group: number) => {},
};
export const PrintGetJSPMInstallerContext =
  createContext<PrintGetJSPMInstallerContext>(
    initialPrintGetJSPNInstallerState
  );

export const PrintGetJSPMInstaller = () => {
  const [group, setGroup] = useState(0);

  function handleGroupChange(group: number) {
    setGroup(group);
  }

  return (
    <PrintGetJSPMInstallerContext.Provider value={{ group, handleGroupChange }}>
      <Grid
        h="100%"
        w="100%"
        px={{ base: 0, md: 12 }}
        placeItems={"center"}
        gap={6}
      >
        <Box>
          <Text fontWeight={"600"} fontSize={23} textAlign="center">
            {"JSPM Client App is required"}
          </Text>
        </Box>
        <VStack h="100%" w="100%" maxW={"70rem"} gap={2}>
          <Flex w="100%">
            <InstallerLink index={0} icon={<SiWindows />} text="Windows" />
            <InstallerLink index={1} icon={<SiApple size={20} />} text="Mac" />
            <InstallerLink
              index={2}
              icon={<FcLinux size={24} />}
              text="Linux"
            />
          </Flex>

          {group === 0 && (
            <Box
              w="100%"
              maxH={{ base: "25rem", md: "100%" }}
              overflow={"auto"}
            >
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} w="100%">
                <InstallerDownloadButton
                  description="Windows 32-bit"
                  fileInfo={
                    <Flex alignItems={"center"}>
                      <Text>jspm5-5.0.23.503-win32.exe</Text>
                    </Flex>
                  }
                  path={"windows/jspm5-5.0.23.503-win32.exe"}
                />
                <InstallerDownloadButton
                  description="Windows 64-bit"
                  fileInfo={
                    <Flex alignItems={"center"}>
                      <Text>jspm5-5.0.23.503-win64.exe</Text>
                    </Flex>
                  }
                  path={"windows/jspm5-5.0.23.503-win64.exe"}
                />
              </SimpleGrid>
            </Box>
          )}
          {group === 1 && (
            <SimpleGrid columns={1} gap={6} w="100%">
              <InstallerDownloadButton
                unified
                description={"macOS universal installer (ARM & Intel)"}
                fileInfo={
                  <Flex alignItems={"center"}>
                    <Text>jspm5-5.0.23.503-universal.pkg</Text>
                  </Flex>
                }
                path="mac/jspm5-5.0.23.503-universal.pkg"
              />
            </SimpleGrid>
          )}
          {group === 2 && (
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} w="100%">
              <InstallerDownloadButton
                description="Debian-based Systems (64-bit)"
                fileInfo={
                  <Flex alignItems={"center"}>
                    <Text>jspm5-5.0.23.503-amd64.deb</Text>
                  </Flex>
                }
                path={"linux/jspm5-5.0.23.503-amd64.deb"}
              />
              <InstallerDownloadButton
                description="RedHat-based Systems (64-bit)"
                fileInfo={
                  <Flex alignItems={"center"}>
                    <Text>jspm5-5.0.23.503-1.x86_64.rpm</Text>
                  </Flex>
                }
                path={"linux/jspm5-5.0.23.503-1.x86_64.rpm"}
              />
            </SimpleGrid>
          )}
        </VStack>
      </Grid>
    </PrintGetJSPMInstallerContext.Provider>
  );
};
