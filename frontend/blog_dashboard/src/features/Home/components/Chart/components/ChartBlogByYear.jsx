import { Box } from '@mui/material'
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js'
import PropTypes from 'prop-types'
import React from 'react'
import { Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

ChartBlogByYear.propTypes = {
    blogDataChartList: PropTypes.array.isRequired,
}

export function ChartBlogByYear({ blogDataChartList }) {
    const labels = [2022, 2023, 2024]

    const data = {
        labels,
        datasets: [
            {
                label: 'Total blog',
                borderColor: '#2d6cdf',
                data: blogDataChartList,
                backgroundColor: '#2d6cdf',
            },
        ],
    }

    const options = {
        tension: 0.3,
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        borderWidth: 1,
    }

    return (
        <Box>
            <Line options={options} data={data} />
        </Box>
    )
}
