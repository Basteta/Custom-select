import classes from "./App.module.scss";
import DualList from "./components/DualList";
import { useAPI } from "./hooks/useAPI";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function App() {
  const { data, loading } = useAPI();

  return (
    <div className={classes.App}>
      <header className={classes.Header}>Developer task</header>
      <main>
        <div className="mb-4">
          Data is taken from API (it is a bit slow, so be patient :) ). Below
          (on the left list) is listed only names from that data.
        </div>
        {Boolean(loading) && <p className={classes.spinner}></p>}
        {data.length !== 0 && <DualList data={data} />}
      </main>
    </div>
  );
}
