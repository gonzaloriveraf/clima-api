// c88deaf476d198bf0acc7f9e24c21a4d
//'https://api.openweathermap.org/data/2.5/weather?q=Santiago,cl&units=metric&APPID=c88deaf476d198bf0acc7f9e24c21a4d'
//
    const app = document.getElementById('app')
    const fragmento = document.createDocumentFragment
    const ciudades = ['Santiago', 'Arica', 'Coquimbo' , 'Valparaíso' ];
    const selectCiudades = document.getElementById('ciudades'); 
   // const option = document.createElement('option');
    const fecha = new Date();
    const numerodia = fecha.getDay();
    const dia = ['Domingo' , 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado' ];
    const diasemana = dia[fecha.getDay()] + ' ' ;
    const hoy = fecha.getDate() + ' ';
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'setiembre', 'octubre', 'noviembre', 'diciembre'];
    const mes = meses[fecha.getMonth()] + ' ';
    const hora = fecha.getHours();
    const minutos =  fecha.getMinutes();
    const ciudad = ['Santiago', 'Coquimbo' , 'Valparaiso', 'Talca', 'Antofagasta', 'Calama', 'Osorno', 'Futrono','Puerto Montt', 'Viña del Mar', 'Puerto Varas', 'Los Angeles' ]
    const listaCiudades = document.getElementById('ciudades')

    const divApp =  document.querySelector('#app')  


    switch (true) {
      case (hora >= 12 && hora < 21):
        divApp.setAttribute('style' , 'background-image: url("img/bg/tarde.svg")')  
          break;
      case (hora > 5 && hora < 12 ):
        divApp.setAttribute('style' , 'background-image: url("img/bg/manana.svg")')  
          break;
     
      default:
        divApp.setAttribute('style' , 'background-image: url("img/bg/noche.svg")')  

  }



/*
    
    if (hora < 5) {
      divApp.setAttribute('style' , 'background-image: url("img/bg/noche.svg")')   
    }
 
    if ( hora > 5) {
    divApp.setAttribute('style' , 'background-image: url("img/bg/manana.svg")')  

    } 

    
    if (hora < 21) {

      divApp.setAttribute('style' , 'background-image: url("img/bg/tarde.svg")')   

    }

    else {

      divApp.setAttribute('style' , 'background-image: url("img/bg/noche.svg")')    

    }
  */
    ciudad.forEach(ciudadeslista)
    function ciudadeslista(city, index){
      const createoption = document.createElement('input');
      const createlabel = document.createElement('label');
      const lista = document.querySelector('#ciudades');
      const appendOption = lista.appendChild(createoption);
      const appendLabel = lista.appendChild(createlabel);
      
      
      createlabel.textContent= city 
      createlabel.setAttribute("for", ciudad[index]);
      createoption.setAttribute("value", index);
      createoption.setAttribute("type", 'radio');
      createoption.setAttribute("name", 'ciudad');
      createoption.setAttribute("id", ciudad[index]);
      createoption.classList.add('city')
      createoption.textContent= city;  


    }

    const ciudadCheck =  document.querySelector('input');
  ciudadCheck.setAttribute('checked', true)

    const cities = document.querySelectorAll('.city') 

      document.getElementById('mostrarlista').addEventListener('click', mostrarLista);
      listaCiudades.addEventListener('change', mostrarLista);
   
      document.getElementById('cerrarlista').addEventListener('click', mostrarLista);
      listaCiudades.addEventListener('change', mostrarLista);
      

