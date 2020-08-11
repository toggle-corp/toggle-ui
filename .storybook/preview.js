import { configureActions } from '@storybook/addon-actions';

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
}

configureActions({
  depth: 3,
  // Limit the number of items logged into the actions panel
  limit: 20,
});
