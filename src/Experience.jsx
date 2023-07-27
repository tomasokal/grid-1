
import { useEffect } from 'react'

import GridComponent from './GridComponent'

export default function Experience()
{
    
    return <>

        <GridComponent 
            type="hexagon"
            gap={0.25}
            row={100}
            col={100}
        />

    </>

}
