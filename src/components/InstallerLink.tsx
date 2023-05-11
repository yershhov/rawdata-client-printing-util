import { ReactNode, useContext } from "react";
import { Text, Button, HStack } from "@chakra-ui/react";
import { PrintGetJSPMInstallerContext } from "./PrintGetJSPMInstaller";

type InstallerLinkProps = {
  index: number;
  icon: ReactNode;
  text: string;
};

export const InstallerLink = (props: InstallerLinkProps) => {
  const { group, handleGroupChange } = useContext(PrintGetJSPMInstallerContext);
  return (
    <Button
      flexGrow={1}
      borderRadius={"none"}
      colorScheme={group === props.index ? "purple" : "gray"}
      onClick={() => {
        handleGroupChange(props.index);
      }}
    >
      <HStack>
        {props.icon}
        <Text>{props.text}</Text>
      </HStack>
    </Button>
  );
};
