import React from 'react'
import { Icon } from '@iconify/react'
import backIcon from '@iconify/icons-mdi/arrow-back'
import addIcon from '@iconify/icons-mdi/add'

import './styles.scss'

interface Props {
        displayAdd: boolean
        goBack: () => void
        add: () => void
}

const Icons: React.FC<Props> = ({ displayAdd, goBack, add }) => {
        return (
                <>
                        <div className="back icon" onClick={goBack}>
                                <Icon icon={backIcon} />
                        </div>
                        {displayAdd && (
                                <div className="add icon" onClick={add}>
                                        <Icon icon={addIcon} />
                                </div>
                        )}
                </>
        )
}

export default Icons
