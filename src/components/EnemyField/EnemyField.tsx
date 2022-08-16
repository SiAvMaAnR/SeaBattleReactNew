import React, { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../../App';
import Coordinate from '../../common/types/coordinate';
import Field from '../Field/Field';
import "./EnemyField.css";


const EnemyField = ({ isEnd }: {
  isEnd: boolean
}) => {
  const socket = useContext(SocketContext);
  const [field, setField] = useState<number[][]>([]);
  const [name, setName] = useState<string>("Враг");


  useEffect(() => {
    socket.on("game:field:enemy", (field: number[][]) => {
      setField(field);
    });


    socket.emit("game:field:enemy");

    return () => {
      socket.off("game:field:enemy");
    }
  }, [socket]);




  function clickCellHandler(e: React.MouseEvent<HTMLDivElement, MouseEvent>, coordinate: Coordinate) {
    console.log(coordinate);
    if (!isEnd) {
      socket.emit("game:shoot:init", coordinate);
    }
  }


  return (
    <div className='container'>
      <Field name={name} field={field} onclick={clickCellHandler} />
    </div>

  )
}

export default EnemyField;