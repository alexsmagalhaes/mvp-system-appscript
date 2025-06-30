function doGet() {
  return HtmlService.createTemplateFromFile(
    `${ImportManager.base}/client/_main.interface.html`
  )
    .evaluate()
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

const HtmlManager = {
  include(fileName) {
    const template = HtmlService.createTemplateFromFile(fileName);
    return template
      .evaluate()
      .setTitle(fileName)
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .getContent();
  },

  compileScript() {
    var filePaths = ImportManager.importList;

    var scriptContents = [];

    filePaths.forEach(function (filePath) {
      var htmlFile = HtmlService.createHtmlOutputFromFile(filePath);
      var html = htmlFile.getContent();

      var regex = /<script[^>]*>([\s\S]*?)<\/script>/g;
      var match;
      while ((match = regex.exec(html)) !== null) {
        scriptContents.push(match[1]);
      }
    });

    var combinedScript =
      "<script  type='text/babel'>" + scriptContents.join("\n") + "</script>";

    return combinedScript;
  },
};
