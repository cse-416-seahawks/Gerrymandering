import React, { Component, useState } from 'react'
import './css/TableData.css'
import { Tabs, Tab } from '@mui/material'
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import Box from '@mui/material/Box';
import { flexbox } from '@mui/system';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { grey } from '@mui/material/colors';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ScatterChart, Scatter, ZAxis } from 'recharts';


function TableData() {
  const [currentTab, setCurrentTab] = useState('0');

    function handleTabChange(event: React.ChangeEvent<{}>, newValue: number) {
        console.log(newValue);
        setCurrentTab(String(newValue));
    }

    return (
        <>
            <TabContext value={currentTab}>
                <div className='table-container'>
                    <div className='tab-container'>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '95%' }}>
                            <Tabs
                                value={currentTab}
                                onChange={handleTabChange}
                            >
                                <Tab value='0' label='State Details' sx={{ textTransform: "none" }} />
                                <Tab value='1' label='Summary of Cluster' sx={{ textTransform: "none" }} />
                                <Tab value='2' label='Party Affiliations' sx={{ textTransform: "none" }} />
                                <Tab value='3' label='Association of clusters' sx={{ textTransform: "none" }} />
                            </Tabs>
                        </Box>

                    </div>
                    <div>
                        <TabPanel value='0'>
                        <StateDetails/>
                    </TabPanel>
                    <TabPanel value='1'>
                            <ClusterTable />
                        </TabPanel>
                        <TabPanel value='2'>
                            <AverageMeasuresTable />
                        </TabPanel>
                        <TabPanel value='3'>
                            <AssociationClusters />
                        </TabPanel>
                    </div>

                </div>
            </TabContext>
        </>

    )
}



export default TableData;



/**
 * 
 * Table Data for state details
 */
const raceData= [
    { race: 'White', percentage: '72.1%'},
    { race: 'Black or African American', percentage: '10.8%'},
    { race: 'American Indian or Alaska Native', percentage: '1.7%'},
    { race: 'Asian', percentage: '9.4% '},
    { race: 'Native Hawaiian and Other Pacific Islander', percentage: '0.9%'},
    { race: 'Two or more races', percentage: '5.1%'}
];

const sexData= [
    { sex: 'Male', percentage: '50.5%'},
    { sex: 'Female', percentage: '49.5%'}
];

const wealthData= [
    { label: 'Median Household Income', income: '$65,686'},
    { label: 'Average Household Income', income: '$89,562'},
    { label: 'Per Capita Income', income: '$34,621'}
];

const ageData= [
    { age: '0-17', percent: '21.91%'},
    { age: '18-64', percent: '60.49%'},
    { age: '65+', percent: '17.21%'}
];

const partyData= [
    { party: 'Democratic', percent: '18.85%'},
    { party: 'Republican', percent: '44%'},
    { party: 'Independant American Party', percent: '4.99%'},
    { party: 'Libertarian', percent: '1.14%'},
    { party: 'Non-Partisan', percent: '29.58%'},
    { party: 'Other', percent: '1.44%'}
];

