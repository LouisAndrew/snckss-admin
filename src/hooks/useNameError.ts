const useNameError = () => {
        const handleNameError = () => {
                const input: HTMLElement | null = document.getElementById(
                        'name'
                )
                if (input) {
                        input.style.borderColor = 'red'
                        const errorMsg: HTMLHeadingElement = document.createElement(
                                'h5'
                        )
                        errorMsg.innerText = 'Category name should not be empty'
                        errorMsg.className = 'name-error'

                        input.parentElement?.appendChild(errorMsg)
                }
        }

        return {
                apply: handleNameError,
        }
}

export default useNameError
