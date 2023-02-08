import '@testing-library/jest-dom'
import * as React from 'react'
// import {render, fireEvent, screen} from '@testing-library/react'
import {render} from '@storybook/testing-library'

import ComboBox from './combo-box'

// const defaultValue = 'Начальное значение'
// const data = ['html', 'css', 'js']

describe('List component', () => {
    it('List render', () => {
        render(<ComboBox />)

        expect(screen.getByText('Lorem')).toBeInTheDocument()
    })
})


// import '@testing-library/jest-dom'
// import * as React from 'react'
// import {render, fireEvent, screen} from '@testing-library/react'
// import HiddenMessage from '../hidden-message'

// test('shows the children when the checkbox is checked', () => {
//   const testMessage = 'Test Message'
//   render(<HiddenMessage>{testMessage}</HiddenMessage>)

//   // query* functions will return the element or null if it cannot be found
//   // get* functions will return the element or throw an error if it cannot be found
//   expect(screen.queryByText(testMessage)).toBeNull()

//   // the queries can accept a regex to make your selectors more resilient to content tweaks and changes.
//   fireEvent.click(screen.getByLabelText(/show/i))

//   // .toBeInTheDocument() is an assertion that comes from jest-dom
//   // otherwise you could use .toBeDefined()
//   expect(screen.getByText(testMessage)).toBeInTheDocument()
// })
