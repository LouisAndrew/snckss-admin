import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import arrowBack from '@iconify/icons-mdi/arrow-back'

import './styles.scss'
import Editor from './editor'

const Categories: React.FC = () => {
        const [isEditing, setIsEditing] = useState(true)

        const goBack = () => {
                if (isEditing) {
                        setIsEditing(false)
                }
        }

        return (
                <div className="categories">
                        <div className="back" onClick={goBack}>
                                <Icon icon={arrowBack} />
                        </div>
                        <h1>Categories</h1>
                        {isEditing && <Editor goBack={goBack} />}
                </div>
        )
}

export default Categories
