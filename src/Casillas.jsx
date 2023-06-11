export function array() {
  const tablero = []
  for (let index = 1; index <= 68; index++) {
    var ficha = {
      "numero": index,
      "nFichas": 0,
      "especial": false,
      "casilla1": [0, 0],
      "casilla2": [0, 0],
      "color": ""
    }
    tablero[index - 1] = ficha
  }
  for (let i = 0; i < tablero.length; i++) {
    let ficha = tablero[i]
    switch (ficha.numero) {
      case 1:
        ficha.casilla1 = [460, 780,true]
        ficha.casilla2 = [500, 780,true]
        break;
      case 2:
        ficha.casilla1 = [460, 740,true]
        ficha.casilla2 = [500, 740,true]
        break;
      case 3:
        ficha.casilla1 = [460, 700,true]
        ficha.casilla2 = [500, 700,true]
        break;
      case 4:
        ficha.casilla1 = [460, 660,true]
        ficha.casilla2 = [500, 660,true]
        break;
      case 5:
        ficha.casilla1 = [460, 620,true]
        ficha.casilla2 = [500, 620,true]
        ficha.especial = true;
        break;
      case 6:
        ficha.casilla1 = [460, 580,true]
        ficha.casilla2 = [500, 580,true]
        break;
      case 7:
        ficha.casilla1 = [460, 540,true]
        ficha.casilla2 = [500, 540,true]
        break;
      case 8:
        ficha.casilla1 = [450, 500,true]
        ficha.casilla2 = [490, 500,true]
        break;
      case 9:
        ficha.casilla1 = [500, 460,true]
        ficha.casilla2 = [510, 500,true]
        break;
      case 10:
        ficha.casilla1 = [540, 460,true]
        ficha.casilla2 = [540, 500,true]
        break;
      case 11:
        ficha.casilla1 = [580, 460,true]
        ficha.casilla2 = [580, 500,true]
        break;
      case 12:
        ficha.casilla1 = [620, 460,true]
        ficha.casilla2 = [620, 500,true]
        ficha.especial = true;
        break;
      case 13:
        ficha.casilla1 = [660, 460,true]
        ficha.casilla2 = [660, 500,true]
        break;
      case 14:
        ficha.casilla1 = [700, 460,true]
        ficha.casilla2 = [700, 500,true]
        break;
      case 15:
        ficha.casilla1 = [740, 460,true]
        ficha.casilla2 = [740, 500,true]
        break;
      case 16:
        ficha.casilla1 = [780, 460,true]
        ficha.casilla2 = [780, 500,true]
        break;
      case 17:
        ficha.casilla1 = [780, 380,true]
        ficha.casilla2 = [780, 420,true]
        ficha.especial = true
        break;
      case 18:
        ficha.casilla1 = [780, 300,true]
        ficha.casilla2 = [780, 340,true]
        break;
      case 19:
        ficha.casilla1 = [740, 300,true]
        ficha.casilla2 = [740, 340,true]
        break;
      case 20:
        ficha.casilla1 = [700, 300,true]
        ficha.casilla2 = [700, 340,true]
        break;
      case 21:
        ficha.casilla1 = [660, 300,true]
        ficha.casilla2 = [660, 340,true]
        break;
      case 22:
        ficha.casilla1 = [620, 300,true]
        ficha.casilla2 = [620, 340,true]
        ficha.especial = true
        break;
      case 23:
        ficha.casilla1 = [580, 300,true]
        ficha.casilla2 = [580, 340,true]
        break;
      case 24:
        ficha.casilla1 = [540, 300,true]
        ficha.casilla2 = [540, 340,true]
        break;
      case 25:
        ficha.casilla1 = [500, 310,true]
        ficha.casilla2 = [500, 350,true]
        break;
      case 26:
        ficha.casilla1 = [500, 290,true]
        ficha.casilla2 = [460, 300,true]
        break;
      case 27:
        ficha.casilla1 = [500, 260,true]
        ficha.casilla2 = [460, 260,true]
        break;
      case 28:
        ficha.casilla1 = [500, 220,true]
        ficha.casilla2 = [460, 220,true]
        break;
      case 29:
        ficha.casilla1 = [500, 180,true]
        ficha.casilla2 = [460, 180,true]
        ficha.especial = true
        break;
      case 30:
        ficha.casilla1 = [500, 140,true]
        ficha.casilla2 = [460, 140,true]
        break;
      case 31:
        ficha.casilla1 = [500, 100,true]
        ficha.casilla2 = [460, 100,true]
        break;
      case 32:
        ficha.casilla1 = [500, 60,true]
        ficha.casilla2 = [460, 60,true]
        break;
      case 33:
        ficha.casilla1 = [500, 20,true]
        ficha.casilla2 = [460, 20,true]
        break;
      case 34:
        ficha.casilla1 = [420, 20,true]
        ficha.casilla2 = [380, 20,true]
        ficha.especial = true
        break;
      case 35:
        ficha.casilla1 = [340, 20,true]
        ficha.casilla2 = [300, 20,true]
        break;
      case 36:
        ficha.casilla1 = [340, 60,true]
        ficha.casilla2 = [300, 60,true]
        break;
      case 37:
        ficha.casilla1 = [340, 100,true]
        ficha.casilla2 = [300, 100,true]
        break;
      case 38:
        ficha.casilla1 = [340, 140,true]
        ficha.casilla2 = [300, 140,true]
        break;
      case 39:
        ficha.casilla1 = [340, 180,true]
        ficha.casilla2 = [300, 180,true]
        ficha.especial = true
        break;
      case 40:
        ficha.casilla1 = [340, 220,true]
        ficha.casilla2 = [300, 220,true]
        break;
      case 41:
        ficha.casilla1 = [340, 260,true]
        ficha.casilla2 = [300, 260,true]
        break;
      case 42:
        ficha.casilla1 = [350, 300,true]
        ficha.casilla2 = [310, 300,true]
        break;
      case 43:
        ficha.casilla1 = [290, 300,true]
        ficha.casilla2 = [300, 340,true]
        break;
      case 44:
        ficha.casilla1 = [260, 300,true]
        ficha.casilla2 = [260, 340,true]
        break;
      case 45:
        ficha.casilla1 = [220, 300,true]
        ficha.casilla2 = [220, 340,true]
        break;
      case 46:
        ficha.casilla1 = [180, 300,true]
        ficha.casilla2 = [180, 340,true]
        ficha.especial = true
        break;
      case 47:
        ficha.casilla1 = [140, 300,true]
        ficha.casilla2 = [140, 340,true]
        break;
      case 48:
        ficha.casilla1 = [100, 300,true]
        ficha.casilla2 = [100, 340,true]
        break;
      case 49:
        ficha.casilla1 = [60, 300,true]
        ficha.casilla2 = [60, 340,true]
        break;
      case 50:
        ficha.casilla1 = [20, 300,true]
        ficha.casilla2 = [20, 340,true]
        break;
      case 51:
        ficha.casilla1 = [20, 380,true]
        ficha.casilla2 = [20, 420,true]
        ficha.especial = true
        break;
      case 52:
        ficha.casilla1 = [20, 460,true]
        ficha.casilla2 = [20, 500,true]
        break;
      case 53:
        ficha.casilla1 = [60, 460,true]
        ficha.casilla2 = [60, 500,true]
        break;
      case 54:
        ficha.casilla1 = [100, 460,true]
        ficha.casilla2 = [100, 500,true]
        break;
      case 55:
        ficha.casilla1 = [140, 460,true]
        ficha.casilla2 = [140, 500,true]
        break;
      case 56:
        ficha.casilla1 = [180, 460,true]
        ficha.casilla2 = [180, 500,true]
        ficha.especial = true
        break;
      case 57:
        ficha.casilla1 = [220, 460,true]
        ficha.casilla2 = [220, 500,true]
        break;
      case 58:
        ficha.casilla1 = [260, 460,true]
        ficha.casilla2 = [260, 500,true]
        break;
      case 59:
        ficha.casilla1 = [300, 450,true]
        ficha.casilla2 = [300, 490,true]
        break;
      case 60:
        ficha.casilla1 = [340, 500,true]
        ficha.casilla2 = [300, 510,true]
        break;
      case 61:
        ficha.casilla1 = [340, 540,true]
        ficha.casilla2 = [300, 540,true]
        break;
      case 62:
        ficha.casilla1 = [340, 580,true]
        ficha.casilla2 = [300, 580,true]
        break;
      case 63:
        ficha.casilla1 = [340, 620,true]
        ficha.casilla2 = [300, 620,true]
        ficha.especial = true;
        break;
      case 64:
        ficha.casilla1 = [340, 660,true]
        ficha.casilla2 = [300, 660,true]
        break;
      case 65:
        ficha.casilla1 = [340, 720,true]
        ficha.casilla2 = [300, 720,true]
        break;
      case 66:
        ficha.casilla1 = [340, 740,true]
        ficha.casilla2 = [300, 740,true]
        break;
      case 67:
        ficha.casilla1 = [340, 780,true]
        ficha.casilla2 = [300, 780,true]
        break;
      case 68:
        ficha.casilla1 = [420, 780,true]
        ficha.casilla2 = [380, 780,true]
        ficha.especial = true
        break;
    }
  }
  return tablero
}