import { useEffect, useMemo, useState } from 'react';
import { Letter } from '../interfaces/Letter';
import JSConfetti from 'js-confetti';
import { getRandomWord } from '../utils/getRandomWord';

export default function useHanged() {
  const [lives, setLives] = useState(6);
  const [letters, setLetters] = useState<Letter[]>([]);

  const hasWon = useMemo(() => letters.every((letter) => letter.isGuessed), [letters]);
  const hasLost = useMemo(() => lives === 0, [lives]);
  const isEndGame = useMemo(() => hasLost || hasWon, [hasLost, hasWon]);

  useEffect(() => {
    const word = getRandomWord();
    setLetters(word.split('').map((letter) => ({ letter, isGuessed: false })));
    return () => {};
  }, []);

  useEffect(() => {
    if (hasLost) console.log('you lose');

    if (hasWon) {
      const confetti = new JSConfetti();
      confetti.addConfetti();
      console.log('you win');
    }

    return () => {};
  }, [hasWon, hasLost]);

  useEffect(() => {
    function validateLetter(letter: string) {
      if (letter === 'Control') return;

      if (lives === 0) return console.log('game over');

      const temp = [...letters];

      let countMatches = 0;
      temp.forEach((l) => {
        if (l.letter.toLowerCase() === letter.toLowerCase()) {
          l.isGuessed = true;
          countMatches++;
        }
      });

      if (countMatches > 0) {
        console.log('match');
        setLetters(temp);
      } else {
        console.log('error');
        setLives((prev) => prev - 1);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      showLetterPreview(event.key);
      if (!isEndGame) {
        validateLetter(event.key);
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isEndGame, letters, lives]);

  function reset() {
    setLives(6);
    const word = getRandomWord();
    setLetters(word.split('').map((letter) => ({ letter, isGuessed: false })));
  }

  function showLetterPreview(letter: string) {
    const letterPreview = document.getElementById('letter-preview');
    if (letterPreview) {
      letterPreview.innerHTML = letter.toUpperCase();
      letterPreview.classList.remove('hidden');
      letterPreview.classList.add('grid');
      letterPreview.classList.add('animate-bounce');
    }
  }

  return { lives, letters, hasWon, isEndGame, reset, hasLost };
}
