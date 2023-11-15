import Button from "../components/button";

const Intro = ({ startNewGame }: { startNewGame: () => void }) => {
  return (
    <div className="w-full">
      <h1>Игра в города на время</h1>
      <h3>Цель: назвать как можно больше реальных городов</h3>
      <ul className="list-disc list-inside">
        <li>Запрещается повторение городов.</li>
        <li>
          Названий городов на твердый знак "ъ" и мягкий знак "ь" нет. Из-за
          этого мы пропускаем эту букву и игрок должен назвать город на букву,
          стоящую перед твердым или мягким знаком.
        </li>
        <li>
          Каждому игроку дается две минуты на размышление. Если спустя это время
          игрок не вводит слово, он считается проигравшим.
        </li>
      </ul>
      <Button type="normal" onClick={startNewGame}>
        Начать игру
      </Button>
    </div>
  );
};

export default Intro;
