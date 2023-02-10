import React from 'react';
import { ComboBox } from './combo-box';

export default {
  title: 'ComboBox',
  parameters: {
    docs: {
      description: {
        component: `
The СomboBox a normal text input enhanced by a panel of suggested options.
The widget is useful for setting the value of a single-line textbox in one of two types of scenarios:
1.	The value for the textbox can be chosen from a predefined set of allowed values
2.	The textbox may contain any arbitrary value, but it is advantageous to suggest possible values to the user, e.g., a search field may suggest similar or previous searches to save the user time
        `
      }
    }
  }
};

export function Default(args: { defaultValue: string; options: string[] }) {
  return <ComboBox {...args} />;
}

Default.args = {
  defaultValue: 'значение по умолчанию',
  options: [
    'значение 1',
    'значение 2',
    'значение 3',
    'значение 4',
    'значение 5'
  ]
};
