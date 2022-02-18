import React, { useState, useEffect, useRef } from 'react';
import Radio from '@material-ui/core/Radio';
import TimeKeeper from 'react-timekeeper';
import './addDayAndTime.styles.scss';
import moment from 'moment';

const convertToTimeStamp = (time) => {
    if (time !== '') {
        let hours = time.split(':')[0];
        hours = time.split(':')[1].split(' ')[1] === 'am' ? hours : 12 + parseInt(hours);
        let min = time.split(':')[1].split(' ')[0];
        let timestamp = new Date();
        timestamp.setHours(hours);
        timestamp.setMinutes(min);
        return timestamp.getTime();
    }
    return '';
}

const AddDayAndTime = ({ day, setTimings, error ,data}) => {
    const [isSelected, setIsSelected] = useState(false);
    const [morningFrom, setMorningFrom] = useState('');
    const [morningTo, setMorningTo] = useState('');
    const [eveningFrom, setEveningFrom] = useState('');
    const [dataSelect, setDataSelect] = useState([data]);
    const [dataFilter, setDataFilter] = useState([]);
    const [eveningTo, setEveningTo] = useState('');
    const [showTimeKeeper, setShowTimeKeeper] = useState(false);
    const [selectedTime, setSelectedTime] = useState('12:00pm');
    const morningFromRef = useRef();
    const morningToRef = useRef();
    const eveningFromRef = useRef();
    const eveningToRef = useRef();

    useEffect(() => {

        setTimings({
            day,
            timings: {
                isSelected: isSelected,
                morning: {
                    from: convertToTimeStamp(morningFrom),
                    to: convertToTimeStamp(morningTo)
                },
                evening: {
                    from: convertToTimeStamp(eveningFrom),
                    to: convertToTimeStamp(eveningTo)
                }
            }
        });
    }, [day, morningFrom, morningTo, eveningFrom, eveningTo, isSelected]);

    const setTime = (Time) => {

        switch (showTimeKeeper) {
            case 'morningFrom':
                setMorningFrom(Time.formatted12);
                break;
            case 'morningTo':
                setMorningTo(Time.formatted12);
                break;
            case 'eveningFrom':
                setEveningFrom(Time.formatted12);
                break;
            case 'eveningTo':
                setEveningTo(Time.formatted12);
                break;
            default:
                console.log('action not defined');
                break;
        }
    }

    const onDone = (e) => {
        setShowTimeKeeper(null);
    }
let filter;
let week=day.charAt(0).toUpperCase() + day.slice(1);
dataSelect[0] !=undefined && dataSelect.map((items,index)=>(
filter=JSON.stringify([day.charAt(0).toUpperCase() + day.slice(1)].reduce((obj, key) => ({ ...obj, [key]: items[key] }), {})[week])
))
useEffect(() => {
setMorningFrom(filter!=undefined && JSON.parse(filter).morning.from !=null ?moment(filter!=undefined ?JSON.parse(filter).morning.from:null).format("LT").toLowerCase():'')
setMorningTo(filter!=undefined && JSON.parse(filter).morning.to !=null ?moment(filter!=undefined ?JSON.parse(filter).morning.to:null).format("LT").toLowerCase():'')

setEveningFrom(filter!=undefined && JSON.parse(filter).evening.from !=null ?moment(filter!=undefined ?JSON.parse(filter).evening.from:null).format("LT").toLowerCase():'')
setEveningTo(filter!=undefined && JSON.parse(filter).evening.to !=null ?moment(filter!=undefined ?JSON.parse(filter).evening.to:null).format("LT").toLowerCase():'')
if( filter!=undefined && JSON.parse(filter).morning.from!=null){
setIsSelected(prevState => !prevState)
}
}, []);
    return (
        <div className={`timingInput ${day}`}>
      <div className="daySelect labelInput">
                <Radio readOnly value={day} checked={isSelected ? true : false} onClick={(e) => { setIsSelected(prevState => !prevState) }} />
                <label htmlFor={day}>{day}</label>
            </div>
            <div className="timeSelect" style={{ pointerEvents: `${isSelected ? 'auto' : 'none'}`, opacity: isSelected ? 1 : .4, transition: '.5s ease-in-out' }}>
                <div className="morningShift">
                    <input
                    id="1"
                        type='text'
                        value={morningFrom}
                        // value={filter!=undefined ?moment(filter!=undefined ?JSON.parse(filter).morning.from:null).format("LT"):morningFrom}
                        onChange={(e) => setMorningFrom(e.target.value)}
                        placeholder={'AM'}
                        onClick={(e) => {
                            setShowTimeKeeper('morningFrom');
                            if (e.target.value.length)
                                setSelectedTime(e.target.value);
                        }}
                        ref={morningFromRef}
                        className={`${error && (morningFrom.includes('pm') || morningFrom === '') ? 'erroredInput' : null}`}
                    />
                    <p>To</p>
                    <input
                        type='text'
                        value={morningTo}
                        // value={filter!=undefined ?moment(filter!=undefined ?JSON.parse(filter).morning.to:null).format("LT"):morningTo}
                        onChange={(e) => setMorningTo(e.target.value)}
                        placeholder={'AM'}
                        onClick={(e) => {
                            setShowTimeKeeper('morningTo');
                            if (e.target.value.length)
                                setSelectedTime(e.target.value);
                        }}
                        ref={morningToRef}
                        className={`${error && (morningTo.includes('pm') || morningTo === '') ? 'erroredInput' : null}`}
                    />
                </div>
                <div className="eveningShift">
                    <input
                        type='text'
                        value={eveningFrom}
                        // value={filter!=undefined ?moment(filter!=undefined ?JSON.parse(filter).evening.from:null).format("LT"):eveningFrom}
                        onChange={(e) => setEveningFrom(e.target.value)}
                        // placeholder='PM'
                        placeholder={'PM'}
                        onClick={(e) => {
                            setShowTimeKeeper('eveningFrom');
                            if (e.target.value.length)
                                setSelectedTime(e.target.value);
                        }}
                        ref={eveningFromRef}
                        className={`${error && (eveningFrom.includes('am') || eveningFrom === '') ? 'erroredInput' : null}`}
                    />
                    <p>To</p>
                    <input
                        type='text'
                        value={eveningTo}
                        // value={filter!=undefined ?moment(filter!=undefined ?JSON.parse(filter).evening.to:null).format("LT"):eveningTo}
                        onChange={(e) => setEveningTo(e.target.value)}
                        placeholder={'PM'}
                        onClick={(e) => {
                            setShowTimeKeeper('eveningTo');
                            if (e.target.value.length)
                                setSelectedTime(e.target.value);
                        }}
                        ref={eveningToRef}
                        className={`${error && (eveningTo.includes('am') || eveningTo === '') ? 'erroredInput' : null}`}
                    />
                </div>
            </div>
            {
                showTimeKeeper
                    ? <div className="reactTimeKeeper">
                        <TimeKeeper
                            onDoneClick={onDone}
                            onChange={setTime}
                            switchToMinuteOnHourSelect
                            time={selectedTime}
                        />
                    </div>
                    : null
            }
        </div>
    );
}

export default AddDayAndTime;