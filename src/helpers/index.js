const calcularTotalPagar = (cantidad, plazo) => {
    let total;
    //Mayor la cantidad, menor el interes

    if(cantidad < 300000){
        total = cantidad * 1.5
    }else if (cantidad >= 300000 && cantidad < 500000){
        total = cantidad * 1.4
    }else if (cantidad >= 500000 && cantidad < 800000){
        total = cantidad * 1.3
    }else{
        total = cantidad * 1.2
    }

    //Mas plazo, más interes
    if(plazo === 6){
        total *= 1.1;
    }else if(plazo === 12){
        total *= 1.2;
    }else {
        total *= 1.3;
    }

    return total;
}

export {calcularTotalPagar};