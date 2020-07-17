const useErrorElement = () => {
        /**
         * returns an h5 element to be appended to it's parent element.
         * @param innerText error text msg to be shown within the element
         * @param className class name of the element.
         */
        const returnElement = (
                innerText: string,
                className: string
        ): HTMLHeadingElement => {
                const errorMsg: HTMLHeadingElement = document.createElement(
                        'h5'
                )
                errorMsg.innerText = innerText
                errorMsg.className = className

                return errorMsg
        }

        return {
                returnElement,
        }
}

export default useErrorElement
