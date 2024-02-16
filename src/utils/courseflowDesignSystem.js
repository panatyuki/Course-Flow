import { createTheme, Button } from '@mantine/core';
const courseflowTheme = createTheme({
  components: {
    Button: Button.extend({
      classNames: {
        root: 'button-primary'
      }
    })
  }
});

export default courseflowTheme;