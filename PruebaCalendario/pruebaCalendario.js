//Variable global de fecha
var date = new Date();

//Vectores de conocimiento
var diasMes = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
var mesesAno = [31,28,31,30,31,30,31,31,30,31,30,31];
var mesesAnoBisiesto = [31,29,31,30,31,30,31,31,30,31,30,31];
var mesesNombre = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

//Pintar HTML
document.getElementById('calendar').innerHTML = '<div id="calendarEncabezado"><button id="calenarToday" onclick="IrHoy()">Hoy</button><button id="calendarMonthPrev" onclick="uptMonth(-1)">Prev</button><span id="calendarMonthName"></span><button id="calendarMonthNext" onclick="uptMonth(1)">Next</button></div><div id="semanas"><div id="titsem"><div class="day">Lunes</div><div class="day">Martes</div><div class="day">Miercoles</div><div class="day">Jueves</div><div class="day">Viernes</div><div class="day">Sabado</div><div class="day">Domingo</div></div><div id="sem0" class="sem"><div class="day" id="d01"></div><div class="day" id="d02"></div><div class="day" id="d03"></div><div class="day" id="d04"></div><div class="day" id="d05"></div><div class="day" id="d06"></div><div class="day" id="d07"></div></div><div id="sem1" class="sem"><div class="day" id="d08"></div><div class="day" id="d09"></div><div class="day" id="d10"></div><div class="day" dia="d11"></div><div class="day" id="d12"></div><div class="day" id="d13"></div><div class="day" id="d14"></div></div><div id="sem2" class="sem"><div class="day" id="d15"></div><div class="day" id="d16"></div><div class="day" id="d17"></div><div class="day" id="d18"></div><div class="day" id="d19"></div><div class="day" id="d20"></div><div class="day" id="d21"></div></div><div id="sem3" class="sem"><div class="day" id="d22"></div><div class="day" id="d23"></div><div class="day" id="d24"></div><div class="day" id="d25"></div><div class="day" id="d26"></div><div class="day" id="d27"></div><div class="day" id="d28"></div></div><div id="sem4" class="sem"><div class="day" id="d29"></div><div class="day" id="d30"></div><div class="day" id="d31"></div><div class="day" id="d32"></div><div class="day" id="d33"></div><div class="day" id="d34"></div><div class="day" id="d35"></div></div><div id="sem5" class="sem"><div class="day" id="d36"></div><div class="day" id="d37"></div><div class="day" id="d38"></div><div class="day" id="d39"></div><div class="day" id="d40"></div><div class="day" id="d41"></div><div class="day" id="d42"></div></div></div>';

//Rellenar  datos calendario
dibujarCalendario();

//Get pos de vector circular
function getEleVec(vec,pos) {
    if(pos<0){
        return vec[(vec.length+pos)];
    }else{
        return vec[pos];
    }
}

function dibujarCalendario() {
    //Calculo variables imporatantes de la fecha
    var fecha = date.toDateString();
    var mes = fecha.slice(4,7);
    var diaMes = fecha.slice(8,10);
    var diaSemanaNum = date.getDay()-1;
    var mesNum = date.getMonth();
    var ano = date.getFullYear();
    var comienzo = diaSemanaNum - ((diaMes%7)-1);
    //Comprobacion es dia de primera semana
    if(comienzo<0){
        comienzo = 7 + comienzo;
    }

    //Relleno encabezado
    document.getElementById('calendarMonthName').innerHTML = getEleVec(mesesNombre, mesNum);

    //Relleno de numeros del calendario
    var indice = 0 - diaSemanaNum;
    //Selecciona las semanas
    for(var j=0; j<6; j++){
        var NumSemana = 'sem' + j;
        var DiasSemana = document.getElementById(NumSemana);
        //Selecciona los dias
        for(var i=indice; i<(indice+7); i++){
            var dia = DiasSemana.childNodes[i+diaSemanaNum];
            var NumTemp = ((j*7)+(i+diaSemanaNum))-(comienzo-1);

            //Comprobacion de año bisiesto
            if((ano%4==0&&ano%100!=0)||(ano%100==0&&ano%400==0)){
                if(j==0){
                    //Comprobacion de dias anteriores al mes
                    if((i+diaSemanaNum)<comienzo){
                        dia.innerHTML = (getEleVec(mesesAnoBisiesto, mesNum-1) - ((comienzo-1)-(i+diaSemanaNum)));
                    }else{
                        dia.innerHTML = NumTemp;
                    }
                }else {
                    //Comprobacion de dias siguientes al mes
                    if(NumTemp<=mesesAnoBisiesto[mesNum]){
                        dia.innerHTML = NumTemp;
                    }else{
                        dia.innerHTML = NumTemp%getEleVec(mesesAnoBisiesto, mesNum);
                    }
                }
            }else{
                if(j==0){
                    if((i+diaSemanaNum)<comienzo){
                        dia.innerHTML = (getEleVec(mesesAno, mesNum-1) - ((comienzo-1)-(i+diaSemanaNum)));
                    }else{
                        dia.innerHTML = NumTemp;
                    }
                }else {
                    if(NumTemp<=mesesAno[mesNum]){
                        dia.innerHTML = NumTemp;
                    }else{
                        dia.innerHTML = NumTemp%getEleVec(mesesAno, mesNum);
                    }
                }
            }
        }
    }
}

//Aumentar o disminuir el mes
function uptMonth(uptVal) {
    var mesNuevo;
    var anoNuevo = date.getFullYear();

    //Cambio de año
    if(date.getMonth()==0&&uptVal==-1){
        mesNuevo = 12;
        anoNuevo = date.getFullYear()-1;
    }else if(date.getMonth()==11&&uptVal==1){
        mesNuevo = 1;
        anoNuevo = date.getFullYear()+1;
    }else{
        mesNuevo = date.getMonth()+uptVal+1;
    }

    //Crear nueva fecha
    var fechaNueva = anoNuevo + '-' + mesNuevo + '-' + '1';
    date = new Date(fechaNueva);

    //Dibuja el calendario
    dibujarCalendario();
}

function IrHoy() {
    date = new Date();

    dibujarCalendario();
}
