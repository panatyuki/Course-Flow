import { createTheme, Button } from '@mantine/core';

const courseflowTheme = createTheme({
  components: {
    Button: Button.extend({
      classNames: {
        root: 'button-primary',
        label: 'button-label',
      },
    }),
  },
});

export default courseflowTheme;