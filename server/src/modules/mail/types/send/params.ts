import { EmailSubjectHints, EmailTemplateHints } from '$modules/mail/constants';

export type SendParams = {
  email: string;
  subject: EmailSubjectHints;
  template: EmailTemplateHints;
  confirmationLink?: string;
};
