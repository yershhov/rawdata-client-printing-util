import * as JSPM from "jsprintmanager";

//Check JSPM WebSocket status
export function jspmWSStatus() {
  if (JSPM.JSPrintManager.websocket_status == JSPM.WSStatus.Open) return true;
  else if (JSPM.JSPrintManager.websocket_status == JSPM.WSStatus.Closed) {
    return false;
  } else if (JSPM.JSPrintManager.websocket_status == JSPM.WSStatus.Blocked) {
    alert("JSPM has blocked this website!");
    return false;
  }
}

export function printOnSelectedPrinter(
  openGetInstallerPopUp: Function,
  commands: string
) {
  if (jspmWSStatus()) {
    //Create a ClientPrintJob
    var cpj = new JSPM.ClientPrintJob();
    cpj.clientPrinter = new JSPM.InstalledPrinter(
      localStorage.getItem("defaultPrinter")!
    );
  } else {
    openGetInstallerPopUp();
    return;
  }

  //Set content to print...
  cpj.printerCommands = commands;

  //Send print job to printer!
  cpj.sendToClient();
}

export function downloadInstaller(path: string) {
  console.log(path);
  var anchor = document.createElement("a");
  anchor.setAttribute("href", path);
  anchor.setAttribute("download", "");
  document.body.appendChild(anchor);
  anchor.click();
  anchor.parentNode!.removeChild(anchor);
}
