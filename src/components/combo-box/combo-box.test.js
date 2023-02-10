import '@testing-library/jest-dom'
import * as React from 'react'
// import {render, fireEvent, screen} from '@testing-library/react'
// import {render} from '@storybook/testing-library'
import { render, fireEvent } from '../test-utils';


import ComboBox from './combo-box'

// const defaultValue = 'Начальное значение'
// const data = ['html', 'css', 'js']

describe('Component', () => {
    it('Component render', () => {
        render(<ComboBox />)

        expect(screen.getByText('Lorem')).toBeInTheDocument()
    })
})

