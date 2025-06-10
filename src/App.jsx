//react
import { useCallback, useEffect, useState } from 'react'

//css
import './App.css'

//data 
import words from './data/words'

//componentes
import StartScrean from './components/StartScrean'
import Game from './components/Game'
import GameOver from './components/GameOver'


const stages = [
  {id:1 , name:"start"},
  {id:2 , name:"game"},
  {id:3 , name:"end"}
]

function App() {
  {/* quantidades de tentativa erradas permitidas */}
  const gessesQtd = 3;
  {/* estágio do jogo */}
  const [gameStage, setGameStage] = useState(stages[0].name);
  {/* lista de categorias e sua respectiva lista de palavras  */}
  const [wordsList] = useState(words);
  {/* categoria escolhoda aleatoriamente */}
  const [pickedCategory,setPickedCategory] = useState("");
  {/* palavra escolhoda aleatoriamente dentro da categoria */}
  const [pickedWord,setPickedWord] = useState("");
  {/* letras da palavra  */}
  const [letters, setLetters] = useState([]);
  {/* letras adivinhadas - palpite*/}
  const [guessedLetters, setGuessedLetters] = useState([]);
  {/* letras erradas */}
  const [wrongLetters, setWrongLetters] = useState([]);
  {/* quantidade de tentativas */}
  const [guesses, setGuesses] = useState(gessesQtd);
  {/* pontos obtidos no jogo */}
  const [score, setScore] = useState(50);

  

  
  /* Seleciona a categoria e a palavra*/
  function pickCategoryAndWord(){
    // pick a randon category
    // Obtém as chaves do objeto javascript, que são as categorias de palavras
    const categorias = Object.keys(wordsList)     
    const categoria = categorias[Math.floor(Math.random() * Object.keys(categorias).length) ]

    //console.log(categoria);

    // pick a ramdom word 
    let arrayPalavras = wordsList[categoria]
    const wordSelect = arrayPalavras[Math.floor(Math.random() * arrayPalavras.length) ]

    //const wordSelect = wordsList[categoria][Math.floor(Math.random() * wordsList[categoria].length) ]
    
    //console.log(wordSelect);

    return {categoria,wordSelect}

  }


  // Inicia o jogo - transita para o stage 1
  function startGame(){

    clearLetterStates();

    const {categoria,wordSelect} = pickCategoryAndWord();
    //console.log(categoria,wordSelect);

    let lettersOfWord = wordSelect.split("")
    
    lettersOfWord = lettersOfWord.map((l) => l.toLowerCase());

    //console.log(lettersOfWord);
    
    setPickedCategory(categoria);
    setPickedWord(wordSelect);
    setLetters(lettersOfWord);

    setGameStage(stages[1].name)


  }

  // Processa letra - transita para estágio 3
  function verifyLetter(letter){
    
    const normalizedLetter = letter.toLowerCase();
    // se a letra já foi informada (adivinhadas ou erradas) cancela a operação. Não pontua nem penaliza
    if (guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)){
      return;
    }

    // inclui a letra em letras adivinhadas ou nas erradas (neste caso diminui as oportunidades de erro)
    if(letters.includes(normalizedLetter)){
      //pega os valores do array de letras adivinhadas no estado atual e adiciona o caracter
      setGuessedLetters((actualGuessedLetters) => [...actualGuessedLetters,  normalizedLetter])

    }else{
      //pega os valores do array de letras erradas no estado atual e adiciona o caracter
      setWrongLetters((actualWrongLetters) => [...actualWrongLetters,  normalizedLetter]);
      setGuesses((actualGuesses) => actualGuesses - 1 )
    }
  }

  //console.log('guessedLetters: ' + guessedLetters)
  //console.log('wrongLetters: ' + wrongLetters)


  function clearLetterStates(){
    setGuessedLetters([])
    setWrongLetters([])

  }

  // Verifica a condição de vitória //
  useEffect(()=>{
      if (guesses <= 0){
        clearLetterStates()
        setGameStage(stages[2].name)
      }
  },[guesses])

  /// Verifica condição de vitória ///
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)]
    if(guessedLetters.length === uniqueLetters.length){
      //adiciona score
      setScore((actualScore) => actualScore += 100 )
      //reinicia o jogo
      startGame();
    }

    //console.log(uniqueLetters)
  
  },[guessedLetters])

  // Informação do curso da necessidde de declarar os objetos usados, neste caso : letters e startGame
  // Porém, erro não aconteceu

  function reestart(){
    setScore(0)
    setGuesses(gessesQtd)

    setGameStage(stages[0].name)
  }

  return (
    <>
      <div className='App'>
          {gameStage === 'start' && <StartScrean startGame={startGame} />}
          {gameStage === 'game' && 
                  <Game verifyLetter={verifyLetter}
                        pickedCategory={pickedCategory}
                        pickedWord={pickedWord}
                        letters={letters}
                        guessedLetters={guessedLetters}
                        wrongLetters={wrongLetters}
                        guesses={guesses}
                        score={score}

                  />}
          
          
          
          
          {gameStage === 'end' && <GameOver retry={reestart} score={score}/>}
       </div>

    </>
  )
}

export default App
