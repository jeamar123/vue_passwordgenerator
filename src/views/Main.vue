<template>

  <div class="w-full h-screen overflow-y-auto c-scrollbar flex flex-col ">
    <div class="flex flex-col-reverse md:flex-row flex-1">
      <div class="flex-1 md:w-1/2 bg-c-2C80CF py-10 lg:py-16 2xl:py-20 px-12 lg:px-16 2xl:px-32">
        <h3 class="text-c-primary font-bold text-2xl mb-10 xl:mb-12">Options</h3>

        <div class="flex items-center gap-5 mb-5">
          <Toggle v-model="passwordFilters.uppercase"/> <span class="font-medium">Include Uppercase <span class="text-base">(ABCDEFGH ...)</span></span>
        </div>
        <div class="flex items-center gap-5 mb-5">
          <Toggle v-model="passwordFilters.lowercase"/> <span class="font-medium">Include Lowercase <span class="text-base">(abcdefgh ...)</span></span>
        </div>
        <div class="flex items-center gap-5 mb-5">
          <Toggle v-model="passwordFilters.numbers"/> <span class="font-medium">Include Numbers <span class="text-base">(123456 ...)</span></span>
        </div>
        <div class="flex items-center gap-5 mb-5">
          <Toggle 
            v-model="passwordFilters.symbols"
            @change="(value) => {
              if(!value){
                passwordFilters.removeAmbChars = false;
              }
            }"
          /> 
          <span class="font-medium">Include Symbols <span class="text-base">(@/+#$% ...)</span></span>
        </div>
        <div class="flex items-center gap-5 mb-12">
          <Toggle 
            v-model="passwordFilters.removeAmbChars"
            @change="(value) => {
              if(value){
                if(!passwordFilters.symbols){
                  passwordFilters.symbols = true;
                }
              }
            }"
          /> 
          <span class="font-medium">Exclude Ambigous Characters <span class="text-base">({ } [ ] ( ) / \ ' " ` ...)</span></span>
        </div>
        <div class="flex flex-col gap-7 mb-14 lg:mb-32 max-w-md">
          <span class="font-medium">Password length</span>
          <Slider v-model="passwordFilters.length" :tooltips="true" tooltipPosition="bottom" :min="6" :max="50"/>
        </div>

       

        <div class="w-full relative mb-10">
          <div id="copied-tooltip" class="absolute -top-12 left-0 w-full flex items-center justify-center hidden">
            <div class="relative">
              <span class="bg-c-secondary transform rotate-45 h-4 w-4 absolute -bottom-2 left-8"></span>
              <div class="bg-c-secondary text-white font-medium px-3 py-2 rounded-md text-sm relative">Copied!</div>
            </div>
          </div>
          <input 
            type="text"
            class="w-full rounded-xl text-xl placeholder placeholder-gray-300 py-4 pl-5 pr-14 text-c-black"
            placeholder="Password here"
            v-model="generatedPassword"
          >

          <svg @click="copyToClipboardFunc" xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 absolute top-3 right-3 cursor-pointer text-c-secondary" viewBox="0 0 20 20" fill="currentColor">
            <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
            <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
          </svg>
        </div>
        <p v-if="filterErr" class="text-center text-c-red text-sm my-5 font-medium">You must select at least one `Include` option</p>
        <div class="flex items-center justify-center">
          <button @click="generatePassword" class="bg-c-secondary py-4 px-9 text-c-primary shadow-c-button text-3xl rounded-lg font-light">Generate</button>
        </div>
      </div>
      <div class="flex-1 md:w-1/2 py-20 px-12 lg:px-20 2xl:px-40">
        <h1 class="text-5xl lg:text-6xl font-bold text-c-black text-center xl:px-20 mb-16 lg:mb-24">PASSWORD GENERATOR</h1>

        <h5 class="font-bold font-helvetica text-c-black mb-10 text-2xl">Tips for a secure and strong password:</h5>

        <ol class="list-decimal ml-5">
          <li class="font-helvetica text-c-black text-xl mb-5">Use at least 12 characters or longer.</li>
          <li class="font-helvetica text-c-black text-xl mb-5">Use a combination of different characters.</li>
          <li class="font-helvetica text-c-black text-xl mb-5">Include number, symbols, uppercase and lowecase letters.</li>
          <li class="font-helvetica text-c-black text-xl mb-5">Never use common information in your password.</li>
          <li class="font-helvetica text-c-black text-xl mb-5">Never use the same password twice.</li>
          <li class="font-helvetica text-c-black text-xl mb-5">Change your password regularly.</li>
        </ol>
      </div>
    </div>
  </div>

</template>

<script setup>
  import Toggle from '@vueform/toggle'
  import Slider from '@vueform/slider'
  import '@vueform/toggle/themes/default.css'
  import '@vueform/slider/themes/default.css'

  import { ref } from "vue";

  const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!#$%&*+,-=?@_|';
  const ambSymbols = '{}[]()^[\\]^`~,;:.<>';


  let passwordFilters = ref({
    uppercase: false,
    lowercase: false,
    numbers: false,
    symbols: false,
    removeAmbChars: false,
    length: 12
  });

  let includeChars = '';
  let filterErr = ref(false);
  let generatedPassword = ref("");


  const copyToClipboardFunc = () => {
    // let vm = this
    console.log(generatedPassword.value);
    navigator.clipboard.writeText(generatedPassword.value);
    document.getElementById('copied-tooltip').classList.remove("hidden");
    setTimeout(() => {
      document.getElementById('copied-tooltip').classList.add("hidden");
    }, 2000);
  };

  const filterCharacters = () => {
    if(
      !passwordFilters.value.uppercase && !passwordFilters.value.lowercase &&
      !passwordFilters.value.numbers && !passwordFilters.value.symbols &&
      !passwordFilters.value.removeAmbChars
    ){
      return false;
    }
    includeChars = '';
    if(passwordFilters.value.uppercase){ includeChars += uppercaseLetters; }
    if(passwordFilters.value.lowercase){ includeChars += lowercaseLetters; }
    if(passwordFilters.value.numbers){ includeChars += numbers; }
    if(passwordFilters.value.symbols){ 
      includeChars += symbols; 

      if(!passwordFilters.value.removeAmbChars){ includeChars += ambSymbols; }
    }
    

    return includeChars;
  }

  const generatePassword = () => {
    let chars = filterCharacters();
    if(!chars){ filterErr.value = true; return false; }

    let password = "";

    for (let i = 0; i < passwordFilters.value.length; i++) {
      const index = Math.floor(Math.random() * chars.length);
      password += chars[index];
    }

    filterErr.value = false;
    generatedPassword.value = password;
  }

</script>
