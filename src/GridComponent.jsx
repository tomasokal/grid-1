import { cloneElement, useEffect, useState } from 'react'
import * as THREE from 'three'

export default function GridComponent(props)
{

    // Pull in and deconstruct props from above.
    const { type, gap, row, col } = props

    // Check which type is selected
    const hexagonType = type === "hexagon"
    const squareType = type === "square"
    const triangleType = type === "triangle"

    // Set up state for neighbor grid cells
    const [neighborCells, setNeighborCells] = useState({})

    // Create function for interaction click based on row and col
    const handleInteractionClick = (row, col) => {

        const neighborCells = hexagonType ? getHexagonNeighbors(row, col) : getSquareNeighbors(row, col)
        setNeighborCells(neighborCells)

    }

    // Grid is set up and rendered based on type, then pushed.
    const grid = []

    // Helper items to calculate radius and inradius.
    // This is needed because grid cells are actually regular polygons.
    const radius = 1
    const inradius = radius / 2
    const a = 2 * inradius * Math.tan(Math.PI / 3)

    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            grid.push(
                <InteractionEffects
                    type={type}
                    row={i}
                    col={j}
                    neighborCells={neighborCells}
                    onClick={handleInteractionClick}
                >
                    {hexagonType ? <HexagonCell i={i} j={j} gap={gap} /> : <SquareCell i={i} j={j} gap={gap} />}
                </InteractionEffects>
            )
        }
    }

    // if (type === "triangle")
    // {

    //     const radius = 1
    //     const inradius = radius / 2
    //     const a = 2 * inradius * Math.tan(Math.PI / 3)

    //     console.log(a)

    //     for (let i = 0; i < row * 2; i++)
    //     {
    //         for (let j = 0; j < col; j++)
    //         {
    //             grid.push(
    //                 <TriangleCell
    //                     position={[
    //                         i * a * 0.5 + j * a * 0.5 + i * gap + j * gap,
    //                         0, 
    //                         // j
    //                         j * gap + j + j * (a / Math.sqrt(3) / 3) + j * (a / Math.sqrt(3) / 6) + (i % 2) * ( (a / Math.sqrt(3) / 3 ) ) - ( (1 + i) % 2) * ( (a / Math.sqrt(3) / 6 ) )
    //                     ]}
    //                     rotation={[0, (i % 2) * Math.PI, 0]}
    //                 />
    //             )
    //         }
    //     }
    // }
    
    return <>

        <group>
            {grid}
        </group>

    </>

}

function HexagonCell(props)
{

    const { i, j, gap, color } = props

    // Position is set by the center of the cell.
    // For the x axis, we multiply the unit by the square root of 3 and add the gap
    // We then multiply by i and add j % 2 * 0.5
    // This is because every other row is shifted by half the unit because of the rotation of the hexagon
    // For the z axis, we multiply the unit by 1.5 and add the gap
    const position=[
        (i + j % 2 * 0.5) * (Math.sqrt(3) + gap),
        0,
        j * (1.5 + gap)
    ]

    return <>

        <mesh position={position} >
            <cylinderGeometry args={[1, 1, 0.25, 6]} />
            <meshBasicMaterial color={color} />
        </mesh>

    </>

}

function SquareCell(props)
{

    const { i, j, gap, color } = props

    // Position is set by the center of the cell.
    // Position has to shift by 1 unit in the x and z axis
    // There is a further shift by half the unit multiplied by the gap
    // This is because the center of the cell is at the center of the cell
    // Finally, there is a shift of the gap multiplied by the unit
    // This happens for both the x and z axis
    const position = [
        i + i * 0.5 + i * gap,
        0,
        j + j * 0.5 + j * gap,
    ]

    return <>

        <mesh position={position} rotation={[0, Math.PI / 4, 0]}>
            <cylinderGeometry args={[1, 1, 0.25, 4]}/>
            <meshBasicMaterial color={color} />
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
            <meshBasicMaterial color={color} />
        </mesh>

    </>

}

function InteractionEffects({ type, row, col, neighborCells, onClick, children })
{

    const [hovered, setHovered] = useState(false)
    const [neighbor, setNeighbor] = useState(false)
  
    // Define your hover logic here
    const colorOnHover = hovered ? 'blue' : 'red'

    const handleClick = () => {
        onClick(row, col)
    }

    useEffect(() => {
        setNeighbor(containsArray(neighborCells, [row, col]))
    }, [neighborCells])

    useEffect(() => {
        setNeighbor(false)
        setNeighbor(containsArray(neighborCells, [row, col]))
    }, [type])

  
    return <>

        <group
            position={neighbor ? [0, 1, 0] : [0, 0, 0]}
            onPointerEnter={() => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
            onClick={handleClick}
        >
            {cloneElement(children, { color: colorOnHover })}
        </group>
    
    </>
}

function getHexagonNeighbors(q, r) {

    return [
        r % 2 ? [q + 1, r] : [q + 1, r],
        r % 2 ? [q, r - 1] : [q - 1, r - 1],
        r % 2 ? [q + 1, r - 1] : [q, r - 1],
        r % 2 ? [q - 1, r] : [q - 1, r],
        r % 2 ? [q + 1, r + 1] : [q, r + 1],
        r % 2 ? [q, r + 1] : [q - 1, r + 1]
    ]

}

function getSquareNeighbors(q, r) {

    return [
        [q + 1, r],
        [q - 1, r],
        [q, r + 1],
        [q, r - 1]
    ]

}

function containsArray(objOfArrays, targetArray) {
    for (const key in objOfArrays) {
      if (Array.isArray(objOfArrays[key])) {
        const array = objOfArrays[key];
        if (JSON.stringify(array) === JSON.stringify(targetArray)) {
          return true;
        }
      }
    }
    return false;
  }