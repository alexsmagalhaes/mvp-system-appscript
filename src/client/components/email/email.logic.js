const EmailManager = {
  sendEmail(data) {
    const {
      to,
      subject,
      body = 'Este email requer HTML habilitado para funcionar!',
      htmlBody,
      attachments
    } = data

    MailApp.sendEmail({
      to,
      subject,
      body,
      htmlBody,
      attachments
    })
  }
}

