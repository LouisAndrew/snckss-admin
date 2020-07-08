import React from 'react'
import { Icon } from '@iconify/react'
import iconCheckBold from '@iconify/icons-mdi/check-bold'

import { Creations } from '../../scene/main/creator'
import './styles.scss'

interface Props {
        type: Creations
        create: boolean
}

const SuccessPage: React.FC<Props> = ({ type, create }) => {
        const succesType: string =
                type === Creations.CATEGORIES
                        ? 'category'
                        : type === Creations.BRAND
                        ? 'brand'
                        : 'product'

        return (
                <div className="row success">
                        <div className="inner">
                                <h2 data-testid="success">
                                        Success
                                        {create
                                                ? ' adding new '
                                                : ' updating existing '}
                                        {succesType}
                                </h2>
                                <Icon icon={iconCheckBold} />
                        </div>
                </div>
        )
}

export default SuccessPage
