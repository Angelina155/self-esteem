import React from 'react';
import Plot from "react-plotly.js";

const LevelPlot = ({marks}) => {
    return (
        <Plot
            data={[
                {

                    x: marks.map(p => p.createdAt),
                    y: marks.map(p => p.mark),
                    type: 'scatter',
                    mode: 'lines+points',
                    marker: {color: 'slateGrey'},
                },
                {
                    x: [marks[0].createdAt, marks[0].createdAt, marks[0].createdAt, marks[0].createdAt],
                    y: [1.5, 2.5, 3.5, 4.5],
                    text: ['                НИЗКИЙ',
                        '                  СРЕДНИЙ',
                        '                   ВЫСОКИЙ',
                        '                              ОЧЕНЬ ВЫСОКИЙ'],
                    mode: 'text',
                }
            ]}
            layout={{
                height: 600,
                showlegend: false,
                yaxis: {range: [1, 5]},
                shapes: [
                    {
                        yref: 'paper',
                        x0: marks[0].createdAt,
                        y0: 0,
                        x1: marks[marks.length-1].createdAt,
                        y1: 0.25,
                        fillcolor: 'midnightBlue',
                        opacity: 0.3,
                        line: { width: 0.5 }
                    },
                    {
                        yref: 'paper',
                        x0: marks[0].createdAt,
                        y0: 0.25,
                        x1: marks[marks.length-1].createdAt,
                        y1: 0.5,
                        fillcolor: 'mediumBlue',
                        opacity: 0.2,
                        line: { width: 0.5 }
                    },
                    {
                        yref: 'paper',
                        x0: marks[0].createdAt,
                        y0: 0.5,
                        x1: marks[marks.length-1].createdAt,
                        y1: 0.75,
                        fillcolor: 'royalBlue',
                        opacity: 0.2,
                        line: { width: 0.5 }
                    },
                    {
                        yref: 'paper',
                        x0: marks[0].createdAt,
                        y0: 0.75,
                        x1: marks[marks.length-1].createdAt,
                        y1: 1,
                        fillcolor: 'cornflowerBlue',
                        opacity: 0.2,
                        line: { width: 0.5 }
                    }
                ],
            }}
        />
    );
};

export default LevelPlot;