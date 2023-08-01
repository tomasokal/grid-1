
import { Center } from '@react-three/drei'
import { useControls } from 'leva'

import GridComponent from './GridComponent'

export default function Experience()
{

    const { type, rows, columns, gap} = useControls(
        { 
            type: {
                
                options : {
                    hexagon: "hexagon",
                    square: "square"
                }
            }, 
            rows: {
                value: 7,
                min: 1,
                max: 21,
                step: 1,
            }, 
            columns: {
                value: 7,
                min: 1,
                max: 21,
                step: 1,
            },
            gap: {
                value: 0.25,
                min: 0.01,
                max: 1,
                step: 0.01,
            }
        }
    )
    
    return <>

        <Center>
            <GridComponent 
                type={type}
                gap={gap}
                row={rows}
                col={columns}
            />
        </Center>

    </>

}
