import React, {useEffect, useState,useRef} from 'react';
import Chartjs from 'chart.js';

const chartConfig = {
    type: 'bar',
    data: {
        labels: ['Currency'],
        datasets:[
          {
            label:'Rate',
            data:[
          
            ],
            
          }
        ]
    },
    
  };

function Chart (props){
    const {
        currency,
        rate
    } = props

    const chartContainer = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);

    useEffect(() => {
        if (chartContainer && chartContainer.current) {
            chartConfig.data.datasets[0].data[0] = rate;
            chartConfig.data.labels[0] = currency;
            const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
            setChartInstance(newChartInstance);
        }
      }, [props,chartContainer]);

        
        return(
            <div className='chart'>
                <canvas ref={chartContainer} />
            </div>
        )
    
  
}

export default Chart;