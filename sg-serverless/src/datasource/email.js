import nodemailer from 'nodemailer'

export async function publishEmail(email, {topic, message}) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'smartgrobot.developer@gmail.com',
      pass: 'Raspberry#'
    }
  })

  const mailOptions = {
    from: 'noreply@smartgrobot.com',
    to: email,
    subject: topic,
    text: message
  }
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error)
      } else {
        resolve(info)
      }
    })
  })
}
