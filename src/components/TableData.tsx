import React, { Component, FC, useState } from 'react'
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
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import StepContent from '@mui/material/StepContent';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ScatterChart, Scatter, ZAxis, Label } from 'recharts';
import StateMap from './StateMap';


function TableData() {
    const [currentTab, setCurrentTab] = useState(0);
    const [completed, setCompleted] = useState<{
        [k: number]: boolean;
    }>({});

    const steps = ['Select an Ensemble', 'Select a Cluster', 'Select a District Plan'];

    function handleStepChange(step: number) {
        setCurrentTab(step);
    }

    /**
     * 
     * Table Data for ensembles
     */
    const ensemble= [
        { label: 'Numbers of clusters', detail: '7'},
        { label: 'Average distance between clusters', detail: '12'},
        { label: 'Number of district plans', detail: '200'}
    ];

    function Ensembles(){
        return(
        <div>
            <Accordion defaultExpanded={true}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                <Button 
                    variant="text" 
                    size="large"
                    onClick={() => handleStepChange(1)}
                >
                    Ensemble 1
                </Button>
                </AccordionSummary>
                <Divider/>
                <AccordionDetails>
                    <Table sx={{ minWidth: 650 }}>
                        <TableBody>
                        {ensemble.map((row) => (
                            <TableRow key={row.label}>
                                <TableCell component="th" scope="row"> {row.label} </TableCell>
                                <TableCell align="right">{row.detail}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                <Button 
                    variant="text" 
                    size="large"
                    onClick={() => handleStepChange(1)}
                >
                    Ensemble 2
                </Button>
                </AccordionSummary>
                <Divider/>
                <AccordionDetails>
                    <Table sx={{ minWidth: 650 }}>
                        <TableBody>
                        {ensemble.map((row) => (
                            <TableRow key={row.label}>
                                <TableCell component="th" scope="row"> {row.label} </TableCell>
                                <TableCell align="right">{row.detail}</TableCell>
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
                <Button 
                    variant="text" 
                    size="large"
                    onClick={() => handleStepChange(1)}
                >
                    Ensemble 3
                </Button>
                </AccordionSummary>
                <Divider/>
                <AccordionDetails>
                    <Table sx={{ minWidth: 650 }}>
                        <TableBody>
                        {ensemble.map((row) => (
                            <TableRow key={row.label}>
                                <TableCell component="th" scope="row"> {row.label} </TableCell>
                                <TableCell align="right">{row.detail}</TableCell>
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
                <Button 
                    variant="text" 
                    size="large"
                    onClick={() => handleStepChange(1)}
                >
                    Ensemble 4
                </Button>
                </AccordionSummary>
                <Divider/>
                <AccordionDetails>
                    <Table sx={{ minWidth: 650 }}>
                        <TableBody>
                        {ensemble.map((row) => (
                            <TableRow key={row.label}>
                                <TableCell component="th" scope="row"> {row.label} </TableCell>
                                <TableCell align="right">{row.detail}</TableCell>
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
                <Button 
                    variant="text" 
                    size="large"
                    onClick={() => handleStepChange(1)}
                >
                    Ensemble 5
                </Button>
                </AccordionSummary>
                <Divider/>
                <AccordionDetails>
                <Table sx={{ minWidth: 650 }}>
                        <TableBody>
                        {ensemble.map((row) => (
                            <TableRow key={row.label}>
                                <TableCell component="th" scope="row"> {row.label} </TableCell>
                                <TableCell align="right">{row.detail}</TableCell>
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
     * Table Data for clusters
     */
    interface ClusterNameCellProps {
        name: string;
    }
    
    const ClusterNameCell: FC<ClusterNameCellProps> = ({ name }): JSX.Element => {
        const [editing, setEditing] = useState(false);
        const [clusterName, setName] = useState(name);
        const handleDoubleClick = () => {
            setEditing(true);
        };
    
        const handleBlur = () => {
            setEditing(false);
            // Save the changes or perform any required actions here
        };
    
        const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            setEditing(false);
            if (clusterName == "")
                setName(name);
        }
    
        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setName(event.target.value);
        };
        return (
            <TableCell align="center" component="th" scope="row">
                {editing ? (
                    <form className="form-control" onSubmit={(event) => handleSubmit(event)}>
                        <input
                            type="text"
                            className="cluster-name-input cluster-name-input-alt"
                            value={clusterName}
                            onChange={handleChange}
                            onBlur={handleBlur}
    
                        />
                    </form>
                ) : (
                    <span onDoubleClick={handleDoubleClick}>{clusterName}</span>
                )}
            </TableCell>
        );
    };
    
    function ClusterTable() {
        const [currentTab, setCurrentTab] = useState('1');

        function handleTabChange(event: React.ChangeEvent<{}>, newValue: number) {
            console.log(newValue);
            setCurrentTab(String(newValue));
        }
        
        interface cluster_summary_table {
            cluster: number;
            num_districts: number;
            average_dist: number;
        };

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

        
        
        const clusterTempData = [
            {
                cluster: 1,
                name: 'cluster A',
                data: [
                    {
                        name: "Number of Districts",
                        value: "48",
                    },
                    {
                        name: "Political Party Ratio",
                        value: "68% Democratic / 32% Republican",
                    },
                    {
                        name: "Average Republican Voters",
                        value: '47%',
                    },
                    {
                        name: "Average Democratic Voters",
                        value: '53%',
                    }, 
                ],
                distanceMeasures: [
                    {
                        name: "Optimal transport",
                        value: "32.1",
                    },
                    {
                        name: "Hamming distance",
                        value: "21.2",
                    },
                    {
                        name: "Total Variation Distance",
                        value: "19.2",
                    }
                ],
                demographicGroups: [ // district average by racial group
                    {
                        name: "White",
                        value: "31%",
                    },
                    {
                        name: "Black",
                        value: "32%",
                    },
                    {
                        name: "Asian",
                        value: "23%",
                    },
                    {
                        name: "Other",
                        value: "24%",
                    },
                ]
            },
            {
                cluster: 2,
                name: 'cluster B',
                data: [
                    {
                        name: "Number of Districts",
                        value: "23",
                    },
                    {
                        name: "Political Party Ratio",
                        value: "32% Democratic / 68% Republican",
                    },
                    {
                        name: "Average Republican Voters",
                        value: '78%',
                    },
                    {
                        name: "Average Democratic Voters",
                        value: '22%',
                    }, 
                ],
                distanceMeasures: [
                    {
                        name: "Optimal transport",
                        value: "45.9",
                    },
                    {
                        name: "Hamming distance",
                        value: "17.4",
                    },
                    {
                        name: "Total Variation Distance",
                        value: "11",
                    }
                ],
                demographicGroups: [ // district average by racial group
                    {
                        name: "White",
                        value: "31%",
                    },
                    {
                        name: "Black",
                        value: "32%",
                    },
                    {
                        name: "Asian",
                        value: "23%",
                    },
                    {
                        name: "Other",
                        value: "24%",
                    },
                ]
            },
            {
                cluster: 3,
                name: 'cluster C',
                data: [
                    {
                        name: "Number of Districts",
                        value: "31",
                    },
                    {
                        name: "Political Party Ratio",
                        value: "56% Democratic / 44% Republican",
                    },

                    {
                        name: "Average Republican Voters",
                        value: '58%',
                    },
                    {
                        name: "Average Democratic Voters",
                        value: '42%',
                    }, 
                ],
                demographicGroups: [ // district average by racial group
                    {
                        name: "White",
                        value: "31%",
                    },
                    {
                        name: "Black",
                        value: "32%",
                    },
                    {
                        name: "Asian",
                        value: "23%",
                    },
                    {
                        name: "Other",
                        value: "24%",
                    },
                ],
                distanceMeasures: [
                    {
                        name: "Optimal transport",
                        value: "8.8",
                    },
                    {
                        name: "Hamming distance",
                        value: "16.8",
                    },
                    {
                        name: "Total Variation Distance",
                        value: "15.1",
                    }
                ],
            },
        ]
        
        return (
            <>
            <div className='graph-container'>
                <ScatterChart width={500} height={300} margin={{ top: 20, right: 20, bottom: 20, left: 20 }} >
                    <CartesianGrid />
                    <XAxis type="number" dataKey="x" name="Average distance" >
                    </XAxis>
                    <YAxis yAxisId="left" type="number" dataKey="y" name='District plans in cluster' opacity='1' stroke='#7aa9ff'/>
                    <ZAxis dataKey="y" domain={domain} range={range} />
                    <Tooltip cursor={{ strokeDasharray: "3 3" }} wrapperStyle={{ outline: "none" }} contentStyle={{ fontSize: 18 }}/>
                    <Scatter yAxisId="left" data={data01} fill="#bfd6ff" stroke="#037cff" opacity={4}/> 
                </ScatterChart>
            </div>
            {clusterTempData.map((cluster) => (
                <>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Button 
                                variant="text" 
                                size="medium"
                                onClick={() => handleStepChange(2)}
                            >
                                Cluster {cluster.cluster}
                            </Button>
                        </AccordionSummary>
                        <Divider/>
                        <AccordionDetails>
                            <TabContext value={currentTab}>
                            <div style={{display: 'flex', flexDirection:'column', width:'100%' }}>
                                <div className='tab-container'>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '95%' }}>
                                    <Tabs
                                        value={currentTab}
                                        onChange={handleTabChange}
                                    >
                                        <Tab value='1' label='Summary of Cluster' sx={{ textTransform: "none" }} />
                                        <Tab value='2' label='Demographic Data' sx={{ textTransform: "none" }} />
                                        <Tab value='3' label='Distance Measures' sx={{ textTransform: "none" }} />
                                    </Tabs>
                                </Box>
                            
                                </div>
                                <div className='sub-table-container'>
                                    <TabPanel value='1'>
                                        {/* TABLE 1 */}
                                        <TableContainer component={Paper}>
                                            <Table sx={{ minWidth: 650 }}>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Name</TableCell>
                                                        <ClusterNameCell name={cluster.name} />
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {cluster.data.map((row) => (
                                                        <TableRow key={row.name}>
                                                            <TableCell> {row.name} </TableCell>
                                                            <TableCell align='right'> {row.value} </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </TabPanel>
                                    <TabPanel value='2'>
                                        {/* TABLE 2 */}
                                        <TableContainer component={Paper}>         
                                            <Table sx={{ minWidth: 650 }}>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>District Average By Demographics</TableCell>
                                                        <TableCell/>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {cluster.demographicGroups.map((row) => (
                                                        <TableRow key={row.name}>
                                                            <TableCell> {row.name} </TableCell>
                                                            <TableCell align='right'> {row.value} </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </TabPanel>
                                    <TabPanel value='3'>
                                        <TableContainer component={Paper}>         
                                            <Table sx={{ minWidth: 650 }}>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Distance Measure Effectiveness</TableCell>
                                                        <TableCell/>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {cluster.distanceMeasures.map((row) => (
                                                        <TableRow key={row.name}>
                                                            <TableCell> {row.name} </TableCell>
                                                            <TableCell align='right'> {row.value} </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </TabPanel>
                                </div>
                            
                            </div>
                        </TabContext>
                        </AccordionDetails>
                    </Accordion>
                </>
            ))} 
        </>
        )
    }



    return (
        <div className='table-container'>
            <div className='stepper-container'>
                <Stepper activeStep={currentTab}>
                    {steps.map((label, index) => (
                        <Step key={label} completed={completed[index]}>
                            <StepButton color="inherit" onClick={() => handleStepChange(index)}>
                                {label}
                            </StepButton>
                        </Step>
                    ))}
                </Stepper>
            </div>
            {/* State Details */}
            { currentTab == 0 && <Ensembles/> } 
            {/* Summary of Cluster */}
            { currentTab == 1 && <ClusterTable/> }
            {/* <AverageMeasureTable/> <Party Affilations, Association of Clusters*/}
            { currentTab == 2 && <AssociationClusters/> }
        </div>

    )

}

export default TableData;




interface ClusterNameCellProps {
    name: string;
  }

const ClusterNameCell: FC<ClusterNameCellProps> = ({ name }): JSX.Element => {
    const [editing, setEditing] = useState(false);
    const [clusterName, setName] = useState(name);
    const handleDoubleClick = () => {
      setEditing(true);
    };
  
    const handleBlur = () => {
      setEditing(false);
      // Save the changes or perform any required actions here
    };
  
    const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setEditing(false);
      if(clusterName == "")
          setName(name);
    }
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
    };
    return (
      <TableCell align="center" component="th" scope="row">
        {editing ? (
          <form className="form-control" onSubmit={(event) => handleSubmit(event)}>
          <input
            type="text"
            className="cluster-name-input cluster-name-input-alt"
            value={clusterName}
            onChange={handleChange}
            onBlur={handleBlur}
  
          />
          </form>
        ) : (
          <span onDoubleClick={handleDoubleClick}>{clusterName}</span>
        )}
      </TableCell>
    );
  };

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
interface coordProps{
    onDistrictSelection:(coord: []) => void
}
function AssociationClusters(/*{onDistrictSelection}:coordProps*/) {
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
    let a = Math.random() * 1.2
    let b = Math.random() * 1.3
    let c = Math.random() * 1.5
    let d = Math.random() * 1.6
    for (let i = 1; i < 500; i++) {
        data.push({ Num: i, ensemble1: Math.log(i), ensemble2: Math.log(i) / Math.log(9) + a, ensemble3: Math.log(i) / Math.log(8) + b, ensemble4: Math.log(i) / Math.log(7) + c, ensemble5: Math.log(i) / Math.log(6) + d });
    }
    
    let color
    function randomColor() {
        color = '#' + Math.floor(Math.random() * 16777215).toString(16)
        return color
    }
    interface district_summary_table {
        district: number;
        predicted_winner: string;
        democrat: number;
        republican: number;
    }
    const districts: district_summary_table[] = [
        {
            district: 1,
            predicted_winner: "Republican",
            democrat: 30,
            republican: 70,
        },
        {
            district: 2,
            predicted_winner: "Democrat",
            democrat: 60,
            republican: 40,
        },
        {
            district: 3,
            predicted_winner: "Democrat",
            democrat: 70,
            republican: 30,
        },
        {
            district: 4,
            predicted_winner: "Democrat",
            democrat: 55,
            republican: 45,
        },
        {
            district: 5,
            predicted_winner: "Republican",
            democrat: 34,
            republican: 66,
        },
    ];
    /**
     * Don't ask me how it's gonna work, I can't tell you, not because it's a secret, but because I don't know
     * @param coord 
     * @returns 
     */
    function goTo(coord:string){
        console.log(coord)
        return coord
    }
    const buttonStyle = {
        padding: '10px 20px',
        fontSize: '16px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
        transition: 'background-color 0.3s ease',
      };

    return (
        <>
            <Accordion defaultExpanded={true}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    
                > <Typography><b>Association of clusters with ensemble size</b></Typography>

                </AccordionSummary>

                <AreaChart width={600} height={400} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Num" />
                    <YAxis />
                    <Tooltip contentStyle={{ fontSize: 18 }} />
                    <Legend />
                    <Area type="monotone" dataKey="ensemble1" stroke="#8884d8" fill="#8884d8" />
                    <Area type="monotone" dataKey="ensemble2" stroke="#82ca9d" fill="#82ca9d" />
                    <Area type="monotone" dataKey="ensemble3" stroke={randomColor()} fill={color} />
                    <Area type="monotone" dataKey="ensemble4" stroke={randomColor()} fill={color} />
                    <Area type="monotone" dataKey="ensemble5" stroke={randomColor()} fill={color} /> 
                    {
                        /*
                        Dev note, remember, all of this is not dynamic yet, so it's yet to be implemented with
                        data, so this is will still need fixes before this is ready.
                        */
                    }
                </AreaChart>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                > <Typography><b>Districts</b></Typography>

                </AccordionSummary>
                <AccordionDetails>
                <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead sx={{ height: "10px", fontSize: '10px' }}>
                        <TableRow>
                            <TableCell>District</TableCell>
                            <TableCell align="center">Predicted Winner</TableCell>
                            <TableCell align="right">% of Democratic Voters</TableCell>
                            <TableCell align="right">% of Republican Voters</TableCell>
                        </TableRow>
                    </TableHead>
                    
                    <TableBody>
                        {districts.map((row) => (
                            
                            <TableRow key={row.district}>
                                
                                <TableCell component="th" scope="row"> {<button style={buttonStyle} onClick={() => goTo(row.district.toString())}>{row.district}</button>} </TableCell>
                                <TableCell style={{ color: row.predicted_winner === 'Democrat' ? 'blue' : 'red' }} align="center">{row.predicted_winner}</TableCell>
                                <TableCell align="right">{row.democrat}%</TableCell>
                                <TableCell align="right">{row.republican}%</TableCell>
                                
                            </TableRow>
                            
                        ))}
                
                    </TableBody>
                    
                </Table>
            </TableContainer>
            </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                > <Typography><b>Details about the ensembles</b></Typography>

                </AccordionSummary>
                <AccordionDetails>
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
                </AccordionDetails>
            </Accordion>
        </>
    )
}