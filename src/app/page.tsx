import DisplayLetters from '../components/DisplayLetters';
import DisplayHanged from '../components/DisplayHanged';
import useHanged from '../hooks/useHanged';

export default function HomePage() {
  const { letters, lives, isEndGame, reset, hasLost, hasWon } = useHanged();

  return (
    <main className="background">
      <section className="container py-12 flex flex-col h-full">
        <h1 className="text-3xl font-bold text-center">AHORCADO</h1>
        {hasLost && (
          <div className="text-center text-3xl font-bold text-red-500 mt-4">Has perdido</div>
        )}
        {hasWon && (
          <div className="text-center text-3xl font-bold text-green-500 mt-4">Has ganado</div>
        )}

        <section className="flex flex-col md:flex-row gap-8 py-8 flex-1 items-center">
          {/* ahorcado */}
          <DisplayHanged lives={lives} />
          {/* Letters */}
          <div className="">
            <DisplayLetters letters={letters} showALl={hasLost} />
          </div>

          <div className="fixed bottom-8 right-8 left-8 m-auto w-fit flex">
            {isEndGame ? (
              <button
                onClick={reset}
                className="w-16 h-16 grid place-content-center rounded-md border-2 border-dashed border-gray-400 font-bold text-2xl"
              >
                <i className="fa fa-refresh"></i>
              </button>
            ) : (
              <div
                id="letter-preview"
                className="w-16 h-16 hidden place-content-center rounded-md border-2 border-dashed border-gray-400 font-bold text-2xl"
              ></div>
            )}
          </div>
        </section>
      </section>
    </main>
  );
}
