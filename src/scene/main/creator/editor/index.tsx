import React from 'react'

import { Creations } from '..'
import Categories from '../../../../components/creator-pages/categories'

interface Props {
        nowCreating: Creations
}

const Editor: React.FC<Props> = ({ nowCreating }) => {
        return <>{nowCreating === Creations.CATEGORIES && <Categories />}</>
}

export default Editor
