import { createContext } from "react";

interface PrintContextModel {
  printSetupIsOpen: boolean;
  printSetupOnOpen: () => void;
  printSetupOnClose: () => void;
}

const printInitialState: PrintContextModel = {
  printSetupIsOpen: false,
  printSetupOnOpen: () => {},
  printSetupOnClose: () => {},
};

export const PrintContext = createContext<PrintContextModel>(printInitialState);
