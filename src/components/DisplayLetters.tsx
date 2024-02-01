import { Letter } from '../interfaces/Letter';

interface Props {
  letters: Letter[];
  showALl?: boolean;
}

export default function DisplayLetters(props: Props) {
  const { letters, showALl = false } = props;

  return (
    <div className="flex gap-2 flex-wrap">
      {letters.map((letter, index) => (
        <div key={index} className="flex flex-col items-center justify-end gap-1">
          {(letter.isGuessed || showALl) && (
            <span className="font-bold text-5xl">{letter.letter}</span>
          )}
          <div className="w-16 h-2 bg-black"></div>
        </div>
      ))}
    </div>
  );
}
