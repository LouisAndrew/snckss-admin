import useErrorElement from './useErrorElement'

const usePriceError = () => {
        const errElement = useErrorElement()

        const displayError = (stringErr: boolean) => {
                const inputId: string = 'price'
                const priceInput: HTMLElement | null = document.getElementById(
                        inputId
                )

                if (priceInput) {
                        const innerMsg: string = stringErr
                                ? 'Price should be a number'
                                : 'Price should not be smaller than 1.'
                        const errClassName: string = 'price-error'

                        let errEl: HTMLElement | null = document.querySelector(
                                `#${inputId} + .${errClassName}`
                        )

                        // if the err element already exists within the input's parent element
                        if (errEl) {
                                errEl.innerText = innerMsg
                        } else {
                                errEl = errElement.returnElement(
                                        innerMsg,
                                        errClassName
                                )
                                priceInput.parentElement?.parentElement?.appendChild(
                                        errEl
                                )
                        }

                        priceInput.style.borderColor = 'red'
                        document.location.href = `#${inputId}`
                }
        }

        return {
                displayError,
        }
}

export default usePriceError
