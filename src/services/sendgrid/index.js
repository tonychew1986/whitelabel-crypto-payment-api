import sendgrid, { mail as helper } from 'sendgrid'
import { sendgridKey, defaultEmail } from '../../config'

export const sendMail = ({
  fromEmail = defaultEmail,
  toEmail,
  subject,
  content,
  data,
  contentType = 'text/html'
}) => {
  fromEmail = new helper.Email(fromEmail)
  toEmail = new helper.Email(toEmail)
  content = new helper.Content(contentType, content)
  //const mail = new helper.Mail(fromEmail, subject, toEmail, content)

  const email = new helper.Mail();
  email.setFrom(fromEmail);
  email.setSubject(subject);
  email.addContent(content);

  const personalization = new helper.Personalization();
  personalization.addTo(toEmail);

  //if(transactionId){
    const transactionId = new helper.Substitution('%transactionId%', data.transactionId);
    personalization.addSubstitution(transactionId);

    const date = new helper.Substitution('%date%', data.date);
    personalization.addSubstitution(date);

    const addressReceiver = new helper.Substitution('%addressReceiver%', data.addressReceiver);
    personalization.addSubstitution(addressReceiver);

    const merchantId = new helper.Substitution('%merchantId%', data.merchantId);
    personalization.addSubstitution(merchantId);

    const merchantName = new helper.Substitution('%merchantName%', data.merchantName);
    personalization.addSubstitution(merchantName);

    const productCode = new helper.Substitution('%productCode%', data.productCode);
    personalization.addSubstitution(productCode);

    const cryptocurrencyPaid = new helper.Substitution('%cryptocurrencyPaid%', data.cryptocurrencyPaid);
    personalization.addSubstitution(cryptocurrencyPaid);

    const cryptocurrencyType = new helper.Substitution('%cryptocurrencyType%', data.cryptocurrencyType);
    personalization.addSubstitution(cryptocurrencyType);

    const currencyPaid = new helper.Substitution('%currencyPaid%', data.currencyPaid);
    personalization.addSubstitution(currencyPaid);

    const currencyType = new helper.Substitution('%currencyType%', data.currencyType);
    personalization.addSubstitution(currencyType);

    const shippingName = new helper.Substitution('%shippingName%', data.shippingName);
    personalization.addSubstitution(shippingName);

    const shippingEmail = new helper.Substitution('%shippingEmail%', data.shippingEmail);
    personalization.addSubstitution(shippingEmail);

    const shippingMobile = new helper.Substitution('%shippingMobile%', data.shippingMobile);
    personalization.addSubstitution(shippingMobile);

    const shippingCountry = new helper.Substitution('%shippingCountry%', data.shippingCountry);
    personalization.addSubstitution(shippingCountry);

    const shippingAddress = new helper.Substitution('%shippingAddress%', data.shippingAddress);
    personalization.addSubstitution(shippingAddress);

    const shippingPostal = new helper.Substitution('%shippingPostal%', data.shippingPostal);
    personalization.addSubstitution(shippingPostal);

  //}

  email.addPersonalization(personalization);

  if(data.templateId){
    email.setTemplateId(data.templateId);
  }

  const sg = sendgrid(sendgridKey)
  const request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: email.toJSON()
  })

  return sg.API(request)
}
