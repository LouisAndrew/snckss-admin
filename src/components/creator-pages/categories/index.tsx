import React, { useState, useEffect } from 'react'

import './styles.scss'

import Editor from './editor'

const Categories: React.FC = () => {
        const [isEditing, setIsEditing] = useState(true)

        return (
                <>
                        <h1>Categories</h1>
                        {isEditing && <Editor />}
                </>
        )
}

export default Categories
