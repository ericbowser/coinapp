import React, {Suspense} from "react";
import CandlestickChart from "./components/CandlestickChart";
import BirdEyeCrypto from "./components/BirdEyeCrypto";

function App() {
    return (
        <div className={'flex flex-row container-md text-2xl bg-amber-100'}>
            <CandlestickChart />
            <div className={'flex'}>
                <BirdEyeCrypto />
            </div>
        </div>
    );
}

export default App;
