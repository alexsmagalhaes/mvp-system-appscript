class IAManager {
  constructor() {
    this.context = ''
  }

  set context(context) {
    this.context = context
  }

  sendIAMessage(prompt) {
    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        maxOutputTokens: 40,
        temperature: 0.5,
      },
      systemInstruction: { parts: [{ text: this.context }] }
    };

    const res = UrlFetchApp.fetch(url, {
      payload: JSON.stringify(payload),
      contentType: "application/json",
    });

    const data = JSON.parse(res.getContentText());

    if (
      data.candidates &&
      data.candidates.length > 0 &&
      data.candidates[0].content.parts.length > 0
    ) {
      console.log(data.candidates[0].content.parts[0].text);
    } else {
      ErrorManage.sendError(404, 'Resposta não encontrada!')
    }
  }
}