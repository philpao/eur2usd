import { useState, useEffect } from "react";


export function CurrencyConverter(props) {
    let fxEur = props.fx;

    // const [fxEur, setFxEur] = useState(1.1);
    const [eur, setEur] = useState(10);
    const [usd, setUsd] = useState(10 * 1.1);
    const [baseCurrency, setBaseCurrency] = useState("EUR");
    const [override, setOverride] = useState(0);
    const [overrideActive, setOverrideActive] = useState("deactivated");
    const [lastFive, setLastFive] = useState([]);

    useEffect(() => {
        let currFx = props.fx;

        if (0.98 * props.fx < override && override < 1.02 * props.fx) {
            currFx = override;
            setOverrideActive("activated");
        } else {
            setOverrideActive("deactivated");
        }

        if (baseCurrency === "EUR") {
            setUsd(state => Number(eur * currFx).toFixed(3));
        } else {
            setEur(state => Number(usd / currFx).toFixed(3));
        }

        setLastFive(oldArray => {
            let oldRtfx = -1;
            if (oldArray.length > 0) {
                oldRtfx = oldArray[oldArray.length - 1].rtfx;
            }

            let newArray = [];
            if (oldArray.length === 0 || oldRtfx !== props.fx) {
                newArray =
                    [...oldArray,
                    {
                        rtfx: props.fx,
                        override,
                        baseCurrency,
                        baseAmount: baseCurrency === "EUR" ? eur : usd,
                        targetCurrency: baseCurrency === "EUR" ? "USD" : "EUR",
                        targetAmount: baseCurrency === "EUR" ? usd : eur,
                    }];
            } else {
                newArray = oldArray;
            }

            if (newArray.length > 5) {
                newArray.shift();
            }

            return (newArray);
        });

    }, [props.fx, eur, usd, baseCurrency, override]);

    const handleEur = event => {
        const { name, value } = event.target;
        setEur(() => value);
        setUsd(() => value * fxEur);
    };

    const handleUsd = event => {
        const { name, value } = event.target;
        setUsd(() => value);
        setEur(() => value / fxEur);
    };

    const handleRadioChange = event => {
        const { name, value } = event.target;
        setBaseCurrency(value);
    };

    const handleOverride = event => {
        const { name, value } = event.target;
        setOverride(() => value);
    };

    return (
        <div style={{ width: "80%", margin: "auto" }}>
            <p>
                Currency Converter
            </p>
            <p>
                EUR to USD Rate: {Number(fxEur).toFixed(3)}
            </p>
            <label htmlFor="eur-input">EUR: </label>
            <input id="eur-input" value={eur} onChange={handleEur} />
            <label htmlFor="usd-input">USD: </label>
            <input id="usd-input" value={usd} onChange={handleUsd} />
            <div onChange={handleRadioChange}>
                <input type="radio" value="EUR" name="baseCurrency" checked={baseCurrency === "EUR"} /> EUR
                <input type="radio" value="USD" name="baseCurrency" checked={baseCurrency === "USD"} /> USD
            </div>
            <label htmlFor="override">Override: </label>
            <input id="override" value={override} onChange={handleOverride} />
            {' '}
            {overrideActive}

            <table>
                <thead>
                    <tr>
                        <th scope="col">Real Time FX</th>
                        <th scope="col">Override</th>
                        <th scope="col">Base Currency</th>
                        <th scope="col">Base Amount</th>
                        <th scope="col">Target Currency</th>
                        <th scope="col">Target Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {lastFive.map(el =>
                        <tr>
                            <td>{Number(el.rtfx).toFixed(3)}</td>
                            <td>{Number(el.override).toFixed(3)}</td>
                            <td>{el.baseCurrency}</td>
                            <td>{Number(el.baseAmount).toFixed(3)}</td>
                            <td>{el.targetCurrency}</td>
                            <td>{Number(el.targetAmount).toFixed(3)}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
