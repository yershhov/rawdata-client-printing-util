import { printOnSelectedPrinter } from "../utils/printUtils";
import { Button, Flex, IconButton, useDisclosure } from "@chakra-ui/react";
import { createContext, useContext } from "react";
import { IoMdSettings } from "react-icons/io";
import { PrinterSetupModal } from "./PrinterSetupModal";
import { PrintContext } from "../context/PrintContext";

function PrintButton() {
  const { printSetupOnOpen } = useContext(PrintContext);
  return (
    <Flex>
      <Button
        isDisabled={!localStorage.getItem("defaultPrinter")}
        type="button"
        onClick={() => {
          //Create EPL commands for sample
          var lineFeed = "\x0A";
          var commands = "";
          commands += lineFeed;
          commands += "N";
          commands += lineFeed;
          commands += "Q609,24";
          commands += lineFeed;
          commands += "q784";
          commands += lineFeed;
          commands += 'A170,5,0,1,5,5,N,"WORLDWIDE"';
          commands += lineFeed;
          commands += "LO5,230,765,10";
          commands += lineFeed;
          commands += 'A10,265,0,1,3,3,R,"MODEL:"';
          commands += lineFeed;
          commands += 'A280,265,0,1,3,3,N,"Bar Code Printer"';
          commands += lineFeed;
          commands += 'A10,340,0,1,3,3,R," CODE: "';
          commands += lineFeed;
          commands += 'B280,340,0,3C,2,6,120,B,"BCP-1234"';
          commands += lineFeed;
          commands += "LO5,520,765,10";
          commands += lineFeed;
          commands += 'A100,550,0,1,2,2,N,"ISO 9000 Made In USA"';
          commands += lineFeed;
          commands += "P1";
          commands += lineFeed;

          printOnSelectedPrinter(printSetupOnOpen, commands);
        }}
        borderRightRadius={"none"}
        colorScheme="purple"
        flexGrow={1}
      >
        {"Print"}
      </Button>
      <IconButton
        borderLeftRadius={"none"}
        icon={<IoMdSettings size={20} />}
        onClick={printSetupOnOpen}
        colorScheme="purple"
        aria-label={"labels-printer-setup-button"}
      />
    </Flex>
  );
}

export default PrintButton;
