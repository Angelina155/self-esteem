import { observer } from 'mobx-react-lite'
import React from "react";
import RangeSlider from "react-bootstrap-range-slider";

const MarkSlider = observer(({value,func, min, max, step}) => {

    return (
        <RangeSlider
            style={{width: "100%"}}
            value={value}
            onChange={e => func(Number(e.target.value))}
            min={min}
            max={max}
            step={step}
            variant="primary"
        />
);
});
export default MarkSlider