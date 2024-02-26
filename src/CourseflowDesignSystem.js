import { createTheme, Progress, Button } from '@mantine/core';

const courseflowTheme = createTheme({
  components: {
    Button: Button.extend({
      classNames: {
        root: 'button-primary',
        label: 'button-label',
      },
    }),
    Progress: Progress.extend({
      classNames: {
        root: 'progress-bar'
      }
    })
  },
});

export default courseflowTheme;