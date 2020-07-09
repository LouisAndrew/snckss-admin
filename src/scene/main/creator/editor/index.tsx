import React from 'react'

import { Creations } from '..'
import Categories from '../../../../components/creator-pages/categories'
import Brands from '../../../../components/creator-pages/brands'

interface Props {
        nowCreating: Creations
}

const Editor: React.FC<Props> = ({ nowCreating }) => {
        return (
                <>
                        {nowCreating === Creations.CATEGORIES && <Categories />}
                        {nowCreating === Creations.BRAND && <Brands />}
                </>
        )
}

export default Editor
