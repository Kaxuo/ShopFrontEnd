import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Zoom from 'react-reveal/Zoom';
import { motion } from 'framer-motion'

function ShopList({ data, erase }) {
    // console.log(data)
    // var randomColor = require('randomcolor')
    const [value, setvalue] = useState(0)

    const useStyles = makeStyles((theme) => ({
        root: {
            fontSize: "20px",
        },
    }));

    let colorValues = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
        '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
        '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
        '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
        '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
        '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
        '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
        '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
        '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
        '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF']

    // function getRandomColor() {
    //     var letters = '0123456789ABCDEF';
    //     var color = '#';
    //     for (var i = 0; i < 6; i++) {
    //         color += letters[Math.floor(Math.random() * 16)];
    //     }
    //     return color;
    // }

    // const colors = colorValues[Math.floor(Math.random() * colorValues.length)]
    const classes = useStyles()

    if (!data) {
        return <h1>Loading</h1>
    }
    return (
        <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.5 }}
        >
            {/* you had to add state &&.... before rendering stuff */}
            {data && data.map((item, index) => (
                <Zoom key={index}>
                    <motion.div whileHover={{ scale: 1.1, padding: 10, transition: { duration: 1 } }}>
                        <Box key={index} className={classes.root} display="flex" flexDirection="row" p={1} style={{ backgroundColor: `${colorValues[index]}` }}>
                            {/* ternary for conditional rendering of state  */}
                            <Box key={index} p={1} style={item.urgency ? { textDecoration: "underline", fontWeight: "bold" } : null}>{item.title}</Box>
                            <Box style={{ marginLeft: "auto" }} p={1}>
                                <Button onClick={() => erase(item)} style={{ paddingLeft: "20px", paddingRight: "20px", }} variant="contained" color="secondary">
                                    Delete
                                </Button>
                            </Box>
                        </Box>
                    </motion.div>
                </Zoom>
            ))}
        </motion.div>
    )
}

export default ShopList;