function mostrarValue() {


}


 function mostrarLista() {
    listaCiudades.classList.toggle('oculto')
  } 







    showClima()

    listaCiudades.addEventListener('change', showClima);

    function showClima() {

      
      const ciudadChecked =  document.querySelector('input[name="ciudad"]:checked');
      console.log(ciudadChecked.value)



       //fetch('https://api.openweathermap.org/data/2.5/weather?q='+ciudad[listaCiudades.value]+',cl&units=metric&APPID=c88deaf476d198bf0acc7f9e24c21a4d')
       fetch('https://api.openweathermap.org/data/2.5/weather?q='+ciudad[ciudadChecked.value]+',cl&units=metric&APPID=c88deaf476d198bf0acc7f9e24c21a4d')
        .then(res => res.json())
        .then (data => {
        console.log(data); 

        let latitud = data.coord.lat
        let longitud = data.coord.lon
        let urlcoordenadas = 'https://api.openweathermap.org/data/2.5/onecall?lat='+latitud+'&lon='+longitud+'&units=metric&appid=c88deaf476d198bf0acc7f9e24c21a4d' 

        console.log(latitud)
        console.log(longitud)
        console.log(urlcoordenadas)

        /*document.getElementById('contenido').innerHTML = `<i>${hoy} de ${mes} de ${hora}:${minutos}</i>  <h1> ${data.name}  </h1> 
        <h2>  ${data.main.feels_like} °C </h2> ` */
        

        if (minutos < 9) {    document.querySelector('.fecha').textContent = diasemana  + hoy  + 'de ' +  ' ' + mes  + hora+':'+ '0' + minutos ; }

        else { document.querySelector('.fecha').textContent  = diasemana    + hoy  + 'de '  + mes  + hora+':'+  minutos
    }


    const icontoday = data.weather[0].icon 
    console.log(icontoday)

    const temperatura = data.main.feels_like
    const temperaturaAprox =  Math.round(temperatura);
    console.log(temperaturaAprox)

    let descripcion = data.weather[0].main

    switch (descripcion) {
    case 'Clear':
    descripcion = 'Despejado'
    break; 
    case 'Drizzle':
    descripcion = 'Llovizna' 
    break; 
    case 'Fog':
    descripcion = 'Neblina'
    break; 
    case 'Rain':
    descripcion = 'Lluvia'
    break; 
    case 'Snow':
    descripcion = 'Nieve'
    break; 
    case 'Thunderstorm':
    descripcion = 'Tormenta'
    break; 
    case 'Clouds':
    descripcion = 'Nublado'
    break; 
    case 'Mist':
    descripcion = 'Niebla'
    break; 
    }

        document.querySelector('#today h1').textContent= data.name + ', Chile';

        document.querySelector('#today h2').textContent= temperaturaAprox + '°'; 
        
        document.querySelector('#today h5').textContent= descripcion; 

        document.querySelector('#today img').setAttribute('src',  'img/' + icontoday + '.svg'  )


         


        //https://api.openweathermap.org/data/2.5/onecall?lat=-33.46&lon=-70.65&units=metric&appid=c88deaf476d198bf0acc7f9e24c21a4d

        fetch(urlcoordenadas)
        .then(res => res.json())
        .then (data => {
        console.log(data); 
        console.log(data.timezone); 
        console.log(data.daily[0].temp.min)

            
        document.querySelector('#today h4').textContent= data.daily[0].temp.min + '°' +  ' / ' + data.daily[0].temp.max + '°';
    
        const dailyItem  = data.daily
        console.log(dailyItem); 
         
        

       /*  dailyItem.forEach(item=>  {
          
          const pronostico = document.createElement('li') 
          const span = document.createElement('span'); 
          const forecast = document.querySelector('#nextdays ul');
          forecast.appendChild(pronostico);
          pronostico.textContent=  item.temp.min + ' / ' + item.temp.max;
          pronostico.appendChild(span);
          pronostico.appendChild(createImg);

        }) */
        const forecast = document.querySelector('.forecast');
              
        forecast.textContent=' '
  
        dailyItem.map(desglosar);
        
        function desglosar(item, index) {

          const pronostico = document.createElement('li') 
          const createh6 = document.createElement('h6') 
          const span = document.createElement('span');
          const createImg = document.createElement('img')
          const imgname =  item.weather[0].icon;
          const TempMin = item.temp.min ;
          const minima = Math.round(TempMin);
          const TempMax = item.temp.max ;
          const maxima = Math.round(TempMax);
       
           //const today = new Date()
          const pronosticoDia = new Date(fecha)
           
           pronosticoDia.setDate(pronosticoDia.getDate() + index)
           const pronosticoDiaSemana = dia[pronosticoDia.getDay()] + ' ' ;
           const pronosticoDiaNumero =  pronosticoDia.getDate();
           const pronosticoDiaMes = meses[pronosticoDia.getMonth()] + ' ';
           forecast.appendChild(pronostico);
           pronostico.appendChild(createh6);
           createh6.textContent=   minima + ' / ' + maxima ;
           span.textContent = '  ' + pronosticoDiaSemana + ' '  + pronosticoDiaNumero + ' de ' + pronosticoDiaMes 
           pronostico.appendChild(span);
           pronostico.appendChild(createImg);
           
           createImg.setAttribute('src',  'img/' + imgname + '.svg'  )
           //document.getElementById("probando").innerText += index + ":" + item.temp.min; 
         }
               
        })
     
    }) 
        

  
  }
        
       
            
      // document.getElementById('today').innerHTML = ` <h4> ${data.daily[0].temp.min} / ${data.daily[0].temp.max} </h4>`;    
    // dailyItem.forEach(item => {document.getElementById('nextdays').innerHTML = ` <li>${[item.temp.min]}</li>`;   })
        
        
        
   
      /*  dailyItem.map (item =>
        
           {
             let pronostico = document.createElement('li') 
             let forecast = document.querySelector('#nextdays ul');
             forecast.appendChild(pronostico)
             pronostico.textContent= item.temp.min + ' / ' + item.temp.max 
             console.log(item)
            

      */    