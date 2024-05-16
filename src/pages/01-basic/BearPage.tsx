import { useShallow } from 'zustand/react/shallow';
import { WhiteCard } from '../../components';
import { useBearStore } from '../../stores';

export const BearPage = () => {
  return (
    <>
      <h1>Contador de Osos</h1>
      <p>Manejo de estado simple de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <BlackBearsCard />

        <PolarBearsCard />

        <PandaBearsCard />

        <BearsDisplay />
      </div>
    </>
  );
};

export const BlackBearsCard = () => {
  const blackBears = useBearStore((state) => state.blackBears);
  const changeBlackPopulationBy = useBearStore(
    (state) => state.changeBlackPopulationBy
  );

  return (
    <WhiteCard centered>
      <h2>Osos Negros</h2>

      <div className="flex flex-col md:flex-row">
        <button onClick={() => changeBlackPopulationBy(+1)}> +1</button>
        <span className="text-3xl mx-2 lg:mx-10"> {blackBears} </span>
        <button onClick={() => changeBlackPopulationBy(-1)}>-1</button>
      </div>
    </WhiteCard>
  );
};

export const PolarBearsCard = () => {
  const polarBears = useBearStore((state) => state.polarBears);
  const changePolarPopulationBy = useBearStore(
    (state) => state.changePolarPopulationBy
  );

  return (
    <WhiteCard centered>
      <h2>Osos Polares</h2>

      <div className="flex flex-col md:flex-row">
        <button onClick={() => changePolarPopulationBy(+1)}> +1</button>
        <span className="text-3xl mx-2 lg:mx-10"> {polarBears} </span>
        <button onClick={() => changePolarPopulationBy(-1)}>-1</button>
      </div>
    </WhiteCard>
  );
};

export const PandaBearsCard = () => {
  const pandaBears = useBearStore((state) => state.pandaBears);
  const changePandaPopulationBy = useBearStore(
    (state) => state.changePandaPopulationBy
  );

  return (
    <WhiteCard centered>
      <h2>Osos Pandas</h2>

      <div className="flex flex-col md:flex-row">
        <button onClick={() => changePandaPopulationBy(+1)}> +1</button>
        <span className="text-3xl mx-2 lg:mx-10"> {pandaBears} </span>
        <button onClick={() => changePandaPopulationBy(-1)}>-1</button>
      </div>
    </WhiteCard>
  );
};

export const BearsDisplay = () => {
  const bears = useBearStore((state) => state.bears);
  // const doNothing = useBearStore((state) => state.doNothing);
  //* useShallow is used to avoid unnecessary re-renders
  const doNothing = useBearStore(useShallow((state) => state.doNothing));
  const addBear = useBearStore((state) => state.addBear);
  const clearBears = useBearStore((state) => state.clearBears);

  return (
    <WhiteCard>
      <h1>Osos</h1>

      <button className="mt-2" onClick={addBear}>
        Add bears
      </button>
      <button className="mt-2" onClick={clearBears}>
        Clears bears
      </button>

      {bears.map((bear) => (
        <div key={bear.id} className="flex justify-between mt-4">
          <span>{bear.name}</span>
          <button onClick={doNothing}>Do Nothing</button>
        </div>
      ))}

      {/* <pre>{JSON.stringify(bears, null, 2)}</pre> */}
    </WhiteCard>
  );
};
