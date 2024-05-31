import React, {useState, useEffect} from 'react';
import post from '../api/birdeye-api';

const BirdEyeCrypto = () => {
    const date = Date.now() - 3600;
    const date2 = Date.now();

    const [chartData, setChartData] = useState([]);
    const [address, setAddress] = useState('EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm');
    const [chain, setChain] = useState('solana');
    const [duration, setDuration] = useState('1H');
    const [durationUnits, setDurationUnits] = useState('1H');
    const [timeFrom, setTimeFrom] = useState(date);
    const [timeTo, setTimeTo] = useState(date2);

    const fetchHistoricalData = () => {
        const options = {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'X-API-KEY': 'c871ef44be2647b88441255cbc8b3c7f',
                'x-chain': chain
            },
        };

        // Get the current epoch time in seconds
        const currentEpochTimeInMilliseconds = Date.now();
        console.log('current epoch in milli: ', currentEpochTimeInMilliseconds);
        const epochInMilisecondsAndAnHour = currentEpochTimeInMilliseconds + 36000;
        console.log('current epoch time plus one hour: ', epochInMilisecondsAndAnHour);

        // To add 1 hour (3600 seconds) to the current time
        /*      const address = 'address=EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm';
              const address_type = 'address_type=token';
              const type = 'type=1m';
              const time_from = currentEpochTimeInMilliseconds;
              const time_to = epochInMilisecondsAndAnHour;*/
        fetch(`https://public-api.birdeye.so/defi/history_price?address=${address}&address_type=token&type=${duration}${durationUnits}&time_from=${timeFrom}&time_to=${timeTo}`, options)
            .then(response => {
                return response.json();
            })
            .then(response => {
                if (response) {
                    console.log(response);
                    setChartData(response.data.items);
                }
            })
            .catch(err => {
                console.error(err);
            });
    }

    useEffect(() => {
    }, [address, chain, timeFrom, timeTo, duration]);

    useEffect(() => {
        if (chartData.length > 0) {
            console.log(chartData.length)
        }
    }, [chartData]);

    const submitForm = (event) => {
        if (address && duration && timeFrom && timeTo) {
            fetchHistoricalData();
        }
    }

    return (
        <div className={'px-100 py-10'}>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="chain">
                        Chain
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="chain" type="text" placeholder="Chain" onChange={e => setChain(e.target.value)}/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Address
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username" type="text" placeholder="Address" onChange={e => setAddress(e.target.value)}/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Duration
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="duration" type="number" placeholder="Duration" onChange={e => setDuration(e.target.value)}/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Duration Units
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="durationUnits" type="char" placeholder="Duration"
                        onChange={e => setDurationUnits(e.target.value)}/>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Epoch from
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="from" type="number" placeholder="Epoch from" onChange={e => {
                        const millisMinusOneHour = Date.now() - 36000;
                        setTimeFrom(millisMinusOneHour)
                    }
                    }/>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Epoch to
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="to" type="number" placeholder="Epoch to" onChange={(e) => {
                        const nowInMillis = Date.now();
                        setTimeFrom(nowInMillis)
                    }
                    }/>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        onClick={submitForm}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button">
                        Get Historical Price
                    </button>
                </div>
            </form>
            {chartData.length > 0 && (
                <table border={'1'}>
                    <thead>
                    <tr>
                        <th>index</th>
                        <th>Unix time</th>
                        <th>Value</th>
                    </tr>
                    </thead>
                    <tbody className={'px-52'}>
                    {chartData.map((x, index) => (
                        <tr key={`${x}${index}`}>
                            <td className={'px-5'}>{index}</td>
                            <td className={'px-5'}>{x.unixTime}</td>
                            <td className={'px-5'}>{x.value}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default BirdEyeCrypto;