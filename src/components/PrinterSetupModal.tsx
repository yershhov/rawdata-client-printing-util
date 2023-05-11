import { jspmWSStatus } from "../utils/printUtils";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  HStack,
  Box,
  Center,
  FormLabel,
  Select,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useContext, useEffect, useRef, useState } from "react";
import { PrintGetJSPMInstaller } from "./PrintGetJSPMInstaller";
import * as JSPM from "jsprintmanager";
import { PrintContext } from "../context/PrintContext";

export const PrinterSetupModal = () => {
  const { printSetupIsOpen, printSetupOnClose } = useContext(PrintContext);

  const [jspmIsInstalled, setJspmInstalled] = useState(false);
  const [lookingForJspm, setLookingForJspm] = useState(false);
  const [printers, setPrinters] = useState<string[]>([]);

  const [selectedPrinter, setSelectedPrinter] = useState(
    localStorage.getItem("defaultPrinter") ?? undefined
  );

  const printersSelectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    setLookingForJspm(true);

    //WebSocket settings
    JSPM.JSPrintManager.auto_reconnect = true;
    JSPM.JSPrintManager.start();
    JSPM.JSPrintManager.WS!.onStatusChanged = function () {
      if (jspmWSStatus()) {
        setJspmInstalled(true);
        //get client installed
        JSPM.JSPrintManager.getPrinters().then(function (myPrinters: any) {
          var printers = [];
          for (var i = 0; i < myPrinters.length; i++) {
            printers.push(myPrinters[i]);
          }
          setPrinters(printers);
        });
      }
      setLookingForJspm(false);
    };
  }, []);

  return (
    <Modal
      isOpen={printSetupIsOpen}
      onClose={printSetupOnClose}
      size={"3xl"}
      preserveScrollBarGap
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{"Printer Setup"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {lookingForJspm && (
            <Center w="100%" h="5rem">
              <HStack>
                <Spinner size={"lg"} />
              </HStack>
            </Center>
          )}

          {!jspmIsInstalled && !lookingForJspm && <PrintGetJSPMInstaller />}
          {jspmIsInstalled && !lookingForJspm && (
            <Box id="installedPrinters">
              <FormLabel htmlFor="installedPrinterName">
                {"Select a default printer:"}
              </FormLabel>
              <Select
                ref={printersSelectRef}
                name="installedPrinterName"
                id="installedPrinterName"
                value={selectedPrinter}
                onChange={() => {
                  setSelectedPrinter(printersSelectRef.current!.value);
                }}
              >
                {printers.map((item) => {
                  return <option value={item}>{item}</option>;
                })}
              </Select>
              <Text color="gray.400" fontSize={14}>
                It will be saved as default
              </Text>
            </Box>
          )}
        </ModalBody>
        <ModalFooter>
          {jspmIsInstalled && (
            <HStack>
              <Button type="button" onClick={printSetupOnClose}>
                {"Exit"}
              </Button>
              <Button
                type="button"
                colorScheme="purple"
                onClick={() => {
                  localStorage.setItem(
                    "defaultPrinter",
                    printersSelectRef.current!.value
                  );
                  printSetupOnClose();
                }}
              >
                {"Save"}
              </Button>
            </HStack>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
