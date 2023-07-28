
import { useEffect } from 'react'
import { Center, Stage } from '@react-three/drei'

import GridComponent from './GridComponent'

export default function Experience()
{
    
    return <>

        <Center>
            <GridComponent 
                type="triangle"
                gap={0.25}
                row={11}
                col={11}
            />
        </Center>

    </>

}