function StateDetails(){
    return(
    <div>
        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
            <Typography><b>Population</b></Typography>
            </AccordionSummary>
            <Divider/>
            <AccordionDetails>
                3,198,164
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
            <Typography><b>Race</b></Typography>
            </AccordionSummary>
            <Divider/>
            <AccordionDetails>
                <Table sx={{ minWidth: 650 }}>
                    <TableBody>
                    {raceData.map((row) => (
                        <TableRow key={row.race}>
                            <TableCell component="th" scope="row"> {row.race} </TableCell>
                            <TableCell align="right">{row.percentage}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            >
            <Typography><b>Sex</b></Typography>
            </AccordionSummary>
            <Divider/>
            <AccordionDetails>
                <Table sx={{ minWidth: 650 }}>
                    <TableBody>
                    {sexData.map((row) => (
                        <TableRow key={row.sex}>
                            <TableCell component="th" scope="row"> {row.sex} </TableCell>
                            <TableCell align="right">{row.percentage}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            >
            <Typography><b>Wealth</b></Typography>
            </AccordionSummary>
            <Divider/>
            <AccordionDetails>
                <Table sx={{ minWidth: 650 }}>
                    <TableBody>
                    {wealthData.map((row) => (
                        <TableRow key={row.label}>
                            <TableCell component="th" scope="row"> {row.label} </TableCell>
                            <TableCell align="right">{row.income}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            >
            <Typography><b>Age</b></Typography>
            </AccordionSummary>
            <Divider/>
            <AccordionDetails>
                <Table sx={{ minWidth: 650 }}>
                    <TableBody>
                    {ageData.map((row) => (
                        <TableRow key={row.age}>
                            <TableCell component="th" scope="row"> {row.age} </TableCell>
                            <TableCell align="right">{row.percent}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            >
            <Typography><b>Party Affiliation</b></Typography>
            </AccordionSummary>
            <Divider/>
            <AccordionDetails>
                <Table sx={{ minWidth: 650 }}>
                    <TableBody>
                    {partyData.map((row) => (
                        <TableRow key={row.party}>
                            <TableCell component="th" scope="row"> {row.party} </TableCell>
                            <TableCell align="right">{row.percent}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </AccordionDetails>
        </Accordion>
    </div>
    )
}

/**
 * 
 * Table Data for cluster analysis
 */
function ClusterTable() {
    interface cluster_summary_table {
        cluster: number;
        num_districts: number;
        average_dist: number;
    }
    const sampleData: cluster_summary_table[] = [
        { cluster: 1, num_districts: 30, average_dist: 12.2 },
        { cluster: 2, num_districts: 12, average_dist: 9.5 },
        { cluster: 3, num_districts: 45, average_dist: 2.1 },
        { cluster: 4, num_districts: 17, average_dist: 13.2 }
    ]

    const data01 = [
        { x: 100, y: 60, z: 200 },
        { x: 120, y: 30, z: 260 },
        { x: 170, y: 50, z: 400 },
        { x: 140, y: 35, z: 280 },
        { x: 150, y: 70, z: 500 },
        { x: 110, y: 58, z: 200 },
        { x: 140, y: 31, z: 280 },
        { x: 20, y: 40, z: 500 },
        { x: 16, y: 70, z: 200 },
        { x: 90, y: 20, z: 200 },
        { x: 45, y: 58, z: 200 },
        { x: 45, y: 91, z: 280 },
        { x: 20, y: 40, z: 500 },
        { x: 97, y: 70, z: 200 },
        { x: 94, y: 30, z: 200 },
        { x: 87, y: 29, z: 200 },
        { x: 89, y: 35, z: 200 },
     ];

    const parseDomain = () => [
        300,
        Math.max(
            Math.max.apply(
            null,
            data01.map((entry) => entry.y)
            )
        ),
    ];

    const domain = parseDomain();
    const range = [100, 1000];



    return (
        <>
            <ScatterChart width={700} height={400} margin={{ top: 20, right: 20, bottom: 20, left: 20 }} >
                <CartesianGrid />
                <XAxis type="number" dataKey="x" name="Average distance" />
                <YAxis yAxisId="left" type="number" dataKey="y" name='District plans in cluster' opacity='1' stroke='#7aa9ff'/>
                <ZAxis dataKey="y" domain={domain} range={range} />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} wrapperStyle={{ outline: "none" }} contentStyle={{ fontSize: 18 }}/>
                <Scatter yAxisId="left" data={data01} fill="#bfd6ff" stroke="#037cff" opacity={4}/> 
            </ScatterChart>
            
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead sx={{ height: "10px", fontSize: '10px' }}>
                        <TableRow>
                            <TableCell>Cluster</TableCell>
                            <TableCell align="right"># District Plans</TableCell>
                            <TableCell align="right">Average Distances</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sampleData.map((row) => (
                            <TableRow key={row.cluster}>
                                <TableCell component="th" scope="row"> {row.cluster} </TableCell>
                                <TableCell align="right">{row.num_districts}</TableCell>
                                <TableCell align="right">{row.average_dist}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}


/**
 * 
 * Table Data for cluster analysis
 */
function AverageMeasuresTable() {


    const sampleData1 = [
        { party: 'Republican', men: '59%', women: '41%' },
        { party: 'Democrat', men: '44%', women: '56%' },
    ];

    const sampleData2 = [
        { party: 'Republican', white: '72%', black: '1%', asian: '1%', latino: '18%', other: '7%' },
        { party: 'Democrat', white: '44%', black: '14%', asian: '3%', latino: '29%', other: '10%' },
    ]

    return (
        <>
            {/* 

                TABLE 1 

        */}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Party affiliation</TableCell>
                            <TableCell align="right">Men</TableCell>
                            <TableCell align="right">Women</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sampleData1.map((row) => (
                            <TableRow key={row.party}>
                                <TableCell component="th" scope="row"> {row.party} </TableCell>
                                <TableCell align="right">{row.men}</TableCell>
                                <TableCell align="right">{row.women}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <br />
            {/* 

                TABLE 2 

        */}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Party affiliation</TableCell>
                            <TableCell align="right">White</TableCell>
                            <TableCell align="right">Black</TableCell>
                            <TableCell align="right">Asian</TableCell>
                            <TableCell align="right">Mixed</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sampleData2.map((row) => (
                            <TableRow key={row.party}>
                                <TableCell component="th" scope="row"> {row.party} </TableCell>
                                <TableCell align="right">{row.white}</TableCell>
                                <TableCell align="right">{row.black}</TableCell>
                                <TableCell align="right">{row.asian}</TableCell>
                                <TableCell align="right">{row.other}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

function AssociationClusters() {
    interface cluster_summary_table {
        ensemble: number;
        num_clusters: number;
        plans_needed: number;
    }
    const sampleData: cluster_summary_table[] = [
        { ensemble: 1, num_clusters: 3, plans_needed: 309 },
        { ensemble: 2, num_clusters: 4.3, plans_needed: 425 },
        { ensemble: 3, num_clusters: 4.6, plans_needed: 321 },
        { ensemble: 4, num_clusters: 5.3, plans_needed: 251 }, 
        { ensemble: 5, num_clusters: 6.3, plans_needed: 268 }
    ]
    const data = [

    ]
    let a = Math.random()*1.2
    let b = Math.random()*1.3
    let c = Math.random()*1.5
    let d = Math.random()*1.6 
    for(let i = 1; i < 500; i++){
        data.push({ Num: i, ensemble1: Math.log(i), ensemble2: Math.log(i)/Math.log(9)+a, ensemble3: Math.log(i)/Math.log(8)+b, ensemble4: Math.log(i)/Math.log(7)+c, ensemble5: Math.log(i)/ Math.log(6)+d});
    }
    const areas = {

    }
    let color
    function randomColor(){
        color = '#' + Math.floor(Math.random()*16777215).toString(16)
        return color
    }
    
    return (
        <>
            <AreaChart width={600} height={400} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Num" />
                <YAxis />
                <Tooltip contentStyle={{ fontSize: 18 }}/>
                <Legend />
                <Area type="monotone" dataKey="ensemble1" stroke="#8884d8" fill="#8884d8" />
                <Area type="monotone" dataKey="ensemble2" stroke="#82ca9d" fill="#82ca9d" />
                <Area type="monotone" dataKey="ensemble3" stroke={randomColor()} fill={color} />
                <Area type="monotone" dataKey="ensemble4" stroke={randomColor()} fill={color} />
                <Area type="monotone" dataKey="ensemble5" stroke={randomColor()} fill={color}/>
                {
                    
                }
            </AreaChart>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead sx={{ height: "10px", fontSize: '10px' }}>
                        <TableRow>
                            <TableCell>Ensemble</TableCell>
                            <TableCell align="right"># of clusters at 500</TableCell>
                            <TableCell align="right">Plans needed to reach max clusters</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sampleData.map((row) => (
                            <TableRow key={row.ensemble}>
                                <TableCell component="th" scope="row"> {row.ensemble} </TableCell>
                                <TableCell align="right">{row.num_clusters}</TableCell>
                                <TableCell align="right">{row.plans_needed}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}