import React from 'react'

import useErrorElement from './useErrorElement'

const useNameError = () => {
        const errorElement = useErrorElement()

        const handleNameError = () => {
                const input: HTMLElement | null = document.getElementById(
                        'name'
                )

                const className: string = 'name-error'
                if (input && !document.querySelector(`#name + ,${className}`)) {
                        input.style.borderColor = 'red'

                        const errMsg = errorElement.returnElement(
                                'Category name should not be empty',
                                className
                        )

                        input.parentElement?.appendChild(errMsg)
                }

                document.location.href = '#name'
        }

        return {
                apply: handleNameError,
        }
}

export default useNameError
