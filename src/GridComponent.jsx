
import * as THREE from 'three'
import { Geometry } from '@react-three/csg'

export default function GridComponent(props)
{
    const { type, gap, row, col } = props
    const unit = 1

    const grid = []

        for (let i = 0; i < row; i++)
        {
            for (let j = 0; j < col; j++)
            {
                grid.push(
                    <HexagonCell
                        position={[(i + j % 2 * 0.5) * (Math.sqrt(3) + gap), 0, j * (1.5 + gap)]}
                    />
                )
            }
        }
    
    return <>

        <group>
            {grid}
        </group>

    </>

}

function HexagonCell(props)
{

    const { position } = props

    return <>

        <mesh position={position}>
            <cylinderGeometry args={[1, 1, 0.25, 6]} />
            <meshBasicMaterial color="red" />
        </mesh>

    </>

}