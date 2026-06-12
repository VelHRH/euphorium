import type { MessageSchema } from './en'

const uk: MessageSchema = {
  nav: {
    home: 'Головна',
    events: 'Події',
    profile: 'Профіль',
    login: 'Увійти',
    logout: 'Вийти',
  },
  auth: {
    email: 'Email',
    password: 'Пароль',
    login: {
      title: 'Увійти',
      createAccount: 'Створити акаунт',
    },
    signUp: {
      title: 'Реєстрація',
      hasAccount: 'Вже є акаунт? Увійти',
    },
    google: 'Продовжити з Google',
  },
  home: {
    search: {
      title: 'Знайди свою наступну ніч',
      subtitle: 'Опиши атмосферу — ми знайдемо події',
      placeholder: "Техно вечірка в п'ятницю в Києві…",
      enterToSearch: 'пошук',
      newLine: 'новий рядок',
      failed: 'Помилка пошуку',
      noResults: 'Подій не знайдено. Спробуй інший опис.',
      clearSearch: 'Очистити пошук',
      results: '{count} результатів',
      clear: 'Очистити',
    },
  },
  layout: {
    copyright: '© {year} Euphorium family',
  },
}

export default uk
