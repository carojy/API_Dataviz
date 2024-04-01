// fetch= initialize a promise - API call 
fetch("https://hubeau.eaufrance.fr/api/v1/niveaux_nappes/chroniques?code_bss=09405X0229/S3&date_debut_mesure=2014-01-20&date_fin_mesure=2024-01-20&size=20000")

// .then = when fetch answers (so do the API): return argument in .json
.then(response => { 
    return response.json();
})

// .then : execute loop for of 
.then((mesures)=>{
    const gaugeMax= mesures.data[0].profondeur_nappe +mesures.data[0].niveau_nappe_eau;
    const firstYearLevel = mesures.data[0].niveau_nappe_eau;
    const secondYearLevel = mesures.data[mesures.data.length-1].niveau_nappe_eau;
      
    createGauge(firstYearLevel,gaugeMax); // call createGauge()
    createGauge(secondYearLevel,gaugeMax);     
});


function rate(level, max){  
  return Math.floor((level/max)*100); // calculate filling rate of water table 
}


function createGauge(level,max){ 
  const gauges = document.getElementById('gauges');
  const parentDiv = document.createElement("div");
  const childSpan = document.createElement("span"); 
  const waterLevel = rate(level,max); //holds result of function rate()
  
  parentDiv.setAttribute('class', 'gauge');

  childSpan.setAttribute('class', 'gauge-filling');
  childSpan.setAttribute('style', 'height: ' + waterLevel + '%');
  
  parentDiv.appendChild(childSpan);
  gauges.appendChild(parentDiv);
}