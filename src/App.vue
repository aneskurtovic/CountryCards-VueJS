<template>
   <div class="containerForBlur">
        <h1>CountryInfo</h1>
    <select id="countries-select" v-on:input="selectCountry($event)">
        <option selected disabled> 
            Select country ...
        </option>
        <option v-for="country in countries" :value="country.name" :key="country.alpha2code">
          {{country.name}}
        </option>
    </select>
    <div id="container">
        <div id="content">
            <div class="card front padding">
              <!-- If you have time help me stretch the country flags to take the full div for example Australia is broken -->
               <img v-if="selectedCountry" :src="selectedCountry.flag" class="card front" />
            </div>
            <div class="card back padding" v-if="selectedCountry">
                <p><u>Capital:</u> {{ selectedCountry.capital }} </p>
                <p><u>Population:</u> {{ selectedCountry.population }} </p>
                <!-- Propery topLevelDomain is array with length 1 ... and it is shown as [".us"] -->
                <p><u>Internet domain:</u> {{ selectedCountry ? selectedCountry.topLevelDomain : ""}} </p>
                <!-- Propery callingCodes is array with length 1 ... and it is shown as ["1"] -->
                <p><u>Call number:</u> + {{ selectedCountry ?  selectedCountry.callingCodes : "" }} </p>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import getCountries from './countryApi.js';
export default {
  data: () => {
    return {
    countries: [],
    selectedCountry: {},
    }
  },
  methods: {
    async loadCountries(){
      this.countries = await getCountries();
    },
    selectCountry(e){
      const countryName = e.target.value;
      var numberFormatter = new Intl.NumberFormat();
      this.selectedCountry = this.countries.find(x => x.name == countryName);
      this.selectedCountry.population = numberFormatter.format(this.selectedCountry.population);      
    }
  },
  created(){
      this.loadCountries();
    }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Kanit&display=swap');
@import url('https://fonts.googleapis.com/css?family=Turret+Road:400,800&display=swap');

* {
    box-sizing: border-box;
}

:root {
    --green: #9fea63;
    --blue: #3ba9f4;
    --dark: #282c34;
    --neka: #525252;
}

body{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    width: 100%;
    background-image: url("../public/background.jpg");
    background-attachment: fixed;
    background-size: cover;
    color: #fff;
    font-family: Kanit, sans-serif;
    margin: 0;
}

.containerForBlur:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: inset 0 0 2000px rgba(255, 255, 255, .5);
    filter: blur(5px);
    background: inherit;
    z-index: -1;
}

.containerForBlur{
    background:inherit;
    z-index: 1;
    width: 40%;
    height: 50vh;
    margin-top: 100px;
}

h1{
    font-family: 'Turret Road', cursive;
    font-weight: 800;
    font-size: 3rem;
    margin: 0 auto;
    color: var(--dark);
    text-align: center;
    margin-bottom: 50px;

}

#countries-select{
    width: 100%;
    margin-bottom: 60px;
    height: 50px;
    font-size: 22px;
    border: 1px solid var(--blue);
    color: var(--blue);
    cursor: pointer;
    transition: all .2s linear;
    background-color: var(--dark);
    color: var(--blue);
    padding-left: 8px;
}

#container{
    width: 100%;
    height: 70%;
    position: relative;
    cursor: pointer;
    perspective: 1000px;
}

#content:not(:empty){
    display: block;
    position: relative;
    height: 100%;
    width: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
    box-shadow: 0 0 20px 0 rgba(0,0,0,0.7);
}

#container:hover #content{
    transform: rotateY(180deg);
}

img{
    display: block;
    height: 100%;
    width: 100%;
    object-position: 100% 100%;
}

.card{
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    line-height: 20px;
    border: 1px solid var(--blue);
}

.card.front{
    background-color: rgba(0,0,0,0.5);
    color: #fff;
}

.card.back{
    transform: rotateY(180deg);
    background-color: var(--dark);
    box-shadow: 0 0 50px inset rgba(0,0,0,0.5);
    padding: 15px 0;
    color: var(--blue);
}

.card.padding{
    padding: 10px 10px;
}

@media only screen and (max-width: 600px) {
    .containerForBlur{
        width: 80%;
        margin: 40px 10px;
    }
  }
</style>
