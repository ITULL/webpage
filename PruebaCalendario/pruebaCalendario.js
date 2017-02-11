//Calculo variables imporatantes de la fecha
var date = new Date();
var fecha = date.toDateString();
var mes = fecha.slice(4,7);
var diaMes = fecha.slice(8,10);
var diaSemanaNum = date.getDay();
var mesNum = date.getMonth();
var ano = date.getFullYear();
var comienzo = diaSemanaNum - ((diaMes%7)-1);
if(comienzo<0){
    comienzo = 7 + comienzo;
}

//Vectores de conocimiento
var diasMes = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
var mesesAno = [31,28,31,30,31,30,31,31,30,31,30,31];
var mesesAnoBisiesto = [31,29,31,30,31,30,31,31,30,31,30,31];

//Relleno de numeros del calendario
var indice = 1 - diaSemanaNum;
for(var j=0; j<6; j++){
    var NumSemana = 'sem' + j;
    var DiasSemana = document.getElementById(NumSemana);
    console.log(DiasSemana);
    for(var i=indice; i<(indice+7); i++){
        var dia = DiasSemana.childNodes[i+diaSemanaNum];
        var NumTemp = ((j*7)+(i+diaSemanaNum))-(comienzo-1);

        //Comprobacion de año bisiesto
        if((ano%4==0&&ano%100!=0)||(ano%100==0&&ano%400==0)){
            if(j==0){
                if((i+diaSemanaNum)<comienzo){
                    dia.innerHTML = (mesesAnoBisiesto[mesNum-1] - ((comienzo-1)-(i+diaSemanaNum)));
                }else{
                    dia.innerHTML = NumTemp;
                }
            }else {
                if(NumTemp<=mesesAnoBisiesto[mesNum]){
                    dia.innerHTML = NumTemp;
                }else{
                    dia.innerHTML = NumTemp%mesesAnoBisiesto[mesNum];
                }
            }
        }else{
            if(j==0){
                if((i+diaSemanaNum)<comienzo){
                    dia.innerHTML = (mesesAno[mesNum-1] - ((comienzo-1)-(i+diaSemanaNum)));
                }else{
                    dia.innerHTML = NumTemp;
                }
            }else {
                if(NumTemp<=mesesAno[mesNum]){
                    dia.innerHTML = NumTemp;
                }else{
                    dia.innerHTML = NumTemp%mesesAno[mesNum];
                }
            }
        }
    }
}
