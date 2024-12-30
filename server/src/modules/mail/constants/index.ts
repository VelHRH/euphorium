export enum EmailTemplateHints {
  CONFIRM_EMAIL = 'email-confirmation.pug',
  REVOKE_PASSWORD = 'revoke-password.pug',
  PASSWORD_CHANGED = 'password-changed.pug',
}

export enum EmailSubjectHints {
  CONFIRM_EMAIL = 'Confirm email',
  REVOKE_PASSWORD = 'Revoke password',
  PASSWORD_CHANGED = 'Password changed',
}

// TODO: make dependant on ConfirmationType
export const MailTemplateConfig = {
  email: {
    subject: EmailSubjectHints.CONFIRM_EMAIL,
    template: EmailTemplateHints.CONFIRM_EMAIL,
  },
  password: {
    subject: EmailSubjectHints.REVOKE_PASSWORD,
    template: EmailTemplateHints.REVOKE_PASSWORD,
  },
  passwordChanged: {
    subject: EmailSubjectHints.PASSWORD_CHANGED,
    template: EmailTemplateHints.PASSWORD_CHANGED,
  },
};
