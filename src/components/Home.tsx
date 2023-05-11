import { PrintContext } from "../context/PrintContext";
import { useDisclosure, Grid, HStack, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import PrintButton from "./PrintButton";
import { PrinterSetupModal } from "./PrinterSetupModal";

export const Home = () => {
  const {
    isOpen: printSetupIsOpen,
    onOpen: printSetupOnOpen,
    onClose: printSetupOnClose,
  } = useDisclosure();

  useEffect(() => {
    if (!localStorage.getItem("printMode")) {
      localStorage.setItem("printMode", "file");
    }
  }, []);

  return (
    <PrintContext.Provider
      value={{
        printSetupIsOpen,
        printSetupOnOpen,
        printSetupOnClose,
      }}
    >
      {printSetupIsOpen && <PrinterSetupModal />}
      <Grid h="100vh" w="100%" placeItems="center">
        <PrintButton />
      </Grid>
    </PrintContext.Provider>
  );
};
