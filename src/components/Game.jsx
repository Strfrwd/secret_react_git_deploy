import { useState, useRef } from 'react'
import './Game.css'

function Game({verifyLetter, pickedCategory, pickedWord, letters, guessedLetters, wrongLetters, guesses, score}){
  const leterInputRef = useRef(null)  
  const [letter, setLetter] = useState("")

  function handleSubmit(e){
    e.preventDefault();
    // processa a letra
    verifyLetter(letter);
    // limpa o valor
    setLetter("");
    // utiliza o state leterInputRef para realizar o evento focus no input 
    leterInputRef.current.focus();
  }

  return (
    <div>
        <div className="game">
            <p className="points">
                <span>Pontuação: {score}</span>
            </p>
            <h1>Adivinhe a palavra</h1>
            <h3 className="tip">
                Dica sobre a palavra: <span>{pickedCategory}</span>
            </h3>
            <p>Você ainda tem {guesses} tentativa(s)</p>
            <div className="wordContainer">
                {
                   letters.map((letter,i) => 
                    guessedLetters.includes(letter) ? 
                    (<span key={i} className='letter'>{letter}</span>)
                    :
                    (<span key={i} className="blankSquare"></span>)
                    )
                }
            </div>
            <div className="letterContainer">
                <p>Tente adivininar uma letra da palavra</p>
                <form onSubmit={handleSubmit}>
                    
                    {/* ref é uma referencia para o elemento html. Essa referência dá a chanse de realizar
                        operações no componente. Será usado para colocar o foco no componente */}
                    <input type="text" name="letter" maxLength="1"  required 
                           onChange={(e) => setLetter(e.target.value)}
                           value={letter} ref={leterInputRef}
                           />


                    <button>Jogar</button>

                </form>
            </div>
            <div className="wrongLettersContainter">
                <p>Letras já utilizadas:  </p>
                { wrongLetters.map((letter, i) => 
                    <span key={i}>{letter},</span>

                                )
                }

            </div>
        </div>
    </div>
  )
}

export default Game