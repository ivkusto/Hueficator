/*LOG MESSAGE DATA */
/**logs on second sheet, so you need to create additional sheet to make this method available or just change cheet number */
function writeLog(data) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0]; /*sheet number*/

  var lastRow = sheet.getLastRow() + 1;

  sheet.setActiveSelection("A" + lastRow).setNumberFormat("@STRING@").setValue(data.date);
  sheet.setActiveSelection("B" + lastRow).setNumberFormat("@STRING@").setValue(data.userUsername);
  sheet.setActiveSelection("C" + lastRow).setNumberFormat("@STRING@").setValue(data.userId);
  sheet.setActiveSelection("D" + lastRow).setNumberFormat("@STRING@").setValue(data.userName);
  sheet.setActiveSelection("E" + lastRow).setNumberFormat("@STRING@").setValue(data.inMessage);
  sheet.setActiveSelection("F" + lastRow).setNumberFormat("@STRING@").setValue(data.outMessage);

}

/*LOG ANY DATA */
function writeData(data) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[1];

  var lastRow = sheet.getLastRow() + 1;

  sheet.setActiveSelection("A" + lastRow).setNumberFormat("@STRING@").setValue(data);
}


function oprosLog(data)
{
var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[3]; /*sheet number*/

  var lastRow = sheet.getLastRow() + 1;

  sheet.setActiveSelection("A" + lastRow).setNumberFormat("@STRING@").setValue(data.id);
  sheet.setActiveSelection("B" + lastRow).setNumberFormat("@STRING@").setValue(data.data);
}