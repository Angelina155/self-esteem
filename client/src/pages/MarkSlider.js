import { observer } from 'mobx-react-lite'
import React from "react";
import RangeSlider from "react-bootstrap-range-slider";

const MarkSlider = observer((attributes) => {

    return (
        <RangeSlider
            style={{width: "100%"}}
            value={attributes.value}
            onChange={e => attributes.func(Number(e.target.value))}
            min={-10}
            max={10}
        />
);
});
export default MarkSlider