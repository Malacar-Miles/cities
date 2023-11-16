import Button from "../components/button";

const Intro = ({ startNewGame }: { startNewGame: () => void }) => {
  return (
    <div className="w-full">
      <h1 className="p-4 text-center">Игра в города на время</h1>
      <hr className="h-[4px] border-0 text-gray-100 bg-gray-100"/>
      <div className="p-6 flex flex-col gap-6 items-center text-sm">
        <h3 className="self-stretch">Цель: назвать как можно больше реальных городов</h3>
        <ul className="list-disc list-inside self-stretch">
          <li>Запрещается повторение городов.</li>
          <li>
            Названий городов на твердый знак "ъ" и мягкий знак "ь" нет. Из-за
            этого мы пропускаем эту букву и игрок должен назвать город на букву,
            стоящую перед твердым или мягким знаком.
          </li>
          <li>
            Каждому игроку дается две минуты на размышление. Если спустя это
            время игрок не вводит слово, он считается проигравшим.
          </li>
        </ul>
        <Button type="normal" onClick={startNewGame} className="text-base">
          Начать игру
        </Button>
      </div>
    </div>
  );
};

export default Intro;
