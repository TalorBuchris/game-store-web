import * as React from 'react';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { getAllToys, totalPagesOfActiveToys } from "./api/toysService";
import SmallCart from "./features/cart/SmallCart";
import UpdateToy from "./features/toys/UpdateToy";
import OneToy from "./OneToy";
import "./style.css"

import { Pagination, Stack } from '@mui/material';

export default function ToysList() {
    let [arrToys, setArrToys] = useState([]);
    let [numButtons, setNumButtons] = useState(1);
    let [currentButton, setCurrentButton] = useState(1);
    let toyForEditing = useSelector(state => state.t.toyForEditing);

    useEffect(() => {
        totalPagesOfActiveToys()
            .then(res => {
                setNumButtons(res.data)
            })
            .catch(err => {
                console.log(err)
                alert("תקלה בשליפת כמות העמודים " + err.message)
            })
    }, [])

    useEffect(() => {
        getToysByPage(1);
    }, [])

    function getToysByPage(pageNum) {
        if (pageNum > numButtons)
            return;
        getAllToys(pageNum)
            .then(res => {
                setArrToys(res.data)
            })
            .catch(err => {
                console.log(err);
                alert("תקלה בשליפת המוצרים " + err.message);
            })
    }

    return <div id="compToysList">
        <SmallCart /> {/* העגלה הקופצת */}
        {toyForEditing && <UpdateToy />}
        <h2>המשחקים שיעשו טוב לילדים שלכם</h2>
        <div id="toysList">
            {arrToys.map(item => { return <OneToy one={item} key={item.toyId} /> })}
        </div>
        <Stack spacing={2}>
            <Pagination color="primary" count={numButtons} page={currentButton / 1} size="large"
                hidePrevButton hideNextButton onClick={(event) => {
                    let url = event.target.childNodes[0].data;
                    if (url) {
                        getToysByPage(url);
                        setCurrentButton(url);
                    }
                }} />
        </Stack>
    </div>
}