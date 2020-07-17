const useNameError = () => {
        const handleNameError = () => {
                const input: HTMLElement | null = document.getElementById(
                        'name'
                )
                if (input && !document.querySelector('#name + .name-error')) {
                        input.style.borderColor = 'red'
                        const errorMsg: HTMLHeadingElement = document.createElement(
                                'h5'
                        )
                        errorMsg.innerText = 'Category name should not be empty'
                        errorMsg.className = 'name-error'

                        input.parentElement?.appendChild(errorMsg)
                }

                document.location.href = '#name'
        }

        return {
                apply: handleNameError,
        }
}

export default useNameError
