
import nools  from 'nools';
const flowUser = nools.compile(require.resolve('../../res/user_reglas.nools'));
const UserDatos = flowUser.getDefined('UsuarioDatos');

const flowDelivery = nools.compile(require.resolve('../../res/delivery_reglas.nools'));
const DeliveryDatos = flowDelivery.getDefined('DeliveryDatos');

export function getPrecioEnvioPorReglas(ndia, hora, envio, kms, cantPedidos,nivel, points)
{
    var usersData  = [ new  UserDatos({envio: envio, kms: kms, cantidadPedidos: cantPedidos, ndia:ndia , hora: hora, nivel:nivel, puntos: points}) ];
    var session = flowUser.getSession.apply(flowUser, usersData);
   
      var r=0;
     
     session.match();
    
      for (var i = 0; i < usersData.length; i++) { 
       r+=usersData[i].envio;
      }
      session.dispose();
  
      return r;
}


export function getPorcentajeEnvioPorReglas(ndia, hora, envio, cantidadEnviosDia,nivel, points)
{
    var deliveryData  = [ new  DeliveryDatos({envio: envio, cantidadEnviosDia: cantidadEnviosDia, ndia:ndia , hora: hora, nivel:nivel, puntos: points}) ];
    var session = flowDelivery.getSession.apply(flowDelivery, deliveryData);
     var r=0;

     session.match();
    
      for (var i = 0; i < deliveryData.length; i++) { 
       r+=deliveryData[i].resultado;
      }
      session.dispose();
  
      return r;
  
      }









//devuelve los kms entre dos posiciones
export function getKilometros (lat1 , lon1, lat2, lon2)
{
//local
function rad  (x) {return x*Math.PI/180;}
 //radio de la tierra en km
var R = 6.378137;
var dLat = rad( lat2 - lat1 );
var dLong = rad( lon2 - lon1 );

var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
var d = R * c;

//retorna tres decimales
return d.toFixed(3);
}