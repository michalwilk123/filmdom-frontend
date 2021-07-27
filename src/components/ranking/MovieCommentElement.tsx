import React from 'react'
import { MovieComment } from '../../utils/backendInterfaces'

interface Props extends MovieComment{
    
}

export const MovieCommentElement = (props: Props) => {
    return (
        <div>
            {JSON.stringify(props)}
        </div>
    )
}
