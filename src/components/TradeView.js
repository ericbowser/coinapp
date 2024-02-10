import React, {useEffect, useState} from 'react';
import {AdvancedChart} from "react-tradingview-embed";
import {Container, Form, FormGroup, Navbar, NavbarBrand, NavItem, ToggleButton} from "react-bootstrap";
import styled from "styled-components";

const Grid = styled.div`
    padding: 15px;
    background-color: white;
    border: 5px solid black;
    box-shadow: red 5px 5px 5px;
    display: grid;
    grid-gap: 25px;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
`;

const GridCol1 = styled.div`
    padding: 15px;
    background-color: grey;
    text-align: center;
    grid-column: 1;
    grid-row: 1;
`;

const GridCol2 = styled.div`
    grid-column: 2;
    grid-row: 1;
`;

function TradeView(props = {}) {
    const [symbol, setSymbol] = useState("COINBASE:BTCUSD");
    const [darkModeChecked, setDarkModeChecked] = useState(false);

    useEffect(() => {
    }, [symbol, darkModeChecked]);

    const selectSymbol = (event) => {
        if (event.target) {
            console.log(event.target.value)
            setSymbol(event.target.value);
        }
    }
    const setMode = (event) => {
        if (event.target.value === 'on') {
            console.log(event.target.checked)
            setDarkModeChecked(event.target.checked)
        }
    }

    const mode = darkModeChecked === true
        ? "dark"
        : "light";

    return (
        <>
            <Container>
                <Navbar variant={'dark'}>
                    <NavbarBrand>
                        Brand
                    </NavbarBrand>
                    <NavItem>
                        Test
                    </NavItem>
                </Navbar>
                <Form>
                    <FormGroup>
                        <Form.Select
                            aria-label="Floating label select"
                            onChange={selectSymbol}
                        >
                            <option>Open this select menu</option>
                            <option value="COINBASE:BTCUSD">BTC - USDC</option>
                            <option value="COINBASE:ETHUSD">ETH - USDC</option>
                            <option value="COINBASE:SOLUSD">SOL - USDC</option>
                        </Form.Select>
                        <Form.Group>
                            <Form.Check
                                onChange={setMode}
                                checked={darkModeChecked}
                                type={'checkbox'}
                                label={'dark mode checkbox'}
                                id={'dark-mode-checkbox'}
                            />
                        </Form.Group>
                    </FormGroup>
                </Form>
            </Container>
            <AdvancedChart widgetProps={
                {
                    allow_symbol_change: true,
                    hide_side_toolbar: true,
                    theme: mode,
                    style: 1,
                    symbol: symbol,
                    range: 'ALL',
                    show_popup_button: true,
                    height: '700px',
                    width: '1400px'
                }
            }/>
        </>
    );
}

export default TradeView;