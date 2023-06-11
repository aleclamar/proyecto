import { useEffect, useRef, useState } from 'react'
import { Button } from '@chakra-ui/react'
import { array } from './Casillas'
import { Link } from 'react-router-dom'

export function Tablero() {
  const tablero = array()
  // const 
  const [numeroSacado, setNumeroSacado] = useState()
  const canvasRef = useRef(null)
  const [casillasOcupadas, setCasillasOcupadas] = useState(
    new Array(68).fill({ casilla1: false, casilla2: false })
  )
  const posicionesIniciales = {
    rojas: {
      ficha1: { x: 100, y: 100 },
      ficha2: { x: 180, y: 100 },
      ficha3: { x: 100, y: 180 },
      ficha4: { x: 180, y: 180 }
    },
    verdes: {
      ficha1: { x: 100, y: 620 },
      ficha2: { x: 180, y: 620 },
      ficha3: { x: 100, y: 700 },
      ficha4: { x: 180, y: 700 }
    },
    azules: {
      ficha1: { x: 620, y: 100 },
      ficha2: { x: 700, y: 100 },
      ficha3: { x: 620, y: 180 },
      ficha4: { x: 700, y: 180 }
    },
    amarillas: {
      ficha1: { x: 620, y: 620 },
      ficha2: { x: 700, y: 620 },
      ficha3: { x: 620, y: 700 },
      ficha4: { x: 700, y: 700 }
    }
  }
  const [fichasRojas, setFichasRojas] = useState({
    // ficha1: { x: tablero[12].casilla1[0], y: tablero[12].casilla1[1] },
    // ficha2: { x: tablero[11].casilla2[0], y: tablero[11].casilla2[1] },
    ficha1: { x: 100, y: 100 },
    ficha2: { x: 180, y: 100 },
    ficha3: { x: 100, y: 180 },
    ficha4: { x: 180, y: 180 }
  })
  const [fichasVerdes, setFichasVerdes] = useState({
    ficha1: { x: 100, y: 620 },
    ficha2: { x: 180, y: 620 },
    ficha3: { x: 100, y: 700 },
    ficha4: { x: 180, y: 700 }
  })
  const [fichasAzules, setFichasAzules] = useState({
    ficha1: { x: 620, y: 100 },
    ficha2: { x: 700, y: 100 },
    ficha3: { x: 620, y: 180 },
    ficha4: { x: 700, y: 180 }
  })
  const [fichasAmarillas, setFichasAmarillas] = useState({
    ficha1: { x: 620, y: 620 },
    ficha2: { x: 700, y: 620 },
    ficha3: { x: 620, y: 700 },
    ficha4: { x: 700, y: 700 }
  })
  function lanzarDado() {
    const min = 1
    const max = 6
    setNumeroSacado(Math.floor(Math.random() * (max - min + 1)) + min)
    console.log(numeroSacado)
  }
  useEffect(() => {
    // console.log(numeroSacado)
    const tabla = matriz(20, 20);

    const canvas = canvasRef.current;
    const contexto_canvas = canvas.getContext('2d');
    contexto_canvas.scale(40, 40);
    // Dimensiones del tablero
    function matriz(anchura, altura) {
      const matrix = [];
      //lo rellenara hasta que de false la altura
      while (altura--) {
        //rellenamos la matriz con 0 con el tamaño de la anchura
        matrix.push(new Array(anchura).fill(0));
      }
      coloresIniciales(matrix);
      coloresCentro(matrix);
      casillasFichas(matrix);
      casillasSeguros(matrix);
      // console.table(matrix);
      return matrix;
    }

    function coloresIniciales(matrix) {
      for (let columnas = 0; columnas < matrix.length; columnas++) {
        for (let filas = 0; filas < matrix[columnas].length; filas++) {
          if (columnas <= 6) {
            if (filas <= 6) {
              matrix[columnas][filas] = 1;
            }
            if (filas >= 13) {
              matrix[columnas][filas] = 3;
            }
          }
          if (columnas >= 13) {
            if (filas <= 6) {
              matrix[columnas][filas] = 2;
            }
            if (filas >= 13) {
              matrix[columnas][filas] = 4;
            }
          }
        }
      }
    }
    function casillasSeguros(matrix) {
      for (let columnas = 0; columnas < matrix.length; columnas++) {
        for (let filas = 0; filas < matrix[columnas].length; filas++) {
          if (columnas == 7 || columnas == 8) {
            if (filas == 4) {
              matrix[columnas][filas] = 6;
            }
            if (filas == 15) {
              matrix[columnas][filas] = 10;
            }
          } else if (columnas == 4) {
            if (filas == 7 || filas == 8) {
              matrix[columnas][filas] = 10;
            }
            if (filas == 11 || filas == 12) {
              matrix[columnas][filas] = 7;
            }
          } else if (columnas == 11 || columnas == 12) {
            if (filas == 15) {
              matrix[columnas][filas] = 8;
            }
            if (filas == 4) {
              matrix[columnas][filas] = 10;
            }
          } else if (columnas == 15) {
            if (filas == 7 || filas == 8) {
              matrix[columnas][filas] = 9;
            }
            if (filas == 11 || filas == 12) {
              matrix[columnas][filas] = 10;
            }
          } else if (columnas == 0) {
            if (filas == 9 || filas == 10) {
              matrix[columnas][filas] = 10;
            }
          } else if (columnas == 9 || columnas == 10) {
            if (filas == 0 || filas == 19) {
              matrix[columnas][filas] = 10;
            }
          } else if (columnas == 19) {
            if (filas == 9 || filas == 10) {
              matrix[columnas][filas] = 10;
            }
          }
        }
      }
    }
    function casillasFichas(matrix) {
      for (let columnas = 0; columnas < matrix.length; columnas++) {
        for (let filas = 0; filas < matrix[columnas].length; filas++) {
          if (columnas == 2) {
            if (filas == 2) {
              matrix[columnas][filas] = 5;
            }
            if (filas == 4) {
              matrix[columnas][filas] = 5;
            }
            if (filas == 15) {
              matrix[columnas][filas] = 5;
            }
            if (filas == 17) {
              matrix[columnas][filas] = 5;
            }
          } else if (columnas == 4) {
            if (filas == 2) {
              matrix[columnas][filas] = 5;
            }
            if (filas == 4) {
              matrix[columnas][filas] = 5;
            }
            if (filas == 15) {
              matrix[columnas][filas] = 5;
            }
            if (filas == 17) {
              matrix[columnas][filas] = 5;
            }
          } else if (columnas == 15) {
            if (filas == 2) {
              matrix[columnas][filas] = 5;
            }
            if (filas == 4) {
              matrix[columnas][filas] = 5;
            }
            if (filas == 15) {
              matrix[columnas][filas] = 5;
            }
            if (filas == 17) {
              matrix[columnas][filas] = 5;
            }
          } else if (columnas == 17) {
            if (filas == 2) {
              matrix[columnas][filas] = 5;
            }
            if (filas == 4) {
              matrix[columnas][filas] = 5;
            }
            if (filas == 15) {
              matrix[columnas][filas] = 5;
            }
            if (filas == 17) {
              matrix[columnas][filas] = 5;
            }
          }
        }
      }
    }
    function coloresCentro(matrix) {
      for (let columnas = 0; columnas < matrix.length; columnas++) {
        for (let filas = 1; filas < matrix[columnas].length; filas++) {
          if (columnas >= 9 && columnas <= 10) {
            if (filas <= 7) {
              matrix[columnas][filas] = 1;
            }
            if (filas >= 12 && filas < 19) {
              matrix[columnas][filas] = 4;
            }
          }
          if (columnas >= 8 && columnas <= 11) {
            if (filas > 7 && filas < 12) {
              matrix[columnas][filas] = 11;
            }
          }
          if (filas >= 9 && filas <= 10) {
            if (columnas > 0 && columnas <= 7) {
              matrix[columnas][filas] = 3;
            }
            if (columnas >= 12 && columnas < 19) {
              matrix[columnas][filas] = 2;
            }
          }
        }
      }
    }

    function pintarTodo() {
      for (let columnas = 0; columnas < tabla.length; columnas++) {
        for (let filas = 0; filas < tabla[columnas].length; filas++) {
          if (tabla[columnas][filas] == 1) {
            contexto_canvas.fillStyle = 'red';
            contexto_canvas.fillRect(columnas, filas, columnas + 1, filas + 1);
          } else if (tabla[columnas][filas] == 2) {
            contexto_canvas.fillStyle = 'blue';
            contexto_canvas.fillRect(columnas, filas, columnas + 1, filas + 1);
          } else if (tabla[columnas][filas] == 3) {
            contexto_canvas.fillStyle = 'green';
            contexto_canvas.fillRect(columnas, filas, columnas + 1, filas + 1);
          } else if (tabla[columnas][filas] == 4) {
            contexto_canvas.fillStyle = 'yellow';
            contexto_canvas.fillRect(columnas, filas, columnas + 1, filas + 1);
          } else if (tabla[columnas][filas] == 5) {
            contexto_canvas.fillStyle = 'white';
            contexto_canvas.fillRect(columnas, filas, columnas + 1, filas + 1);
          } else if (tabla[columnas][filas] == 6) {
            contexto_canvas.fillStyle = '#ff0000cc';
            contexto_canvas.fillRect(columnas, filas, columnas + 1, filas + 1);
          } else if (tabla[columnas][filas] == 7) {
            contexto_canvas.fillStyle = '#00ff00';
            contexto_canvas.fillRect(columnas, filas, columnas + 1, filas + 1);
          } else if (tabla[columnas][filas] == 8) {
            contexto_canvas.fillStyle = '#f0f000cc';
            contexto_canvas.fillRect(columnas, filas, columnas + 1, filas + 1);
          } else if (tabla[columnas][filas] == 9) {
            contexto_canvas.fillStyle = '#1932ffb3';
            contexto_canvas.fillRect(columnas, filas, columnas + 1, filas + 1);
          } else if (tabla[columnas][filas] == 10) {
            contexto_canvas.fillStyle = '#cdcdcd';
            contexto_canvas.fillRect(columnas, filas, columnas + 1, filas + 1);
          } else if (tabla[columnas][filas] == 11) {
            contexto_canvas.fillStyle = 'white';
            contexto_canvas.fillRect(columnas, filas, columnas + 1, filas + 1);
          }
          if (tabla[columnas][filas] === 0) {
            // dibuja un borde alrededor de la celda
            contexto_canvas.lineWidth = 0.1;
            contexto_canvas.beginPath();
            contexto_canvas.rect(columnas, filas, 1, 1);
            contexto_canvas.stroke();
            contexto_canvas.closePath();
            contexto_canvas.fillStyle = 'white';
            contexto_canvas.fillRect(columnas, filas, columnas + 1, filas + 1);
          }
        }
      }
    }
    function crearFichas() {
      contexto_canvas.scale(0.025, 0.025);
      var ancho = canvas.width;
      var alto = canvas.height;

      for (var i = 0; i <= ancho; i += ancho / 20) {
        contexto_canvas.moveTo(i, 0);
        contexto_canvas.lineTo(i, alto);
      }

      for (var a = 0; a <= alto; a += alto / 20) {
        contexto_canvas.moveTo(0, a)
        contexto_canvas.lineTo(ancho, a)
      }
      contexto_canvas.moveTo(280, 280)
      contexto_canvas.lineTo(520, 520)
      contexto_canvas.moveTo(280, 520)
      contexto_canvas.lineTo(520, 280)
      contexto_canvas.stroke()
    }
    // const tablero = [];

    // console.log(tablero)

    pintarTodo()
    crearFichas()
    canvas.addEventListener('click', handleClick)
    const circleRadius = 20
    const circle1X = fichasRojas.ficha1.x
    const circle1Y = fichasRojas.ficha1.y
    const circle2X = fichasRojas.ficha2.x
    const circle2Y = fichasRojas.ficha2.y
    const circle3X = fichasRojas.ficha3.x
    const circle3Y = fichasRojas.ficha3.y
    const circle4X = fichasRojas.ficha4.x
    const circle4Y = fichasRojas.ficha4.y
    const circle5X = fichasVerdes.ficha1.x
    const circle5Y = fichasVerdes.ficha1.y
    const circle6X = fichasVerdes.ficha2.x
    const circle6Y = fichasVerdes.ficha2.y
    const circle7X = fichasVerdes.ficha3.x
    const circle7Y = fichasVerdes.ficha3.y
    const circle8X = fichasVerdes.ficha4.x
    const circle8Y = fichasVerdes.ficha4.y
    const circle9X = fichasAzules.ficha1.x
    const circle9Y = fichasAzules.ficha1.y
    const circle10X = fichasAzules.ficha2.x
    const circle10Y = fichasAzules.ficha2.y
    const circle11X = fichasAzules.ficha3.x
    const circle11Y = fichasAzules.ficha3.y
    const circle12X = fichasAzules.ficha4.x
    const circle12Y = fichasAzules.ficha4.y
    const circle13X = fichasAmarillas.ficha1.x
    const circle13Y = fichasAmarillas.ficha1.y
    const circle14X = fichasAmarillas.ficha2.x
    const circle14Y = fichasAmarillas.ficha2.y
    const circle15X = fichasAmarillas.ficha3.x
    const circle15Y = fichasAmarillas.ficha3.y
    const circle16X = fichasAmarillas.ficha4.x
    const circle16Y = fichasAmarillas.ficha4.y

    contexto_canvas.beginPath()
    contexto_canvas.arc(circle1X, circle1Y, circleRadius, 0, 2 * Math.PI)
    contexto_canvas.fillStyle = 'red'
    contexto_canvas.fill()
    contexto_canvas.strokeStyle = "black"; // Agregar borde negro
    contexto_canvas.lineWidth = 2; // Ancho del borde
    contexto_canvas.stroke()
    contexto_canvas.closePath()

    contexto_canvas.beginPath()
    contexto_canvas.arc(circle2X, circle2Y, circleRadius, 0, 2 * Math.PI)
    contexto_canvas.fillStyle = 'red'
    contexto_canvas.fill()
    contexto_canvas.strokeStyle = "black"; // Agregar borde negro
    contexto_canvas.lineWidth = 2; // Ancho del borde
    contexto_canvas.stroke()
    contexto_canvas.closePath()

    contexto_canvas.beginPath()
    contexto_canvas.arc(circle3X, circle3Y, circleRadius, 0, 2 * Math.PI)
    contexto_canvas.fillStyle = 'red'
    contexto_canvas.fill()
    contexto_canvas.strokeStyle = "black"; // Agregar borde negro
    contexto_canvas.lineWidth = 2; // Ancho del borde
    contexto_canvas.stroke()
    contexto_canvas.closePath()

    contexto_canvas.beginPath()
    contexto_canvas.arc(circle4X, circle4Y, circleRadius, 0, 2 * Math.PI)
    contexto_canvas.fillStyle = 'red'
    contexto_canvas.fill()
    contexto_canvas.strokeStyle = "black"; // Agregar borde negro
    contexto_canvas.lineWidth = 2; // Ancho del borde
    contexto_canvas.stroke()
    contexto_canvas.closePath()

    contexto_canvas.beginPath()
    contexto_canvas.arc(circle5X, circle5Y, circleRadius, 0, 2 * Math.PI)
    contexto_canvas.fillStyle = 'green'
    contexto_canvas.fill()
    contexto_canvas.strokeStyle = "black"; // Agregar borde negro
    contexto_canvas.lineWidth = 2; // Ancho del borde
    contexto_canvas.stroke()
    contexto_canvas.closePath()

    contexto_canvas.beginPath()
    contexto_canvas.arc(circle6X, circle6Y, circleRadius, 0, 2 * Math.PI)
    contexto_canvas.fillStyle = 'green'
    contexto_canvas.fill()
    contexto_canvas.strokeStyle = "black"; // Agregar borde negro
    contexto_canvas.lineWidth = 2; // Ancho del borde
    contexto_canvas.stroke()
    contexto_canvas.closePath()

    contexto_canvas.beginPath()
    contexto_canvas.arc(circle7X, circle7Y, circleRadius, 0, 2 * Math.PI)
    contexto_canvas.fillStyle = 'green'
    contexto_canvas.fill()
    contexto_canvas.strokeStyle = "black"; // Agregar borde negro
    contexto_canvas.lineWidth = 2; // Ancho del borde
    contexto_canvas.stroke()
    contexto_canvas.closePath()

    contexto_canvas.beginPath()
    contexto_canvas.arc(circle8X, circle8Y, circleRadius, 0, 2 * Math.PI)
    contexto_canvas.fillStyle = 'green'
    contexto_canvas.fill()
    contexto_canvas.strokeStyle = "black"; // Agregar borde negro
    contexto_canvas.lineWidth = 2; // Ancho del borde
    contexto_canvas.stroke()
    contexto_canvas.closePath()

    contexto_canvas.beginPath()
    contexto_canvas.arc(circle9X, circle9Y, circleRadius, 0, 2 * Math.PI)
    contexto_canvas.fillStyle = 'blue'
    contexto_canvas.fill()
    contexto_canvas.strokeStyle = "black"; // Agregar borde negro
    contexto_canvas.lineWidth = 2; // Ancho del borde
    contexto_canvas.stroke()
    contexto_canvas.closePath()

    contexto_canvas.beginPath()
    contexto_canvas.arc(circle10X, circle10Y, circleRadius, 0, 2 * Math.PI)
    contexto_canvas.fillStyle = 'blue'
    contexto_canvas.fill()
    contexto_canvas.strokeStyle = "black"; // Agregar borde negro
    contexto_canvas.lineWidth = 2; // Ancho del borde
    contexto_canvas.stroke()
    contexto_canvas.closePath()

    contexto_canvas.beginPath()
    contexto_canvas.arc(circle11X, circle11Y, circleRadius, 0, 2 * Math.PI)
    contexto_canvas.fillStyle = 'blue'
    contexto_canvas.fill()
    contexto_canvas.strokeStyle = "black"; // Agregar borde negro
    contexto_canvas.lineWidth = 2; // Ancho del borde
    contexto_canvas.stroke()
    contexto_canvas.closePath()

    contexto_canvas.beginPath()
    contexto_canvas.arc(circle12X, circle12Y, circleRadius, 0, 2 * Math.PI)
    contexto_canvas.fillStyle = 'blue'
    contexto_canvas.fill()
    contexto_canvas.strokeStyle = "black"; // Agregar borde negro
    contexto_canvas.lineWidth = 2; // Ancho del borde
    contexto_canvas.stroke()
    contexto_canvas.closePath()

    contexto_canvas.beginPath()
    contexto_canvas.arc(circle13X, circle13Y, circleRadius, 0, 2 * Math.PI)
    contexto_canvas.fillStyle = 'yellow'
    contexto_canvas.fill()
    contexto_canvas.strokeStyle = "black"; // Agregar borde negro
    contexto_canvas.lineWidth = 2; // Ancho del borde
    contexto_canvas.stroke()
    contexto_canvas.closePath()

    contexto_canvas.beginPath()
    contexto_canvas.arc(circle14X, circle14Y, circleRadius, 0, 2 * Math.PI)
    contexto_canvas.fillStyle = 'yellow'
    contexto_canvas.fill()
    contexto_canvas.strokeStyle = "black"; // Agregar borde negro
    contexto_canvas.lineWidth = 2; // Ancho del borde
    contexto_canvas.stroke()
    contexto_canvas.closePath()

    contexto_canvas.beginPath()
    contexto_canvas.arc(circle15X, circle15Y, circleRadius, 0, 2 * Math.PI)
    contexto_canvas.fillStyle = 'yellow'
    contexto_canvas.fill()
    contexto_canvas.strokeStyle = "black"; // Agregar borde negro
    contexto_canvas.lineWidth = 2; // Ancho del borde
    contexto_canvas.stroke()
    contexto_canvas.closePath()

    contexto_canvas.beginPath()
    contexto_canvas.arc(circle16X, circle16Y, circleRadius, 0, 2 * Math.PI)
    contexto_canvas.fillStyle = 'yellow'
    contexto_canvas.fill()
    contexto_canvas.strokeStyle = "black"; // Agregar borde negro
    contexto_canvas.lineWidth = 2; // Ancho del borde
    contexto_canvas.stroke()
    contexto_canvas.closePath()


  }, [fichasRojas, fichasVerdes, fichasAzules, fichasAmarillas, numeroSacado, posicionesIniciales, tablero])
  function handleClick(event) {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    // Verificar si se hizo clic dentro de la ficha 1
    if (x > fichasRojas.ficha1.x - 20 && x < fichasRojas.ficha1.x + 20 && y > fichasRojas.ficha1.y - 20 && y < fichasRojas.ficha1.y + 20) {
      if (x > posicionesIniciales.rojas.ficha1.x - 20 && x < posicionesIniciales.rojas.ficha1.x + 20 && y > posicionesIniciales.rojas.ficha1.y - 20 && y < posicionesIniciales.rojas.ficha1.y + 20) {
        if (!casillasOcupadas[38].casilla1) {
          setFichasRojas(prevFichas => ({
            ...prevFichas,
            ficha1: { x: tablero[38].casilla1[0], y: tablero[38].casilla1[1] } // Nuevas coordenadas de la ficha1
          }))
          const nuevasCasillasOcupadas = [...casillasOcupadas]
          // Modifica el valor de casilla1 en la posición 40
          nuevasCasillasOcupadas[38].casilla1 = true
          // Actualiza el estado con la nueva copia modificada
          setCasillasOcupadas(nuevasCasillasOcupadas)
        } else {
          if (!casillasOcupadas[38].casilla2) {
            setFichasRojas(prevFichas => ({
              ...prevFichas,
              ficha1: { x: tablero[38].casilla2[0], y: tablero[38].casilla2[1] } // Nuevas coordenadas de la ficha1
            }))
            const nuevasCasillasOcupadas = [...casillasOcupadas]
            // Modifica el valor de casilla1 en la posición 40
            nuevasCasillasOcupadas[38].casilla2 = true
            // Actualiza el estado con la nueva copia modificada
            setCasillasOcupadas(nuevasCasillasOcupadas)
          }
        }
      } else {
        setFichasRojas(prevFichas => ({
          ...prevFichas,
          ficha1: { x: fichasRojas.ficha1.x, y: fichasRojas.ficha1.y + 40 } // Nuevas coordenadas de la ficha1
        }))
      }
    }

    // Verificar si se hizo clic dentro de la ficha 2
    if (x > fichasRojas.ficha2.x - 20 && x < fichasRojas.ficha2.x + 20 && y > fichasRojas.ficha2.y - 20 && y < fichasRojas.ficha2.y + 20) {
      if (x > posicionesIniciales.rojas.ficha2.x - 20 && x < posicionesIniciales.rojas.ficha2.x + 20 && y > posicionesIniciales.rojas.ficha2.y - 20 && y < posicionesIniciales.rojas.ficha2.y + 20) {
        if (!casillasOcupadas[38].casilla1) {
          setFichasRojas(prevFichas => ({
            ...prevFichas,
            ficha2: { x: tablero[38].casilla1[0], y: tablero[38].casilla1[1] } // Nuevas coordenadas de la ficha2
          }))
          const nuevasCasillasOcupadas = [...casillasOcupadas]
          // Modifica el valor de casilla1 en la posición 40
          nuevasCasillasOcupadas[38].casilla1 = true
          // Actualiza el estado con la nueva copia modificada
          setCasillasOcupadas(nuevasCasillasOcupadas)
        } else {
          if (!casillasOcupadas[38].casilla2) {
            setFichasRojas(prevFichas => ({
              ...prevFichas,
              ficha2: { x: tablero[38].casilla2[0], y: tablero[38].casilla2[1] } // Nuevas coordenadas de la ficha2
            }))
            const nuevasCasillasOcupadas = [...casillasOcupadas]
            // Modifica el valor de casilla1 en la posición 40
            nuevasCasillasOcupadas[38].casilla2 = true
            // Actualiza el estado con la nueva copia modificada
            setCasillasOcupadas(nuevasCasillasOcupadas)
          }
        }
      } else {
        setFichasRojas(prevFichas => ({
          ...prevFichas,
          ficha2: { x: fichasRojas.ficha2.x, y: fichasRojas.ficha2.y + 40 } // Nuevas coordenadas de la ficha2
        }))
      }
    }

    // Verificar si se hizo clic dentro de la ficha 3
    if (x > fichasRojas.ficha3.x - 20 && x < fichasRojas.ficha3.x + 20 && y > fichasRojas.ficha3.y - 20 && y < fichasRojas.ficha3.y + 20) {
      if (x > posicionesIniciales.rojas.ficha3.x - 20 && x < posicionesIniciales.rojas.ficha3.x + 20 && y > posicionesIniciales.rojas.ficha3.y - 20 && y < posicionesIniciales.rojas.ficha3.y + 20) {
        if (!casillasOcupadas[38].casilla1) {
          setFichasRojas(prevFichas => ({
            ...prevFichas,
            ficha3: { x: tablero[38].casilla1[0], y: tablero[38].casilla1[1] } // Nuevas coordenadas de la ficha2
          }))
          const nuevasCasillasOcupadas = [...casillasOcupadas]
          // Modifica el valor de casilla1 en la posición 40
          nuevasCasillasOcupadas[38].casilla1 = true
          // Actualiza el estado con la nueva copia modificada
          setCasillasOcupadas(nuevasCasillasOcupadas)
        } else {
          if (!casillasOcupadas[38].casilla2) {
            setFichasRojas(prevFichas => ({
              ...prevFichas,
              ficha3: { x: tablero[38].casilla2[0], y: tablero[38].casilla2[1] } // Nuevas coordenadas de la ficha2
            }))
            const nuevasCasillasOcupadas = [...casillasOcupadas]
            // Modifica el valor de casilla1 en la posición 40
            nuevasCasillasOcupadas[38].casilla2 = true
            // Actualiza el estado con la nueva copia modificada
            setCasillasOcupadas(nuevasCasillasOcupadas)
          }
        }
      } else {
        setFichasRojas(prevFichas => ({
          ...prevFichas,
          ficha3: { x: fichasRojas.ficha3.x, y: fichasRojas.ficha3.y + 40 } // Nuevas coordenadas de la ficha2
        }))
      }

    }

    // Verificar si se hizo clic dentro de la ficha 4
    if (x > fichasRojas.ficha4.x - 20 && x < fichasRojas.ficha4.x + 20 && y > fichasRojas.ficha4.y - 20 && y < fichasRojas.ficha4.y + 20) {
      if (x > posicionesIniciales.rojas.ficha4.x - 20 && x < posicionesIniciales.rojas.ficha4.x + 20 && y > posicionesIniciales.rojas.ficha4.y - 20 && y < posicionesIniciales.rojas.ficha4.y + 20) {
        if (!casillasOcupadas[38].casilla1) {
          setFichasRojas(prevFichas => ({
            ...prevFichas,
            ficha4: { x: tablero[38].casilla1[0], y: tablero[38].casilla1[1] } // Nuevas coordenadas de la ficha2
          }))
          const nuevasCasillasOcupadas = [...casillasOcupadas]
          // Modifica el valor de casilla1 en la posición 40
          nuevasCasillasOcupadas[38].casilla1 = true
          // Actualiza el estado con la nueva copia modificada
          setCasillasOcupadas(nuevasCasillasOcupadas)
        } else {
          if (!casillasOcupadas[38].casilla2) {
            setFichasRojas(prevFichas => ({
              ...prevFichas,
              ficha4: { x: tablero[38].casilla2[0], y: tablero[38].casilla2[1] } // Nuevas coordenadas de la ficha2
            }))
            const nuevasCasillasOcupadas = [...casillasOcupadas]
            // Modifica el valor de casilla1 en la posición 40
            nuevasCasillasOcupadas[38].casilla2 = true
            // Actualiza el estado con la nueva copia modificada
            setCasillasOcupadas(nuevasCasillasOcupadas)
          }
        }
      } else {
        setFichasRojas(prevFichas => ({
          ...prevFichas,
          ficha4: { x: fichasRojas.ficha4.x, y: fichasRojas.ficha4.y + 40 } // Nuevas coordenadas de la ficha2
        }))
      }
    }
    // Verificar si se hizo clic dentro de la ficha 5
    if (x > fichasVerdes.ficha1.x - 20 && x < fichasVerdes.ficha1.x + 20 && y > fichasVerdes.ficha1.y - 20 && y < fichasVerdes.ficha1.y + 20) {
      if (x > posicionesIniciales.verdes.ficha1.x - 20 && x < posicionesIniciales.verdes.ficha1.x + 20 && y > posicionesIniciales.verdes.ficha1.y - 20 && y < posicionesIniciales.verdes.ficha1.y + 20) {
        if (!casillasOcupadas[55].casilla1) {
          setFichasVerdes(prevFichas => ({
            ...prevFichas,
            ficha1: { x: tablero[55].casilla1[0], y: tablero[55].casilla1[1] } // Nuevas coordenadas de la ficha1
          }))
          const nuevasCasillasOcupadas = [...casillasOcupadas]
          // Modifica el valor de casilla1 en la posición 40
          nuevasCasillasOcupadas[55].casilla1 = true
          // Actualiza el estado con la nueva copia modificada
          setCasillasOcupadas(nuevasCasillasOcupadas)
        } else {
          if (!casillasOcupadas[55].casilla2) {
            setFichasVerdes(prevFichas => ({
              ...prevFichas,
              ficha1: { x: tablero[55].casilla2[0], y: tablero[55].casilla2[1] } // Nuevas coordenadas de la ficha1
            }))
            const nuevasCasillasOcupadas = [...casillasOcupadas]
            // Modifica el valor de casilla1 en la posición 40
            nuevasCasillasOcupadas[55].casilla2 = true
            // Actualiza el estado con la nueva copia modificada
            setCasillasOcupadas(nuevasCasillasOcupadas)
          }
        }
      } else {
        setFichasVerdes(prevFichas => ({
          ...prevFichas,
          ficha1: { x: fichasVerdes.ficha1.x, y: fichasVerdes.ficha1.y + 40 } // Nuevas coordenadas de la ficha1
        }))
      }
    }
    // Verificar si se hizo clic dentro de la ficha 6
    if (x > fichasVerdes.ficha2.x - 20 && x < fichasVerdes.ficha2.x + 20 && y > fichasVerdes.ficha2.y - 20 && y < fichasVerdes.ficha2.y + 20) {
      if (x > posicionesIniciales.verdes.ficha2.x - 20 && x < posicionesIniciales.verdes.ficha2.x + 20 && y > posicionesIniciales.verdes.ficha2.y - 20 && y < posicionesIniciales.verdes.ficha2.y + 20) {
        if (!casillasOcupadas[55].casilla1) {
          setFichasVerdes(prevFichas => ({
            ...prevFichas,
            ficha2: { x: tablero[55].casilla1[0], y: tablero[55].casilla1[1] } // Nuevas coordenadas de la ficha2
          }))
          const nuevasCasillasOcupadas = [...casillasOcupadas]
          // Modifica el valor de casilla1 en la posición 40
          nuevasCasillasOcupadas[55].casilla1 = true
          // Actualiza el estado con la nueva copia modificada
          setCasillasOcupadas(nuevasCasillasOcupadas)
        } else {
          if (!casillasOcupadas[55].casilla2) {
            setFichasVerdes(prevFichas => ({
              ...prevFichas,
              ficha2: { x: tablero[55].casilla2[0], y: tablero[55].casilla2[1] } // Nuevas coordenadas de la ficha2
            }))
            const nuevasCasillasOcupadas = [...casillasOcupadas]
            // Modifica el valor de casilla1 en la posición 40
            nuevasCasillasOcupadas[55].casilla2 = true
            // Actualiza el estado con la nueva copia modificada
            setCasillasOcupadas(nuevasCasillasOcupadas)
          }
        }
      } else {
        setFichasVerdes(prevFichas => ({
          ...prevFichas,
          ficha2: { x: fichasVerdes.ficha2.x, y: fichasVerdes.ficha2.y + 40 } // Nuevas coordenadas de la ficha1
        }))
      }
    }
    // Verificar si se hizo clic dentro de la ficha 7
    if (x > fichasVerdes.ficha3.x - 20 && x < fichasVerdes.ficha3.x + 20 && y > fichasVerdes.ficha3.y - 20 && y < fichasVerdes.ficha3.y + 20) {
      if (x > posicionesIniciales.verdes.ficha3.x - 20 && x < posicionesIniciales.verdes.ficha3.x + 20 && y > posicionesIniciales.verdes.ficha3.y - 20 && y < posicionesIniciales.verdes.ficha3.y + 20) {
        if (!casillasOcupadas[55].casilla1) {
          setFichasVerdes(prevFichas => ({
            ...prevFichas,
            ficha3: { x: tablero[55].casilla1[0], y: tablero[55].casilla1[1] } // Nuevas coordenadas de la ficha3
          }))
          const nuevasCasillasOcupadas = [...casillasOcupadas]
          // Modifica el valor de casilla1 en la posición 40
          nuevasCasillasOcupadas[55].casilla1 = true
          // Actualiza el estado con la nueva copia modificada
          setCasillasOcupadas(nuevasCasillasOcupadas)
        } else {
          if (!casillasOcupadas[55].casilla2) {
            setFichasVerdes(prevFichas => ({
              ...prevFichas,
              ficha3: { x: tablero[55].casilla2[0], y: tablero[55].casilla2[1] } // Nuevas coordenadas de la ficha3
            }))
            const nuevasCasillasOcupadas = [...casillasOcupadas]
            // Modifica el valor de casilla1 en la posición 40
            nuevasCasillasOcupadas[55].casilla2 = true
            // Actualiza el estado con la nueva copia modificada
            setCasillasOcupadas(nuevasCasillasOcupadas)
          }
        }
      } else {
        setFichasVerdes(prevFichas => ({
          ...prevFichas,
          ficha3: { x: fichasVerdes.ficha3.x, y: fichasVerdes.ficha3.y + 40 } // Nuevas coordenadas de la ficha1
        }))
      }
    }
    // Verificar si se hizo clic dentro de la ficha 8
    if (x > fichasVerdes.ficha4.x - 20 && x < fichasVerdes.ficha4.x + 20 && y > fichasVerdes.ficha4.y - 20 && y < fichasVerdes.ficha4.y + 20) {
      if (x > posicionesIniciales.verdes.ficha4.x - 20 && x < posicionesIniciales.verdes.ficha4.x + 20 && y > posicionesIniciales.verdes.ficha4.y - 20 && y < posicionesIniciales.verdes.ficha4.y + 20) {
        if (!casillasOcupadas[55].casilla1) {
          setFichasVerdes(prevFichas => ({
            ...prevFichas,
            ficha4: { x: tablero[55].casilla1[0], y: tablero[55].casilla1[1] } // Nuevas coordenadas de la ficha4
          }))
          const nuevasCasillasOcupadas = [...casillasOcupadas]
          // Modifica el valor de casilla1 en la posición 40
          nuevasCasillasOcupadas[55].casilla1 = true
          // Actualiza el estado con la nueva copia modificada
          setCasillasOcupadas(nuevasCasillasOcupadas)
        } else {
          if (!casillasOcupadas[55].casilla2) {
            setFichasVerdes(prevFichas => ({
              ...prevFichas,
              ficha4: { x: tablero[55].casilla2[0], y: tablero[55].casilla2[1] } // Nuevas coordenadas de la ficha4
            }))
            const nuevasCasillasOcupadas = [...casillasOcupadas]
            // Modifica el valor de casilla1 en la posición 40
            nuevasCasillasOcupadas[55].casilla2 = true
            // Actualiza el estado con la nueva copia modificada
            setCasillasOcupadas(nuevasCasillasOcupadas)
          }
        }
      } else {
        setFichasVerdes(prevFichas => ({
          ...prevFichas,
          ficha4: { x: fichasVerdes.ficha4.x, y: fichasVerdes.ficha4.y + 40 } // Nuevas coordenadas de la ficha1
        }))
      }
    }
    // Verificar si se hizo clic dentro de la ficha 9
    if (x > fichasAzules.ficha1.x - 20 && x < fichasAzules.ficha1.x + 20 && y > fichasAzules.ficha1.y - 20 && y < fichasAzules.ficha1.y + 20) {
      if (x > posicionesIniciales.azules.ficha1.x - 20 && x < posicionesIniciales.azules.ficha1.x + 20 && y > posicionesIniciales.azules.ficha1.y - 20 && y < posicionesIniciales.azules.ficha1.y + 20) {
        if (!casillasOcupadas[21].casilla1) {
          setFichasAzules(prevFichas => ({
            ...prevFichas,
            ficha1: { x: tablero[21].casilla1[0], y: tablero[21].casilla1[1] } // Nuevas coordenadas de la ficha1
          }))
          const nuevasCasillasOcupadas = [...casillasOcupadas]
          // Modifica el valor de casilla1 en la posición 40
          nuevasCasillasOcupadas[21].casilla1 = true
          // Actualiza el estado con la nueva copia modificada
          setCasillasOcupadas(nuevasCasillasOcupadas)
        } else {
          if (!casillasOcupadas[21].casilla2) {
            setFichasAzules(prevFichas => ({
              ...prevFichas,
              ficha1: { x: tablero[21].casilla2[0], y: tablero[21].casilla2[1] } // Nuevas coordenadas de la ficha1
            }))
            const nuevasCasillasOcupadas = [...casillasOcupadas]
            // Modifica el valor de casilla1 en la posición 40
            nuevasCasillasOcupadas[21].casilla2 = true
            // Actualiza el estado con la nueva copia modificada
            setCasillasOcupadas(nuevasCasillasOcupadas)
          }
        }
      } else {
        setFichasAzules(prevFichas => ({
          ...prevFichas,
          ficha1: { x: fichasAzules.ficha1.x, y: fichasAzules.ficha1.y + 40 } // Nuevas coordenadas de la ficha1
        }))
      }
    }
    // Verificar si se hizo clic dentro de la ficha 10
    if (x > fichasAzules.ficha2.x - 20 && x < fichasAzules.ficha2.x + 20 && y > fichasAzules.ficha2.y - 20 && y < fichasAzules.ficha2.y + 20) {
      if (x > posicionesIniciales.azules.ficha2.x - 20 && x < posicionesIniciales.azules.ficha2.x + 20 && y > posicionesIniciales.azules.ficha2.y - 20 && y < posicionesIniciales.azules.ficha2.y + 20) {
        if (!casillasOcupadas[21].casilla1) {
          setFichasAzules(prevFichas => ({
            ...prevFichas,
            ficha2: { x: tablero[21].casilla1[0], y: tablero[21].casilla1[1] } // Nuevas coordenadas de la ficha2
          }))
          const nuevasCasillasOcupadas = [...casillasOcupadas]
          // Modifica el valor de casilla1 en la posición 40
          nuevasCasillasOcupadas[21].casilla1 = true
          // Actualiza el estado con la nueva copia modificada
          setCasillasOcupadas(nuevasCasillasOcupadas)
        } else {
          if (!casillasOcupadas[21].casilla2) {
            setFichasAzules(prevFichas => ({
              ...prevFichas,
              ficha2: { x: tablero[21].casilla2[0], y: tablero[21].casilla2[1] } // Nuevas coordenadas de la ficha2
            }))
            const nuevasCasillasOcupadas = [...casillasOcupadas]
            // Modifica el valor de casilla1 en la posición 40
            nuevasCasillasOcupadas[21].casilla2 = true
            // Actualiza el estado con la nueva copia modificada
            setCasillasOcupadas(nuevasCasillasOcupadas)
          }
        }
      } else {
        setFichasAzules(prevFichas => ({
          ...prevFichas,
          ficha2: { x: fichasAzules.ficha2.x, y: fichasAzules.ficha2.y + 40 } // Nuevas coordenadas de la ficha1
        }))
      }
    }
    // Verificar si se hizo clic dentro de la ficha 10
    if (x > fichasAzules.ficha3.x - 20 && x < fichasAzules.ficha3.x + 20 && y > fichasAzules.ficha3.y - 20 && y < fichasAzules.ficha3.y + 20) {
      if (x > posicionesIniciales.azules.ficha3.x - 20 && x < posicionesIniciales.azules.ficha3.x + 20 && y > posicionesIniciales.azules.ficha3.y - 20 && y < posicionesIniciales.azules.ficha3.y + 20) {
        if (!casillasOcupadas[21].casilla1) {
          setFichasAzules(prevFichas => ({
            ...prevFichas,
            ficha3: { x: tablero[21].casilla1[0], y: tablero[21].casilla1[1] } // Nuevas coordenadas de la ficha3
          }))
          const nuevasCasillasOcupadas = [...casillasOcupadas]
          // Modifica el valor de casilla1 en la posición 40
          nuevasCasillasOcupadas[21].casilla1 = true
          // Actualiza el estado con la nueva copia modificada
          setCasillasOcupadas(nuevasCasillasOcupadas)
        } else {
          if (!casillasOcupadas[21].casilla2) {
            setFichasAzules(prevFichas => ({
              ...prevFichas,
              ficha3: { x: tablero[21].casilla2[0], y: tablero[21].casilla2[1] } // Nuevas coordenadas de la ficha3
            }))
            const nuevasCasillasOcupadas = [...casillasOcupadas]
            // Modifica el valor de casilla1 en la posición 40
            nuevasCasillasOcupadas[21].casilla2 = true
            // Actualiza el estado con la nueva copia modificada
            setCasillasOcupadas(nuevasCasillasOcupadas)
          }
        }
      } else {
        setFichasAzules(prevFichas => ({
          ...prevFichas,
          ficha3: { x: fichasAzules.ficha3.x, y: fichasAzules.ficha3.y + 40 } // Nuevas coordenadas de la ficha1
        }))
      }
    }
    // Verificar si se hizo clic dentro de la ficha 10
    if (x > fichasAzules.ficha4.x - 20 && x < fichasAzules.ficha4.x + 20 && y > fichasAzules.ficha4.y - 20 && y < fichasAzules.ficha4.y + 20) {
      if (x > posicionesIniciales.azules.ficha4.x - 20 && x < posicionesIniciales.azules.ficha4.x + 20 && y > posicionesIniciales.azules.ficha4.y - 20 && y < posicionesIniciales.azules.ficha4.y + 20) {
        if (!casillasOcupadas[21].casilla1) {
          setFichasAzules(prevFichas => ({
            ...prevFichas,
            ficha4: { x: tablero[21].casilla1[0], y: tablero[21].casilla1[1] } // Nuevas coordenadas de la ficha4
          }))
          const nuevasCasillasOcupadas = [...casillasOcupadas]
          // Modifica el valor de casilla1 en la posición 40
          nuevasCasillasOcupadas[21].casilla1 = true
          // Actualiza el estado con la nueva copia modificada
          setCasillasOcupadas(nuevasCasillasOcupadas)
        } else {
          if (!casillasOcupadas[21].casilla2) {
            setFichasAzules(prevFichas => ({
              ...prevFichas,
              ficha4: { x: tablero[21].casilla2[0], y: tablero[21].casilla2[1] } // Nuevas coordenadas de la ficha4
            }))
            const nuevasCasillasOcupadas = [...casillasOcupadas]
            // Modifica el valor de casilla1 en la posición 40
            nuevasCasillasOcupadas[21].casilla2 = true
            // Actualiza el estado con la nueva copia modificada
            setCasillasOcupadas(nuevasCasillasOcupadas)
          }
        }
      } else {
        setFichasAzules(prevFichas => ({
          ...prevFichas,
          ficha4: { x: fichasAzules.ficha4.x, y: fichasAzules.ficha4.y + 40 } // Nuevas coordenadas de la ficha1
        }))
      }
    }
    // Verificar si se hizo clic dentro de la ficha 9
    if (x > fichasAmarillas.ficha1.x - 20 && x < fichasAmarillas.ficha1.x + 20 && y > fichasAmarillas.ficha1.y - 20 && y < fichasAmarillas.ficha1.y + 20) {
      if (x > posicionesIniciales.amarillas.ficha1.x - 20 && x < posicionesIniciales.amarillas.ficha1.x + 20 && y > posicionesIniciales.amarillas.ficha1.y - 20 && y < posicionesIniciales.amarillas.ficha1.y + 20) {
        if (!casillasOcupadas[4].casilla1) {
          setFichasAmarillas(prevFichas => ({
            ...prevFichas,
            ficha1: { x: tablero[4].casilla1[0], y: tablero[4].casilla1[1] } // Nuevas coordenadas de la ficha1
          }))
          const nuevasCasillasOcupadas = [...casillasOcupadas]
          // Modifica el valor de casilla1 en la posición 40
          nuevasCasillasOcupadas[4].casilla1 = true
          // Actualiza el estado con la nueva copia modificada
          setCasillasOcupadas(nuevasCasillasOcupadas)
        } else {
          if (!casillasOcupadas[4].casilla2) {
            setFichasAmarillas(prevFichas => ({
              ...prevFichas,
              ficha1: { x: tablero[4].casilla2[0], y: tablero[4].casilla2[1] } // Nuevas coordenadas de la ficha1
            }))
            const nuevasCasillasOcupadas = [...casillasOcupadas]
            // Modifica el valor de casilla1 en la posición 40
            nuevasCasillasOcupadas[21].casilla2 = true
            // Actualiza el estado con la nueva copia modificada
            setCasillasOcupadas(nuevasCasillasOcupadas)
          }
        }
      } else {
        setFichasAmarillas(prevFichas => ({
          ...prevFichas,
          ficha1: { x: fichasAmarillas.ficha1.x, y: fichasAmarillas.ficha1.y + 40 } // Nuevas coordenadas de la ficha1
        }))
      }
    }
    // Verificar si se hizo clic dentro de la ficha 9
    if (x > fichasAmarillas.ficha2.x - 20 && x < fichasAmarillas.ficha2.x + 20 && y > fichasAmarillas.ficha2.y - 20 && y < fichasAmarillas.ficha2.y + 20) {
      if (x > posicionesIniciales.amarillas.ficha2.x - 20 && x < posicionesIniciales.amarillas.ficha2.x + 20 && y > posicionesIniciales.amarillas.ficha2.y - 20 && y < posicionesIniciales.amarillas.ficha2.y + 20) {
        if (!casillasOcupadas[4].casilla1) {
          setFichasAmarillas(prevFichas => ({
            ...prevFichas,
            ficha2: { x: tablero[4].casilla1[0], y: tablero[4].casilla1[1] } // Nuevas coordenadas de la ficha2
          }))
          const nuevasCasillasOcupadas = [...casillasOcupadas]
          // Modifica el valor de casilla1 en la posición 40
          nuevasCasillasOcupadas[4].casilla1 = true
          // Actualiza el estado con la nueva copia modificada
          setCasillasOcupadas(nuevasCasillasOcupadas)
        } else {
          if (!casillasOcupadas[4].casilla2) {
            setFichasAmarillas(prevFichas => ({
              ...prevFichas,
              ficha2: { x: tablero[4].casilla2[0], y: tablero[4].casilla2[1] } // Nuevas coordenadas de la ficha2
            }))
            const nuevasCasillasOcupadas = [...casillasOcupadas]
            // Modifica el valor de casilla1 en la posición 40
            nuevasCasillasOcupadas[21].casilla2 = true
            // Actualiza el estado con la nueva copia modificada
            setCasillasOcupadas(nuevasCasillasOcupadas)
          }
        }
      } else {
        setFichasAmarillas(prevFichas => ({
          ...prevFichas,
          ficha2: { x: fichasAmarillas.ficha2.x, y: fichasAmarillas.ficha2.y + 40 } // Nuevas coordenadas de la ficha1
        }))
      }
    }
    // Verificar si se hizo clic dentro de la ficha 9
    if (x > fichasAmarillas.ficha3.x - 20 && x < fichasAmarillas.ficha3.x + 20 && y > fichasAmarillas.ficha3.y - 20 && y < fichasAmarillas.ficha3.y + 20) {
      if (x > posicionesIniciales.amarillas.ficha3.x - 20 && x < posicionesIniciales.amarillas.ficha3.x + 20 && y > posicionesIniciales.amarillas.ficha3.y - 20 && y < posicionesIniciales.amarillas.ficha3.y + 20) {
        if (!casillasOcupadas[4].casilla1) {
          setFichasAmarillas(prevFichas => ({
            ...prevFichas,
            ficha3: { x: tablero[4].casilla1[0], y: tablero[4].casilla1[1] } // Nuevas coordenadas de la ficha3
          }))
          const nuevasCasillasOcupadas = [...casillasOcupadas]
          // Modifica el valor de casilla1 en la posición 40
          nuevasCasillasOcupadas[4].casilla1 = true
          // Actualiza el estado con la nueva copia modificada
          setCasillasOcupadas(nuevasCasillasOcupadas)
        } else {
          if (!casillasOcupadas[4].casilla2) {
            setFichasAmarillas(prevFichas => ({
              ...prevFichas,
              ficha3: { x: tablero[4].casilla2[0], y: tablero[4].casilla2[1] } // Nuevas coordenadas de la ficha3
            }))
            const nuevasCasillasOcupadas = [...casillasOcupadas]
            // Modifica el valor de casilla1 en la posición 40
            nuevasCasillasOcupadas[21].casilla2 = true
            // Actualiza el estado con la nueva copia modificada
            setCasillasOcupadas(nuevasCasillasOcupadas)
          }
        }
      } else {
        setFichasAmarillas(prevFichas => ({
          ...prevFichas,
          ficha3: { x: fichasAmarillas.ficha3.x, y: fichasAmarillas.ficha3.y + 40 } // Nuevas coordenadas de la ficha1
        }))
      }
    }
    // Verificar si se hizo clic dentro de la ficha 9
    if (x > fichasAmarillas.ficha4.x - 20 && x < fichasAmarillas.ficha4.x + 20 && y > fichasAmarillas.ficha4.y - 20 && y < fichasAmarillas.ficha4.y + 20) {
      if (x > posicionesIniciales.amarillas.ficha4.x - 20 && x < posicionesIniciales.amarillas.ficha4.x + 20 && y > posicionesIniciales.amarillas.ficha4.y - 20 && y < posicionesIniciales.amarillas.ficha4.y + 20) {
        if (!casillasOcupadas[4].casilla1) {
          setFichasAmarillas(prevFichas => ({
            ...prevFichas,
            ficha4: { x: tablero[4].casilla1[0], y: tablero[4].casilla1[1] } // Nuevas coordenadas de la ficha4
          }))
          const nuevasCasillasOcupadas = [...casillasOcupadas]
          // Modifica el valor de casilla1 en la posición 40
          nuevasCasillasOcupadas[4].casilla1 = true
          // Actualiza el estado con la nueva copia modificada
          setCasillasOcupadas(nuevasCasillasOcupadas)
        } else {
          if (!casillasOcupadas[4].casilla2) {
            setFichasAmarillas(prevFichas => ({
              ...prevFichas,
              ficha4: { x: tablero[4].casilla2[0], y: tablero[4].casilla2[1] } // Nuevas coordenadas de la ficha4
            }))
            const nuevasCasillasOcupadas = [...casillasOcupadas]
            // Modifica el valor de casilla1 en la posición 40
            nuevasCasillasOcupadas[21].casilla2 = true
            // Actualiza el estado con la nueva copia modificada
            setCasillasOcupadas(nuevasCasillasOcupadas)
          }
        }
      } else {
        setFichasAmarillas(prevFichas => ({
          ...prevFichas,
          ficha4: { x: fichasAmarillas.ficha4.x, y: fichasAmarillas.ficha4.y + 40 } // Nuevas coordenadas de la ficha1
        }))
      }
    }
  }
  return (
    <div>
      <div className='w-full h-full'>
        <canvas ref={canvasRef} width={800} height={800} />
        <Button onClick={lanzarDado}>Lanzar dado</Button>
        <Link to='/' className='flex items-center'>
          <Button>Volver</Button>
        </Link>
      </div>
    </div>
  )
}
