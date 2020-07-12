const useSureQuestion = () => {
        const renderQuestion = (
                msg: string,
                componentClassName: string,
                yesFunction: () => void,
                noFunction: () => void
        ): void => {
                const questionComponent: HTMLElement = createQuestionComponent(
                        msg
                )

                const el: HTMLElement | null = document.querySelector(
                        `.${componentClassName}`
                )

                if (el) {
                        // ReactDOM.render(questionComponent, el)
                        el.appendChild(questionComponent)
                        document.getElementById('wrapper')?.addEventListener(
                                'click',
                                (e: MouseEvent) => {
                                        const clickedEl = e.target as HTMLElement
                                        if (clickedEl.id === 'yes') {
                                                yesFunction()
                                        } else {
                                                noFunction()
                                        }
                                        el.removeChild(questionComponent)
                                }
                        )
                }
        }

        // I am not sure how to append a react component into a div, so we're doing it the old school way here
        const createQuestionComponent = (msg: string): HTMLElement => {
                const el: HTMLElement = document.createElement('div')
                const h3: HTMLHeadingElement = document.createElement('h3')

                const buttonWrapper: HTMLElement = document.createElement('div')
                const yes: HTMLButtonElement = document.createElement('button')
                const no: HTMLButtonElement = document.createElement('button')

                // msg section
                h3.innerText = msg
                h3.className = 'text text-dark'

                // yes-no button section
                no.innerText = 'no'
                no.className = 'btn btn-light'
                no.id = 'no'

                yes.innerText = 'yes'
                yes.className = 'btn btn-danger'
                yes.id = 'yes'

                buttonWrapper.className = 'btn-group'
                buttonWrapper.id = 'wrapper'

                el.className = 'card question'

                buttonWrapper.appendChild(yes)
                buttonWrapper.appendChild(no)

                el.appendChild(h3)
                el.appendChild(buttonWrapper)

                return el
        }

        return {
                apply: renderQuestion,
        }
}

export default useSureQuestion
