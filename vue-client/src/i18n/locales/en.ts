const messages = {
  nav: {
    home: 'Home',
    events: 'Events',
    profile: 'Profile',
    login: 'Login',
    logout: 'Logout',
  },
  auth: {
    email: 'Email',
    password: 'Password',
    login: {
      title: 'Login',
      createAccount: 'Create an account',
    },
    signUp: {
      title: 'Sign Up',
      hasAccount: 'Already have an account? Login',
    },
    google: 'Continue with Google',
  },
  home: {
    search: {
      title: 'Find your next night',
      subtitle: "Describe the vibe — we'll find matching events",
      placeholder: 'Techno warehouse party this Friday in Kyiv…',
      enterToSearch: 'to search',
      newLine: 'new line',
      failed: 'Search failed',
      noResults: 'No events found. Try a different description.',
      clearSearch: 'Clear search',
      results: '{count} results',
      clear: 'Clear',
    },
  },
  layout: {
    copyright: '© {year} Euphorium family',
  },
}

export type MessageSchema = typeof messages

export default messages
