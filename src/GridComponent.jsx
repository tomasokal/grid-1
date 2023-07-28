
import * as THREE from 'three'
import { Geometry } from '@react-three/csg'

export default function GridComponent(props)
{
    const { type, gap, row, col } = props

    const grid = []

        if (type === "square")
        {
            for (let i = 0; i < row; i++)
            {
                for (let j = 0; j < col; j++)
                {
                    grid.push(
                        <SquareCell
                            // Position is set by the center of the cell.
                            // Position has to shift by 1 unit in the x and z axis
                            // There is a further shift by half the unit multiplied by the gap
                            // This is because the center of the cell is at the center of the cell
                            // Finally, there is a shift of the gap multiplied by the unit
                            // This happens for both the x and z axis
                            position={[
                                i + i * 0.5 + i * gap,
                                0,
                                j + j * 0.5 + j * gap,
                            ]}
                        />
                    )
                }
            }
        }

        if (type === "hexagon")
        {
            for (let i = 0; i < row; i++)
            {
                for (let j = 0; j < col; j++)
                {
                    grid.push(
                        <HexagonCell
                            // Position is set by the center of the cell.
                            // For the x axis, we multiply the unit by the square root of 3 and add the gap
                            // We then multiply by i and add j % 2 * 0.5
                            // This is because every other row is shifted by half the unit because of the rotation of the hexagon
                            // For the z axis, we multiply the unit by 1.5 and add the gap
                            position={[
                                (i + j % 2 * 0.5) * (Math.sqrt(3) + gap),
                                0,
                                j * (1.5 + gap)
                            ]}
                        />
                    )
                }
            }
        }

        if (type === "triangle")
        {

            const radius = 1
            const inradius = radius / 2
            const a = 2 * inradius * Math.tan(Math.PI / 3)

            console.log(a)

            for (let i = 0; i < row * 2; i++)
            {
                for (let j = 0; j < col; j++)
                {
                    grid.push(
                        <TriangleCell
                            position={[
                                i * a * 0.5 + j * a * 0.5 + i * gap + j * gap,
                                0, 
                                // j
                                j * gap + j + j * (a / Math.sqrt(3) / 3) + j * (a / Math.sqrt(3) / 6) + (i % 2) * ( (a / Math.sqrt(3) / 3 ) ) - ( (1 + i) % 2) * ( (a / Math.sqrt(3) / 6 ) )
                            ]}
                            rotation={[0, (i % 2) * Math.PI, 0]}
                        />
                    )
                }
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

        <mesh position={position} >
            <cylinderGeometry args={[1, 1, 0.25, 6]} />
            <meshBasicMaterial color="red" />
        </mesh>

    </>

}

function SquareCell(props)
{

    const { position } = props

    return <>

        <mesh position={position} rotation={[0, Math.PI / 4, 0]}>
            <cylinderGeometry args={[1, 1, 0.25, 4]}/>
            <meshBasicMaterial color="red" />
        </mesh>

    </>

}

function TriangleCell(props)
{

    const { position, rotation } = props

    console.log(position, rotation)

    return <>

        <mesh position={position} rotation={rotation}>
            <cylinderGeometry args={[1, 1, 0.25, 3]}/>
            <meshBasicMaterial color="red" />
        </mesh>

    </>

}